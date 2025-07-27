if (document.querySelector(".photos-section")) {
  const photosData = [
    {
      id: 1,
      title: "Dramatic Storm Clouds",
      category: "storms",
      location: "Downtown Area",
      date: "2 days ago",
      description:
        "Massive cumulonimbus clouds gather before a major thunderstorm",
      icon: "fas fa-cloud-rain",
      temperature: "28°C",
      humidity: "85%",
      windSpeed: "45 km/h",
      photographer: "Weather Team",
      size: "wide",
    },
    {
      id: 2,
      title: "Golden Hour Clouds",
      category: "sunset",
      location: "City Skyline",
      date: "1 day ago",
      description:
        "Beautiful golden light filtering through cumulus clouds during sunset",
      icon: "fas fa-sun",
      temperature: "24°C",
      humidity: "60%",
      windSpeed: "12 km/h",
      photographer: "Sarah Johnson",
      size: "large",
    },
    {
      id: 3,
      title: "Morning Mist",
      category: "clouds",
      location: "Riverside Park",
      date: "3 days ago",
      description: "Ethereal morning fog rolling over the landscape",
      icon: "fas fa-cloud",
      temperature: "18°C",
      humidity: "95%",
      windSpeed: "8 km/h",
      photographer: "Mike Davis",
      size: "normal",
    },
    {
      id: 4,
      title: "Heavy Rainfall",
      category: "rain",
      location: "Market Square",
      date: "4 days ago",
      description: "Intense rainfall creates streams along city streets",
      icon: "fas fa-cloud-showers-heavy",
      temperature: "22°C",
      humidity: "90%",
      windSpeed: "25 km/h",
      photographer: "Weather Station",
      size: "tall",
    },
    {
      id: 5,
      title: "Clear Blue Skies",
      category: "clouds",
      location: "Central Park",
      date: "5 days ago",
      description:
        "Perfect weather with scattered white clouds in bright blue sky",
      icon: "fas fa-cloud-sun",
      temperature: "26°C",
      humidity: "45%",
      windSpeed: "15 km/h",
      photographer: "Lisa Chen",
      size: "normal",
    },
    {
      id: 6,
      title: "Winter Wonderland",
      category: "snow",
      location: "Mountain View",
      date: "1 week ago",
      description:
        "Fresh snowfall transforms the landscape into a winter paradise",
      icon: "fas fa-snowflake",
      temperature: "-5°C",
      humidity: "75%",
      windSpeed: "20 km/h",
      photographer: "Mountain Weather Cam",
      size: "wide",
    },
    {
      id: 7,
      title: "Rainbow After Storm",
      category: "rain",
      location: "Harbor Bridge",
      date: "1 week ago",
      description: "A beautiful rainbow appears as storm clouds clear",
      icon: "fas fa-rainbow",
      temperature: "21°C",
      humidity: "80%",
      windSpeed: "18 km/h",
      photographer: "Harbor Cam",
      size: "normal",
    },
    {
      id: 8,
      title: "Sunset Storm",
      category: "sunset",
      location: "Coastal Road",
      date: "1 week ago",
      description:
        "Storm clouds illuminated by the setting sun create a dramatic scene",
      icon: "fas fa-cloud-bolt",
      temperature: "25°C",
      humidity: "70%",
      windSpeed: "30 km/h",
      photographer: "Coast Guard",
      size: "normal",
    },
    {
      id: 9,
      title: "Ice Crystal Formation",
      category: "snow",
      location: "Mountain Peak",
      date: "2 weeks ago",
      description:
        "Delicate ice crystals form beautiful patterns on window surfaces",
      icon: "far fa-snowflake",
      temperature: "-12°C",
      humidity: "68%",
      windSpeed: "35 km/h",
      photographer: "Alpine Station",
      size: "normal",
    },
    {
      id: 10,
      title: "Lightning Strike",
      category: "storms",
      location: "Industrial Zone",
      date: "3 weeks ago",
      description:
        "Powerful lightning bolt illuminates the night sky during severe thunderstorm",
      icon: "fas fa-bolt",
      temperature: "26°C",
      humidity: "88%",
      windSpeed: "50 km/h",
      photographer: "Storm Chaser",
      size: "tall",
    },
  ];

  let currentFilter = "all";

  // DOM Elements
  const photosGrid = document.getElementById("photosGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const photoModal = document.getElementById("photoModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalMeta = document.getElementById("modalMeta");
  const closeModal = document.getElementById("closeModal");
  const uploadBtn = document.querySelector(".upload-btn");

  function initializePhotosPage() {
    displayPhotos();
    setupModalEvents();
    setupFilterEvents();
    setupUploadEvent();
    addScrollAnimation();
  }

  function displayPhotos() {
    const filteredPhotos =
      currentFilter === "all"
        ? photosData
        : photosData.filter((photo) => photo.category === currentFilter);

    if (photosGrid) {
      photosGrid.innerHTML = filteredPhotos
        .map(
          (photo) => `
        <div class="photo-card ${photo.size}" data-category="${photo.category}" data-photo-id="${photo.id}">
          <div class="photo-placeholder">
            <i class="${photo.icon}"></i>
            <h4>${photo.title}</h4>
            <p>${photo.location}</p>
          </div>
          <div class="weather-icon">
            <i class="${photo.icon}"></i>
          </div>
          <div class="photo-overlay">
            <h4 class="photo-title">${photo.title}</h4>
            <div class="photo-info">
              <span class="photo-date">
                <i class="far fa-clock"></i>
                ${photo.date}
              </span>
              <span class="photo-location">
                <i class="fas fa-map-marker-alt"></i>
                ${photo.location}
              </span>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    }
  }

  function setupFilterEvents() {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        currentFilter = this.dataset.category;

        if (photosGrid) {
          photosGrid.style.opacity = "0.5";
          setTimeout(() => {
            displayPhotos();
            photosGrid.style.opacity = "1";
            addScrollAnimation();
          }, 300);
        }
      });
    });
  }

  function setupModalEvents() {
    if (!photoModal) return;

    if (photosGrid) {
      photosGrid.addEventListener("click", function (e) {
        const photoCard = e.target.closest(".photo-card");
        if (photoCard) {
          const photoId = parseInt(photoCard.dataset.photoId);
          const photo = photosData.find((p) => p.id === photoId);

          if (photo) {
            showPhotoModal(photo);
          }
        }
      });
    }

    if (closeModal) {
      closeModal.addEventListener("click", hidePhotoModal);
    }

    photoModal.addEventListener("click", function (e) {
      if (e.target === photoModal) {
        hidePhotoModal();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && photoModal.style.display === "block") {
        hidePhotoModal();
      }
    });
  }

  function showPhotoModal(photo) {
    if (!photoModal || !modalTitle || !modalDescription || !modalMeta) return;

    modalTitle.textContent = photo.title;
    modalDescription.textContent = photo.description;

    modalMeta.innerHTML = `
      <div class="meta-item">
        <span class="meta-label">Location:</span>
        <span class="meta-value">${photo.location}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Date:</span>
        <span class="meta-value">${photo.date}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Temperature:</span>
        <span class="meta-value">${photo.temperature}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Humidity:</span>
        <span class="meta-value">${photo.humidity}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Wind Speed:</span>
        <span class="meta-value">${photo.windSpeed}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Photographer:</span>
        <span class="meta-value">${photo.photographer}</span>
      </div>
    `;

    photoModal.style.display = "block";
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      photoModal.style.opacity = "1";
    }, 10);
  }

  function hidePhotoModal() {
    if (!photoModal) return;

    photoModal.style.opacity = "0";
    setTimeout(() => {
      photoModal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }

  function setupUploadEvent() {
    if (uploadBtn) {
      uploadBtn.addEventListener("click", function () {
        this.style.transform = "scale(0.95)";
        setTimeout(() => {
          this.style.transform = "";
        }, 150);

        showUploadDialog();
      });
    }
  }

  function showUploadDialog() {
    const confirmed = confirm(
      "Upload Photo\n\nWould you like to upload a weather photo? This would integrate with the weather API to automatically tag your photo with current weather conditions.\n\nNote: This is a demo. In a real implementation, this would open a file upload dialog."
    );

    if (confirmed) {
      const newPhoto = {
        id: photosData.length + 1,
        title: "User Uploaded Photo",
        category: "clouds",
        location: "Your Location",
        date: "Just now",
        description: "A new weather photo uploaded by user",
        icon: "fas fa-camera",
        temperature: "25°C",
        humidity: "65%",
        windSpeed: "12 km/h",
        photographer: "You",
        size: "normal",
      };

      photosData.unshift(newPhoto);
      displayPhotos();
      addScrollAnimation();

      setTimeout(() => {
        alert("Photo uploaded successfully! (This is a simulation)");
      }, 500);
    }
  }

  async function getWeatherForPhoto(location) {
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
          condition: weatherData.current.condition.text,
        };
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    return null;
  }

  function addScrollAnimation() {
    const cards = document.querySelectorAll(".photo-card");

    if (window.photosObserver) {
      window.photosObserver.disconnect();
    }

    window.photosObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.style.opacity = "1";
              entry.target.style.transform = "translateY(0) scale(1)";
            }, index * 50);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px) scale(0.95)";
      card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      window.photosObserver.observe(card);
    });
  }

  function addHoverEffects() {
    if (photosGrid) {
      photosGrid.addEventListener(
        "mouseenter",
        function (e) {
          const photoCard = e.target.closest(".photo-card");
          if (photoCard) {
            photoCard.style.transform = "translateY(-8px) scale(1.02)";
          }
        },
        true
      );

      photosGrid.addEventListener(
        "mouseleave",
        function (e) {
          const photoCard = e.target.closest(".photo-card");
          if (photoCard) {
            photoCard.style.transform = "translateY(0) scale(1)";
          }
        },
        true
      );
    }
  }

  function setupLazyLoading() {
    const photoCards = document.querySelectorAll(".photo-card");

    const lazyLoadOptions = {
      threshold: 0,
      rootMargin: "50px",
    };

    if (window.lazyLoadObserver) {
      window.lazyLoadObserver.disconnect();
    }

    window.lazyLoadObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          card.classList.add("loaded");
          window.lazyLoadObserver.unobserve(card);
        }
      });
    }, lazyLoadOptions);

    photoCards.forEach((card) => {
      window.lazyLoadObserver.observe(card);
    });
  }

  function setupSearchFeature() {
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search photos...";
    searchInput.className = "photo-search";
    searchInput.style.cssText = `
      width: 300px;
      padding: 10px 15px;
      margin: 0 15px 30px;
      background: #323544;
      border: 2px solid transparent;
      border-radius: 25px;
      color: white;
      outline: none;
      transition: 0.3s ease;
    `;

    const filtersContainer = document.querySelector(".photo-filters");
    if (filtersContainer) {
      filtersContainer.parentNode.insertBefore(
        searchInput,
        filtersContainer.nextSibling
      );
    }

    let searchTimeout;
    searchInput.addEventListener("input", function (e) {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const searchTerm = e.target.value.toLowerCase();
        filterPhotosBySearch(searchTerm);
      }, 300);
    });

    searchInput.addEventListener("focus", function () {
      this.style.borderColor = "#009ad8";
    });

    searchInput.addEventListener("blur", function () {
      this.style.borderColor = "transparent";
    });
  }

  function filterPhotosBySearch(searchTerm) {
    const filteredPhotos = photosData.filter((photo) => {
      const matchesCategory =
        currentFilter === "all" || photo.category === currentFilter;
      const matchesSearch =
        searchTerm === "" ||
        photo.title.toLowerCase().includes(searchTerm) ||
        photo.location.toLowerCase().includes(searchTerm) ||
        photo.description.toLowerCase().includes(searchTerm);

      return matchesCategory && matchesSearch;
    });

    if (photosGrid) {
      photosGrid.innerHTML = filteredPhotos
        .map(
          (photo) => `
        <div class="photo-card ${photo.size}" data-category="${photo.category}" data-photo-id="${photo.id}">
          <div class="photo-placeholder">
            <i class="${photo.icon}"></i>
            <h4>${photo.title}</h4>
            <p>${photo.location}</p>
          </div>
          <div class="weather-icon">
            <i class="${photo.icon}"></i>
          </div>
          <div class="photo-overlay">
            <h4 class="photo-title">${photo.title}</h4>
            <div class="photo-info">
              <span class="photo-date">
                <i class="far fa-clock"></i>
                ${photo.date}
              </span>
              <span class="photo-location">
                <i class="fas fa-map-marker-alt"></i>
                ${photo.location}
              </span>
            </div>
          </div>
        </div>
      `
        )
        .join("");

      addScrollAnimation();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initializePhotosPage();
    addHoverEffects();
    setupLazyLoading();
    setupSearchFeature();
  });

  window.addEventListener("beforeunload", function () {
    if (window.photosObserver) {
      window.photosObserver.disconnect();
    }
    if (window.lazyLoadObserver) {
      window.lazyLoadObserver.disconnect();
    }
  });
}
