
var fetchButton = document.getElementById('fetch-button');
var cityListContainer = document.querySelector(".cityListContainer")
var searchButton = document.querySelector(".citySearch")
var cityInput = document.querySelector(".cityInput")
var city = JSON.parse(localStorage.getItem("City")) || [];
var apiKey = "7d043b86e402170a14fc88e1c3d5ed2a"
var currentCityName = "";
var currentCityTemp = "";
var currentCityWind = "";
var currentCityHumidity ="";
var currentCityUV = "";
// var currentCityIcon = ""
var currentWeatherContainer = document.querySelector(".currentWeatherContainer")
var forecastContainer = document.querySelector(".forecastContainer")





//  basic set up need to input own variables
function getApi(){
  var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value +"&units=imperial&appid=7d043b86e402170a14fc88e1c3d5ed2a";
fetch(requestUrl)
      .then(function (response) {
        // console.log(response)
        // console.log(response.json());
        return response.json();
        
      })
      .then(function(data){
        currentCityName=data.name
        currentCityTemp = data.main.temp
        currentCityWind= data.wind.speed
        currentCityHumidity = data.main.humidity
        currentCityUV = data.uvi
        currentCityIcon = data.icon
        console.log(data)
        let lat = data.coord.lat
        let lon = data.coord.lon
        let oneCall =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        fetch(oneCall)
        .then(function (response) {
          return response.json();
        }) 
          .then((data)=>{
            console.log(data);
            currentWeather(data);
            forecastWeather(data)
          })
        })
} 
// top div for current weather
function currentWeather(data){
  var cityH1 = document.createElement("h1");
  cityH1.innerText = currentCityName;
  cityH1.classList="currentWeatherCSS"
  currentWeatherContainer.append(cityH1);

  // var currentIcon = document.createElement("img")
  // currentIcon.innerText = currentCityIcon
  // currentWeatherContainer.append(currentIcon)

  var currentTemp = document.createElement("p");
  currentTemp.innerText ="Temp: " + currentCityTemp + " degrees Farenheit";
  // currentTemp.classList="<put css class name>"
  currentWeatherContainer.append(currentTemp)

// DOESNT WORK
  var currentWind = document.createElement("p")
  currentWind.innerText = "Wind: "+ currentCityWind + "MPH";
  // currentWind.classList="<put css class name>"
  currentWeatherContainer.append(currentWind);

  var currentHumidity = document.createElement("p");
  currentHumidity.innerText = "Humidity: " + currentCityHumidity + " %";
  // currentTemp.classList="<put css class name>"
  currentWeatherContainer.append(currentHumidity)

  var currentUVIndex = document.createElement("p");
  currentUVIndex.innerText = "UV Index: " + currentCityUV;
  // currentTemp.classList="<put css class name>"
  currentWeatherContainer.append(currentUVIndex)

  
}
// five day forecast
function forecastWeather(data){
  var forecastData = data.daily
  forecastData = forecastData.slice(0, 5)
  forecastData.forEach((day)=>{
    var weatherCard = document.createElement("div")
    var tempP = document.createElement("p")
    tempP.innerText=`Day Temperature: ${day.temp.day}`

    weatherCard.append(tempP)



    weatherCard.classList= "forecastCard"
    forecastContainer.append(weatherCard)

  })
  
}






  // Prints out the cities in a list  
function listCity() {
  cityListContainer.innerHTML ="";
  city.forEach((city)=>{
    var li = document.createElement('li');
    li.textContent = city
    cityListContainer.appendChild(li)
  })
 
}

// saves to local storage is taken over by my event listener
function savedCity(){
    var cityName = cityInput.value;
    console.log(cityName)
    city.push(cityName)
    cityInput.value = " ";
  localStorage.setItem("City", JSON.stringify(city))
   
   }




// event listeners
searchButton.addEventListener("click", function(event){
  event.preventDefault()
  getApi();
  savedCity();
  

});

listCity();
