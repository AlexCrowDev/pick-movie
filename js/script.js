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
  createList(countries);
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

filterBtn.addEventListener('click', showFilter);

function showFilter () {
  filter.classList.add('active')
}



//adds sidebar opening functionality
let mainBtns = document.querySelectorAll('.main-show__button');
let sideBar = document.querySelector('.sidebar');
let listItems = document.querySelectorAll('.list__item')

function openSidebar () {
  sideBar.classList.add('open') 
}

for (let btn of mainBtns) {
  let spanGeners = btn.getElementsByTagName('span')[0].innerHTML;
  if (spanGeners == 'Genres') {
    btn.addEventListener('click', openSidebar)
  } else {
    
  }
}

function createList (type) {
  
  type.forEach(element => {
    let span = element.name;
    
    let listLabel = document.createElement('label')
    listLabel.classList.add('list__label')

    let listInput = document.createElement('input')
    listInput.type = 'checkbox'
    listInput.classList.add('list__input')

    let listSpan = document.createElement('span')
    listSpan.classList.add('list__span')
    listSpan.innerHTML = (`${span}`)

    let listImg = document.createElement('img')
    listImg.classList.add('list__img')
    listImg.src = '/img/_check_icon.svg'
    
    listItems[1].prepend(listLabel);
    listLabel.prepend(listSpan);
    listLabel.append(listInput);
    listLabel.append(listImg);
  });
}



//adds sidebar closing functionality
let sidebarBtn = document.querySelector('.sidebar__button');

function closeSidebar() {
  sideBar.classList.remove('open')
}

sidebarBtn.addEventListener('click', closeSidebar)