const resources = './data/orgs.json';
let data = [];
const filter = document.querySelector('#category');
const resourcesContainer = document.querySelector('#resources');

// Pull data from JSON
async function getOrgData() {
    try{
        const response = await fetch(resources);
        const jsonData = await response.json();
        data = jsonData;

        const categories = getUniqueCategories(data);
        populateDropdown(categories);
        displayOrgs(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Get categories from JSON
function getUniqueCategories(data) {
    const categorySet = new Set();
    data.forEach(org => {
        const categories = Array.isArray(org.category) ? org.category : [org.category];
        categories.forEach(category => categorySet.add(category));
    });
    return Array.from(categorySet).sort();
};

// Populate dropdown filter list with categories
function populateDropdown(categories) {
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        filter.appendChild(option);
    });
};

// Display org data
function displayOrgs(orgs) {
    resourcesContainer.innerHTML = '';
    orgs.forEach(org => {
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let addressBox = document.createElement('div');
        let phone = document.createElement('p');
        let image = document.createElement('img');
        let link = document.createElement('a');

        addressBox.setAttribute('class', 'address'); // Block address for formatting
        org.address.forEach(line => {
            let p = document.createElement('p');
            p.textContent = line;
            addressBox.appendChild(p);
        })

        link.setAttribute('href', org.website);
        link.setAttribute('target', '_blank');
        link.textContent = org.urltext;

        card.setAttribute('class', 'card');
        h2.textContent = org.name;
        phone.textContent = org.phone;
        image.setAttribute('src', org.image);
        image.setAttribute('alt', `${org.name} logo`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '400');
        image.setAttribute('height', '300');

        card.append(image, h2, addressBox, phone, link);
        resourcesContainer.appendChild(card);
    });
};



filter.addEventListener('change', () => {
    const category = filter.value;
    const filteredOrgs = category === 'all' 
    ? data 
    : data.filter(org => {
        const categories = Array.isArray(org.category) ? org.category : [org.category];
        return categories.includes(category);
    });
    displayOrgs(filteredOrgs);
});

getOrgData();