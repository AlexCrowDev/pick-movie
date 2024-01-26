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
  countries =  [{name: "Россия"}, {name: "Беларусь"}, {name: "США"}]
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

function getGenresStub () {
  genres =  [{name: "аниме"}, {name: "драма"}, {name: "комедия"}, {name: "мультфильм"},]
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
let movies = document.querySelector('.movies');


filterSearchBtn.addEventListener('click', showFilter);

function showFilter () {
  filter.classList.add('active');
  movies.classList.remove('active');
}


// changes ranges
let leftSlider = 0;
let rightSlider = 10;
let rangeMin = 1;
let span;
let currentRangeModel;
const rangeYears = document.querySelector(".ranges-show__years");
const rangeRating = document.querySelector(".ranges-show__rating");
const yearsSpan = rangeYears.querySelector(".mini-span");
const ratingSpan = rangeRating.querySelector(".mini-span");
const selectedRating = document.querySelector(".range__selected_rating");
const selectedYears = document.querySelector(".range__selected_years");
const yearsInputs = document.getElementsByName('years');
const ratingInputs = document.getElementsByName('rating');
// const rangeNumber = document.querySelectorAll(".range__number input");

yearsInputs.forEach((input) => {
  input.addEventListener("input", (e) => changeRanges(e, yearsInputs));
});
ratingInputs.forEach((input) => {
  input.addEventListener("input", (e) => changeRanges(e, ratingInputs));
});


function changeRanges(e, inputs) {
  leftSlider = inputs[0].valueAsNumber;
  rightSlider = inputs[1].valueAsNumber;
  
  if (rightSlider - leftSlider < rangeMin) {
    if (e.target.className === "from") {
      inputs[0].value = rightSlider - rangeMin;
    } else {
      inputs[1].value = leftSlider + rangeMin;
    }
  } else {
    // rangeNumber[0].value = leftSlider;
    // rangeNumber[1].value = rightSlider;

    if (e.target.name === "years") {
      currentRangeModel = model.years;
      span = yearsSpan;
      let leftSliderRat = leftSlider - 1900;
      let rightSliderRat = rightSlider - 1900;
      selectedYears.style.left = (leftSliderRat / 124) * 100 + "%";
      selectedYears.style.right = 100 - (rightSliderRat / 124) * 100 + "%";
      changeRatingSpans(inputs, span);

    } else if (e.target.name === "rating") {
      currentRangeModel = model.rating;
      span = ratingSpan;
      selectedRating.style.left = (leftSlider / inputs[0].max) * 100 + "%";
      selectedRating.style.right = 100 - (rightSlider / inputs[1].max) * 100 + "%";
      changeRatingSpans(inputs, span);
    }
  }
  checkRanges(currentRangeModel, span);
}

function changeRatingSpans(inputs, span) {
  if (leftSlider == inputs[0].min && rightSlider == inputs[1].max) {
    span.innerHTML = 'any';
  } else if (leftSlider > inputs[0].min && rightSlider == inputs[1].max) {
    span.innerHTML = `from ${leftSlider}`;
  } else if (leftSlider == inputs[0].min && rightSlider < inputs[1].max) {
    span.innerHTML = `to ${rightSlider}`;
  } else {
    span.innerHTML = `from ${leftSlider} to ${rightSlider}`;
  }
}

// rangeNumber.forEach((input) => {
//   input.addEventListener("input", (e) => {
//     let fromRating = rangeNumber[0].valueAsNumber;
//     let toRating = rangeNumber[1].valueAsNumber;
    
//     if (toRating - fromRating < rangeMin) {
//       if (e.target.name === "from") {
//         rangeNumber[0].value = toRating - rangeMin;
//       } else {
//         rangeNumber[1].value = fromRating + rangeMin;
//       }
//     } else {
//       rangeInput[0].value = fromRating;
//       rangeInput[1].value = toRating;
//       rangeSelected.style.left = (fromRating / rangeInput[0].max) * 100 + "%";
//       rangeSelected.style.right = 100 - (toRating / rangeInput[1].max) * 100 + "%";
//     }
//   });
// });


//adds sidebar opening functionality
let mainBtns = document.querySelectorAll('.main-show__button');
let sideBar = document.querySelector('.sidebar');
let srchInput = document.querySelector('.search__input');
let currentSidebarModel;
let genresBtn;
let countriesBtn;
let allList = document.querySelectorAll('.lists-sidebar__item')[1];
let allListInputs;


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
  allListInputs = Array.from(allList.getElementsByTagName('input'));
  allListInputs.forEach(input => {
    let listSpan = input.previousElementSibling.innerHTML;

    if (currentSidebarModel.includes(`${listSpan}`)) {
      input.checked = true;
    }
  })
}


//adds sidebar closing functionality
let chooseBtn = document.querySelector('.sidebar__button');

chooseBtn.addEventListener('click', closeSidebar);

function closeSidebar() {
  checkList();
  changeMainBtnsSpans();

  allList.innerHTML = '';
  sideBar.classList.remove('open');
}

