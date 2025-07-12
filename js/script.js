async function search(locationQuery) {
  const query = locationQuery.trim() === "" ? "Faiyum" : locationQuery;
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${query}&days=3`
    );

    if (response.ok) {
      const weatherData = await response.json();
      displayCurrent(weatherData.location, weatherData.current);
      displayAnother(weatherData.forecast.forecastday);
    } else {
      document.getElementById(
        "forecast"
      ).innerHTML = `<p class="text-white text-center p-4">Could not find location. Please try again.</p>`;
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    document.getElementById(
      "forecast"
    ).innerHTML = `<p class="text-white text-center p-4">Failed to load weather data.</p>`;
  }
}

document.getElementById("search").addEventListener("keyup", (event) => {
  if (event.target.value.length >= 3 || event.key === "Enter") {
    search(event.target.value);
  }
});

document.getElementById("submit").addEventListener("click", () => {
  const searchInput = document.getElementById("search");
  search(searchInput.value);
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function displayCurrent(location, current) {
  const lastUpdatedDate = new Date(current.last_updated.replace(" ", "T"));

  const todayCardHTML = `
    <div class="weather-card weather-card--today">
      <div class="weather-card__header">
        <span class="weather-card__day">${days[lastUpdatedDate.getDay()]}</span>
        <span class="weather-card__date">${lastUpdatedDate.getDate()} ${
    monthNames[lastUpdatedDate.getMonth()]
  }</span>
      </div>
      <div class="weather-card__content">
        <p class="weather-card__city">${location.name}</p>
        <div class="weather-card__temp">
          <div class="weather-card__temp-value">${
            current.temp_c
          }<sup>o</sup>C</div>
          <img src="https:${current.condition.icon}" alt="${
    current.condition.text
  }" class="weather-card__icon" />
        </div>
        <p class="weather-card__status">${current.condition.text}</p>
        <div class="weather-card__details">
          <span><img src="images/icon-umberella.png" alt="umberella" />${
            current.humidity
          }%</span>
          <span><img src="images/icon-compass.png" alt="compass" />${
            current.wind_kph
          }km/h</span>
          <span><img src="images/icon-wind.png" alt="wind" />${
            current.wind_dir
          }</span>
        </div>
      </div>
    </div>`;
  document.getElementById("forecast").innerHTML = todayCardHTML;
}

function displayAnother(forecastDays) {
  let otherDaysHTML = "";
  for (let i = 1; i < forecastDays.length; i++) {
    const forecastDate = new Date(forecastDays[i].date.replace(" ", "T"));

    otherDaysHTML += `
      <div class="weather-card">
        <div class="weather-card__header">
          <span class="weather-card__day">${days[forecastDate.getDay()]}</span>
        </div>
        <div class="weather-card__content">
          <img src="https:${forecastDays[i].day.condition.icon}" alt="${
      forecastDays[i].day.condition.text
    }" class="weather-card__icon--sm" />
          <div class="weather-card__temp--daily">${
            forecastDays[i].day.maxtemp_c
          }<sup>o</sup>C</div>
          <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
          <p class="weather-card__status">${
            forecastDays[i].day.condition.text
          }</p>
        </div>
      </div>`;
  }
  document.getElementById("forecast").innerHTML += otherDaysHTML;
}

search("Faiyum");
