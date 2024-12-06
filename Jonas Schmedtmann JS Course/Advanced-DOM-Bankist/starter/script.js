'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');
const header = document.querySelector('.header');
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const section2 = document.querySelector('#section--2');
const section3 = document.querySelector('#section--3');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const allImages = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector(".dots");



const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// --------- Button Scrolling -----------

btnLearnMore.addEventListener('click', function(e){
  e.preventDefault();
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords)

  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)

  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY)

  //using object to make it smooth

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth"
  // })

  section1.scrollIntoView({behavior: 'smooth'});
})

// --------- Page Navigation -----------

// document.querySelectorAll('.nav__link').forEach(function(el) {
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

// Solution for many (in this example buttons) to not lower the performence of the page

document.querySelector('.nav__links').addEventListener('click', function(e) {
  if(e.target.classList.contains('nav__link')) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  if (!clicked) return;
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'));
  clicked.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

//hover animation on buttons

const hoverHandle = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

      sibling.forEach(l => {
        if(l !== link) l.style.opacity = this;
      });
      logo.style.opacity = this;
    };
};

// window.addEventListener('scroll', function(){
//   const s1coords = section1.getBoundingClientRect();
//   if(window.scrollY > s1coords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//more optimal way

const stickyNav = function(entries) {
  const [entry] = entries // [entry] = only first value;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
const stickyObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

stickyObserver.observe(header);

// nav.addEventListener('mouseover', function(e) {
//   hoverHandle(e, 0.5);
// });

// nav.addEventListener('mouseout', function(e) {
//   hoverHandle(e, 1);
// });

nav.addEventListener('mouseover', hoverHandle.bind(0.5));

nav.addEventListener('mouseout', hoverHandle.bind(1));

//reveal sections

const sectionRevealFunction = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionRevealFunction, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section){
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

//lazy loading images
const lazyLoadingImgFunction = function(entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const lazyImageObserver = new IntersectionObserver(lazyLoadingImgFunction, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
})

allImages.forEach(function(img){
  img.classList.add('lazy-img');
  lazyImageObserver.observe(img);
})

//Slider
const sliders = function(){
let slideCount = 0;
const maxSlide = slides.length - 1;

//slider function
const sliderFunction = function(slide) {
  slides.forEach((s, i) => {
    s.style.transform = (`translateX(${100 * (i - slide)}%)`);
  });
};
//next slide
const nextSlideFunction = () => {
  if(slideCount === maxSlide){
    slideCount = 0;
  } else {
    slideCount++;
  };
  sliderFunction(slideCount);
  activeDot(slideCount);
};
btnSliderRight.addEventListener('click', nextSlideFunction)

//previous slide
const previousSlideFunction = () => {
  if(slideCount === 0) {
    slideCount = maxSlide;
  } else {
    slideCount--;
  };
  sliderFunction(slideCount);
  activeDot(slideCount);
};
btnSliderLeft.addEventListener('click', previousSlideFunction)
//setting starter values

//moving slides using arrows
document.addEventListener('keydown', function(e) {
  e.key === 'ArrowLeft' && previousSlideFunction();
  e.key === 'ArrowRight' && nextSlideFunction();
});

//moving slides using dots
dotContainer.addEventListener('click', function(e) {
  if(e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    sliderFunction(slide);
    activeDot(slide);
    slideCount = slide;
  };
});

//slider dots
const createDots = function() {
  slides.forEach(function(_,i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
  });
};

//activate dot
const activeDot = function(slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

// initialization
const init = function() {
  createDots();
  sliderFunction(slideCount);
  activeDot(0);
};
init();
};
sliders();
//======================================================== LECTURES ========================================================================

// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies for improved functionality and analyics. <button class="btn btn--close-cookie">Got it!</button>';

// top of the parent and cloning, if true, copies also the childs of the element
// header.prepend(message.cloneNode(true));

// Bottom of the parent
// header.append(message);


// const btnCloseCookie = document.querySelector('.btn--close-cookie');

// btnCloseCookie.addEventListener('click', function() {
  // message.remove();
// });

// message.style.backgroundColor = '#37383d';
// message.style.width = '105%';
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// btnLearnMore.addEventListener('click', function(e){
  // e.preventDefault();
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords)

  // console.log('Current scroll (X/Y)', window.scrollX, window.scrollY);

  // console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth)

  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY)

  //using object to make it smooth

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth"
  // })

  // section1.scrollIntoView({behavior: 'smooth'});
// })

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`

//event bubbling

// document.querySelector('.nav__link').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   //e.currentTarget === this
//   //preventing bubbling
//   e.stopPropagation()
// })

// document.querySelector('.nav__links').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   //e.currentTarget === this
  
// })

// document.querySelector('.nav').addEventListener('click', function(e) {
//   this.style.backgroundColor = randomColor();
//   //e.currentTarget === this
// })

//IntersectionObserver

// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold: 0.1 //[0, 0.2]
// }

// const obs = new IntersectionObserver(obsCallback, obsOptions);
// obs.observe(section1);

document.addEventListener('DOMContentLoaded', function(e){
  console.log('html parsed and dom tree built')
});