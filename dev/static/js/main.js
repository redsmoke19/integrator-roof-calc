(function () {
  'use strict';
  const getSlider = () => {
    const breakpointDesktop = window.matchMedia('(min-width: 1280px)');
    const roofTypeObject = document.querySelector('._js-roof-type');
    const roofMaterialObject = document.querySelector('._js-roof-material');
    let roofType;
    let roofMaterial;

    const breakpointChecker = function () {
      let resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          resizeHandlerDesktop();
        }, 100);
      }

      function resizeHandlerDesktop() {
        if (breakpointDesktop.matches === true) {
          if (roofType !== undefined) {
            roofType.destroy(true, true);
          }
        } else if (breakpointDesktop.matches === false) {
          enableRoofSlider();
        }
      }
    };

    const enableRoofSlider = function () {
      if (roofTypeObject) {
        roofType = new Swiper(roofTypeObject, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20
        });
      }
      if (roofMaterialObject) {
        roofMaterial = new Swiper(roofMaterialObject, {
          direction: 'horizontal',
          grabCursor: true,
          preventClicks: true,
          preventClicksPropagation: true,
          slidesPerView: 'auto',
          spaceBetween: 20,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20
        });
      }

    };

    // const rewiesSlider = document.querySelector('.reviews-slider');
    // if (rewiesSlider) {
    //   const reviewSlider = new Swiper('.reviews-slider', {
    //     direction: 'horizontal',
    //     grabCursor: true,
    //     preventClicks: true,
    //     preventClicksPropagation: true,
    //     slidesPerView: 'auto',
    //     spaceBetween: 20,
    //     slidesOffsetBefore: 20,
    //     slidesOffsetAfter: 20,
    //     navigation: {
    //       nextEl: '.reviews-slider__button--next',
    //       prevEl: '.reviews-slider__button--prev',
    //     },
    //     breakpoints: {
    //       // when window width is >= 320px
    //       1280: {
    //         slidesPerView: 'auto',
    //         spaceBetween: 40,
    //         slidesOffsetBefore: 0,
    //         slidesOffsetAfter: 0,
    //       },
    //     },
    //   });
    // }

    breakpointDesktop.addListener(breakpointChecker);
    breakpointChecker();
  };
  const getTooltip = () => {
    let tooltipElem;

    document.onmouseover = function(event) {
      // const tooltipButton = document.qs
      const target = event.target;

      // если у нас есть подсказка...
      // let tooltipHtml = target.dataset.tooltip;
      const tooltipHtml = target.closest('.tooltip__button');
      if (!tooltipHtml) return;
      console.log(tooltipHtml);

      // ...создадим элемент для подсказки

      tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = tooltipHtml;
      document.body.append(tooltipElem);

      // спозиционируем его сверху от аннотируемого элемента (top-center)
      let coords = target.getBoundingClientRect();

      let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0; // не заезжать за левый край окна

      let top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) { // если подсказка не помещается сверху, то отображать её снизу
        top = coords.top + target.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
    };

    document.onmouseout = function(e) {
      if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
      }
    };
  };
  getSlider();
  getTooltip();
})();
