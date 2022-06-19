'use strict';

doubleVerticalSlider();

function doubleVerticalSlider() {
  const sliderContainerEl = document.querySelector('.slider-container');
  const leftSliderEl = document.querySelector('.left-slider');
  const rightSliderEl = document.querySelector('.right-slider');
  const upButtonEl = document.querySelector('.up-button');
  const downButtonEl = document.querySelector('.down-button');
  const slidersLength = rightSliderEl.querySelectorAll('div').length;

  let actionSliderIndex = 0;

  leftSliderEl.style.top = `-${(slidersLength - 1) * 100}vh`;

  upButtonEl.addEventListener('click', () => changeSlider('up'));
  downButtonEl.addEventListener('click', () => changeSlider('down'));

  const changeSlider = (direction) => {
    const sliderHight = sliderContainerEl.clientHeight;

    if (direction === 'up') {
      actionSliderIndex++;

      if (actionSliderIndex > (slidersLength - 1)) {
        actionSliderIndex = 0;
      }
    } else if (direction === 'down') {
      actionSliderIndex--;

      if (actionSliderIndex < 0) {
        actionSliderIndex = slidersLength - 1;
      }
    }

    rightSliderEl.style.transform = (
      `translateY(-${actionSliderIndex * sliderHight}px)`
    );

    leftSliderEl.style.transform = (
      `translateY(${actionSliderIndex * sliderHight}px)`
    );
  };
}
