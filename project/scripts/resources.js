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
function displayOrgs(orgs, filterCategory = 'all') {
    resourcesContainer.innerHTML = '';
    
    // Filter the organizations based on the selected category
    const filteredOrgs = filterCategory === 'all' ? orgs : orgs.filter(org => org.category.includes(filterCategory));
    
    const existingCards = resourcesContainer.querySelectorAll('.card');
    existingCards.forEach(card => {
        card.classList.remove('show'); 
        card.addEventListener('transitionend', () => card.remove()); 
    });

    // Create new cards and fade them in
    filteredOrgs.forEach(org => {
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let addressBox = document.createElement('div');
        let phone = document.createElement('p');
        let image = document.createElement('img');
        let link = document.createElement('a');

        addressBox.setAttribute('class', 'address');
        org.address.forEach(line => {
            let p = document.createElement('p');
            p.textContent = line;
            addressBox.appendChild(p);
        });

        link.setAttribute('href', org.website);
        link.setAttribute('target', '_blank');
        link.textContent = org.urltext;

        card.setAttribute('class', 'card');
        h2.textContent = org.shortname;
        phone.textContent = org.phone;
        image.setAttribute('src', org.image);
        image.setAttribute('alt', `${org.name} logo`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '400');
        image.setAttribute('height', '300');

        card.append(image, h2, addressBox, phone, link);
        resourcesContainer.appendChild(card);

        setTimeout(() => {
            card.classList.add('show');
        }, 10); 
        
        // Open modal
        card.addEventListener('click', () => {
            document.getElementById('modal-body').innerHTML = `
                <img src="${org.image}" alt="${org.name} logo" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 1rem;">
                <h2>${org.name}</h2>
                <p class="description"><strong>About:</strong> ${org.description}</p>
                <p class="link"><a href="${org.website}" target="_blank">${org.urltext}</a></p>
            `;
            const modal = document.getElementById('modal');
            modal.classList.add('show'); 
        });

        // Close modal with button
        document.querySelector('.close').addEventListener('click', () => {
            const modal = document.getElementById('modal');
            modal.classList.remove('show'); 
        });

        // Click outside the modal to close
        document.getElementById('modal').addEventListener('click', (e) => {
            if (e.target.id === 'modal') {
                const modal = document.getElementById('modal');
                modal.classList.remove('show'); 
            }
        });
    });
};


document.getElementById('category').addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    displayOrgs(data, selectedCategory); 
});

getOrgData();
