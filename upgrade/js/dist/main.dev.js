"use strict";

/*=========================================================================
Set darkmode via OS or local storage
=========================================================================*/
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('color-mode') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches && !localStorage.getItem('color-mode')) {
    document.documentElement.setAttribute("color-mode", "dark");
    document.getElementById("dark-toggle").checked = true;
  }
});
/*=========================================================================
Darkmode Toggle
=========================================================================*/

var toggle = document.getElementById("dark-toggle");
toggle.addEventListener("click", function () {
  if (toggle.checked) {
    document.documentElement.setAttribute("color-mode", "dark");
    localStorage.setItem("color-mode", "dark");
  } else if (!toggle.checked) {
    document.documentElement.setAttribute("color-mode", "light");
    localStorage.setItem("color-mode", "light");
  }
});
/*=========================================================================
Move content on menu toggle on mobile
=========================================================================*/

var sideNav = document.getElementById('sideNav');
var mainContent = document.querySelector('.main-content');
sideNav.addEventListener('shown.bs.collapse', function () {
  mainContent.classList.add("push");
  ;
});
sideNav.addEventListener('hide.bs.collapse', function () {
  mainContent.classList.remove("push");
  ;
});