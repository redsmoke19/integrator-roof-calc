const getPopup = () => {
  let unlock = true;
  function body_lock_remove(delay) {
    let body = document.querySelector('body');
    if (unlock) {
      let lock_padding = document.querySelectorAll('._lp');
      setTimeout(() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
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
  }
  function body_lock_add(delay) {
    let body = document.querySelector('body');
    if (unlock) {
      let lock_padding = document.querySelectorAll('._lp');
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
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
  }

  let popup_link = document.querySelectorAll('._popup-link');
  let popups = document.querySelectorAll('.popup');
  for (let index = 0; index < popup_link.length; index++) {
    const el = popup_link[index];
    el.addEventListener('click', function (e) {
      if (unlock) {
        let item = el.getAttribute('href').replace('#', '');
        let video = el.getAttribute('data-video');
        popup_open(item, video);
      }
      e.preventDefault();
    });
  }
  for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__body')) {
        popup_close(e.target.closest('.popup'));
      }
    });
  }
  function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup._active');
    if (activePopup.length > 0) {
      popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup_' + item);
    if (curent_popup && unlock) {
      if (video != '' && video != null) {
        let popup_video = document.querySelector('.popup_video');
        popup_video.querySelector('.popup__video').innerHTML =
          '<iframe src="https://www.youtube.com/embed/' +
          video +
          '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
      }
      if (!document.querySelector('.menu__body._active')) {
        body_lock_add(500);
      }
      curent_popup.classList.add('_active');
      history.pushState('', '', '#' + item);
    }
  }
  function popup_close(item, bodyUnlock = true) {
    if (unlock) {
      if (!item) {
        for (let index = 0; index < popups.length; index++) {
          const popup = popups[index];
          let video = popup.querySelector('.popup__video');
          if (video) {
            video.innerHTML = '';
          }
          popup.classList.remove('_active');
        }
      } else {
        let video = item.querySelector('.popup__video');
        if (video) {
          video.innerHTML = '';
        }
        item.classList.remove('_active');
      }
      if (!document.querySelector('.menu__body._active') && bodyUnlock) {
        body_lock_remove(500);
      }
      history.pushState('', '', window.location.href.split('#')[0]);
    }
  }
  let popup_close_icon = document.querySelectorAll(
    '.popup__close,._popup-close'
  );
  if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
      const el = popup_close_icon[index];
      el.addEventListener('click', function () {
        popup_close(el.closest('.popup'));
      });
    }
  }
  document.addEventListener('keydown', function (e) {
    if (e.code === 'Escape') {
      popup_close();
    }
  });
};
