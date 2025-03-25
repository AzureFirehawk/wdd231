const temp1 = document.querySelector('#today');
const temp2 = document.querySelector('#tomorrow');
const temp3 = document.querySelector('#day3');
const icon1 = document.querySelector('#today-icon');
const icon2 = document.querySelector('#tomorrow-icon');
const icon3 = document.querySelector('#day3-icon');

const forecast = 'https://api.openweathermap.org/data/2.5/forecast?lat=35.139236&lon=-97.394753&units=imperial&appid=536a7f86e83f64be0db592241461f30f';

async function apiFetch() {
    try {
        const response = await fetch(forecast);
        if (response.ok) {
            const forecastData = await response.json();
            console.log(forecastData);
            forecastResults(forecastData);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();
function getFormattedDate(offset) {
    let date = new Date();
    date.setDate(date.getDate() + offset);
    let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    let day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
}

let day1 = getFormattedDate(0);
let day2 = getFormattedDate(1);
let day3 = getFormattedDate(2);

function forecastResults(forecastData) {
    temp1.innerHTML = `${day1}: <strong>${forecastData.list[0].main.temp.toFixed(0)}</strong> °F`;
    const icon1src = `https://openweathermap.org/img/w/${forecastData.list[0].weather[0].icon}.png`;
    icon1.setAttribute('src', icon1src);
    icon1.setAttribute('alt', forecastData.list[0].weather[0].description);
    icon1.setAttribute('width', '50');
    icon1.setAttribute('height', '50');

    temp2.innerHTML = `${day2}: <strong>${forecastData.list[8].main.temp.toFixed(0)}</strong> °F`;
    const icon2src = `https://openweathermap.org/img/w/${forecastData.list[8].weather[0].icon}.png`;
    icon2.setAttribute('src', icon2src);
    icon2.setAttribute('alt', forecastData.list[8].weather[0].description);
    icon2.setAttribute('width', '50');
    icon2.setAttribute('height', '50');

    temp3.innerHTML = `${day3}: <strong>${forecastData.list[16].main.temp.toFixed(0)}</strong> °F`;
    const icon3src = `https://openweathermap.org/img/w/${forecastData.list[16].weather[0].icon}.png`;
    icon3.setAttribute('src', icon3src);
    icon3.setAttribute('alt', forecastData.list[16].weather[0].description);
    icon3.setAttribute('width', '50');
    icon3.setAttribute('height', '50');
}



