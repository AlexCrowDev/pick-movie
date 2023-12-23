"use strict"

//changes search background when in focus
let srchInput = document.querySelector('.search-header__input');

function toggleFocus () {
  srchInput.parentElement.classList.toggle('focused')
}

srchInput.addEventListener('focus', toggleFocus);
srchInput.addEventListener('blur', toggleFocus);


