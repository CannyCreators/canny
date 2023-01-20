// mobile menue

const burgerIcon = document.querySelector('#burger');
const navbarMenu = document.querySelector('#nav-links');
const navbarCreate = document.querySelector('#nav-create');
const navbarSearch = document.querySelector('#nav-locations');
const navbarLocations = document.querySelector('#nav-search');
const navbarUsers = document.querySelector('#nav-users');
const navbarLogin = document.querySelector('#nav-login');
const navbarLogout = document.querySelector('#nav-signout');
const navbarSignup = document.querySelector('#nav-signup');

burgerIcon.addEventListener('click', () => {
    navbarMenu.classList.toggle('is-active');
    navbarMenu.classList.toggle('hamburger');
    navbarCreate.classList.toggle('hamburger');
    navbarSearch.classList.toggle('hamburger');
    navbarLocations.classList.toggle('hamburger');
    navbarUsers.classList.toggle('hamburger');
    navbarLogin.classList.toggle('hamburger');
    navbarLogout.classList.toggle('hamburger');
    navbarSignup.classList.toggle('hamburger');
});