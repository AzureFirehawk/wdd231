const hamButton = document.querySelector('#menu');
const navclass = document.querySelector('.nav');
const nav = document.querySelector('nav');
const title = document.querySelector('.head-title');

hamButton.addEventListener('click', () => {
	nav.classList.toggle('open');
	hamButton.classList.toggle('open');
    title.classList.toggle('open');
    navclass.classList.toggle('open');
});