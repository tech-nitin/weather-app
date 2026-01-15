const apikey = "bdf6219843124b5fdaf60d0f72e689a3"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/imag/clouds.png";
        }
        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/imag/clear.png";
        }
        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/imag/rain.png";
        }
        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/imag/drizzle.png";
        }
        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/imag/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }




}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() === "") {
    alert("Please enter a city name");
    return;
  }
  checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    if (searchBox.value.trim() === "") {
      alert("Please enter a city name");
      return;
    }
    checkWeather(searchBox.value);
  }
});

