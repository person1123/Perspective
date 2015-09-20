from scraper import *
from sys import argv
import json

if __name__ == "__main__":
    if len(argv) < 2:
        print 'Please provide filenames for url lists'

    for filename in argv[1:]:
        urlFile = open(filename)
        urls = urlFile.readlines()
        urls = [url.strip() for url in urls]
        articles = getArticleInfos(urls)
        concreteArticles = [a for a in articles]
        n = len(concreteArticles)

        coreData = []   # What is this, iOS?
        
        for i in range(n):
            art = concreteArticles[i];
            if not (art.title == '' or art.text == ''):
                coreData.append((urls[i],art.title,art.text))
        
        outStr = json.dumps(coreData)
        filenameParts = filename.split('.')
        root = filenameParts[0]
        
        outFile = open(root + '.art','w')
        outFile.write(outStr)
        outFile.close()
        urlFile.close()
