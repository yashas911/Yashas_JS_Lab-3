const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/weather",
};

document.getElementById("input").addEventListener("keypress", setQuery);

async function setQuery(e) {
  if (e.keyCode === 13) {
    getWeatherInfo(e.target.value);
    e.target.value = "";
  }
}

async function getWeatherInfo(city) {
  const res = await fetch(
    `${api.base}?q=${city}&units=metric&appid=${api.key}`
  );
  const weatherData = await res.json();
  if (!res.ok) {
    alert(weatherData.message);
    return;
  }
  const today = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const html = `<section class="location">
          <p class="city">${weatherData.name}, ${weatherData.sys.country}</p>
          <p class="date">${today
            .toLocaleDateString("en-US", options)
            .replace(/,/g, "")}</p>
          <div class="current">
            <p class="temp">${Math.round(
              weatherData.main.temp
            )}<span>&#x2103;</span></p>
            <p class="weather">${weatherData.weather[0].main}</p>
            <p class="hi-low">${Math.round(
              weatherData.main.temp_min
            )}&#x2103; / ${Math.round(weatherData.main.temp_max)}&#x2103;</p>
          </div>
        </section>`;
  document.querySelector("main").innerHTML = "";
  document.querySelector("main").insertAdjacentHTML("beforeend", html);
}