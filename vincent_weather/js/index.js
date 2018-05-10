var weatherIcon;
var weatherSummary=[]



window.onload = function() {
  weatherIcon = document.getElementById("current-icon");
  weatherSummary = document.getElementById("weather-summary");
  


}


//getting the icons images from the web
var weatherImages = {
  "clear-day": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Sun_icon.svg/252px-Sun_icon.svg.png",
  "clear-night": "http://www.clker.com/cliparts/f/S/2/p/7/u/gold-matte-moon.svg",
  "rain": "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png",
  "snow": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Nuvola_weather_snow.svg/1000px-Nuvola_weather_snow.svg.png",
  "sleet": "http://www.clker.com/cliparts/f/6/7/4/1206565674431593790Anonymous_simple_weather_symbols_10.svg.hi.png",
  "wind": "http://www.haotu.net/up/4233/128/216-wind.png",
  "fog": "http://www.iconninja.com/files/81/344/943/fog-cloud-hiding-the-sun-weather-interface-symbol-icon.svg",
  "cloudy": "http://camera.thietbianninh.com/images/icon-2.png",
  "partly-cloudy-day": "http://meteo.cw/images_www/weather_icons1/weather_icon_03.png",
  "partly-cloudy-night": "http://icon-park.com/imagefiles/simple_weather_icons_cloudy_night.png",
  "hail": "http://icons.iconarchive.com/icons/icons8/ios7/256/Weather-Hail-icon.png",
  "thunderstorm": "http://findicons.com/files/icons/2613/android_weather_extended/480/thunderstorms.png",
  "tornado": "http://hddfhm.com/images/clipart-of-a-tornado-11.png"
}

// creating arrays of cities and coordinates.
var cities = ["San Francisco", "Tunis", "London", "Munich", "Rio", "Sydney", "Stockholm","Johannesburg", "Ho Chi Minh"];
var latitudes = ['34.0522', '36.8065', '51.5074', '48.1351','22.9068', '33.8688', '59.3293', '26.2041', '10.8231'];
var longitudes = ['118.2437', '10.1815', '0.1278', '11.5820', '43.1729', '151.2093', '18.0686', '28.0473', '106.6297'];
var LeTemps = [];
var i = 0;
var object = [];
var objectMain = [];

toto = extractWeatherTwo();

function extractWeatherTwo() {
  // console.log(ReceivedLat);
  // console.log(ReceivedLong);
  // doit faire la requète sur darksky et retourner le "currently.summary" à l'appelant.
  	for (i = 0 ; i < cities.length; i++){
  		console.log("boucle avant :", i);
		var url = `https://api.darksky.net/forecast/a5df06bb40e0a6f4c2ca30f9f38948ab/${latitudes[i]},${longitudes[i]}`+ `?format=jsonp&callback=displayWeatherTwo`;
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = url;
		document.getElementsByTagName("head")[0].appendChild(script);
		console.log("boucle apres :", i);
		}
    return (object); 
}


//geolocation
function getWeather(ReceivedLat, ReceivedLong) {
    document.getElementById("holder_weather_results").className = 'show';
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position){
      displayWeather(extractWeather(position.coords.latitude, position.coords.longitude));
      })
    }
       else {
            window.alert("Could not get location");
      }

  }


//pull the weather from the API


function extractWeather(ReceivedLat, ReceivedLong) {
    var url = `https://api.darksky.net/forecast/a5df06bb40e0a6f4c2ca30f9f38948ab/${ReceivedLat},${ReceivedLong}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    return (object);
}

function displayWeather(object) {
    // weatherIcon.src = weatherImages[object.currently.icon];
    weatherSummary.innerHTML = "" + object.timezone + " <br/> <br/> " + object.currently.summary;

    document.getElementById("current-icon").style.backgroundColor = "transparent"; 
    document.getElementById("weather-summary").style.backgroundColor = "transparent"; 
    
    // console.log(LeTemps);
    weatherSummary = object.currently.summary;
    objectMain = object.currently.summary;
    //looks in the arrays of pre listed weather is one of the entries matches the current weather. 
    //It stores the position of the matching weather in a variable a
    var a = LeTemps.indexOf(objectMain);
    //Uses the index position of the same weather found above, and returns the corresponding city name in variable b.
    var b = cities[a];
    //if the current weather doesn't match any of the other cities, the returned value of a will be -1, as it is not in the array.
    //this loop checks if a is lower than 0, if it is it changes the name of the city to "Wonderland"
    if (a<0) {b="Wonderland"}
    document.getElementById("prompt2").innerHTML ="In " + b + " the weather is also " + objectMain;

    //Log both values in the console for verification
    console.log(a);
    console.log(b);
}


//This functions is using the returned weather data from the array of coordinates and stores it in the array of weahter cities.
function displayWeatherTwo(object) {
	console.log("-------");
	console.log(LeTemps.length, " ", object.currently.summary);
	LeTemps[LeTemps.length] = object.currently.summary;
}







