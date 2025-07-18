const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function () {
      const wrapper = this.el.closest('.swiper-slider-wrapper');
      const navigationItems = wrapper.querySelectorAll('.swiper-slider-content-navigation span');

      navigationItems.forEach((nav, i) => {
        nav.addEventListener('click', () => this.slideTo(i));
      })
    },
    slideChange: function () {
      const index = swiper.activeIndex;
      const activeSlide = swiper.slides[index];
      
      const settings = {
        imgURL: activeSlide.dataset.imageUrl,
        imgAlt: activeSlide.dataset.imageAlt,
        description: activeSlide.dataset.description,
        verticalAlign: activeSlide.dataset.descriptionVerticalAlign,
        horizontalAlign: activeSlide.dataset.descriptionHorizontalAlign,
        color: activeSlide.dataset.descriptionColor
      }

      updateActiveContent(this, settings);
    }
  }
});

function updateActiveContent (swiper, settings) {
  const { imgURL, imgAlt, description, verticalAlign, horizontalAlign, color } = settings;

  const wrapper = swiper.el.closest('.swiper-slider-wrapper');
  const contentImage = wrapper.querySelector('.swiper-slider-content-image img');
  const contentDescription = wrapper.querySelector('.swiper-slider-content-image div');
  const navigationItems = wrapper.querySelectorAll('.swiper-slider-content-navigation span');

  if (contentImage) {
    contentImage.src = imgURL;
    contentImage.alt = imgAlt;
  }

  if (contentDescription) {
    contentDescription.textContent = description || '';
    contentDescription.style = `align-items: ${verticalAlign}; justify-content: ${horizontalAlign}; color: ${color}`;
  }

  navigationItems.forEach((nav, i) => nav.classList.toggle('active', i === swiper.activeIndex));
};