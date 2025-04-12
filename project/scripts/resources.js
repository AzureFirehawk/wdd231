import { getOrgData, getUniqueCategories } from "./orgData.mjs";
import { openModal, setupModalCloseHandlers } from "./modal.mjs";

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

    card.addEventListener('click', () => openModal(org));
    resourcesContainer.appendChild(card);
    setTimeout(() => card.classList.add('show'), 10);
  });
}

filter.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;
  displayOrgs(data, selectedCategory);

  const banner = document.getElementById('filter-banner');
  const previousFilter = localStorage.getItem('lastShownFilter');

  if (selectedCategory !== previousFilter) {
    banner.textContent = `Now showing resources for ${selectedCategory}`;
    banner.classList.add('show');

    // Hide after 3 seconds
    setTimeout(() => {
      banner.classList.remove('show');
    }, 3000);

    localStorage.setItem('lastShownFilter', selectedCategory);
  }
});



(async function init() {
  data = await getOrgData();
  const categories = getUniqueCategories(data);
  populateDropdown(categories);
  displayOrgs(data);
  setupModalCloseHandlers();
})();
