"use strict";

ymaps.ready(init);

function init() {
  var map = new ymaps.Map("map", {
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
