import urllib2, json

def facebookLikes(url):
    url = 'https://api.facebook.com/method/links.getStats?urls=' + urllib2.quote(url, safe='') + '&format=json'
    response = urllib2.urlopen(url)
    json_result = response.read()

    result = json.loads(json_result)
    # Also can get share_count, like_count, comment_count
    return result[0]["total_count"]




# Other metrics:
"""Twitter: http://urls.api.twitter.com/1/urls/count.json?url=%%URL%%
Reddit:http://buttons.reddit.com/button_info.json?url=%%URL%%
LinkedIn: http://www.linkedin.com/countserv/count/share?url=%%URL%%&format=json 
Digg: http://widgets.digg.com/buttons/count?url=%%URL%% 
Delicious: http://feeds.delicious.com/v2/json/urlinfo/data?url=%%URL%%
StumbleUpon: http://www.stumbleupon.com/services/1.01/badge.getinfo?url=%%URL%%
Pinterest: http://widgets.pinterest.com/v1/urls/count.json?source=6&url=%%URL%%"""
