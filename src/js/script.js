"use strict"

const apiUrl = 'https://api.kinopoisk.dev/';
const genresUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=genres.name';
const countriesUrl = 'https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name';
const apiKey = 'RJKDTJT-1HDM3FX-NGWJ4T8-KHQMWQF';
let genres;
let countries;
let model = {
  type: '',
  genres: [],
  countries: [],
  years: [],
  rating: [],
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
let allList = document.querySelectorAll('.lists-sidebar__item')[1];
let listInputs;
let listSpans;


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
  srchInput.placeholder = 'Genres';

  createAllList(genres);
  addChecked(currentSidebarModel);

  setTimeout(() => sideBar.classList.add('open'), 100);
}

function openCountries () {
  currentSidebarModel = model.countries;
  srchInput.placeholder = 'Countries';

  createAllList(countries);
  addChecked(currentSidebarModel);

  setTimeout(() => sideBar.classList.add('open'), 100);
}

function openYears () {
  sideBar.classList.add('open');
  srchInput.placeholder = 'Years';
}

function createAllList (elements) {
  elements.forEach(element => {
    
    let label = document.createElement('label')
    label.classList.add('lists-sidebar__label')

    let input = document.createElement('input')
    input.type = 'checkbox'
    input.classList.add('lists-sidebar__input')

    let span = document.createElement('span')
    span.classList.add('lists-sidebar__span')
    span.innerHTML = (`${element.name}`)

    let img = document.createElement('img')
    img.classList.add('lists-sidebar__img')
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
  checkList();

  if (currentSidebarModel.length > 0) { 
    changeMainBtnsSpans();
  }

  allList.innerHTML = '';
  sideBar.classList.remove('open');
}

function checkList() {

  listInputs.forEach(input => {

    if (input.checked) {
      let span = input.previousElementSibling.innerHTML;

      if (!currentSidebarModel.includes(`${span}`)) {
        currentSidebarModel.push(span);
      }
    }
  })
}

function changeMainBtnsSpans() {
  if (currentSidebarModel == model.genres) {
    let genresSpan = genresBtn.lastElementChild;
    genresSpan.innerHTML = currentSidebarModel.slice(0, 3).join(', ');

    if (currentSidebarModel.length > 3) {
      genresSpan.innerHTML += ', ...';
    }
  } else if (currentSidebarModel == model.countries) {
    let countriesSpan = countriesBtn.lastElementChild;
    countriesSpan.innerHTML = currentSidebarModel.slice(0, 3).join(', ');

    if (currentSidebarModel.length > 3) {
      countriesSpan.innerHTML += ', ...';
    }
  } 
}


//adds show result functionality
let filterBtn = document.querySelector('.filter__button');


filterBtn.addEventListener('click', showResult);


function showResult() {
  checkTypeMovies();
  checkMsRating();
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

function checkMsRating() {
  model.rating.push(leftSlider, rightSlider);
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

  params.append('rating.kp', model.rating.join('-'));

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

let leftSlider;
let rightSlider;
let rangeMin = 1;
const range = document.querySelector(".range__selected");
const rangeInput = document.querySelectorAll(".range__input input");
const rangeRating = document.querySelectorAll(".range__number input");

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    leftSlider = rangeInput[0].valueAsNumber;
    rightSlider = rangeInput[1].valueAsNumber;
    
    if (rightSlider - leftSlider < rangeMin) {
      if (e.target.className === "from") {
        rangeInput[0].value = rightSlider - rangeMin;
      } else {
        rangeInput[1].value = leftSlider + rangeMin;
      }
    } else {
      rangeRating[0].value = leftSlider;
      rangeRating[1].value = rightSlider;
      range.style.left = (leftSlider / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (rightSlider / rangeInput[1].max) * 100 + "%";
    }
  });
});


rangeRating.forEach((input) => {
  input.addEventListener("input", (e) => {
    let fromRating = rangeRating[0].valueAsNumber;
    let toRating = rangeRating[1].valueAsNumber;
    
    if (toRating - fromRating < rangeMin) {
      if (e.target.name === "from") {
        rangeRating[0].value = toRating - rangeMin;
      } else {
        rangeRating[1].value = fromRating + rangeMin;
      }
    } else {
      rangeInput[0].value = fromRating;
      rangeInput[1].value = toRating;
      range.style.left = (fromRating / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (toRating / rangeInput[1].max) * 100 + "%";
    }
  });
});