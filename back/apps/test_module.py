from urllib import response
import requests
import argparse

parser = argparse.ArgumentParser(description='Test for modules')
parser.add_argument('--module', type=str, help='add module you want to test')

data = {
    "content" : "\
    def BFS(self, s):\
        visited = [False] * (len(self.graph))\
        queue = []\
        queue.append(s)\
        visited[s] = True\
        while queue:\
            s = queue.pop(0)\
            print (s, end = " ")\
            for i in self.graph[s]:\
                if visited[i] == False:\
                    queue.append(i)\
                    visited[i] = True"
}

url = "http://127.0.0.1:8000/"
sub_url = parser.parse_args().module
url+=sub_url

response = requests.get(url, params=data)

assert response.status_code == 200

print('\x1b[6;30;42m' + 'SUCCESS!' + '\x1b[0m')