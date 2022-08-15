# NASA Near Earth Object API Monitoring App

Welcome to the NASA Near Earth Object API Monitoring App! This application promps users to enter a date and displays which Near Earth Objects (Asteroids) are near earth on that given date. This application is written using React for the front-end and Python/Flask for the back-end.

## Steps to Run

In order to run this application locally, the following must be installed locally:  
Python (I used version 3.9.12)  
Flask (2.2.2)  
jsonify (0.5)  
requests (2.28.1)  

Useful Python installation guides:  
https://www.python.org/downloads/macos/  
https://docs.python-guide.org/starting/install3/osx/  

To install, run the following from the command line:  
$ pip3 install Flask  
$ pip3 install jsonify  
$ pip3 install requests  

Once everything is installed, run the following from the command line:  
$ flask run  

The application should now run locally via:  
http://127.0.0.1:5000/  

## Future Improvements

### 1. Handle case when NASA API returns errors  
At the moment, the get_objects route in app.py returns a json object assuming that the NASA API successfully returns near earth objects. In the event that the NASA API breaks or fails, our application would also break/fail. In the future, I would need to add some cases to handle all potential errors, and display appropriate message to the user in these events. This is critical as we should never assume that an external API is always in working condition.  

### 2. Use State to keep track of date  
script.js contains the React components, JavaScript, and elements. Currently, the NASA class simply renders React elements. If a user clicks the 'Find Asteroids!' button, the get_objects method is called. get_objects selects the date that the user inputs, fetches data from the flask api, and builds more React elements that are appended to the previously rendered React elements.  

If we wanted to make this application more complex in the future, and potentially do more things based on user input, we could initialize this.state with an object including a date (and any other items we want to keep track of) in the NASA class. This would allow us to create a more complex application, take advantage of React Lifecycle Methods, handle different events, and add conditional rendering.

### 3. Set up virtual environment
Setting up a virtual environment would be a nice way to ensure that the installation of necessary libraries is smooth and easy for all users. This would be a nice touch to add for future use, especially if various people are expected to run this application locally.

### 4. Make API Key secret
At the moment, the API Key is public and explicitly written in app.py. This is most likely fine for this use case, however this should not be done in general as a malicious user could easliy find the key and overload/break the NASA API. In the future, I would like to make this key private/secret, and store it in a separate location.

### 5. Simplify JavaScript
The get_objects method in script.js currently loops over the asteroids returned from the Flask api and creates roughly 15 React elements for each asteroid which are then appended to the previously rendered React elements. This approach works, however the code might be difficult to read for future engineers. There might be a cleaner way to write this code. Perhaps I could have abstracted the for loop into a separate method. Rather than using the document.createElement syntax, I could have used JSX which may have been more visually appealing.

### 6. Formatting Output numbers for readability
The UI currently displays the name, estimated diameter min/max in feet, miss distance in miles, relative velocity in mph, and hazardous boolean value for each asteroid in the format that is returned by the NASA API. I would change some of this formatting for readability by rounding all floating point values to two decimal places and adding commas to all floating point values. I would also capitalize the boolean value and strip the parenthesis from the asteroid name. Such changes could be made in either app.py or script.js. I would choose to make the changes in script.js as to avoid an additional for loop.

### 7. Push state to history for use of back button
Since this is a Single Page Application (SPA), the page does not actually re-load when a user clicks the 'Find Asteroids!' button. When using a SPA, we want to allow the user to click the back button to re-visit 'previous pages'. To enable this, we could push state to the history and navigation bar.

## Sources
https://reactjs.org/docs/getting-started.html  
https://www.w3schools.com/jsref/dom_obj_date.asp  
https://www.w3schools.com/howto/howto_css_two_columns.asp  
https://bobbyhadz.com/blog/javascript-create-element-with-class  
https://www.w3schools.com/cssref/pr_text_text-align.ASP  
https://docs.python.org/3/library/datetime.html  

Image:  
https://www.nasa.gov/sites/default/files/star_nova.png  
https://www.nasa.gov/topics/solarsystem/features/watchtheskies/skies_gallery.html#lowerAccordion-set1-slide6  