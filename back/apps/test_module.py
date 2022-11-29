from urllib import response
import requests
import argparse
import json

parser = argparse.ArgumentParser(description='Test for modules')
parser.add_argument('--module', type=str, help='add module you want to test')

# data = 
# json_data = json.dumps(data)

url = "http://127.0.0.1:8000/code_run/"
sub_url = parser.parse_args().module
# url+=sub_url

# print((json_data))
response = requests.post(url, json={"code" : "import time\ntime.sleep(11)"})
print (response.json())

assert response.status_code == 200

print('\x1b[6;30;42m' + 'SUCCESS!' + '\x1b[0m')