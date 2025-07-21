const swiper = new Swiper('.swiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function () {
      const wrapper = this.el.closest('.swiper-slider-wrapper');
      const navItems = wrapper.querySelectorAll('.swiper-slider-content-navigation span');

      navItems.forEach((nav, i) => {
        nav.addEventListener('click', () => this.slideTo(i));
      })
    },
    slideChange: function () {
      const activeSlide = swiper.slides[swiper.activeIndex];
      
      const settings = {
        imgURL: activeSlide.dataset.imageUrl,
        imgAlt: activeSlide.dataset.imageAlt,
        showHotspotDot: activeSlide.dataset.showHotspotDot === 'true',
        description: activeSlide.dataset.description,
        descriptionAligning: activeSlide.dataset.descriptionAligning,
        xPosition: activeSlide.dataset.xPosition,
        yPosition: activeSlide.dataset.yPosition,
        color: activeSlide.dataset.descriptionColor
      }

      updateActiveContent(this, settings);
    }
  }
});

// Update Content on Slide Change START
function updateActiveContent (swiper, settings) {
  const { imgURL, imgAlt, showHotspotDot, description, descriptionAligning, xPosition, yPosition, color } = settings;

  const wrapper = swiper.el.closest('.swiper-slider-wrapper');
  const contentImage = wrapper.querySelector('.swiper-slider-content-image');
  const contentDotWrapper = wrapper.querySelector('.swiper-slider-content-dot-wrapper');
  const contentDot = wrapper.querySelector('.swiper-slider-content-dot');
  const contentDescription = wrapper.querySelector('.swiper-slider-content-description');
  const navItems = wrapper.querySelectorAll('.swiper-slider-content-navigation span');

  if (contentImage) {
    contentImage.src = imgURL;
    contentImage.alt = imgAlt;
  }

  if (showHotspotDot) {
    contentDotWrapper.style.display = 'block';

    if (contentDot) {
      contentDot.style = `left: ${xPosition}%; top: ${yPosition}%;`;
    }

    if (contentDescription) {
      contentDescription.textContent = description || '';
      contentDescription.style = `text-align: ${descriptionAligning}; color: ${color}`;
    }

    positionHotspotDescriptions();
  } else {
    contentDotWrapper.style.display = 'none';
  }

  navItems.forEach((nav, i) => nav.classList.toggle('active', i === swiper.activeIndex));
};
// Update Content on Slide Change END


// Update positioning for the HotSpot dot's description while resizing or slide changing START
function positionHotspotDescriptions() {
  document.querySelectorAll('.swiper-slider-content-dot-wrapper').forEach(container => {
    const containerRect = container.getBoundingClientRect();
    const dots = container.querySelectorAll('.swiper-slider-content-dot');

    dots.forEach(dot => {
      const desc = dot.querySelector('.swiper-slider-content-description');
      if (!desc) return;

      ['left', 'right', 'top', 'bottom', 'transform'].forEach(prop => desc.style[prop] = '');

      const dotRect = dot.getBoundingClientRect();
      const descRect = desc.getBoundingClientRect();

      const padding = 10;

      const spaceRight = containerRect.right - dotRect.left;
      const spaceLeft = dotRect.right - containerRect.left;

      const enoughSpaceRight = spaceRight > descRect.width + padding;
      const enoughSpaceLeft = spaceLeft > descRect.width + padding;

      // Horizontal positioning
      if (enoughSpaceLeft && enoughSpaceRight) {
        desc.style.left = '50%';
        desc.style.right = 'auto';
        desc.style.transform = 'translateX(-50%)';
      } else if (enoughSpaceRight) {
        desc.style.left = '100%';
        desc.style.right = 'auto';
        desc.style.transform = 'translateX(0)';
      } else if (enoughSpaceLeft) {
        desc.style.right = '100%';
        desc.style.left = 'auto';
        desc.style.transform = 'translateX(0)';
      } else {
        desc.style.left = '50%';
        desc.style.transform = 'translateX(-50%)';
        desc.style.maxWidth = `${Math.min(spaceLeft, spaceRight) * 2}px`;
      }

      // Vertical positioning
      const spaceBottom = containerRect.bottom - dotRect.bottom;

      if (spaceBottom > descRect.height + padding) {
        desc.style.top = '100%';
        desc.style.bottom = 'auto';
      } else {
        desc.style.bottom = '100%';
        desc.style.top = 'auto';
      }

      desc.style.opacity = 1;
    });
  });
}
// Update positioning for the HotSpot dot's description while resizing or slide changing END

window.addEventListener('load', positionHotspotDescriptions);
window.addEventListener('resize', positionHotspotDescriptions);