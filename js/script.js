document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  getWeather();
});

async function getWeather() {
  const location = document.getElementById("search-input").value.trim();
  if (!location) {
    alert("Please enter a location");
    return;
  }

  const url = `/.netlify/functions/fetchWeather?location=${location}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const forecastData = await response.json();
    displayWeather(forecastData);
  } catch (error) {
    console.error("Fetch error:", error);
    alert(error.message);
  }
}

function displayWeather(data) {
  const todayWeather = data.list[0];
  const locationName = data.city.name + ", " + data.city.country;

  const degree = document.querySelector(".degree");
  const condition = document.querySelector(".condition");
  const location = document.querySelector(".location");
  const humidity = document.querySelector(".humidity");
  const windSpeed = document.querySelector(".wind-speed");
  const weatherIcon = document.querySelector(".sun img");

  degree.textContent = `${Math.round(todayWeather.main.temp)}°C`;
  condition.textContent = todayWeather.weather[0].description;
  location.textContent = locationName;
  humidity.textContent = `${todayWeather.main.humidity}%`;
  windSpeed.textContent = `${todayWeather.wind.speed} m/s`;

  const icon = getWeatherIcon(todayWeather.weather[0].main);
  weatherIcon.src = `assets/${icon}`;
  setBackgroundColor(todayWeather.weather[0].main);
  toggleRainEffect(todayWeather.weather[0].main);
}

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "clear":
      return "sunny.png";
    case "clouds":
      return "cloudy.png";
    case "rain":
      return "rainy.png";
    case "snow":
      return "snowy.png";
    default:
      return "sunny.png"; // Default icon
  }
}

function setBackgroundColor(condition) {
  const body = document.body;
  switch (condition.toLowerCase()) {
    case "clear":
      body.style.background =
        "radial-gradient(circle at top left, #fff, #a3c7e8 0%, #f6f8e8 0%, #90b6e6 20%, #3683d6 50%, #014ea0 80%)";
      break;
    case "clouds":
      body.style.background = "linear-gradient(to right, #bdc3c7, #2c3e50)";
      break;
    case "rain":
      body.style.background = "linear-gradient(to right, #005c97, #363795)";
      break;
    case "snow":
      body.style.background = "linear-gradient(to right, #e6dada, #274046)";
      break;
    default:
      body.style.background =
        "radial-gradient(circle at top left,#fff,#a3c7e8 0%, #90b6e6 20%,#3683d6 50%, #014ea0 80%)";

      break;
  }
}

function toggleRainEffect(condition) {
  const rainContainer = document.querySelector(".rain");
  if (condition.toLowerCase() === "rain") {
    rainContainer.style.display = "block";
  } else {
    rainContainer.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const rainContainer = document.querySelector(".rain");
  for (let i = 0; i < 100; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";
    rainContainer.appendChild(drop);
  }
});
