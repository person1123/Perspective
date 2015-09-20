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
import numpy
import operator
from pprint import pprint

NUM_TOPICS = 30

def train_topics(articles,name='political_bias'):
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
    dictionary.save(name + '.dict')
    corpus = [dictionary.doc2bow(text) for text in texts]

    lda = models.LdaModel(corpus, id2word=dictionary, num_topics=NUM_TOPICS)
    lda.save(name + '.lda')
    return (name + '.lda', name + '.dict')

def sum_article_topics(articles,model_id):
    dictionary = corpora.Dictionary.load(model_id + '.dict')
    lda = models.LdaModel.load(model_id + '.lda')
    
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
    corpus = [dictionary.doc2bow(text) for text in texts]
    corpus_lda = lda[corpus]

    counts = [0] * NUM_TOPICS
    
    for art in corpus_lda:
        for key,val in art:
            counts[key] += val

    return counts

def avg_article_topics(articles,model_id):
    sums = sum_article_topics(articles,model_id)
    n = len(articles)
    avg  = [s/n for s in sums]
    return avg

def categorize_article(article,categories,model_id):
    dictionary = corpora.Dictionary.load(model_id + '.dict')
    lda = models.LdaModel.load(model_id + '.lda')
    vec_bow = dictionary.doc2bow(article.lower().split())
    vec_lda = lda[vec_bow]
    art_vec = [0] * NUM_TOPICS
    for key,val in vec_lda:
        art_vec[key] = val
    #pprint(numpy.array(art_vec))
    #pprint(numpy.array(categories[0][1]))
    dists = [numpy.linalg.norm(numpy.array(avg) - numpy.array(art_vec)) for name,avg in categories]
    min_dist  = min(dists)
    min_index = dists.index(min_dist)
    return (categories[min_index][0], min_dist)
