################################################################################
## File:   categorizer.py
## Author: Robert Adkins, Jonah Chazan
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
from sys import argv
import json
import requests

NUM_TOPICS = 30

def train_topics(articles,name='political_bias'):
    prepFile = open('prepositions.txt')
    preps = prepFile.readlines()
    preps = [prep.strip() for prep in preps]
    stoplist = set(preps)
    texts = [[word for word in article[2].lower().split() if word not in stoplist]
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

    prepFile = open('prepositions.txt')
    preps = prepFile.readlines()
    preps = [prep.strip() for prep in preps]
    stoplist = set(preps)
    
    # ignore prepositional type words as meaningful words
    texts = [[word for word in article[2].lower().split() if word not in stoplist]
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
    vec_bow = dictionary.doc2bow(article[2].lower().split())
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

def collect_articles(json_filenames):
    arts = []

    for filename in json_filenames:
        f = open(filename)
        subarts = json.load(f)
        for art in subarts:
            arts.append(art)

    return arts


def do_categorize(new_arts, topic, lib_filename_str, con_filename_str):
    #LIBERAL then CONSERVATIVE
        
    lib_arts = collect_articles([lib_filename_str])
    lib_avg  = avg_article_topics(lib_arts,'political_bias')
    
    con_arts = collect_articles([con_filename_str])
    con_avg  = avg_article_topics(con_arts,'political_bias')

    cats = [('liberal',lib_avg),('conservative',con_avg)]
        
    final_res = {'topic': topic, 'categories':{'liberal':[], 'conservative':[]}}
        
    for art in new_arts:
        (label,dist) = categorize_article(art,cats,'political_bias')
        final_res['categories'][label].append({'url':art[0],'title':art[1],'rank':dist}) #append url
            
    jdump = json.dumps(final_res)
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    print jdump
    r = requests.post('http://199.48.180.20:3000/topics',data=jdump,headers=headers)
    print r

if __name__ == "__main__":
    if len(argv) < 2:
        print '[USAGE] categorizer.py [train <jsons> | categorize <topic> "trained_jsons" "new_json"]\n'
        quit()

    command = argv[1]


    
    
    if command == 'train':
        filenames = argv[2:]
        arts = collect_articles(filenames)
        train_topics(arts)
    elif command == 'categorize':
        #LIBERAL then CONSERVATIVE

        topic = argv[2]
        
        lib_filename_str = argv[3]
        lib_arts = collect_articles([lib_filename_str])
        lib_avg  = avg_article_topics(lib_arts,'political_bias')
        
        con_filename_str = argv[4]
        con_arts = collect_articles([con_filename_str])
        con_avg  = avg_article_topics(con_arts,'political_bias')

        cats = [('liberal',lib_avg),('conservative',con_avg)]
        
        new_filename_str = argv[5]
        new_arts = collect_articles([new_filename_str])

        final_res = {'topic': topic, 'categories':{'liberal':[], 'conservative':[]}}
        
        for art in new_arts:
            (label,dist) = categorize_article(art,cats,'political_bias')
            final_res['categories'][label].append({'url':art[0],'title':art[1],'rank':dist}) #append url
        '''    
        for cat in final_res['categories'].keys():
            cat_entries = final_res['categories'][cat]
            whiskers = sort(cat_entries, key=lambda data:data['rank'])
            final_res['categories'][cat] = whiskers
        '''
        jdump = json.dumps(final_res)
        headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
        print jdump
        r = requests.post('http://199.48.180.20:3000/topics',data=jdump,headers=headers)
        print r
    else:
        print 'Invalid command option'
