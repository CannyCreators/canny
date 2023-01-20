// mobile menue

const burgerIcon = document.querySelector('#burger');
const navbarLinks = document.querySelector('#nav-links');
const navbarMenu = document.querySelector('#nav-menu');
const navbarItem = document.querySelector('.navbar-item');
const navbarCreate = document.querySelector('#nav-create');
const navbarSearch = document.querySelector('#nav-locations');
const navbarLocations = document.querySelector('#nav-search');
const navbarUsers = document.querySelector('#nav-users');
const navbarLogin = document.querySelector('#nav-login');
const navbarLogout = document.querySelector('#nav-signout');
const navbarSignup = document.querySelector('#nav-signup');
const navbarHome = document.querySelector('#nav-home');

burgerIcon.addEventListener('click', () => {
    navbarLinks.classList.toggle('is-active');
    navbarLinks.classList.toggle('hamburgerbackground');
    navbarMenu.classList.toggle('hamburgerbackground');
    navbarCreate.classList.toggle('hamburger');
    navbarSearch.classList.toggle('hamburger');
    navbarLocations.classList.toggle('hamburger');
    navbarUsers.classList.toggle('hamburger');
    navbarLogin.classList.toggle('hamburger');
    navbarLogout.classList.toggle('hamburger');
    navbarSignup.classList.toggle('hamburger');
    navbarHome.classList.toggle('hamburger');
});