import { getOrgData, getUniqueCategories } from "./orgData.js";

let data = [];
const filter = document.querySelector('#category');
const resourcesContainer = document.querySelector('#resources');

function populateDropdown(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
}

function displayOrgs(orgs, filterCategory = 'all') {
    resourcesContainer.innerHTML = '';

    const filteredOrgs = filterCategory === 'all' ? orgs : orgs.filter(org => org.category.includes(filterCategory));

    filteredOrgs.forEach(org => {
        let card = document.createElement('section');
        card.setAttribute('class', 'card');

        card.innerHTML = `
            <img src="${org.image}" alt="${org.name} logo" loading="lazy" width="400" height="300">
            <h2>${org.shortname}</h2>
            <div class="address">${org.address.map(line => `<p>${line}</p>`).join('')}</div>
            <p>${org.phone}</p>
            <a href="${org.website}" target="_blank">${org.urltext}</a>
        `;

        card.addEventListener('click', () => {
            document.getElementById('modal-body').innerHTML = `
                <img src="${org.image}" alt="${org.name} logo" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 1rem;">
                <h2>${org.name}</h2>
                <p class="description"><strong>About:</strong> ${org.description}</p>
                <p class="link"><a href="${org.website}" target="_blank">${org.urltext}</a></p>
            `;
            document.getElementById('modal').classList.add('show');
        });

        resourcesContainer.appendChild(card);
        setTimeout(() => card.classList.add('show'), 10);
    });
}

// Modal close logic
document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').classList.remove('show');
});
document.getElementById('modal').addEventListener('click', e => {
    if (e.target.id === 'modal') {
        document.getElementById('modal').classList.remove('show');
    }
});

document.getElementById('category').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    displayOrgs(data, selectedCategory);
});

(async function init() {
    data = await getOrgData();
    const categories = getUniqueCategories(data);
    populateDropdown(categories);
    displayOrgs(data);
})();
