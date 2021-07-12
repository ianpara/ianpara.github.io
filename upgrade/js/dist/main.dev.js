"use strict";

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