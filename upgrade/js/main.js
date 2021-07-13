/*=========================================================================
Set darkmode via OS or local storage
=========================================================================*/
document.addEventListener('DOMContentLoaded',() => {
    if (
        localStorage.getItem('color-mode') === 'dark' || (window.matchMedia('(prefers-color-scheme: dark)').matches &&
            !localStorage.getItem('color-mode'))
        ) {
        document.documentElement.setAttribute("color-mode", "dark");
        document.getElementById("dark-toggle").checked = true;
        }
});


/*=========================================================================
Darkmode Toggle
=========================================================================*/
var toggle = document.getElementById("dark-toggle");
toggle.addEventListener("click", function () {
    if (toggle.checked ) {
        document.documentElement.setAttribute("color-mode", "dark");
        localStorage.setItem("color-mode", "dark");
    } else if (!toggle.checked) {
        document.documentElement.setAttribute("color-mode", "light");
        localStorage.setItem("color-mode", "light");
    }
});

/*=========================================================================
Fixing BS Scrollspy
=========================================================================*/
function hotfixScrollSpy() {
    var dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'))
    let curScroll = getCurrentScroll();
    dataSpyList.forEach(function (dataSpyEl) {
        let offsets = bootstrap.ScrollSpy.getInstance(dataSpyEl)['_offsets'];
        for(let i = 0; i < offsets.length; i++){
            offsets[i] += curScroll;
        }
    })
}

function getCurrentScroll() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

window.onload = function () {
    hotfixScrollSpy();
    window.scrollBy(0,1);
}

window.addEventListener('resize', function(event) {
    const dataSpyList = [].slice.call(document.querySelectorAll('[data-bs-spy="scroll"]'));
    dataSpyList.forEach(function(dataSpyEl) {
      bootstrap.ScrollSpy.getInstance(dataSpyEl).refresh();
    });
    hotfixScrollSpy();
    window.scrollBy(0, 1);
}, true);

/*=========================================================================
Move content on menu toggle on mobile
=========================================================================*/
var sideNav = document.getElementById('sideNav');
var mainContent = document.querySelector('.main-content');
sideNav.addEventListener('shown.bs.collapse', function () {
    mainContent.classList.add("push");; 
})
sideNav.addEventListener('hide.bs.collapse', function () {
    mainContent.classList.remove("push");; 
})