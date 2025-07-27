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

// news
const newsData = [
  {
    id: 1,
    category: "weather",
    title: "Heatwave Alert: Temperatures Soar Above 40°C",
    excerpt:
      "Health officials issue warnings as unprecedented temperatures sweep across the region, urging residents to take necessary precautions.",
    author: "Sarah Johnson",
    date: "4 hours ago",
    icon: "fas fa-thermometer-full",
  },
  {
    id: 2,
    category: "climate",
    title: "Climate Change Impact on Local Weather Patterns",
    excerpt:
      "New research reveals significant changes in seasonal weather patterns, affecting agriculture and water resources in the region.",
    author: "Dr. Ahmed Hassan",
    date: "6 hours ago",
    icon: "fas fa-globe-americas",
  },
  {
    id: 3,
    category: "forecast",
    title: "Weekend Weather Outlook: Sunny Skies Expected",
    excerpt:
      "Clear skies and pleasant temperatures are forecasted for the weekend, perfect for outdoor activities and family gatherings.",
    author: "Weather Team",
    date: "8 hours ago",
    icon: "fas fa-sun",
  },
  {
    id: 4,
    category: "storms",
    title: "Tropical Storm Updates and Safety Guidelines",
    excerpt:
      "Latest updates on tropical storm development and essential safety measures for residents in potentially affected areas.",
    author: "Emergency Services",
    date: "12 hours ago",
    icon: "fas fa-wind",
  },
  {
    id: 5,
    category: "weather",
    title: "Air Quality Index Reaches Unhealthy Levels",
    excerpt:
      "Environmental monitoring stations report deteriorating air quality conditions, recommending limited outdoor activities.",
    author: "Environmental Team",
    date: "1 day ago",
    icon: "fas fa-smog",
  },
  {
    id: 6,
    category: "climate",
    title: "Seasonal Rainfall Patterns Show Significant Changes",
    excerpt:
      "Meteorological data indicates shifting rainfall patterns that could impact agricultural planning and water management.",
    author: "Climate Research Unit",
    date: "1 day ago",
    icon: "fas fa-cloud-rain",
  },
  {
    id: 7,
    category: "forecast",
    title: "Long-term Weather Predictions for Next Month",
    excerpt:
      "Extended weather forecasts suggest variable conditions with periods of both sunny weather and occasional rain showers.",
    author: "Forecast Department",
    date: "2 days ago",
    icon: "fas fa-calendar-alt",
  },
  {
    id: 8,
    category: "weather",
    title: "UV Index Reaches Extreme Levels This Week",
    excerpt:
      "Sun protection becomes crucial as UV radiation levels hit dangerous heights, requiring extra precautions during outdoor activities.",
    author: "Health Advisory",
    date: "2 days ago",
    icon: "fas fa-eye",
  },
];

let displayedNews = 6;
let currentFilter = "all";

// DOM Elements
const newsGrid = document.getElementById("newsGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const filterButtons = document.querySelectorAll(".filter-btn");
const loadingSpinner = document.getElementById("loadingSpinner");

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    loadingSpinner.style.display = "none";
    displayNews();
  }, 1000);
});

// Display news function
function displayNews() {
  const filteredNews =
    currentFilter === "all"
      ? newsData
      : newsData.filter((news) => news.category === currentFilter);

  const newsToShow = filteredNews.slice(0, displayedNews);

  newsGrid.innerHTML = newsToShow
    .map(
      (news) => `
          <div class="news-card" data-category="${news.category}">
            <div class="news-card__image">
              <i class="${news.icon}"></i>
            </div>
            <div class="news-card__content">
              <span class="news-card__category">${news.category}</span>
              <h3 class="news-card__title">${news.title}</h3>
              <p class="news-card__excerpt">${news.excerpt}</p>
              <div class="news-card__meta">
                <span class="news-card__date">
                  <i class="far fa-clock"></i>
                  ${news.date}
                </span>
                <span class="news-card__author">
                  <i class="far fa-user"></i>
                  ${news.author}
                </span>
              </div>
            </div>
          </div>
        `
    )
    .join("");

  // Show/hide load more button
  loadMoreBtn.style.display =
    newsToShow.length >= filteredNews.length ? "none" : "block";
}

// Filter functionality
filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Update active button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    // Update filter and reset display count
    currentFilter = this.dataset.category;
    displayedNews = 6;

    // Show loading and update display
    newsGrid.innerHTML =
      '<div class="loading"><div class="spinner"></div></div>';
    setTimeout(() => {
      displayNews();
    }, 500);
  });
});

// Load more functionality
loadMoreBtn.addEventListener("click", function () {
  displayedNews += 6;
  displayNews();
});

// News card click functionality
newsGrid.addEventListener("click", function (e) {
  const newsCard = e.target.closest(".news-card");
  if (newsCard) {
    // Add click animation
    newsCard.style.transform = "scale(0.98)";
    setTimeout(() => {
      newsCard.style.transform = "";
    }, 150);

    // Here you could add navigation to full article
    console.log("News card clicked:", newsCard.dataset.category);
  }
});

