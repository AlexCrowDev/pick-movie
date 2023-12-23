"use strict"

//changes search background when in focus
let srchInput = document.querySelector('.search-header__input');

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
