/* MBC – egen scroll-styrning för transparent header.
   Mallens script.js hanterar inte scroll-css korrekt vid pageload, så vi kör vår egen.
   Sätter klassen .mbc-scrolled på <header> när användaren scrollat förbi 40 px. */
(function () {
  function init() {
    var header = document.querySelector('header.fixed-top');
    if (!header) return;

    var threshold = 40;
    var ticking = false;
    var lastY = -1;

    function update() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y === lastY) return;
      lastY = y;
      if (y > threshold) {
        header.classList.add('mbc-scrolled');
      } else {
        header.classList.remove('mbc-scrolled');
      }
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
