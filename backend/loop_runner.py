import requests
from scraper import *
from categorizer import *
import json

def main():
    while True:
        headers = {'Accept': 'application/json'}
        r = requests.get('http://199.48.180.20:3000/topics',headers=headers)

#        print type(r.json()["topics"])
        topics = [t["name"] for t in r.json()["topics"]]


        for topic in topics:
            urls = getRedditUrls(topic) + getGoogleNewsUrls(topic) + getTweetUrls(topic, 100)
            
            urls = filterArticleUrls(urls)
            
            articles = getArticleInfos(urls)

            do_categorize([(art.url, art.title, art.text) for art in articles], topic, "p2-2.art", "tcot-2.art")

            

if __name__=="__main__":
    main()
