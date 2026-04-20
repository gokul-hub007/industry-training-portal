import urllib.request
import json

url = "https://industry-training-portal.vercel.app/api/signup"
data = json.dumps({"name": "Test User", "email": "test@example.com", "password": "password"}).encode('utf-8')
req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'})

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.status}")
        print(response.read().decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code}")
    print(e.read().decode('utf-8'))
