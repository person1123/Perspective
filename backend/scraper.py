import urllib2, json
import newspaper

def getRedditUrls(term, recentness="week", limit=100,sort="hot"):
    url = 'http://www.reddit.com/search.json?q=' + urllib2.quote(term, safe='') + '&t=' + recentness + '&limit=' + str(limit) + '&sort=' + sort
    response = urllib2.urlopen(url)
    json_result = response.read()

    posts = json.loads(json_result)["data"]["children"]

    urls = [post["data"]["url"] for post in posts if not post["data"]["is_self"]]

    return urls

def getGoogleNewsUrls(term, pages=3):
    urls = []

    base_url = 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q=' + urllib2.quote(term, safe='')

    for i in range(pages):
        url = base_url + "&start=" + str(len(urls))
        response = urllib2.urlopen(url)
        json_result = response.read()

        try:
            result = json.loads(json_result)["responseData"]
        
            posts = result["results"]

            urls += [post["unescapedUrl"] for post in posts]
        except Exception:
            print json_result
            break
    return urls


def filterArticleUrls(urls):
    blacklist = ["imgur.com","gfycat.com", "youtube.com"]
    extBlacklist = ["png", "jpg", "gif", "gifv"]
    matched = []
    for url in urls:
        parts = url.split("://")[1].split("/")[0]

        if any([b in parts for b in blacklist]):
            continue

        ext = url.split(".")[-1]
        if ext in extBlacklist:
            continue
        
        yield url


def getArticleInfos(urls):
    for url in urls:
        article = newspaper.Article(url)
        article.download()
        article.parse()

        yield article
                        


if __name__ == "__main__":
    urls = filterArticleUrls(getGoogleNewsUrls("trump"))
    articles = getArticleInfos(urls)

    
    for art in articles:
        print art.text
        break
    
