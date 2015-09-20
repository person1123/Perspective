from categorizer import *
from scraper import *
import json
from pprint import pprint        

if __name__ == "__main__":
    f1 = open('lib_training_json.txt')
    f2 = open('con_training_json.txt')
    libart = json.load(f1)
    conart = json.load(f2)
    print len(libart)
    print len(conart)
    uniqlibart = list(set(libart))
    uniqconart = list(set(conart))
    print len(uniqlibart)
    print len(uniqconart)
    #pprint(uniqlibart[0:10])
    #pprint(uniqlibart[0])
    #pprint(uniqlibart[1])
    libavg = avg_article_topics(uniqlibart,'political_bias')
    conavg = avg_article_topics(uniqconart,'political_bias')
    cats = [('liberal',libavg),('conservative',conavg)]

    allart = uniqlibart + uniqconart
    """
    for art in uniqlibart:
        print categorize_article(art,cats,'political_bias')
    print '\n\n\n\n'
    for art in uniqconart:
        print categorize_article(art,cats,'political_bias')
    """
    results = [categorize_article(art,cats,'political_bias')[0] for art in allart]
    print json.dumps(results)
