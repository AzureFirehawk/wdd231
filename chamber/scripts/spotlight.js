const business = './data/members.json'
const spotlight = document.querySelector('#spotlight');

async function getBusinessData() {
    const response = await fetch(business);
    const data = await response.json();
    const filtered = data.members.filter(member => member.membership > 1);
    businessSpotlight(filtered);
}

getBusinessData();


const businessSpotlight = (members) => {
    let unique = new Set();
    while (unique.size < 3) {
        unique.add(members[Math.floor(Math.random() * members.length)]);
    }
    unique.forEach(member => {
        let card = document.createElement('section');    
        let h2 = document.createElement('h2');
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let phone = document.createElement('p');
        let image = document.createElement('img');
        let link = document.createElement('a');
        let membership = document.createElement('p');

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

        link.setAttribute('href', member.url);
        link.setAttribute('target', '_blank');
        link.textContent = `${member.urlText}`;
        if (member.membership == 1) {
            membership.textContent = "Membership: Member";
        } else if (member.membership == 2) {
            membership.textContent = "Membership: Silver";
        } else if (member.membership == 3) {
            membership.textContent = "Membership: Gold";
            
        }

        card.appendChild(image);
        card.appendChild(h2);
        card.appendChild(p1);
        card.appendChild(p2);
        card.appendChild(phone);
        card.appendChild(membership);
        card.appendChild(link);
        spotlight.appendChild(card);
    })
}
