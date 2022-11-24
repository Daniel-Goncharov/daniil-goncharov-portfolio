function slidesPlugin(activeSlide = 0) {
  const slides = document.querySelectorAll('.slide');

  slides[activeSlide].classList.add('active');

  for (const slide of slides) {
      slide.addEventListener('click', () => {
          clearActiveClasses();

          slide.classList.add('active');
      })
  };

  function clearActiveClasses() {
      slides.forEach((slide) => {
          slide.classList.remove('active');
      })
  };
}

slidesPlugin(1);

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

