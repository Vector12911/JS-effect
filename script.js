'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// page navigation---------------

// const navLinks = document.querySelectorAll('.nav__link');

// navLinks.forEach(function(ele){
//   ele.addEventListener('click',function(e){
//     e.preventDefault();
//     const id =this.getAttribute('href');
//     // console.log(id);
//     const targetSection = document.querySelector(id);
//     targetSection.scrollIntoView({behavior:"smooth"})
//   })

// })

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    console.log(id);
    const targetSection = document.querySelector(id);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// implement tabs--------------

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  console.log(clicked.dataset.tab);
  tabsContent.forEach(ele =>
    ele.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// navlinks fade onhover

const nav = document.querySelector('.nav');

const hoverHandeler = function (e, opacity) {
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    // console.log(link.closest('.nav'))
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    console.log('sibling :', siblings);

    siblings.forEach(ele => {
      if (ele != link) {
        ele.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    });
  }
};

nav.addEventListener('mouseover', e => hoverHandeler(e, 0.5));

nav.addEventListener('mouseout', e => hoverHandeler(e, 1));

// sticky navbar-------------------

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll',function(){
//   if(window.scrollY>initialCoords.top){
//     nav.classList.add('sticky');
//   }
//   else{
//     nav.classList.remove('sticky');
//   }
// })

// sticky navbar : Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

// const obsCallback = function(entries,observer){
//   entries.forEach(entry =>{
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root:null,
//   threshold: 0.1,
// }

// const observer = new IntersectionObserver(obsCallback,obsOptions);

// observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
  // rootMargin: '-90px',
});

headerObserver.observe(header);

// Reveal sections -----------

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy loading images------------

const imageTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // Replace src with data-src

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imageTargets.forEach(img => imgObserver.observe(img));


const implementSliders = () => {
  const slides = document.querySelectorAll('.slide');

  console.log(slides);

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  let curSlide = 0;

  const slider = document.querySelector('.slider');

  const slideHandler = function () {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
    );
  };
  slideHandler()

  const nextSlide = () => {
    if (curSlide == slides.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    slideHandler();
    activeDots();
  };
  const prevSlide = () => {
    if (curSlide == 0) {
      curSlide = slides.length - 1;
    } else {
      curSlide--;
    }
    slideHandler();
    activeDots();
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);


  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    }
    else {
      nextSlide();
    }
    activeDots();

  })


  ///slider dots--------------------

  const activeDots = function () {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${curSlide}"]`).classList.add('dots__dot--active');
  }

  const dotContainer = document.querySelector('.dots');
  console.log(dotContainer);

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    })
  }

  createDots();
  activeDots();

  // add handerle on each dots-----

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = e.target.dataset.slide;
      slideHandler()
      activeDots();
    }
  })

}

implementSliders()

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault();
//   e.returnValue='';
// })



