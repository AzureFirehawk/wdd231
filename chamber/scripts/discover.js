const locations = './data/discover.json';
const cards = document.querySelector('#locations');


async function getLocations() {
    const response = await fetch(locations);
    const data = await response.json();
    displayLocations(data.cards);
}

getLocations();

function displayLocations(locations) {
    locations.forEach(location => {
        let card = document.createElement('section');
        let imagebox = document.createElement('div');
        let image = document.createElement('img');
        let name = document.createElement('h2');
        let address = document.createElement('div');
        let line1 = document.createElement('p');
        let line2 = document.createElement('p');
        let description = document.createElement('p');
        let learn = document.createElement('button');
        let overlay = document.createElement('div');

        card.setAttribute('class', 'locationCard');
        image.setAttribute('class', 'locationImage');
        image.setAttribute('src', location.image);
        image.setAttribute('alt', `${location.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');
        learn.setAttribute('class', 'learnMore');
        learn.setAttribute('type', 'button');
        address.setAttribute('class', 'address');

        name.textContent = location.name;    
        line1.textContent = location.address[0].line1;
        line2.textContent = location.address[0].line2;
        description.textContent = location.description;
        learn.textContent = 'Learn More';

        address.append(line1, line2);
        card.append(image, overlay, name, address, description, learn);
        cards.appendChild(card);
    })
};

const banner = document.getElementById('visit-banner');
    const messageSpan = document.getElementById('banner-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = new Date();

// Show message based on elapsed time
if (lastVisit) {
    const previous = new Date(lastVisit);
    const elapsed = now - previous;
    const seconds = Math.floor(elapsed / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let message = '';
    if (days <= 1) {
        message = `You're back so soon!`;
    } else if (days > 1) {
        message = `You last visited ${days} days ago.`;
    }
        messageSpan.textContent = message;
    } else {
        messageSpan.textContent = 'Welcome! This looks like your first visit.';
    }   

// Save current time
localStorage.setItem('lastVisit', now.toISOString());

// Auto-close after 5 seconds
setTimeout(() => {
    banner.classList.add('closed');
}, 10000);

// Manual close button
document.querySelector('.close-button').addEventListener('click', () => {
    banner.classList.add('closed');
});

setTimeout(() => {
    banner.classList.add('visible');
}, 500);
