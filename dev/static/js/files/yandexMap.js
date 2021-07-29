const getMap = () => {
  ymaps.ready(function () {
    const map = new ymaps.Map('map', {
      center: [59.850509, 30.304028],
      zoom: 14,
      controls: [],
    });
    const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
      '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
    );
    const myPlacemark = new ymaps.Placemark(
      map.getCenter(),
      {
        hintContent: 'Офис Intergator.Digital',
      },
      {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: './static/images/content/map_marker.svg',
        // Размеры метки.
        iconImageSize: [30, 42],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-5, -38],
      }
    );
    map.geoObjects.add(myPlacemark);
  });
};

/*
Это добавить нужно в head после подключения стилей
script(src="https://api-maps.yandex.ru/2.1/?apikey=ваш API-ключ&lang=ru_RU" type="text/javascript")
*/
