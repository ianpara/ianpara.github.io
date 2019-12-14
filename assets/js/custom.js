$('.main-carousel').flickity({
	// options
	cellAlign: 'center',
	wrapAround: true,
	pageDots: false,
	autoPlay: true
});

document.addEventListener('DOMContentLoaded', (event) => {
	(localStorage.getItem('mode') || 'dark') === 'dark'
		? document.querySelector('body').classList.add('dark')
		: document.querySelector('body').classList.remove('dark');
});
