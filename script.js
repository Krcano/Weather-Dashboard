var repoList = document.querySelector('ul');
var fetchButton = document.getElementById('fetch-button');
 
//  basic set up need to input own variables
 fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          var listItem = document.createElement('li');
          listItem.textContent = data[i];
          ingredientsList.appendChild(listItem);
        }
        console.log(response)
      });
  
