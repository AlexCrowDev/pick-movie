"use strict"

//changes search background when in focus
let srchInput = document.querySelector('.search__input');

function toggleFocus () {
  srchInput.parentElement.classList.toggle('focused')
}

srchInput.addEventListener('focus', toggleFocus);
srchInput.addEventListener('blur', toggleFocus);


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