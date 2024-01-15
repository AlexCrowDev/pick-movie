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


// getCountries(countriesUrl);
// getGenres(genresUrl);
getCountriesStub(countriesUrl);
getGenresStub(genresUrl);

async function getCountries (url) {
  const resp = await fetch (url, {
    headers: {
     'Content-Type': 'application/json', 
     'X-API-KEY': apiKey,
    } 
  });
  countries = await resp.json();
}
function getCountriesStub () {
  countries =  [{name: "РФ"}, {name: "Беларусь"}, {name: "США"}]
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
function getGenresStub (url) {
  genres =  [{name: "Аниме"}, {name: "Экшн"}, {name: "Драма"}]
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
  filter.classList.add('active');
}



//adds sidebar opening functionality
let mainBtns = document.querySelectorAll('.main-show__button');
let sideBar = document.querySelector('.sidebar');
let srchInput = document.querySelector('.search__input');
let currentSidebarModel;
let genresBtn;
let countriesBtn;
let allList = document.querySelectorAll('.list__item')[1];
let listInputs;


for (let btn of mainBtns) {
  let attribute = btn.getAttribute('data-page');
  if (attribute == 'genres') {
    btn.addEventListener('click', openGenres)
    genresBtn = btn;
  } else if (attribute == 'countries') {
    btn.addEventListener('click', openCountries)
    countriesBtn = btn;
  } else if (attribute == 'years') {
    // btn.addEventListener('click', openYears)
  }
}

function openGenres () {
  currentSidebarModel = model.genres;
  createAllList(genres);
  addChecked(currentSidebarModel);
  srchInput.placeholder = 'Genres';
  setTimeout(() => sideBar.classList.add('open'), 200);
}

function openCountries () {
  currentSidebarModel = model.countries;
  createAllList(countries);
  addChecked(currentSidebarModel);

  srchInput.placeholder = 'Countries';
  sideBar.classList.add('open');
}

function openYears () {
  sideBar.classList.add('open');
  srchInput.placeholder = 'Years';
}

function createAllList (elements) {
  elements.forEach(element => {
    
    let label = document.createElement('label')
    label.classList.add('list__label')

    let input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add('list__input')

    let span = document.createElement('span')
    span.classList.add('list__span')
    span.innerHTML = (`${element.name}`)

    let img = document.createElement('img')
    img.classList.add('list__img')
    img.src = '/img/_check_icon.svg'

    allList.append(label);
    label.prepend(span);
    label.append(input);
    label.append(img);
  });
}

function addChecked() {
  listInputs = Array.from(allList.getElementsByTagName('input'));
  listInputs.forEach(input => {
    let span = input.previousElementSibling.innerHTML;
    if (currentSidebarModel.includes(`${span}`)) {
      input.checked = true;
    }
  })
}


//adds sidebar closing functionality
let chooseBtn = document.querySelector('.sidebar__button');

chooseBtn.addEventListener('click', closeSidebar);

function closeSidebar() {
 
  listInputs.forEach(input => {
    if (input.checked) {
      let span = input.previousElementSibling.innerHTML;
      currentSidebarModel.push(span);
      let genresSpan = genresBtn.lastElementChild;
      // genresSpan.innerHTML = currentSidebarModel.join(', ');
    }
  })

  allList.innerHTML = '';
  sideBar.classList.remove('open');
}


//adds show result functionality
let filterBtn = document.querySelector('.filter__button');


filterBtn.addEventListener('click', showResult);


function showResult() {
  checkTypeMovies();
  let params = createParams();
  console.log(params);
  // getMovies(apiUrl, params);
}


function checkTypeMovies() {
  let switchBtns = document.querySelectorAll('.item-show__switch')
  
  switchBtns.forEach(switchBtn => {
    if (switchBtn.checked) {
      let content = switchBtn.nextElementSibling.innerHTML;
      model.type = content;
    }
  })
}

function createParams() {
  let params = new URLSearchParams();
  let mult;
  
  model.genres.forEach((genre) => {
    if (genre === 'мультфильм') {
      mult = genre;
    }
    params.append('genres.name', genre);
  });

  model.countries.forEach((country) => {
    params.append('countries.name', country);
  });

  if ((model.type === 'TV Series') && mult) {
    params.append('type', 'animated-series');
  } else if (model.type === 'TV Series') {
    params.append('type', 'tv-series');
  } else if (model.type === 'Films') {
    params.append('type', 'movie');
  }
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