function checkList() {
  
  allListInputs.forEach(input => {
    let listSpan = input.previousElementSibling.innerHTML;
    let currModelValue = currentSidebarModel.includes(`${listSpan}`);
    
    if (input.checked && !currModelValue) {
      currentSidebarModel.push(listSpan);
    }
    if (!input.checked && currModelValue) {
      let index = currentSidebarModel.findIndex(e => e === `${listSpan}`);

      currentSidebarModel.splice(index, 1);
    }
  })
}

function changeMainBtnsSpans() {
  if (currentSidebarModel == model.genres) {
    let genresSpan = genresBtn.lastElementChild;

    if (currentSidebarModel.length > 0) {
      genresSpan.innerHTML = currentSidebarModel.slice(0, 3).join(', ');
    } else {
      genresSpan.innerHTML = 'all';
    }
    if (currentSidebarModel.length > 3) {
      genresSpan.innerHTML += ', ...';
    }

  } else if (currentSidebarModel == model.countries) {
    let countriesSpan = countriesBtn.lastElementChild;
    if (currentSidebarModel.length > 0) {
      countriesSpan.innerHTML = currentSidebarModel.slice(0, 3).join(', ');
    } else {
      countriesSpan.innerHTML = 'all';
    }

    if (currentSidebarModel.length > 3) {
      countriesSpan.innerHTML += ', ...';
    }
  } 
}


//shows movies
let filterBtn = document.querySelector('.filter__button');
let selectedParams;
let notNullFields = 'notNullFields=name&notNullFields=alternativeName&notNullFields=year&notNullFields=rating.kp&notNullFields=votes.kp&notNullFields=poster.url&';
let selectFields = 'selectFields=id&selectFields=name&selectFields=enName&selectFields=alternativeName&selectFields=type&selectFields=year&selectFields=rating&selectFields=votes&selectFields=movieLength&selectFields=seriesLength&selectFields=genres&selectFields=countries&selectFields=poster&selectFields=countries&';


filterBtn.addEventListener('click', showMovies);


function showMovies() {
  checkTypeMovies();
  createParams();

  console.log(selectedParams);
  
  movies.innerHTML = '';
  filter.classList.remove('active');
  movies.classList.add('active');

  getMovies(apiUrl, selectedParams);
}


function checkTypeMovies() {
  let switchBtns = document.getElementsByName('show');
  
  switchBtns.forEach(switchBtn => {
    if (switchBtn.checked) {
      let content = switchBtn.nextElementSibling.innerHTML;
      model.type = content;
    }
  })
}

function checkRanges(currentRangeModel, span) {
  let content = span.innerHTML;

  if (currentRangeModel == model.years) {
    if (content == 'any') {
      model.years = [content];
    } else {
      model.years = [leftSlider, rightSlider];
    }
  } else if (currentRangeModel == model.rating) {
    if (content == 'any') {
      model.rating = [content];
    } else {
      model.rating = [leftSlider, rightSlider];
    }
  }
}


function createParams() {
  let params = new URLSearchParams();
  let mult;
  
  if ((model.type === 'TV Series') && mult) {
    params.append('type', 'animated-series');
  } else if (model.type === 'TV Series') {
    params.append('type', 'tv-series');
  } else if (model.type === 'Films') {
    params.append('type', 'movie');
  }

  model.genres.forEach((genre) => {
    if (genre === 'мультфильм') {
      mult = genre;
    }
    params.append('genres.name', genre);
  });

  model.countries.forEach((country) => {
    params.append('countries.name', country);
  });

  if (model.years.length > 1) {
  params.append('year', model.years.join('-'));
  }

  if (model.rating.length > 1) {
    params.append('rating.kp', model.rating.join('-'));
  }

  params.append('votes.kp', '10000-2500000');
  params.append('sortField', 'rating.kp');
  params.append('sortType', '-1');
  params.append('page', '1');
  params.append('limit', '50');

  return filterParams = params.toString();
}


async function getMovies(url, params) {
  let resp = await fetch(url + 'v1.4/movie?' + selectFields + notNullFields + params, {
    headers: {
     'Content-Type': 'application/json',
     'X-API-KEY': apiKey,
    } 
  });
  let respData = await resp.json();
  console.log(respData);
  addMovies(respData);
};

function addMovies(data) {

  let moviesCont = document.createElement('div');
  moviesCont.classList.add('movies__container');
  moviesCont.classList.add('_container');
  movies.prepend(moviesCont);
  
  data.docs.forEach(movie => {

    let movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
    <a href="https://www.kinopoisk.ru/film/${movie.id}" target="_blank">
      <img class="movie__poster" src="${movie.poster.previewUrl}" alt="${movie.name}">
      <div class="movie__info">
        <div class="movie__rating">${(movie.rating.kp).toFixed(1)}</div>
        <div class="movie__name">${movie.name}</div>
        <div class="movie__genre mini-title">${movie.genres.map(genre => `${genre.name}`).slice(0, 2).join(', ')}</div>
      </div>
    </a>
    `;

    moviesCont.append(movieEl);
  });
}