// Smooth animations
function addScrollAnimation() {
  const cards = document.querySelectorAll(".news-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  });

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Call animation function after content loads
setTimeout(addScrollAnimation, 1100);
//live Cameras Script
const camerasData = [
  {
    id: 1,
    name: "Beach Front Camera",
    location: "coast",
    status: "online",
    temperature: "26°C",
    humidity: "72%",
    windSpeed: "18 km/h",
    visibility: "15 km",
    lastUpdate: "2 min ago",
  },
  {
    id: 2,
    name: "City Hall Plaza",
    location: "city",
    status: "online",
    temperature: "24°C",
    humidity: "58%",
    windSpeed: "12 km/h",
    visibility: "20 km",
    lastUpdate: "1 min ago",
  },
  {
    id: 3,
    name: "Mountain View Point",
    location: "mountains",
    status: "online",
    temperature: "18°C",
    humidity: "45%",
    windSpeed: "25 km/h",
    visibility: "25 km",
    lastUpdate: "3 min ago",
  },
  {
    id: 4,
    name: "Desert Highway Cam",
    location: "desert",
    status: "online",
    temperature: "32°C",
    humidity: "25%",
    windSpeed: "8 km/h",
    visibility: "30 km",
    lastUpdate: "1 min ago",
  },
  {
    id: 5,
    name: "Harbor Entrance",
    location: "coast",
    status: "offline",
    temperature: "--",
    humidity: "--",
    windSpeed: "--",
    visibility: "--",
    lastUpdate: "Offline",
  },
  {
    id: 6,
    name: "Shopping District",
    location: "city",
    status: "online",
    temperature: "25°C",
    humidity: "62%",
    windSpeed: "10 km/h",
    visibility: "18 km",
    lastUpdate: "2 min ago",
  },
];

let currentLocationFilter = "all";

// DOM Elements
const camerasGrid = document.getElementById("camerasGrid");
const locationButtons = document.querySelectorAll(".location-btn");

// Initialize page
document.addEventListener("DOMContentLoaded", function () {
  displayCameras();
});

// Display cameras function
function displayCameras() {
  const filteredCameras =
    currentLocationFilter === "all"
      ? camerasData
      : camerasData.filter(
          (camera) => camera.location === currentLocationFilter
        );

  camerasGrid.innerHTML = filteredCameras
    .map(
      (camera) => `
          <div class="camera-card" data-location="${camera.location}">
            <div class="camera-card__header">
              <h3 class="camera-card__title">${camera.name}</h3>
              <div class="camera-card__status">
                <span class="status-indicator ${
                  camera.status === "offline" ? "offline" : ""
                }"></span>
                ${
                  camera.status.charAt(0).toUpperCase() + camera.status.slice(1)
                }
              </div>
            </div>
            <div class="camera-card__video">
              ${
                camera.status === "online"
                  ? '<div class="live-badge">Live</div>'
                  : ""
              }
              <div class="camera-placeholder">
                <i class="fas fa-${
                  camera.status === "online" ? "video" : "video-slash"
                }"></i>
                <h4>${
                  camera.status === "online" ? "Live Stream" : "Camera Offline"
                }</h4>
                <p>${
                  camera.status === "online"
                    ? "Real-time weather view"
                    : "Maintenance in progress"
                }</p>
              </div>
            </div>
            <div class="camera-card__info">
              <div class="camera-info-row">
                <span class="info-label">Temperature:</span>
                <span class="info-value">${camera.temperature}</span>
              </div>
              <div class="camera-info-row">
                <span class="info-label">Humidity:</span>
                <span class="info-value">${camera.humidity}</span>
              </div>
              <div class="camera-info-row">
                <span class="info-label">Wind Speed:</span>
                <span class="info-value">${camera.windSpeed}</span>
              </div>
              <div class="camera-info-row">
                <span class="info-label">Visibility:</span>
                <span class="info-value">${camera.visibility}</span>
              </div>
              <div class="camera-info-row">
                <span class="info-label">Last Update:</span>
                <span class="info-value">${camera.lastUpdate}</span>
              </div>
            </div>
            <div class="camera-controls">
              <div>
                <button class="control-btn ${
                  camera.status === "offline" ? "secondary" : ""
                }" 
                        ${camera.status === "offline" ? "disabled" : ""}>
                  ${camera.status === "online" ? "Watch Live" : "Offline"}
                </button>
              </div>
              <button class="fullscreen-btn" title="Fullscreen">
                <i class="fas fa-expand"></i>
              </button>
            </div>
          </div>
        `
    )
    .join("");
}

// Filter functionality
locationButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Update active button
    locationButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    // Update filter
    currentLocationFilter = this.dataset.location;

    // Update display with animation
    camerasGrid.style.opacity = "0.5";
    setTimeout(() => {
      displayCameras();
      camerasGrid.style.opacity = "1";
    }, 300);
  });
});

// Camera controls functionality
camerasGrid.addEventListener("click", function (e) {
  if (e.target.classList.contains("control-btn") && !e.target.disabled) {
    const card = e.target.closest(".camera-card");
    console.log(
      "Opening camera stream for:",
      card.querySelector(".camera-card__title").textContent
    );

    // Add click effect
    e.target.style.transform = "scale(0.95)";
    setTimeout(() => {
      e.target.style.transform = "";
    }, 150);
  }

  if (
    e.target.classList.contains("fullscreen-btn") ||
    e.target.closest(".fullscreen-btn")
  ) {
    const card = e.target.closest(".camera-card");
    console.log(
      "Opening fullscreen for:",
      card.querySelector(".camera-card__title").textContent
    );
  }
});

// Auto-refresh camera data every 30 seconds
setInterval(() => {
  // Update last update times
  const updateElements = document.querySelectorAll(".info-value");
  updateElements.forEach((element, index) => {
    if (element.textContent.includes("min ago")) {
      const minutes = Math.floor(Math.random() * 5) + 1;
      element.textContent = `${minutes} min ago`;
    }
  });
}, 30000);

// Smooth animations for camera cards
function addScrollAnimation() {
  const cards = document.querySelectorAll(".camera-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  });

  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
}

// Call animation function after content loads
setTimeout(addScrollAnimation, 100);
