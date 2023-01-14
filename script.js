document.body.innerHTML = `
<div class='container'>
    <div class = 'row' id = 'content'>
    
    </div>
</div>

`;

//get Rest API data
async function getRestCountryData() {
  try {
    //fetch data from Rest Api
    let url =
      "https://raw.githubusercontent.com/rvsp/restcountries-json-data/master/res-countries.json";
    const data = await fetch(url);
    const jsonData = await data.json();
    return jsonData;
  } catch (error) {
    content.innerHTML =
      "Oops !! Something went wrong. Sorry for the inconvenience";
  }
}

//calling the async function
let allCountryData = getRestCountryData();
console.log(allCountryData);
allCountryData.then((allData) => {
  for (let i in allData) {
    displayData(allData[i],i);
  }
});

const displayData = (countryData,i) => {
  content.innerHTML += `
    <div class = 'col-lg-4'>
    <div class = 'card text-center' style="width: 25rem;">
    <div class = 'card-header'>
        <h4 class = 'countryName'>${countryData.name}</h4>
    </div>
    <img class = 'countryFlag' src = '${countryData.flag}' alt = '${countryData.name} Flag'>
    <div class = 'card-body'>
        <p class = 'capital'> Capital: <span> ${countryData.capital}</span> </p>
        <p class = 'region'> Region: <span> ${countryData.region}</span> </p>
        <p class = 'latlng'> Latlng: <span> ${countryData.latlng}</span> </p>
        <p class = 'code'> CountryCode: <span> ${countryData.cioc}</span> </p>
        <button class = 'btn btn-outline-warning' id = 'weatherBtn' onClick = 'checkWeather(${countryData.latlng[0]},${countryData.latlng[1]})'>
            Click for Weather         <p id = 'temp${countryData.alpha2Code
}'+> </p>
        </button>
    </div>
    </div>
    </div>
    `;
};

//fetching temperature from OpenWeather API
const checkWeather = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=ef655657047c9741f85f1cfcf13c1ede`
  )
    .then((res) => res.json())
    .then((data) => {
      let tempValue = data["main"]["temp"];
      let id = "temp"+data["sys"]["country"];
     document.getElementById(id).innerHTML = tempValue; 
      
    });
};