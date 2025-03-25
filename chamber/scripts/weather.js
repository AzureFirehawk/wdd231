const temp = document.querySelector('#current-temp');
const icon = document.querySelector('#weather-icon');
const desc = document.querySelector('figcaption');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=35.139236&lon=-97.394753&units=imperial&appid=536a7f86e83f64be0db592241461f30f';

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

apiFetch();

function displayResults(data) {
    temp.innerHTML = `<strong>${data.main.temp.toFixed(0)}</strong>`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    icon.setAttribute('src', iconsrc);
    icon.setAttribute('alt', data.weather[0].description);
    desc.innerHTML = `<strong>${data.weather[0].description.toUpperCase()}</strong>`;
}