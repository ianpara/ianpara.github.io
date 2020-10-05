$(window).on("load", function () {
  "use strict";
  /*=========================================================================
      Preloader
  =========================================================================*/
  $("#preloader").delay(350).fadeOut('slow');


  /*=========================================================================
      Custom Scrollbar
  =========================================================================*/
  $(".header-inner").mCustomScrollbar();

  /*=========================================================================
  Set darkmode via OS or local storage
  =========================================================================*/
  if (
    localStorage.getItem('color-mode') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches &&
      !localStorage.getItem('color-mode'))
  ) {
    document.documentElement.setAttribute("color-mode", "dark");
    $(':checkbox').each(function () {
      this.click();
    });
  }

  /*=========================================================================
  Isotope
  =========================================================================*/
  var $container = $('.portfolio-wrapper');
  $container.imagesLoaded(function () {
    $('.portfolio-wrapper').isotope({
      // options
      itemSelector: '[class*="col-"]',
      percentPosition: true,
      masonry: {
        // use element for option
        columnWidth: '[class*="col-"]'
      }
    });
  });
});


$(function () {
  "use strict";

  $('.menu-icon').on('click', function () {
    $('header.left').toggleClass('open');
    $('.mobile-header, main.content').toggleClass('push');
  });

  $('main.content, header.left button.close').on('click', function () {
    $('header.left').removeClass('open');
    $('.mobile-header, main.content').removeClass('push');
  });


  /*=========================================================================
  One Page Scroll with jQuery
  =========================================================================*/
  var x = window.matchMedia("(max-width: 992px)");

  if (x.matches) { // If media query matches
    $('.vertical-menu li a[href^="#"]:not([href="#"])').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });
  } else {
    $('.vertical-menu li a[href^="#"]:not([href="#"])').on('click', function (event) {
      var $anchor = $(this);
      $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 50
      }, 800, 'easeInOutQuad');
      event.preventDefault();
    });
  }
  

  /*=========================================================================
  Add (nav-link) class to main menu.
  =========================================================================*/
  $('.vertical-menu li a').addClass('nav-link');

  /*=========================================================================
  Bootstrap Scrollspy
  =========================================================================*/
  $("body").scrollspy({
    target: ".scrollspy",
    offset: 50
  });

  /*=========================================================================
  Spacer with Data Attribute
  =========================================================================*/
  var list = document.getElementsByClassName('spacer');

  for (var i = 0; i < list.length; i++) {
    var size = list[i].getAttribute('data-height');
    list[i].style.height = "" + size + "px";
  }

  /*=========================================================================
  Scroll to Top
  =========================================================================*/
  $(window).scroll(function () {
    if ($(this).scrollTop() >= 250) { // If page is scrolled more than 50px
      $('#return-to-top').fadeIn(200); // Fade in the arrow
    } else {
      $('#return-to-top').fadeOut(200); // Else fade out the arrow
    }
  });
  $('#return-to-top').on('click', function () { // When arrow is clicked
    $('body,html').animate({
      scrollTop: 0 // Scroll to top of body
    }, 400);
  });

  /*=========================================================================
  Darkmode Toggle
  =========================================================================*/
  $('input[type="checkbox"]').click(function () {
    if ($(this).is(":checked")) {
      document.documentElement.setAttribute("color-mode", "dark");
      localStorage.setItem("color-mode", "dark");
    } else if ($(this).is(":not(:checked)")) {
      document.documentElement.setAttribute("color-mode", "light");
      localStorage.setItem("color-mode", "light");
    }
  });

});