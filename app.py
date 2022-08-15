from flask import Flask, request, jsonify
import json
import requests
import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/get_objects', methods=['POST'])
def get_objects():
    # load date from user input
    date = json.loads(request.data)['date']
    
    # default to today's date
    if date == '':
        date = str(datetime.date.today())

    # make api call
    api_key = '2zcSAHeiiktxliyCHz2eVVzGfUpwPsFqTX97WquF'
    url = f"https://api.nasa.gov/neo/rest/v1/feed?start_date={date}&end_date={date}&api_key={api_key}"
    r = requests.get(url)
    objects = r.json()['near_earth_objects'][date]

    # print(objects[0])
    # round decimals
    # for object in objects:
        # object['estimated_diameter']['feet']['estimated_diameter_min'] = "{:,}".format(round(object['estimated_diameter']['feet']['estimated_diameter_min'],
        #                                                                                ndigits=2))
        # object['estimated_diameter']['feet']['estimated_diameter_max'] = "{:,}".format(round(object['estimated_diameter']['feet']['estimated_diameter_max'],
        #                                                                                ndigits=2))
        # object['close_approach_data'][0]['miss_distance']['miles'] = "{:,}".format(round(float(object['close_approach_data'][0]['miss_distance']['miles']),
        #                                                                            ndigits=2))
        # object['close_approach_data'][0]['relative_velocity']['miles_per_hour'] = "{:,}".format(round(float(object['close_approach_data'][0]['relative_velocity']['miles_per_hour']),
        #                                                                                         ndigits=2))
        # object['is_potentially_hazardous_asteroid'] = str(object['is_potentially_hazardous_asteroid']).capitalize()

    return jsonify({'success': True,
                    'objects': objects,
                    'date': datetime.datetime.strptime(date, '%Y-%m-%d').strftime('%m/%d/%Y')
                    })
