// let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
// let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
// let formClose = document.querySelector('#form-close');
// let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');

// window.onscroll = () => {
//     searchBtn.classList.remove('fa-times');
//     searchBar.classList.remove('active');
//     menu.classList.remove('fa-times');
//     navbar.classList.remove('active');
//     loginForm.classList.remove('active');
// };

// menu.addEventListener('click', () => {
//     menu.classList.toggle('fa-times');
//     navbar.classList.toggle('active');
// });

// searchBtn.addEventListener('click', () => {
//     searchBtn.classList.toggle('fa-times');
//     searchBar.classList.toggle('active');
// });

// formBtn.addEventListener('click', () => {
//     loginForm.classList.add('active');
// });

// formClose.addEventListener('click', () => {
//     loginForm.classList.remove('active');
// });



let currentIndex = 0;
const videoWrapper = document.querySelector('.video-wrapper');
const videoSlides = document.querySelectorAll('.video-slide');
const totalVideos = videoSlides.length;

function slideVideo() {
    // Remove 'active' class from all slides
    console.log('fff');
    videoSlides.forEach(slide => slide.classList.remove('active'));

    // Move to the next video (1 → 2 → 3 → 4 → 1)
    currentIndex = (currentIndex + 1) % totalVideos;
    videoWrapper.style.transform = `translateX(-${currentIndex * 100}vw)`;

    // Add 'active' class to trigger text animation
    videoSlides[currentIndex].classList.add('active');

    // Restart video playback
    let videos = document.querySelectorAll('.video-slide video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0; 
    });

    setTimeout(() => {
        videos[currentIndex].play();
    }, 500);
}


videoSlides[0].classList.add('active'); 
document.querySelectorAll('.video-slide video')[0].play();
setInterval(slideVideo, 6000);




var swiper = new Swiper(".review-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
    },
});

