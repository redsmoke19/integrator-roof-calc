(function () {
  'use strict';
  const getSlider = () => {
    const breakpointDesktop = window.matchMedia('(min-width: 1280px)');
    const roofTypeObject = document.querySelector('.roof-type');
    let roofType;

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
        roofType = new Swiper('.roof-type', {
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
  getSlider();
})();
