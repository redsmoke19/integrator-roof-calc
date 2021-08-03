/* eslint-disable no-undef */
(function () {
  'use strict';
  const getSlider = () => {
    const breakpointDesktop = window.matchMedia('(min-width: 1280px)');
    const breakpointTablet = window.matchMedia('(min-width: 768px)');
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
        if (breakpointTablet.matches === true) {
          if (roofType !== undefined) {
            roofType.destroy(true, true);
          }
          if (roofMaterial !== undefined) {
            roofMaterial.destroy(true, true);
          }
        } else if (breakpointTablet.matches === false) {
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
    breakpointDesktop.addListener(breakpointChecker);
    breakpointTablet.addListener(breakpointChecker);
    breakpointChecker();
  };
  const getTooltip = () => {
    let tooltipElem;

    const removeTooltip = function (elem) {
      elem.remove();
      elem = null;
    };

    // document.onmouseover = function (event) {
    document.addEventListener('click', function (event) {
      const target = event.target;

      // если у нас есть подсказка...
      const tooltipHtml = target.closest('.tooltip__button');
      if (!tooltipHtml) return;
      if (tooltipElem) {
        removeTooltip(tooltipElem);
      }
      const tooltipParent = tooltipHtml.parentElement;
      // ...создадим элемент для подсказки
      const title = tooltipParent.querySelector('.tooltip__data-title');
      const text = tooltipParent.querySelector('.tooltip__data-text');
      const link = tooltipParent.querySelector('.tooltip__data-link');
      tooltipElem = document.createElement('div');
      const tooltipTitle = document.createElement('h3');
      const tooltipText = document.createElement('p');
      const tooltipLink = document.createElement('a');
      const tooltipClose = document.createElement('button');
      tooltipElem.className = 'tooltip__body';
      tooltipTitle.className = 'tooltip__title';
      tooltipText.className = 'tooltip__text';
      tooltipLink.className = 'tooltip__link';
      tooltipClose.className = 'tooltip__close';
      tooltipTitle.textContent = title.textContent;
      tooltipText.textContent = text.textContent;
      tooltipLink.textContent = link ? link.textContent : '';
      tooltipLink.href = link ? link.href : '';
      tooltipElem.append(tooltipTitle);
      tooltipElem.append(tooltipText);
      tooltipElem.append(link ? tooltipLink : '');
      tooltipElem.append(tooltipClose);
      document.body.append(tooltipElem);

      // спозиционируем его сверху от аннотируемого элемента (top-center)
      const coords = target.getBoundingClientRect();

      let right = 'unset';
      let left = coords.left;
      if (left < 0) left = 10; // не заезжать за левый край окна
      if (left > document.body.clientWidth - tooltipElem.offsetWidth) {
        left = 'unset';
        right = 10;
      }
      if (document.body.clientWidth - tooltipElem.offsetWidth - 10 <= 0) {
        left = 10;
        right = 10;
      }

      let top = coords.top - tooltipElem.offsetHeight - 10;
      if (top < 0) {
        // если подсказка не помещается сверху, то отображать её снизу
        top = coords.top + target.offsetHeight + 10;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';
      tooltipElem.style.right = right + 'px';
    });

    document.addEventListener('click', function (event) {
      if (tooltipElem && !event.target.closest('.tooltip__body') && !event.target.closest('.tooltip__button')) {
        removeTooltip(tooltipElem);
      }
      if (event.target.closest('.tooltip__close')) {
        removeTooltip(tooltipElem);
      }
    });
  };
  const getChangeRoofImages = () => {
    const roofButtons = document.querySelectorAll('[data-roof-type]');
    const roofImage = document.querySelector('.roof-size__img');
    const roofSizedInput = document.querySelectorAll('._js-input-text');
    roofButtons.forEach(item => {
      item.addEventListener('click', () => {
        const srcPath = item.getAttribute('data-roof-type');
        roofImage.src = `./static/images/content/${srcPath}.png`;
      });
    });
    roofSizedInput.forEach(item => {
      item.addEventListener('focus', () => {
        const srcPath = item.getAttribute('data-roof-size-image');
        roofImage.src = `./static/images/content/${srcPath}.png`;
      });
    });
  };
  const getInputСondition = () => {
    const inputText = document.querySelectorAll('._js-input-text');
    inputText.forEach(item => {
      item.addEventListener('focus', () => {
        item.parentElement.classList.add('_active');
      });
      item.addEventListener('blur', () => {
        if (item.value !== '') {
          item.parentElement.classList.add('_not-empty');
          item.parentElement.classList.remove('_active');
        } else {
          item.parentElement.classList.remove('_active');
          item.parentElement.classList.remove('_not-empty');
        }
      });
    });
  };
  const getTransitionHeight = () => {
    const elem = document.querySelectorAll('._height-animation');
    const trigger = document.querySelectorAll('._height-animation-trigger');
    elem.forEach(item => {
      item.style.display = 'none';
    });
    trigger.forEach((item, i) => {
      item.addEventListener('input', () => {
        if (item.checked) {
          elem[i].style.display = 'block';
          const height = elem[i].scrollHeight;
          elem[i].style.setProperty('--max-height', height + 'px');
        } else {
          elem[i].style.setProperty('--max-height', 0);
          elem[i].style.paddingBottom = '0';
          elem[i].style.marginBottom = '0';
          setTimeout(() => {
            elem[i].style.display = 'none';
            elem[i].style.paddingBottom = '';
            elem[i].style.marginBottom = '';
          }, 400);
        }
      });
    });
  };
  const getTabs = () => {
    const roofType = document.querySelectorAll('[data-roof-type');
    const roofTypeContent = document.querySelectorAll('._roof-type-content');

    const getTab = function (links, content) {
      let tabName;
      const selectTabNav = function () {
        links.forEach(item => {
          item.classList.remove('_active');
        });
        this.classList.add('_active');
        tabName = this.getAttribute('data-tabs-class');
        selectTabContent(tabName);
      };
      const selectTabContent = function (tab) {
        content.forEach(item => {
          const classList = item.classList;
          if (classList.contains(tab)) {
            classList.add('_active');
          } else {
            classList.remove('_active');
          }
        });
      };

      if (links.length > 0) {
        links.forEach(item => {
          item.addEventListener('click', selectTabNav);
        });
      }
    };

    getTab(roofType, roofTypeContent);
  };
  const getFolderRoofTrigger = () => {
    const folderRoofInputs = document.querySelectorAll('[name="roof-material"]');
    const folerRoofHiddenElement = document.querySelector('._js-stropila-check');
    folderRoofInputs.forEach(item => {
      item.addEventListener('input', () => {
        if (item.value === 'falcevaya') {
          folerRoofHiddenElement.style.display = 'none';
        } else {
          folerRoofHiddenElement.style.display = 'block';
        }
      });
    });
  };
  const getLayoutControls = () => {
    const leyoutControlsButtons = document.querySelectorAll('.layout-control__button');
    leyoutControlsButtons.forEach(item => {
      item.addEventListener('click', () => {
        if (item.classList.contains('_minus')) {
          item.nextElementSibling.value = +(item.nextElementSibling.value - 0.01).toFixed(2);
        }
        if (item.classList.contains('_plus')) {
          item.previousElementSibling.value = +(+(item.previousElementSibling.value) + 0.01).toFixed(2);
        }
      });
    });
  };
  getSlider();
  getTooltip();
  getChangeRoofImages();
  getInputСondition();
  getTransitionHeight();
  getTabs();
  getFolderRoofTrigger();
  getLayoutControls();
})();
