"""
Python script that scraps the weather information

Writes directly to index.html
"""
from bs4 import BeautifulSoup

try:
    from urllib2 import urlopen
except ImportError:
    from urllib.request import urlopen # py3k

# Parse out weather information we need, stored in text
url = "http://www.wrh.noaa.gov/total_forecast/getprod.php?afos=xxxafdlox&wfo=lox&version=0&font=120&new=0&toggle=dictionary"
soup = BeautifulSoup(urlopen(url))
text = soup.body.pre.contents[0]

text = text.replace('\n', "\n<br> ")


# Writes over the HTMl
with open("weatherState.txt", "wb") as file:
	file.write(bytes(text))