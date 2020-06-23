document.addEventListener("DOMContentLoaded", function(){
const popupForm = document.getElementById("popup");
const anchors = document.querySelectorAll('.menu__item');

function scrollMenu(target){
  anchors.forEach(item => {
    item.classList.remove("active")
  });
  target.classList.add("active")

}

function scrollId(target) {
  const blockID = target.getAttribute('href').substr(1)

  document.getElementById(blockID).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}


document.addEventListener("click", (e) => {
  let isCallbackButton = e.target.classList.contains("callback-button"),
    isCloseButtonForm = e.target.classList.contains("popup__close"),
    isAnchor  = e.target.classList.contains("menu__item"),
    isUpButton = e.target.classList.contains("footer__navigation");
 
  if(isCallbackButton) {
    popupForm.style.display = "flex"; 
  }
  if(isCloseButtonForm ) {
    popupForm.style.display = "none";
  }
  
  if(isAnchor) {
    e.preventDefault()
    scrollMenu(e.target)
    scrollId(e.target);
  }
  if(isUpButton) {
    e.preventDefault()
    scrollId(e.target);
  }
})


// 'use strict';
let multiItemSlider = (function () {
  return function (selector, config) {
    let
      mainElement = document.querySelector(selector),
      sliderWrapper = mainElement.querySelector('.slider__wrapper'),
      sliderItems = mainElement.querySelectorAll('.slider__item'),
      sliderControls = mainElement.querySelectorAll('.slider__control'),
      wrapperWidth = parseFloat(getComputedStyle(sliderWrapper).width),
      itemWidth = parseFloat(getComputedStyle(sliderItems[0]).width),   
      positionLeftItem = 0,
      transform = 0,
      step = itemWidth / wrapperWidth * 100,
      items = []; 

    sliderItems.forEach(function (item, index) {
      items.push({ item: item, position: index, transform: 0 });
    });

    let position = {
      getItemMin: function () {
       let indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getItemMax: function () {
        let indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return items[position.getItemMin()].position;
      },
      getMax: function () {
        return items[position.getItemMax()].position;
      }
    }

    var transformItem = function (direction) {
      let nextItem;
      if (direction === 'right') {
        positionLeftItem++;
        if ((positionLeftItem + wrapperWidth / itemWidth - 1) > position.getMax()) {
          nextItem = position.getItemMin();
          items[nextItem].position = position.getMax() + 1;
          items[nextItem].transform += items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform -= step;
      }
      if (direction === 'left') {
        positionLeftItem--;
        if (positionLeftItem < position.getMin()) {
          nextItem = position.getItemMax();
          items[nextItem].position = position.getMin() - 1;
          items[nextItem].transform -= items.length * 100;
          items[nextItem].item.style.transform = 'translateX(' + items[nextItem].transform + '%)';
        }
        transform += step;
      }
      sliderWrapper.style.transform = 'translateX(' + transform + '%)';
    }

    let controlClick = function (e) {
      if (e.target.classList.contains('slider__control')) {
        e.preventDefault();
        let direction = e.target.classList.contains('slider__control_right') ? 'right' : 'left';
        transformItem(direction);
      }
    };

    let setUpListeners = function () {
      sliderControls.forEach(function (item) {
        item.addEventListener('click', controlClick);
      });
    }

    setUpListeners();

    return {
      right: function () { 
        transformItem('right');
      },
      left: function () {
        transformItem('left');
      }
    }

  }
}());

let slider = multiItemSlider('.slider')

});