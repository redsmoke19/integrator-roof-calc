/* eslint-disable no-undef */
(function () {
  'use strict';
  let unlock = true;
  function dynamicAdaptiv() {
    // Dynamic Adapt v.1
    // HTML data-da="where(uniq class name),when(breakpoint),position(digi)"
    // e.x. data-da=".item,992,2"
    // Andrikanych Yevhen 2020
    // https://www.youtube.com/c/freelancerlifestyle

    function DynamicAdapt(type) {
      this.type = type;
    }

    DynamicAdapt.prototype.init = function () {
      const _this = this;
      // массив объектов
      this.оbjects = [];
      this.daClassname = '_dynamic_adapt_';
      // массив DOM-элементов
      this.nodes = document.querySelectorAll('[data-da]');

      // наполнение оbjects объктами
      for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(',');
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
        оbject.place = dataArray[2] ? dataArray[2].trim() : 'last';
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
      }

      this.arraySort(this.оbjects);

      // массив уникальных медиа-запросов
      this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (item) {
          return (
            '(' +
            this.type +
            '-width: ' +
            item.breakpoint +
            'px),' +
            item.breakpoint
          );
        },
        this
      );
      this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (item, index, self) {
          return Array.prototype.indexOf.call(self, item) === index;
        }
      );

      // навешивание слушателя на медиа-запрос
      // и вызов обработчика при первом запуске
      for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(
          this.оbjects,
          function (item) {
            return item.breakpoint === mediaBreakpoint;
          }
        );
        matchMedia.addListener(function () {
          _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
      }
    };

    DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
      if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          оbject.index = this.indexInParent(оbject.parent, оbject.element);
          this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
      } else {
        for (let i = 0; i < оbjects.length; i++) {
          const оbject = оbjects[i];
          if (оbject.element.classList.contains(this.daClassname)) {
            this.moveBack(оbject.parent, оbject.element, оbject.index);
          }
        }
      }
    };

    // Функция перемещения
    DynamicAdapt.prototype.moveTo = function (place, element, destination) {
      element.classList.add(this.daClassname);
      if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
      }
      if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
      }
      destination.children[place].insertAdjacentElement('beforebegin', element);
    };

    // Функция возврата
    DynamicAdapt.prototype.moveBack = function (parent, element, index) {
      element.classList.remove(this.daClassname);
      if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
      } else {
        parent.insertAdjacentElement('beforeend', element);
      }
    };

    // Функция получения индекса внутри родителя
    DynamicAdapt.prototype.indexInParent = function (parent, element) {
      const array = Array.prototype.slice.call(parent.children);
      return Array.prototype.indexOf.call(array, element);
    };

    // Функция сортировки массива по breakpoint и place
    // по возрастанию для this.type = min
    // по убыванию для this.type = max
    DynamicAdapt.prototype.arraySort = function (arr) {
      if (this.type === 'max') {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return -1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return 1;
            }

            return a.place - b.place;
          }

          return a.breakpoint - b.breakpoint;
        });
      } else {
        Array.prototype.sort.call(arr, function (a, b) {
          if (a.breakpoint === b.breakpoint) {
            if (a.place === b.place) {
              return 0;
            }

            if (a.place === 'first' || b.place === 'last') {
              return 1;
            }

            if (a.place === 'last' || b.place === 'first') {
              return -1;
            }

            return b.place - a.place;
          }

          return b.breakpoint - a.breakpoint;
        });
        return;
      }
    };

    const da = new DynamicAdapt('max');
    da.init();
  }
  function bodyLockRemove(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      setTimeout(() => {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
      }, delay);

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  };
  function bodyLockAdd(delay) {
    const body = document.querySelector('body');
    if (unlock) {
      const lockPadding = document.querySelectorAll('._lp');
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight =
          window.innerWidth -
          document.querySelector('.wrapper').offsetWidth +
          'px';
      }
      body.style.paddingRight =
        window.innerWidth -
        document.querySelector('.wrapper').offsetWidth +
        'px';
      body.classList.add('_lock');

      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, delay);
    }
  };
  const getPopup = () => {
    const popupLink = document.querySelectorAll('._popup-link');
    const popups = document.querySelectorAll('.popup');
    for (let index = 0; index < popupLink.length; index++) {
      const el = popupLink[index];
      el.addEventListener('click', function (e) {
        if (unlock) {
          const item = el.getAttribute('href').replace('#', '');
          const video = el.getAttribute('data-video');
          popupOpen(item, video);
        }
        e.preventDefault();
      });
    }
    for (let index = 0; index < popups.length; index++) {
      const popup = popups[index];
      popup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__body')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
    function popupOpen(item, video = '') {
      const activePopup = document.querySelectorAll('.popup._active');
      if (activePopup.length > 0) {
        popupClose('', false);
      }
      const curentPopup = document.querySelector('.popup_' + item);
      if (curentPopup && unlock) {
        if (video !== '' && video != null) {
          const popupVideo = document.querySelector('.popup_video');
          popupVideo.querySelector('.popup__video').innerHTML =
            '<iframe src="https://www.youtube.com/embed/' +
            video +
            '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        if (!document.querySelector('.menu__body._active')) {
          bodyLockAdd(500);
        }
        curentPopup.classList.add('_active');
        history.pushState('', '', '#' + item);
      }
    }
    function popupClose(item, bodyUnlock = true) {
      if (unlock) {
        if (!item) {
          for (let index = 0; index < popups.length; index++) {
            const popup = popups[index];
            const video = popup.querySelector('.popup__video');
            if (video) {
              video.innerHTML = '';
            }
            popup.classList.remove('_active');
          }
        } else {
          const video = item.querySelector('.popup__video');
          if (video) {
            video.innerHTML = '';
          }
          item.classList.remove('_active');
        }
        if (!document.querySelector('.menu__body._active') && bodyUnlock) {
          bodyLockRemove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
      }
    }
    const popupCloseIcon = document.querySelectorAll(
      '.popup__close,._popup-close'
    );
    if (popupCloseIcon) {
      for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function () {
          popupClose(el.closest('.popup'));
        });
      }
    }
    document.addEventListener('keydown', function (e) {
      if (e.code === 'Escape') {
        popupClose();
      }
    });
  };
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
      tooltipText.innerHTML = text.innerHTML;
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
    // const inputText = document.querySelectorAll('._js-input-text');
    const inputText = document.querySelectorAll('.form__input-text');
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
  const getSelects = () => {
    const selectItems = document.querySelectorAll('.js-select');
    if (selectItems.length > 0) {
      selectItems.forEach(item => {
        // eslint-disable-next-line no-new
        new Choices(item, {
          searchEnabled: false,
          itemSelectText: '',
          shouldSort: false,
        });
      });
    }
  };
  dynamicAdaptiv();
  getPopup();
  getSlider();
  getTooltip();
  getChangeRoofImages();
  getInputСondition();
  getTransitionHeight();
  getTabs();
  getFolderRoofTrigger();
  getLayoutControls();
  getSelects();
})();
