const hamButton = document.querySelector('#menuButton');
const navclass = document.querySelector('#animate');
const logo = document.querySelector('#logo');

hamButton.addEventListener('click', () => {
	hamButton.classList.toggle('open');
    navclass.classList.toggle('open');
});