// Live Cameras Page JavaScript - cameras.js

// Sample cameras data
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
          ${camera.status.charAt(0).toUpperCase() + camera.status.slice(1)}
        </div>
      </div>
      <div class="camera-card__video">
        ${
          camera.status === "online" ? '<div class="live-badge">Live</div>' : ""
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

// Weather API Integration Function (optional)
async function getWeatherForCamera(location) {
  const API_KEY = "7d77b96c972b4d119a3151101212704";
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
    );

    if (response.ok) {
      const weatherData = await response.json();
      return {
        temperature: `${weatherData.current.temp_c}°C`,
        humidity: `${weatherData.current.humidity}%`,
        windSpeed: `${weatherData.current.wind_kph} km/h`,
        visibility: `${weatherData.current.vis_km} km`,
      };
    }
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }
  return null;
}

// Function to update camera data with real weather data
async function updateCameraWeatherData() {
  for (let camera of camerasData) {
    if (camera.status === "online") {
      const weatherData = await getWeatherForCamera(camera.name);
      if (weatherData) {
        camera.temperature = weatherData.temperature;
        camera.humidity = weatherData.humidity;
        camera.windSpeed = weatherData.windSpeed;
        camera.visibility = weatherData.visibility;
        camera.lastUpdate = "Just now";
      }
    }
  }
  displayCameras();
}

// Uncomment the line below to enable real weather data updates
// updateCameraWeatherData();
