
var fetchButton = document.getElementById('fetch-button');
var cityListContainer = document.querySelector(".cityListContainer")
var searchButton = document.querySelector(".citySearch")
var cityInput = document.querySelector(".cityInput")
var city = JSON.parse(localStorage.getItem("City")) || [];
var apiKey = "7d043b86e402170a14fc88e1c3d5ed2a"
var currentWeatherContainer = document.querySelector(".currentWeatherContainer")
var forecastContainer = document.querySelector(".forecastContainer")

// used for my current weather function v
var currentCityName = ""
var currentCityTemp = ""
var currentCityWind = ""
var currentCityHumidity =""
var currentCityUV = ""
var currentCityIcon = ""
// used for my current weather function ^


//  ifStatement for which api url to use based on what information is needed the city input or city history button
function getApi(event){
  var requestUrl
  console.log(event)
  if (typeof event === "undefined" ) {
    requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput.value +"&units=imperial&appid=" + apiKey;
  }else{
    requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + event.target.innerText +"&units=imperial&appid=" + apiKey
  }
  
fetch(requestUrl)
      .then(function (response) {
        // console.log(response)
        // console.log(response.json());
        return response.json();
        
      })
      .then(function(data){
      // grabbing Api info
        currentWeatherContainer.innerHTML= ""
        forecastContainer.innerHTML=""
        currentCityName=data.name
        currentCityTemp = data.main.temp
        currentCityWind= data.wind.speed
        currentCityHumidity = data.main.humidity
        currentCityUV = data.uvi
        var currentCityIconId = data.weather[0].icon
        currentCityIcon = "http://openweathermap.org/img/w/" + currentCityIconId +".png"
        // calling whether current weather function and passing the data repsonse through form api
        currentWeather(data);
        console.log(data)

        // function with the onecall variable url for forecast weather
        let lat = data.coord.lat
        let lon = data.coord.lon
        let oneCall =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        fetch(oneCall)
        .then(function (response) {
          return response.json();
        }) 
          .then((data)=>{
            console.log(data);
            forecastWeather(data)

          })
        })
} 
// top div for current weather
function currentWeather(data){
  var cityH1 = document.createElement("h1");
  cityH1.innerText = currentCityName + " "  ;
  cityH1.classList="currentWeatherCSS"
  currentWeatherContainer.append(cityH1);
// date 
  var unixTimestamp = data.dt
  var date = moment.unix(unixTimestamp).format("L");
  var dayDate = document.createElement("span")
  dayDate.innerText = date
  cityH1.append(dayDate)
  console.log(data)
// creates Elements
  var currentIcon = document.createElement("img")
  currentIcon.src =  " " + currentCityIcon
  cityH1.append(currentIcon)

  var currentTemp = document.createElement("p");
  currentTemp.innerText ="Temp: " + currentCityTemp + " \xB0F";
  currentTemp.classList="currentWeatherCSS"
  currentWeatherContainer.append(currentTemp)

  var currentWind = document.createElement("p")
  currentWind.innerText = "Wind: "+ currentCityWind + "MPH";
  currentWind.classList="currentWeatherCSS"
  currentWeatherContainer.append(currentWind);

  var currentHumidity = document.createElement("p");
  currentHumidity.innerText = "Humidity: " + currentCityHumidity + " %";
  currentTemp.classList="currentWeatherCSS"
  currentWeatherContainer.append(currentHumidity)
}

// five day forecast
function forecastWeather(data){
  var forecastData = data.daily
  forecastData = forecastData.slice(1, 6)
  // uv index
  var currentUVIndex = document.createElement("button");
  currentUVIndex.disabled = true
  currentUVIndex.classList="currentWeatherCSS"
  currentWeatherContainer.append(currentUVIndex)
  currentUVIndex.innerText =  "UV Index: " + data.current.uvi
  var uvIndex = data.current.uvi
  
  if(uvIndex <=2){
    currentUVIndex.classList.add("low")
  } else if(uvIndex <=5 ){
    currentUVIndex.classList.add("moderate")
  }else if(uvIndex >=10){
    currentUVIndex.classList.add("veryHigh")
  }else{
    currentUVIndex.classList.add("high")
  } console.log(currentUVIndex.classList)

  forecastData.forEach((day)=>{
    var weatherCard = document.createElement("div")
     // converting unix code to date format
    var unixTimestamp = day.dt
    var date = moment.unix(unixTimestamp).format("L");
    var dayDate = document.createElement("h4")
    dayDate.innerText = date
    weatherCard.append(dayDate)

// creates card elements
    var image = document.createElement("img")
    image.src = currentCityIcon
    weatherCard.append(image)

    var tempP = document.createElement("p")
    tempP.innerText=`Temp: ${day.temp.day} \xB0F `
    weatherCard.append(tempP)

    var windP = document.createElement("p")
    windP.innerText=`Wind: ${day.wind_speed} MPH`
    weatherCard.append(windP)

    var humidityP = document.createElement("p")
    humidityP.innerText = `Humidity: ${day.humidity} %`
    weatherCard.append(humidityP)

    weatherCard.classList= "forecastCard"
    forecastContainer.append(weatherCard)
  })
}

  // Prints out the cities in a list  
function listCity() {
  cityListContainer.innerHTML ="";
  city.forEach((city)=>{
    var li = document.createElement('button');
    li.textContent = city
    li.classList= "cityButt"
    cityListContainer.appendChild(li)
    li.addEventListener("click", getApi)
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
  listCity();
});

listCity();


