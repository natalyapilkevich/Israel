'use strict';

(function () {

  // открытие и закрытие Pop-Up

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
    document.removeEventListener('keydown', onPopupEscPress);
    messageButton.removeEventListener('click', closePopup);
  };

  var openPopup = function (modal) {
    modal.classList.add('pop-up--show');
    background.classList.add('overlay--show');
    document.addEventListener('keydown', onPopupEscPress);
    messageButton.addEventListener('click', closePopup);
  };

  requestCallButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    openPopup(requestCallModal);

    userName.value = localStorage.name;
    userTel.value = localStorage.tel;

    userName.focus();
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

  var form = document.querySelector('.pop-up__form');
  var fieldset = form.querySelector('fieldset');
  var userName = fieldset.querySelector('[name=name]');
  var userTel = fieldset.querySelector('[name=tel]');
  var agreement = form.querySelector('[name=agreement]');

  var inputs = fieldset.querySelectorAll('input');
  var spans = fieldset.querySelectorAll('span');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

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

    if (!userName.validity.valueMissing && !userTel.validity.valueMissing && !userTel.validity.patternMismatch && agreement.checked) {
      closePopup();
      openPopup(messageModal);
      localStorage.setItem('name', userName.value);
      localStorage.setItem('tel', userTel.value);
    }
  });

  // табы раздела программы

  var nav = document.querySelector('.programs__nav');
  var navLinks = nav.querySelectorAll('.programs__nav a');
  var content = document.querySelector('.programs__content');
  var descriptions = content.querySelectorAll('.programs__item');

  var addTabsClickHandler = function (link, text) {
    link.addEventListener('click', function () {

      var activeNavLink = nav.querySelector('.programs__nav-link--active');
      var activeDescription = content.querySelector('.programs__item--active');

      activeNavLink.classList.remove('programs__nav-link--active');
      activeDescription.classList.remove('programs__item--active');

      link.classList.add('programs__nav-link--active');
      text.classList.add('programs__item--active');
    });
  };
  for (var i = 0; i < navLinks.length; i++) {
    addTabsClickHandler(navLinks[i], descriptions[i]);
  }

})();
