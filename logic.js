async function calc_temp() {
  let city_name = document.querySelector(".search_box").value;
  console.log(city_name);
  let str = `http://api.weatherapi.com/v1/current.json?key=b613fcba03c5443bbfb94329241103&q=${city_name}&aqi=no`;
  let str2 = `http://api.weatherapi.com/v1/forecast.json?key=b613fcba03c5443bbfb94329241103&q=${city_name}&days=7&aqi=no&alerts=no
  `;
  //for 1st API
  try {
    const response = await fetch(str);
    const data = await response.json();
    console.log(data);
    let c = data.current.feelslike_c;
    console.log(c);
    let cities = document.querySelector(".cities");
    cities.innerText = city_name.charAt(0).toUpperCase() + city_name.slice(1);
    let real_feel = document.querySelector(".real_feel");
    real_feel.innerText = c + "c";
    let temp = document.querySelector(".temp");
    temp.innerText = data.current.temp_c + "c";
    let wind = document.querySelector(".windi");
    wind.innerText = data.current.wind_kph + "km/hr";
    let uv = document.querySelector(".uv");
    uv.innerText = data.current.uv;
    let humidity = document.querySelector(".Humidity");
    humidity.innerText = data.current.humidity;
    let region = document.querySelector(".region");
    region.innerText = data.location.region;
    let today_forecast = document.querySelector(".to");
    today_forecast.innerText = data.current.condition.text;
    //for show desired img according to forecast
    let sun_img = document.querySelector(".sun");
    let sun_cloud_img = document.querySelector(".sun_cloud");
    let mist = document.querySelector(".mist");
    let rain = document.querySelector(".rain");
    let cloudy = document.querySelector(".cloudy");
    if (data.current.condition.text == "Sunny") {
      sun_img.style.display = "block";
      sun_cloud_img.style.display = "none";
      mist.style.display = "none";
      rain.style.display = "none";
      cloudy.style.display = "none";
    } else if (data.current.condition.text == "Partly cloudy") {
      sun_cloud_img.style.display = "block";
      mist.style.display = "none";
      sun_img.style.display = "none";
      rain.style.display = "none";
      cloudy.style.display = "none";
    } else if (data.current.condition.text == "Mist") {
      mist.style.display = "block";
      sun_img.style.display = "none";
      sun_cloud_img.style.display = "none";
      rain.style.display = "none";
      cloudy.style.display = "none";
    } else if (data.current.condition.text == "Light rain") {
      rain.style.display = "block";
      mist.style.display = "none";
      sun_img.style.display = "none";
      sun_cloud_img.style.display = "none";
      cloudy.style.display = "none";
    } else if (data.current.condition.text == "Overcast") {
      cloudy.style.display = "block";
      rain.style.display = "none";
      mist.style.display = "none";
      sun_img.style.display = "none";
      sun_cloud_img.style.display = "none";
    } else {
      sun_img.style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
  //For 2nd API
  try {
    const response2 = await fetch(str2);
    const data2 = await response2.json();
    console.log(data2);
    //For 7-Day forcast updated weather
    let today_1_forecast = document.querySelector(".to_1");
    let today_2_forecast = document.querySelector(".to_2");
    let today_3_forecast = document.querySelector(".to_3");
    let today_4_forecast = document.querySelector(".to_4");
    let today_5_forecast = document.querySelector(".to_5");
    let today_6_forecast = document.querySelector(".to_6");
    today_1_forecast.innerText =
      data2.forecast.forecastday[1].day.condition.text;
    today_2_forecast.innerText =
      data2.forecast.forecastday[2].day.condition.text;
    today_3_forecast.innerText =
      data2.forecast.forecastday[3].day.condition.text;
    today_4_forecast.innerText =
      data2.forecast.forecastday[4].day.condition.text;
    today_5_forecast.innerText =
      data2.forecast.forecastday[5].day.condition.text;
    today_6_forecast.innerText =
      data2.forecast.forecastday[6].day.condition.text;
    // For today's forcast time update
    let time_1 = document.querySelector(".temp_1");
    let time_2 = document.querySelector(".temp_2");
    let time_3 = document.querySelector(".temp_3");
    let time_4 = document.querySelector(".temp_4");
    let time_5 = document.querySelector(".temp_5");
    time_1.innerText = data2.forecast.forecastday[0].hour[5].temp_c + "c";
    time_2.innerText = data2.forecast.forecastday[0].hour[9].temp_c + "c";
    time_3.innerText = data2.forecast.forecastday[0].hour[13].temp_c + "c";
    time_4.innerText = data2.forecast.forecastday[0].hour[17].temp_c + "c";
    time_5.innerText = data2.forecast.forecastday[0].hour[21].temp_c + "c";
  } catch (error) {
    console.log(error);
  }
}
//For by pressing enter in search box
document
  .querySelector(".search_box")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      calc_temp();
    }
  });
//For upto date
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function get_day() {
  const currentDate = new Date();
  let currentDayIndex = currentDate.getDay();
  // let toda = document.querySelector(".today");
  let toda_1 = document.querySelector(".today_1");
  let toda_2 = document.querySelector(".today_2");
  let toda_3 = document.querySelector(".today_3");
  let toda_4 = document.querySelector(".today_4");
  let toda_5 = document.querySelector(".today_5");
  let toda_6 = document.querySelector(".today_6");
  // toda.innerText = days[currentDayIndex];
  toda_1.innerText = days[(currentDayIndex + 1) % 7];
  toda_2.innerText = days[(currentDayIndex + 2) % 7];
  toda_3.innerText = days[(currentDayIndex + 3) % 7];
  toda_4.innerText = days[(currentDayIndex + 4) % 7];
  toda_5.innerText = days[(currentDayIndex + 5) % 7];
  toda_6.innerText = days[(currentDayIndex + 6) % 7];
}
get_day();
