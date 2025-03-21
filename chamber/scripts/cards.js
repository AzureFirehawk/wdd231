const business = './data/members.json'
const cards = document.querySelector('#cards');

async function getBusinessData() {
    const response = await fetch(business);
    const data = await response.json();
    displayBusiness(data.members);
}

getBusinessData();

const displayBusiness = (members) => {
    members.forEach(member => {
        let card = document.createElement('section');
        let text = document.createElement('div');
        let h2 = document.createElement('h2');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let phone = document.createElement('p');
        let image = document.createElement('img');

        card.setAttribute('class', 'card');
        h2.textContent = `${member.name}`;
        p1.textContent = `${member.address1}`;
        p2.textContent = `${member.address2}`;
        phone.textContent = `${member.phone}`;
        image.setAttribute('src', member.image);
        image.setAttribute('alt', `${member.name} logo`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '200');
        image.setAttribute('height', '200');

        card.appendChild(image);
        card.appendChild(h2);
        text.appendChild(p1);
        text.appendChild(p2);
        text.appendChild(phone);
        card.appendChild(text);
    
        cards.appendChild(card);
    })
}