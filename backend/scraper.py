import urllib2, json


def scrapeReddit(term, recentness="week", limit=100,sort="hot"):
    url = 'http://www.reddit.com/search.json?q=' + term + '&t=' + recentness + '&limit=' + str(limit) + '&sort=' + sort
    print url
    response = urllib2.urlopen(url)
    json_result = response.read()

    posts = json.loads(json_result)["data"]["children"]

    urls = [post["data"]["url"] for post in posts if not post["data"]["is_self"]]

    return urls


if __name__ == "__main__":
    print scrapeReddit("trump")
