from bs4 import BeautifulSoup
from requests import get


url = 'https://en.wikipedia.org/wiki/List_of_dog_breeds'

response = get(url)

html_soup = BeautifulSoup(response.text, 'html.parser')

container = html_soup.find('table', class_='wikitable').findAll('tr')

arr = list()
for i in range(len(container)):
    arr.append(container[i].find('a')['title'])

f = open('breeds.txt', 'w', encoding="UTF-8")

for item in arr:
  f.write("%s\n" % item)