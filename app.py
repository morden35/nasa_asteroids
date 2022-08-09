from flask import Flask, request, jsonify
import json
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/get_objects', methods=['POST'])
def get_objects():
    date = json.loads(request.data)
    # print(date)
    # format date 2022-08-01

    api_key = '2zcSAHeiiktxliyCHz2eVVzGfUpwPsFqTX97WquF'
    url = f"https://api.nasa.gov/neo/rest/v1/feed?start_date={date}&end_date={date}&api_key={api_key}"
    r = requests.get(url)
    objects = r.json()['near_earth_objects'][date]

    return jsonify({'success': True, 'objects': objects})