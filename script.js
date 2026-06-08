const API_KEY = 
"440acd163c6c56d7b0073f81f85d361d";

async function getWeather() {
  let city = document.getElementById(
    "cityInput").value;

  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  let loading = document.getElementById(
    "loading");
  let card = document.getElementById(
    "weatherCard");

  loading.style.display = "block";
  card.style.display = "none";
  card.innerHTML = "";

  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    let data = await response.json();

    loading.style.display = "none";

    if (data.cod !== 200) {
      card.style.display = "block";
      card.innerHTML = `
        <div class="error">
          ❌ City not found!<br>
          Please check spelling
        </div>`;
      return;
    }

    card.style.display = "block";
    card.innerHTML = `
      <div class="city-name">
        📍 ${data.name}
      </div>
      <div class="country">
        ${data.sys.country}
      </div>
      <div class="temp">
        ${Math.round(data.main.temp)}°C
      </div>
      <div class="description">
        ${data.weather[0].description}
      </div>
      <div class="details">
        <div class="detail-item">
          <p>Humidity</p>
          <h4>${data.main.humidity}%</h4>
        </div>
        <div class="detail-item">
          <p>Wind</p>
          <h4>${data.wind.speed} m/s</h4>
        </div>
        <div class="detail-item">
          <p>Feels Like</p>
          <h4>${Math.round(
            data.main.feels_like)}°C</h4>
        </div>
      </div>`;

  } catch (error) {
    loading.style.display = "none";
    card.style.display = "block";
    card.innerHTML = `
      <div class="error">
        ❌ Something went wrong!<br>
        Check internet connection
      </div>`;
  }
}
