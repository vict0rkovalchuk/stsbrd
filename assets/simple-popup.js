document.addEventListener("DOMContentLoaded", function () {
  const popupWrapper = document.getElementById('popup-wrapper');
  const closeTriggers = document.querySelectorAll('#popup-overlay, #popup-close');

  const openPopup = () => {
    if (!sessionStorage.getItem('popupShown')) {
      popupWrapper.classList.remove('hidden');
      sessionStorage.setItem('popupShown', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  const closePopup = () => {
    popupWrapper.classList.add('hidden');
    document.body.style.overflow = '';
  };

  closeTriggers.forEach(trigger => trigger.addEventListener('click', closePopup));

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closePopup();
  });

  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    const pageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollPosition = scrollY + viewportHeight;

    if (scrollPosition >= pageHeight / 2) {
      openPopup();
      window.removeEventListener('scroll', handleScroll);
    }
  };

  window.addEventListener('scroll', handleScroll);
});
