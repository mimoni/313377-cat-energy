"use strict";

ymaps.ready(init);

function init() {
  var mapEl = document.querySelector('#map');
  mapEl.classList.remove('no-js');

  var map = new ymaps.Map(mapEl, {
    center: [59.938631, 30.323055],
    zoom: 17,
    controls: []
  });

  var myPlacemark = new ymaps.Placemark([59.938631, 30.323055], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/map-pin.png',
    iconImageSize: [55, 53],
    iconImageOffset: [-27, -53]
  });

  map.behaviors.disable('scrollZoom');
  map.behaviors.disable('multiTouch');
  map.behaviors.disable('drag');

  map.geoObjects.add(myPlacemark);

  //map.setCenter([59.938631, 30.319390],17) //desktop
}

(function () {
  var menu = document.querySelector('.main-nav');
  var button = menu.querySelector('.main-nav__toggle');

  menu.classList.remove('main-nav--open');

  button.addEventListener('click', function (evt) {
    evt.preventDefault();

    if (menu.classList.contains('main-nav--open')) {
      menu.classList.remove('main-nav--open');
    } else {
      menu.classList.add('main-nav--open');
    }
  });
})();
