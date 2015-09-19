################################################################################
## File:   categorizer.py
## Author: Robert Adkins
##
## This module will use the gensim module to determine the similarities between
## articles given a set of articles. It also gives a means of associating
## meaningful words with the calculated categories.
################################################################################

from gensim import corpora, models, similarities
from collections import defaultdict

NUM_TOPICS = 3

def categorize_articles(articles):
    # ignore prepositional type words as meaningful words
    stoplist = set('for a of the and to in by'.split())
    texts = [[word for word in article.lower().split() if word not in stoplist]
             for article in articles]

    # remove words that appear only once
    frequency = defaultdict(int)
    for text in texts:
        for token in text:
            frequency[token] += 1

    texts = [[token for token in text if frequency[token] > 1]
             for text in texts]

    # corpus will hold the frequency counts in each article for important words
    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]

    # create a term frequency-inverse document frequency model for our data
    # Then, apply the model symbolically to the articles
    tfidf = models.TfidfModel(corpus)
    corpus_tfidf = tfidf[corpus]

    # similar to last step, but with latent semantic indexing model added on top
    # of the tf-ldfi model
    lsi = models.LsiModel(corpus_tfidf, id2word=dictionary, num_topics=3)
    corpus_lsi = lsi[corpus]
    
    categories = lsi.show_topics(formatted=False)
    category_ratings = [max(rating, key=lambda r:abs(r[1])) for rating in corpus_lsi]
    
    for doc in corpus_lsi:
        print(doc)
        
    return (categories, category_ratings)
