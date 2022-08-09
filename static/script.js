class NASA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
        }
    }

    get_objects() {
        let date = document.querySelector("input#date").value;
        console.log(date);

        let request = fetch("http://127.0.0.1:5000/api/get_objects",
                            {method: 'POST',
                             body: JSON.stringify({'date': date})});
        request.then((response) => response.json())
        .then(data => {
            if (data['success']) {
                let asteroids = data['objects'];
                // first, remove all old asteroids from html
                let asteroid_ul = document.getElementById("asteroid_list"); // [0]
                while (asteroid_ul.firstChild) {
                    asteroid_ul.removeChild(asteroid_ul.firstChild);
                }
                // re-populate page with 'new' asteroids
                for (let asteroid of asteroids) {
                    let a = document.createElement("li");

                    let a_name = document.createTextNode(asteroid['name']);
                    // let a_diameter_min = document.createTextNode(asteroid['feet']['estimated_diameter_min']);
                    // let a_diameter_max = document.createTextNode(asteroid['feet']['estimated_diameter_max']);
                    // let a_miss_dist = document.createTextNode(asteroid['close_approach_data'][0]['miss_distance']['miles']);
                    // let a_speed = document.createTextNode(asteroid['close_approach_data'][0]['relative_velocity']['miles_per_hour']);
                    // let a_hazard = document.createTextNode(asteroid['is_potentially_hazardous_asteroid']);

                    a.appendChild(a_name);
                    asteroid_ul.appendChild(a);
                }
            }
            else {
                console.log("Please enter a valid date.");
            }
        })
    }

    render() {
        return (
            <div>
                <h1>NASA Near Earth Object Monitor</h1>
                <div>
                    <h3>Enter a date:</h3>
                    <input id="date" type="date"></input>
                    <button onClick={() => this.get_objects()}>Find Asteroids!</button>
                </div>
                <div>
                    <ul id="asteroid_list">
                    </ul>
                </div>
            </div>
        );
    }
}

/* --------------------------------- */

ReactDOM.render(
	<NASA/>,
	document.getElementById('root')
  );