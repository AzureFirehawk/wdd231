export function openModal(org) {
    const modalBody = document.getElementById('modal-body');
    const modal = document.getElementById('modal');
  
    modalBody.innerHTML = `
      <img src="${org.image}" alt="${org.name} logo" style="width: 100%; height: auto; border-radius: 10px; margin-bottom: 1rem;">
      <h2>${org.name}</h2>
      <p class="description"><strong>About:</strong> ${org.description}</p>
      <p class="link"><a href="${org.website}" target="_blank">${org.urltext}</a></p>
    `;
  
    modal.classList.add('show');
  }
  
  export function setupModalCloseHandlers() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
  
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target.id === 'modal') {
        modal.classList.remove('show');
      }
    });
  }
  