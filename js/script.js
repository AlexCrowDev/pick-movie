"use strict"

const apiUrl = 'https://api.kinopoisk.dev/';
const genresUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';
// const countriesUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name';
const apiKey = 'RJKDTJT-1HDM3FX-NGWJ4T8-KHQMWQF';
let genres;
let countries;





// getCountries(countriesUrl);
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
  createList(genres);
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
let listItems = document.querySelectorAll('.list__item')

function openSidebar () {
  sideBar.classList.add('open') 
}

function createList (type) {
  
  type.forEach(element => {
    let li = element.name;
    let listLi = document.createElement('li')
    listLi.innerHTML = (`${li}`)
    listItems[1].prepend(listLi);
  });
}

for (let btn of mainBtns) {
  let spanGeners = btn.getElementsByTagName('span')[0].innerHTML;
  if (spanGeners == 'Genres') {
    btn.addEventListener('click', openSidebar)
  } else {
    
  }
}


//adds sidebar closing functionality
let sidebarBtn = document.querySelector('.sidebar__button');

function closeSidebar() {
  sideBar.classList.remove('open')
}

sidebarBtn.addEventListener('click', closeSidebar)