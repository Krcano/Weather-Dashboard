
var fetchButton = document.getElementById('fetch-button');
var cityListContainer = document.querySelector(".cityListContainer")
var searchButton = document.querySelector(".citySearch")
var cityInput = document.querySelector(".cityInput")
var city = [];
 
// //  basic set up need to input own variables
//  fetch(requestUrl)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (data) {
//         for (var i = 0; i < data.length; i++) {
//           var listItem = document.createElement('li');
//           listItem.textContent = data[i];
//           ingredientsList.appendChild(listItem);
//         }
//         console.log(response)
//       });


      // The following function renders items in a todo list as <li> elements
function renderWeather() {
  

  // cityList.innerHTML ="";

  for (let i = 0; i < city.length; i++) {
    
    var cityList= city[i]
    
    var li = document.createElement('li');
    li.textContent = cityList
    
    cityListContainer.appendChild(li);
    
}

 }
 
searchButton.addEventListener("click", function(){
  var cityText = cityInput.value;
  city.push(cityText);
  cityInput.value = " ";
  renderWeather();
});
  
