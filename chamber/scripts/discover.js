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
        let image = document.createElement('img');
        let name = document.createElement('h2');
        let line1 = document.createElement('p');
        let line2 = document.createElement('p');
        let description = document.createElement('p');

        card.setAttribute('class', 'locationCard');
        image.setAttribute('src', location.image);
        image.setAttribute('alt', `${location.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200');

        name.textContent = location.name;    
        line1.textContent = location.address[0].line1;
        line2.textContent = location.address[0].line2;
        description.textContent = location.description;

        card.append(image, name, line1, line2, description);
        cards.appendChild(card);
    })
}