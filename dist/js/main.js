document.addEventListener('DOMContentLoaded', () => {

  //============================================================ANIMATIONS-START
  gsap.registerPlugin(ScrollTrigger);

  let achievementsItem = gsap.utils.toArray('.achievements__item')

  achievementsItem.forEach(item => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: '0 85%',
        onToggle: () => item.classList.add('animate'),
      },
    })
  })

  let AboutCompany = document.querySelector('.page__about-company');
  if (AboutCompany) {

    const tlAboutCompany = gsap.timeline()

    tlAboutCompany.fromTo(
      '.about-company__title',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1
      },
      0.2,
    ).fromTo(
      '.about-company__video',
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1.1
      },
      0.4,
    )
  }

  //============================================================ANIMATIONS-END

  //============================================================FANCYBOX-START
  Fancybox.bind('[data-fancybox]', {
    contentClick: "toggleCover",
    Images: {
      zoom: false,
      initialSize: "fit",
      Panzoom: {
        panMode: "mousemove",
        mouseMoveFactor: 1.1,
        mouseMoveFriction: 0.12,
      },
    },
  });
  //============================================================FANCYBOX-END

  //============================================================INPUT-FILE-START
  let file = document.querySelector('.input-file__wrapper');
  if (file) {
    const outputImgs = document.getElementById("file-output-imgs");
    const filepickerImgs = document.getElementById("input-file-imgs");
    const clearImgs = document.getElementById("input-file-imgs-clear");

    filepickerImgs.addEventListener("change", (event) => {
      const files = event.target.files;
      outputImgs.textContent = "";

      filepickerImgs.closest('.input-file__wrapper').classList.add('file-added')

      for (const file of files) {
        const li = document.createElement("li");
        li.textContent = file.name;
        outputImgs.appendChild(li);
      }
    });

    clearImgs.addEventListener('click', function () {
      filepickerImgs.value = '';

      filepickerImgs.closest('.input-file__wrapper').classList.remove('file-added')
    }, false);


    const outputAva = document.getElementById("file-output-ava");
    const filepickerAva = document.getElementById("input-file-ava");
    const clearAva = document.getElementById("input-file-ava-clear");

    filepickerAva.addEventListener("change", (event) => {
      const files = event.target.files;
      outputAva.textContent = "";

      filepickerAva.closest('.input-file__wrapper').classList.add('file-added')

      for (const file of files) {
        const li = document.createElement("li");
        li.textContent = file.name;
        outputAva.appendChild(li);
      }
    });

    clearAva.addEventListener('click', function () {
      filepickerAva.value = '';

      filepickerAva.closest('.input-file__wrapper').classList.remove('file-added')
    }, false);
  }
  //============================================================INPUT-FILE-END

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
    pagination: {
      el: '.swiper-index-current',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        if (current < 10) {
          current = `0${current}`
        }
        if (total < 10) {
          total = `0${total}`
        }
        return current + ' / ' + total;
      }
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
  var swiper = new Swiper(".main-news__swiper", {
    a11y: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
  });
  var swiper = new Swiper(".team__swiper", {
    a11y: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      769: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
    },
  });
  var swiper = new Swiper(".services-object__swiper", {
    a11y: false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next--obj",
      prevEl: ".swiper-button-prev--obj",
    },
    pagination: {
      el: '.swiper-index-current',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        if (current < 10) {
          current = `0${current}`
        }
        if (total < 10) {
          total = `0${total}`
        }
        return current + ' / ' + total;
      }
    },
  });
  var swiper = new Swiper(".news-open__swiper", {
    a11y: false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: '.swiper-index-current',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        if (current < 10) {
          current = `0${current}`
        }
        if (total < 10) {
          total = `0${total}`
        }
        return current + ' / ' + total;
      }
    },
  });
  var swiper = new Swiper(".projects-object__swiper-images", {
    a11y: false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: '.swiper-index-current',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        if (current < 10) {
          current = `0${current}`
        }
        if (total < 10) {
          total = `0${total}`
        }
        return current + ' / ' + total;
      }
    },
  });
  var swiper = new Swiper(".projects-object__swiper-plans", {
    a11y: false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: '.swiper-index-current',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        if (current < 10) {
          current = `0${current}`
        }
        if (total < 10) {
          total = `0${total}`
        }
        return current + ' / ' + total;
      }
    },
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

  //============================================================ACCARDION-START
  let accardionWrapper = document.querySelector('.accardion');
  if (accardionWrapper) {
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

    document.querySelectorAll('.accardion-head').forEach((el) => {
      el.addEventListener('click', () => {
        let content = el.nextElementSibling;

        if (content.style.maxHeight) {
          document.querySelectorAll('.accardion-body').forEach((el) => el.style.maxHeight = null)
          document.querySelectorAll('.accardion-body').forEach((el) => el.closest('.accardion-item').classList.remove('accardion-show'))
        } else {
          document.querySelectorAll('.accardion-body').forEach((el) => el.style.maxHeight = null)
          document.querySelectorAll('.accardion-body').forEach((el) => el.closest('.accardion-item').classList.remove('accardion-show'))
          content.style.maxHeight = content.scrollHeight + 'px';
          el.closest('.accardion-item').classList.add('accardion-show');
        }
      })
    });

    document.querySelectorAll('.faq-head').forEach((el) => {
      el.addEventListener('click', () => {
        let content = el.nextElementSibling;

        if (content.style.maxHeight) {
          document.querySelectorAll('.faq-body').forEach((el) => el.style.maxHeight = null)
          document.querySelectorAll('.faq-body').forEach((el) => el.closest('.accardion-item').classList.remove('accardion-show'))
        } else {
          document.querySelectorAll('.faq-body').forEach((el) => el.style.maxHeight = null)
          document.querySelectorAll('.faq-body').forEach((el) => el.closest('.accardion-item').classList.remove('accardion-show'))
          content.style.maxHeight = content.scrollHeight + 'px';
          el.closest('.accardion-item').classList.add('accardion-show');
        }
      })
    });
  }
  //============================================================ACCARDION-END

  //============================================================MAP-START
  let map = document.querySelector('.map');
  if (map) {
    function init() {
      let map = new ymaps.Map('map', {
        center: [59.932684, 30.358061],
        zoom: 14,
      });

      let placemark = new ymaps.Placemark([59.929984, 30.362161], {}, {
        iconLayout: 'default#image',
        iconImageHref: 'images/icons/map-marker.svg',
        iconImageSize: [96, 126],
        iconImageOffset: [-95, -125],
      });

      map.controls.remove('geolocationControl'); // удаляем геолокацию
      map.controls.remove('searchControl'); // удаляем поиск
      map.controls.remove('trafficControl'); // удаляем контроль трафика
      map.controls.remove('typeSelector'); // удаляем тип
      map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
      map.controls.remove('zoomControl'); // удаляем контрол зуммирования
      map.controls.remove('rulerControl'); // удаляем контрол правил
      map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

      map.geoObjects.add(placemark);
    }

    ymaps.ready(init);
  }
  //============================================================MAP-END

});

