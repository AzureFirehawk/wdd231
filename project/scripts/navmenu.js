const hamButton = document.querySelector('#menuButton');
const navclass = document.querySelector('#animate');
const nav = document.querySelector('nav');
const logo = document.querySelector('#logo');

hamButton.addEventListener('click', () => {
    navclass.classList.add('animating')
	hamButton.classList.toggle('open');
    navclass.classList.toggle('open');
});

navclass.addEventListener('transitionend', () => {
    navclass.classList.remove('animating')
});