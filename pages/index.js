const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemoffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if ((pageYOffset > animItemoffset - animItemPoint) && pageYOffset < (animItemoffset + animItemHeight)) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
  }
}
setTimeout(() => {
  animOnScroll();
}, 300);
const slidesContainer = document.querySelector('.my-projects__container');


const langBtns = document.querySelectorAll('.lang-menu__btn');
const allLang = ['en', 'ru'];
const enBtn = document.querySelector('.enBtn');
const ruBtn = document.querySelector('.ruBtn');

function setLanguageIndicator(lang) {
  if (lang === 'en') {
    enBtn.classList.add('lang-menu__btn_select');
    ruBtn.classList.remove('lang-menu__btn_select');
  } else {
    ruBtn.classList.add('lang-menu__btn_select');
    enBtn.classList.remove('lang-menu__btn_select');
  }
}

langBtns.forEach((item) => {
  item.addEventListener('click', changeUrlLanguage);
});

function changeUrlLanguage(evt) {
  let lang = evt.target.value;
  location.href = window.location.pathname + '#' + lang;
  location.reload();
};

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substring(1);
  setLanguageIndicator(hash);
  if (!allLang.includes(hash)) {
    location.href = window.location.pathname + '#en';
    location.reload();
  };
  for (let key in langArr) {
    let elem = document.querySelector('.lng-' + key);
    if (elem) {
      elem.innerHTML = langArr[key][hash];
    }
  };
};

changeLanguage();

const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');
const container = document.querySelector('.my-projects__container')
const slidesCount = mainSlide.querySelectorAll('div').length;
let activeSlideIndex = 0;

sidebar.style.top = `-${(slidesCount - 1) * 100}vh`;

upBtn.addEventListener('click', () => {
  changeSlide('up');
});

downBtn.addEventListener('click', () => {
  changeSlide('down');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'ArrowUp') {
    changeSlide('up');
  } else if (evt.key === 'ArrowDown') {
    changeSlide('down');
  }
})

function changeSlide(direction) {
  if (direction === 'up') {
    activeSlideIndex++
    if (activeSlideIndex === slidesCount)
    {
      activeSlideIndex = 0
    }
  } else if (direction === 'down') {
    activeSlideIndex--
    if (activeSlideIndex < 0)
    {
      activeSlideIndex = slidesCount - 1
    }
  }

  const height = container.clientHeight
  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`
}

container.addEventListener('touchstart', handleTouchStart, false);
      slidesContainer.addEventListener('touchmove', handleTouchMove, false);

      let x1 = null;
      let y1 = null;

      function handleTouchStart(evt) {
        const firstTouch = evt.touches[0];
        x1 = firstTouch.clientX;
        y1 = firstTouch.clientY;
      }

      function handleTouchMove(evt) {
        if (!x1 || !y1) {
          return false;
        }
        let x2 = evt.touches[0].clientX;
        let y2 = evt.touches[0].clientY;
        let xDiff = x2 - x1;
        let yDiff = y2 - y1;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
          if (xDiff > 0);
        } else {
          if (yDiff > 0) changeSlide('down');
          else changeSlide('up');
        }
        x1 = null;
        y2 = null;
      }