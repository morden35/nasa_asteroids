class NASA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
        }
    }

    get_objects() {
        let date = document.querySelector("input#date").value;

        let request = fetch("http://127.0.0.1:5000/api/get_objects",
                            {method: 'POST',
                             body: JSON.stringify({'date': date})});
        request.then((response) => response.json())
        .then(data => {
            if (data['success']) {
                let asteroids = data['objects'];

                // first, remove all old asteroids from html
                let asteroid_ul = document.getElementById("asteroid_list");
                while (asteroid_ul.firstChild) {
                    asteroid_ul.removeChild(asteroid_ul.firstChild);
                }

                let asteroid_div = document.getElementById("asteroid_div");
                if (asteroid_div.childNodes.length > 1) {
                    asteroid_div.removeChild(asteroid_div.firstChild);
                }
                let title_text = document.createElement("h2");
                title_text.textContent = "Near earth objects for " + data['date'];
                asteroid_div.insertBefore(title_text, asteroid_ul);

                // re-populate page with 'new' asteroids
                for (let asteroid of asteroids) {
                    // create outer list item
                    let a_li = document.createElement("li");
                    
                    // create left column
                    let a_div_1 = document.createElement("div");
                    a_div_1.classList.add("col_left");

                    // create titles
                    let a_h3_1 = document.createElement("h3");
                    a_h3_1.textContent = "Name:";
                    let a_h3_2 = document.createElement("h3");
                    a_h3_2.textContent = "Diameter (ft.):";
                    let a_h3_3 = document.createElement("h3");
                    a_h3_3.textContent = "Miss Distance (mi.):";
                    let a_h3_4 = document.createElement("h3");
                    a_h3_4.textContent = "Speed (mph):";
                    let a_h3_5 = document.createElement("h3");
                    a_h3_5.textContent = "Hazardous:";

                    // append titles to left column
                    a_div_1.appendChild(a_h3_1)
                    a_div_1.appendChild(a_h3_2)
                    a_div_1.appendChild(a_h3_3)
                    a_div_1.appendChild(a_h3_4)
                    a_div_1.appendChild(a_h3_5)

                    // create right column
                    let a_div_2 = document.createElement("div");
                    a_div_2.classList.add("col_right");

                    // insert text from api
                    let a_h3_6 = document.createElement("h3");
                    a_h3_6.textContent = asteroid['name'];
                    let a_h3_7 = document.createElement("h3");
                    a_h3_7.textContent = asteroid['estimated_diameter']['feet']['estimated_diameter_min'] + " - " + asteroid['estimated_diameter']['feet']['estimated_diameter_max'];
                    let a_h3_8 = document.createElement("h3");
                    a_h3_8.textContent = asteroid['close_approach_data'][0]['miss_distance']['miles'];
                    let a_h3_9 = document.createElement("h3");
                    a_h3_9.textContent = asteroid['close_approach_data'][0]['relative_velocity']['miles_per_hour'];
                    let a_h3_10 = document.createElement("h3");
                    a_h3_10.textContent = asteroid['is_potentially_hazardous_asteroid'];
                    
                    // append text to right column
                    a_div_2.appendChild(a_h3_6)
                    a_div_2.appendChild(a_h3_7)
                    a_div_2.appendChild(a_h3_8)
                    a_div_2.appendChild(a_h3_9)
                    a_div_2.appendChild(a_h3_10)

                    // create horizontal line
                    let a_hr = document.createElement("hr");
                    
                    // append columns and line to list item
                    a_li.appendChild(a_div_1)
                    a_li.appendChild(a_div_2)
                    a_li.appendChild(a_hr)

                    // append list item to list
                    asteroid_ul.appendChild(a_li);
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
                    <h3 id="enter_date">Enter a date:</h3>
                    <input id="date" type="date"></input>
                    <button onClick={() => this.get_objects()}>Find Asteroids!</button>
                </div>
                <div id="asteroid_div">
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
