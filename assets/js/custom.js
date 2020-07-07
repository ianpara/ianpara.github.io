$('.main-carousel').flickity({
	// options
	cellAlign: 'center',
	wrapAround: true,
	pageDots: false,
	autoPlay: true
});

document.addEventListener('DOMContentLoaded', (event) => {

		if ((localStorage.getItem('mode') || 'dark') === 'dark') {
			document.querySelector('body').classList.add('dark');
		} else {
			document.querySelector('body').classList.remove('dark');

		}
});

function modeToggle() {
	localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ?'light' : 'dark'); 
	if (localStorage.getItem('mode') === 'dark') {
		document.querySelector('body').classList.add('dark')
	} else {
		document.querySelector('body').classList.remove('dark');
	}

}

