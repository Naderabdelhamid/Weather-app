// News Page JavaScript - news.js

// Sample news data
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
