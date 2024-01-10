"use strict"

const apiUrl = 'https://api.kinopoisk.dev/';
const genresUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';
const countriesUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name';
const apiKey = 'RJKDTJT-1HDM3FX-NGWJ4T8-KHQMWQF';
let genres;
let countries;
let model = {
  genres: [],
  countries: [],
};


getCountries(countriesUrl);
getGenres(genresUrl);

async function getCountries (url) {
  const resp = await fetch (url, {
    headers: {
     'Content-Type': 'application/json', 
     'X-API-KEY': apiKey,
    } 
  });
  countries = await resp.json();
}

async function getGenres (url) {
  const resp = await fetch (url, {
    headers: {
     'Content-Type': 'application/json', 
     'X-API-KEY': apiKey,
    } 
  });
  genres = await resp.json();
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
let filterSearchBtn = document.querySelector('.filter-search__button');
let filter = document.querySelector('.filter');

filterSearchBtn.addEventListener('click', showFilter);

function showFilter () {
  filter.classList.add('active')
}



//adds sidebar opening functionality
let mainBtns = document.querySelectorAll('.main-show__button');
let sideBar = document.querySelector('.sidebar');
let listItems = document.querySelectorAll('.list__item');
let srchInput = document.querySelector('.search__input');
let currentSidebarModel;

for (let btn of mainBtns) {
  let attribute= btn.getAttribute('data-page');
  if (attribute == 'genres') {
    btn.addEventListener('click', openGenres)
  } else if (attribute == 'countries') {
    btn.addEventListener('click', openCountries)
  } else if (attribute == 'years') {
    // btn.addEventListener('click', openYears)
  }
}


function createGenres (elements) {

  elements.forEach(element => {
    
    let listLabel = document.createElement('label')
    listLabel.classList.add('list__label')

    let listInput = document.createElement('input')
    listInput.type = 'checkbox'
    listInput.classList.add('list__input')

    let listSpan = document.createElement('span')
    listSpan.classList.add('list__span')
    listSpan.innerHTML = (`${element.name}`)

    let listImg = document.createElement('img')
    listImg.classList.add('list__img')
    listImg.src = '/img/_check_icon.svg'
    
    listItems[1].prepend(listLabel);
    listLabel.prepend(listSpan);
    listLabel.append(listInput);
    listLabel.append(listImg);
  });
}

function createCountries (elements) { 
  elements.forEach(element => {
    
    let listLabel = document.createElement('label')
    listLabel.classList.add('list__label')

    let listInput = document.createElement('input')
    listInput.type = 'checkbox'
    listInput.classList.add('list__input')

    let listSpan = document.createElement('span')
    listSpan.classList.add('list__span')
    listSpan.innerHTML = (`${element.name}`)

    let listImg = document.createElement('img')
    listImg.classList.add('list__img')
    listImg.src = '/img/_check_icon.svg'
    
    listItems[1].prepend(listLabel);
    listLabel.prepend(listSpan);
    listLabel.append(listInput);
    listLabel.append(listImg);
  });
}

function openGenres () {
  currentSidebarModel = model.genres;
  createGenres(genres);
  setTimeout(() =>sideBar.classList.add('open'), 200);
  srchInput.placeholder = 'Genres';
}

function openCountries () {
  currentSidebarModel = model.countries;
  createCountries(countries);
  sideBar.classList.add('open');
  srchInput.placeholder = 'Countries';
}

function openYears () {
  sideBar.classList.add('open');
  srchInput.placeholder = 'Years';
}

//adds sidebar closing functionality
let chooseBtn = document.querySelector('.sidebar__button');


function closeSidebar() {
  let listInputs = Array.from(listItems[1].getElementsByTagName('input'));
  
  listInputs.forEach(e => {
    if (e.checked) {
      let span = e.previousElementSibling.innerHTML;
      currentSidebarModel.push(span);
    }
  })

  listItems[1].innerHTML = '';
  sideBar.classList.remove('open');
}

chooseBtn.addEventListener('click', closeSidebar)



//adds show result functionality
let filterBtn = document.querySelector('.filter__button');


filterBtn.addEventListener('click', showResult);


function showResult() {
  let params = createParams();
  getMovies(apiUrl, params);
}


function createParams() {
  let params = new URLSearchParams();

  model.genres.forEach((genre) => {
    params.append('genres.name', genre); 
  });
  model.countries.forEach((country) => {
    params.append('countries.name', country);
  });
  return params.toString();
}


async function getMovies(url, params) {
  let resp = await fetch(url + 'v1.4/movie?' + params, {
    headers: {
     'Content-Type': 'application/json', 
     'X-API-KEY': apiKey,
    } 
  });
  let json = await resp.json();
  console.log(json);
};
