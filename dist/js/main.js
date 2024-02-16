document.addEventListener('DOMContentLoaded', () => {

  //============================================================ASD-START

  //============================================================ASD-END

  //============================================================ASD-START
  let asd = document.querySelector('.asd');
  if (asd) {

  }
  //============================================================ASD-END

  //============================================================BURGER-START
  const burgerOpen = document.querySelector('.burger__open');
  const burgerClose = document.querySelector('.burger__close');
  const burgerCloseOther = document.querySelectorAll('.burger-close');
  const burgerOverlay = document.querySelector('.burger-overlay');
  const burgerMenu = document.querySelector('.burger__menu');

  function burgerShow() {
    burgerOverlay.classList.add('burger-show');
    document.body.classList.add('body-lock')
  }
  function burgerHidden() {
    burgerOverlay.classList.remove('burger-show');
    document.body.classList.remove('body-lock')
  }

  burgerOpen.addEventListener('click', () => {
    burgerShow()
  })
  burgerClose.addEventListener('click', () => {
    burgerHidden()
  })
  burgerCloseOther.forEach((el) => {
    el.addEventListener('click', () => {
      burgerHidden()
    })
  })
  burgerOverlay.addEventListener('click', () => {
    burgerHidden()
  })
  burgerMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  })
  //============================================================BURGER-END

  //============================================================MODAL-START
  const modalOpen = document.querySelectorAll('.modal-open');
  const modalClose = document.querySelectorAll('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay ');
  const modals = document.querySelectorAll('.modal');

  modalOpen.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });

      document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
      modalOverlay.classList.add('modal-overlay--visible');
    });
  });

  modalClose.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      modals.forEach((el) => {
        el.classList.remove('modal--visible');
        modalOverlay.classList.remove('modal-overlay--visible');
      });

      // document.querySelector(`[data-target="${path}"]`).classList.remove('modal--visible');
    });
  });

  modalOverlay.addEventListener('click', (e) => {

    if (e.target == modalOverlay) {
      modalOverlay.classList.remove('modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });
    }
  });
  //============================================================MODAL-END

  //============================================================INPUTMASK-START
  let inputs = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99');
  im.mask(inputs);
  //============================================================INPUTMASK-END

  //============================================================FORM-VALIDATE-START
  let form = document.querySelectorAll('.js-form'),
    formInputs = document.querySelectorAll('.js-input'),
    inputEmail = document.querySelector('.js-input-email'),
    inputPhone = document.querySelector('.js-input-phone');


  function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    let re = /^[0-9\s]*$/;
    return re.test(String(phone));
  }

  form.forEach((elForm) => {
    elForm.onsubmit = function () {
      let emailVal = inputEmail.value,
        phoneVal = inputPhone.value,
        emptyInputs = Array.from(formInputs).filter(input => input.value === '');

      formInputs.forEach(function (input) {
        if (input.value === '') {
          input.classList.add('error');
        } else {
          input.classList.remove('error');

          if (inputEmail.value === '') {

          } else {
            if (!validateEmail(emailVal)) {
              inputEmail.classList.add('errorEmail');
            } else {
              inputEmail.classList.remove('errorEmail');
            }
          }

          if (inputPhone.value === '') {

          } else {
            if (!validatePhone(phoneVal)) {
              inputPhone.classList.add('error');
              return false;
            } else {
              inputPhone.classList.remove('error');
            }
          }
        }
      });

      if (emptyInputs.length !== 0) {
        return false;
      }

      if (!validateEmail(emailVal)) {
        inputEmail.classList.add('errorEmail');
        return false;
      } else {
        inputEmail.classList.remove('errorEmail');
      }

      if (!validatePhone(phoneVal)) {
        inputPhone.classList.add('error');
        return false;
      } else {
        inputPhone.classList.remove('error');
      }
    }
  });


  //============================================================FORM-VALIDATE-END

  //============================================================DROPDOWN-START
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
    const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
    const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
    const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
    const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

    dropDownBtn.addEventListener('click', function (e) {
      dropDownList.classList.toggle('dropdown__list--visible');
      this.classList.add('dropdown__button--active');
    });

    dropDownListItems.forEach(function (listItem) {
      listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropDownBtn.innerHTML = this.innerHTML;
        dropDownBtn.focus();
        dropDownInput.value = this.dataset.value;
        dropDownList.classList.remove('dropdown__list--visible');
      });
    });

    document.addEventListener('click', function (e) {
      if (e.target !== dropDownBtn) {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' || e.key === 'Escape') {
        dropDownBtn.classList.remove('dropdown__button--active');
        dropDownList.classList.remove('dropdown__list--visible');
      }
    });
  });
  //============================================================DROPDOWN-END

  //============================================================SWIPER-START
  var introSwiper = new Swiper(".intro__swiper", {
    a11y: false,
    slidesPerView: 1,
    spaceBetween: 0,
    allowTouchMove: false,
    effect: 'fade',
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
      el: ".swiper-line",
    },
  });
  var swiper = new Swiper(".shares__swiper", {
    a11y: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
    breakpoints: {
      769: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
    },
  });
  var swiper = new Swiper(".reviews__swiper", {
    a11y: false,
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      769: {
        slidesPerView: 'auto',
        spaceBetween: 94,
      },
    },
  });
  var swiper = new Swiper(".news__swiper", {
    a11y: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
  });
  //============================================================SWIPER-END

  //============================================================INTRO-START
  let intro = document.querySelector('.intro');
  if (intro) {
    const header = document.querySelector('.header');

    function headerAbs() {
      if (header.nextElementSibling.querySelector('.intro')) {
        header.classList.add('header-absolute');
      }
    }
    headerAbs()

    const introSwiperCurrent = document.querySelector('.swiper-index-current');
    const introSwiperMax = document.querySelector('.swiper-index-max');
    const introSwiperSlides = intro.querySelectorAll('.swiper-slide');
    let introSwiperLength = introSwiperSlides.length;

    function format() {
      if (introSwiperLength < 10) {
        introSwiperLength = `0${introSwiperLength}`
      }
    }
    format()
    introSwiperMax.innerHTML = introSwiperLength;

    introSwiper.on('transitionEnd', function () {
      let swiperIndex = introSwiper.realIndex + 1;
      function format() {
        if (swiperIndex < 10) {
          swiperIndex = `0${swiperIndex}`
        }
      }
      format()
      introSwiperCurrent.innerHTML = swiperIndex;
    });
  }
  //============================================================INTRO-END

  //============================================================TAB-START
  const tabBtn = document.querySelectorAll('.tab-btn')
  const tabItem = document.querySelectorAll('.tab-item')

  tabBtn.forEach(tabClick);

  function tabClick(item) {
    item.addEventListener('click', function () {
      let currentBtn = item;
      let tabId = currentBtn.getAttribute('data-tab');
      let currentTab = document.querySelector(tabId);

      if (!currentBtn.classList.contains('tab-active')) {

        tabBtn.forEach(function (item) {
          item.classList.remove('tab-active');
        });

        tabItem.forEach(function (item) {
          item.classList.remove('tab-active');
        });

        currentBtn.classList.add('tab-active');
        currentTab.classList.add('tab-active');
      }
    })
  }
  //============================================================TAB-END

  //============================================================SMOOTH-SCROLL-START
  const anchors = document.querySelectorAll('.btn-up[href*="#"]')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href').substr(1)

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

  const btnUp = document.getElementById('btn-up');

  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY;
    if (scrollTop >= 1500) {
      btnUp.classList.add('btn-up-show');
    } else {
      btnUp.classList.remove('btn-up-show');
    }
  });

  //============================================================SMOOTH-SCROLL-END

  //============================================================ASD-START
  let accardionWrapper = document.querySelector('.accardion');
  if (accardionWrapper) {
    //============================================================ACCARDION-START
    document.querySelectorAll('.nav__item-head').forEach((el) => {
      el.addEventListener('click', () => {
        let content = el.nextElementSibling;

        if (content.style.maxHeight) {
          document.querySelectorAll('.nav__item-body').forEach((el) => el.style.maxHeight = null)
          document.querySelectorAll('.nav__item-body').forEach((el) => el.closest('.accardion').classList.remove('accardion-show'))
        } else {
          document.querySelectorAll('.nav__item-body').forEach((el) => el.style.maxHeight = null)
          document.querySelectorAll('.nav__item-body').forEach((el) => el.closest('.accardion').classList.remove('accardion-show'))
          content.style.maxHeight = content.scrollHeight + 'px';
          el.closest('.accardion').classList.add('accardion-show');
        }
      })
    });
    //============================================================ACCARDION-END
  }
  //============================================================ASD-END

});

