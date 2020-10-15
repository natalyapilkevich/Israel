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

  var contactsForm = document.querySelector('.contacts__form');
  var contactsName = contactsForm.querySelector('[name=name]');
  var contactsTel = contactsForm.querySelector('[name=tel]');

  contactsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    checkValidity(contactsForm);

    if (!contactsName.validity.valueMissing && !contactsTel.validity.valueMissing && !contactsTel.validity.patternMismatch) {
      openPopup(messageModal);
    }
  });

  // табы раздела программы

  var programs = document.querySelector('.programs');
  var navLinks = programs.querySelectorAll('.programs__nav button');
  var descriptions = programs.querySelectorAll('.programs__item');

  programs.classList.remove('programs--nojs');

  var addTabsClickHandler = function (activeLink, activeText, link, text) {
    link.addEventListener('click', function () {

      var activeNavLink = document.querySelector('.' + activeLink);
      var activeDescription = document.querySelector('.' + activeText);

      activeNavLink.classList.remove(activeLink);
      activeDescription.classList.remove(activeText);

      link.classList.add(activeLink);
      text.classList.add(activeText);
    });
  };

  if (window.innerWidth > 767) {
    for (var i = 0; i < navLinks.length; i++) {
      addTabsClickHandler('programs__nav-link--active', 'programs__item--active', navLinks[i], descriptions[i]);
    }
  }

  // Слайдер мобильной версии раздела программы

  /* eslint-disable */

  if (window.innerWidth <= 767 && !programs.classList.contains('programs--nojs')) {
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
    var lifePagination = document.createElement('div');
    lifePagination.className = "swiper-pagination life__pagination";
    var lifeContainer = document.querySelector('.life__container');

    lifeContainer.append(lifePagination);

    var lifeSwiper = new Swiper('.life__container', {
      pagination: {
        el: '.life__pagination',
      },
    });
  }
  /* eslint-enable */

  // Табы вопрос/ответ
  var faq = document.querySelector('.faq');
  var faqLinks = faq.querySelectorAll('.faq__link');
  var faqItems = faq.querySelectorAll('.faq__item');

  faq.classList.remove('faq--nojs');

  var addTabsClickToggle = function (link, text) {
    link.addEventListener('click', function () {

      link.classList.toggle('faq__link--active');
      text.classList.toggle('faq__item--active');
    });
  };

  for (i = 0; i < faqLinks.length; i++) {
    addTabsClickToggle(faqLinks[i], faqItems[i]);
  }

  // Слайдер отзывов

/* eslint-disable */

  var life = document.querySelector('.review');

  life.classList.remove('review--nojs');

  var reviewSwiper = new Swiper('.review__container', {
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    centeredSlidesBounds: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

/* eslint-enable */
})();
