'use strict';

(function () {

  // открытие и закрытие Pop-Up
  var body = document.querySelector('body');
  var background = document.querySelector('.overlay');
  var requestCallButton = document.querySelector('.header__link--phone');
  var requestCallModal = document.querySelector('.pop-up--request');
  var messageModal = document.querySelector('.pop-up--message');
  var closeButtons = document.querySelectorAll('.pop-up__close-button');
  var messageButton = document.querySelector('.pop-up--message .pop-up__button');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    var openModal = document.querySelector('.pop-up--show');
    openModal.classList.remove('pop-up--show');
    background.classList.remove('overlay--show');
    body.classList.remove('overflow');
    document.removeEventListener('keydown', onPopupEscPress);
    messageButton.removeEventListener('click', closePopup);
  };

  var openPopup = function (modal) {
    modal.classList.add('pop-up--show');
    background.classList.add('overlay--show');
    body.classList.add('overflow');
    document.addEventListener('keydown', onPopupEscPress);
    messageButton.addEventListener('click', closePopup);
  };

  requestCallButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup(requestCallModal);

    popUpName.value = localStorage.name;
    popUpTel.value = localStorage.tel;

    popUpName.focus();
  });

  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      closePopup();
    });
  });

  background.addEventListener('click', function () {
    closePopup();
  });

  // валидация введенных данных

  var checkValidity = function (block) {
    var inputs = block.querySelectorAll('input');
    var spans = block.querySelectorAll('span');

    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].validity.valueMissing || inputs[i].validity.patternMismatch) {
        inputs[i].classList.add('invalid');
        spans[i].classList.add('error');
      } else {
        inputs[i].classList.remove('invalid');
        inputs[i].classList.add('valid');
        spans[i].classList.remove('error');
      }
    }
  };

  var popUpForm = document.querySelector('.pop-up__form');
  var popUpfieldset = popUpForm.querySelector('fieldset');
  var popUpName = popUpfieldset.querySelector('[name=name]');
  var popUpTel = popUpfieldset.querySelector('[name=tel]');
  var popUpAgreement = popUpForm.querySelector('[name=agreement]');

  popUpForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    checkValidity(popUpfieldset);

    if (!popUpName.validity.valueMissing && !popUpTel.validity.valueMissing && !popUpTel.validity.patternMismatch && popUpAgreement.checked) {
      closePopup();
      openPopup(messageModal);
      localStorage.setItem('name', popUpName.value);
      localStorage.setItem('tel', popUpTel.value);
    }
  });

  var wantGoForm = document.querySelector('.want-go');
  var wantGoTel = wantGoForm.querySelector('[name=tel]');

  wantGoForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    checkValidity(wantGoForm);

    if (!wantGoTel.validity.valueMissing && !wantGoTel.validity.patternMismatch) {
      openPopup(messageModal);
    }
  });

  // табы раздела программы

  var programs = document.querySelector('.programs');
  var navLinks = programs.querySelectorAll('.programs__nav a');
  var descriptions = programs.querySelectorAll('.programs__item');

  programs.classList.remove('programs--nojs');

  var addTabsClickHandler = function (link, text) {
    link.addEventListener('click', function () {

      var activeNavLink = programs.querySelector('.programs__nav-link--active');
      var activeDescription = programs.querySelector('.programs__item--active');

      activeNavLink.classList.remove('programs__nav-link--active');
      activeDescription.classList.remove('programs__item--active');

      link.classList.add('programs__nav-link--active');
      text.classList.add('programs__item--active');
    });
  };

  if (window.innerWidth > 767) {
    for (var i = 0; i < navLinks.length; i++) {
      addTabsClickHandler(navLinks[i], descriptions[i]);
    }
  }


  // Слайдер мобильной версии раздела программы

  /* eslint-disable */

  if (window.innerWidth <= 767 && !programs.classList.contains('programs--nojs')) {
    console.log('lf');
    var slideNav = new Swiper('.programs__nav', {
      spaceBetween: 0,
      slidesPerView: 'auto',
      centeredSlides: true,
      centeredSlidesBounds: true,
      initialSlide: 1
    });
    var slideContent = new Swiper('.programs__content', {
      spaceBetween: 10,
      initialSlide: 1,
      thumbs: {
        swiper: slideNav
      }
    });
  }

  var life = document.querySelector('.life');
  life.classList.remove('life--nojs');

  if (window.innerWidth <= 767 && !programs.classList.contains('life--nojs')) {
    var lifeSwiper = new Swiper('.life__container', {
      pagination: {
        el: '.swiper-pagination',
      },
    });
  }
  /* eslint-enable */
})();
