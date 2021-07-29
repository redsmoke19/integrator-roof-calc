const counter = function () {
  const btns = document.querySelectorAll('.counter__btn');
  btns.forEach(function (item) {
    item.addEventListener('click', counterState);
  });

  function counterState() {
    const dir = this.dataset.direction;
    const inputEl = this.parentElement.previousElementSibling;
    const currentValue = inputEl.value;
    dir === 'plus'
      ? counterPlus(inputEl, currentValue)
      : counterMinus(inputEl, currentValue);
  }

  const counterPlus = (el, val) => {
    el.value = +val + 1;
  };

  const counterMinus = (el, val) => {
    if (val - 1) el.value = +val - 1;
  };
};

counter();
