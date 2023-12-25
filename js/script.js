"use strict"

const apiUrl = 'https://api.kinopoisk.dev/';
const genresUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';
const countriesUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name';
const apiKey = 'RJKDTJT-1HDM3FX-NGWJ4T8-KHQMWQF';
let genres;
let countries;





getCountries(countriesUrl);
getGenres(genresUrl);

async function getCountries (url) {
  const resp = await fetch (url, {
    headers: {
     'Content-Type': 'application/json', 
     'X-API-KEY': apiKey,
    } 
    
  }
  );
  countries = await resp.json();

  console.log(countries);
}

async function getGenres (url) {
  const resp = await fetch (url, {
    headers: {
     'Content-Type': 'application/json', 
     'X-API-KEY': apiKey,
    } 
    
  }
  );
  genres = await resp.json();

  console.log(genres);
}



//changes search background when in focus
let srchInputs = document.querySelectorAll('.search__input');

function addFocus () {
    this.parentElement.classList.add('focused')
}
function removeFocus () {
  this.parentElement.classList.remove('focused')
}

for(let input of srchInputs) {
  input.addEventListener('focus', addFocus);
  input.addEventListener('blur', removeFocus);
}


//resets default link behavior
let allLinks = document.querySelectorAll('a');

for(let link of allLinks) {
  link.addEventListener('click', (e) => {e.preventDefault();})
}


//adds functionality to filter button
let filterBtn = document.querySelector('.filter-search__button');
let filter = document.querySelector('.filter');

function showFilter () {
  filter.classList.add('active')
}
filterBtn.addEventListener('click', showFilter);


//adds sidebar opening functionality
let mainBtns = document.querySelectorAll('.main-show__button');
let sideBar = document.querySelector('.sidebar');

function openSidebar () {
  sideBar.classList.add('open')
}

for (let btn of mainBtns) {
  btn.addEventListener('click', openSidebar)
}


//adds didebar closing functionality
let sidebarBtn = document.querySelector('.sidebar__button');

function closeSidebar() {
  sideBar.classList.remove('open')
}

sidebarBtn.addEventListener('click', closeSidebar)