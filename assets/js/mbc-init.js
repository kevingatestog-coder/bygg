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

    initMobileMenu(header);
  }

  function initMobileMenu(header) {
    var toggle = header.querySelector('.navbar-toggle');
    if (!toggle) return;

    function close() {
      header.classList.remove('mbc-mobile-open');
      document.body.style.overflow = '';
    }
    function open() {
      header.classList.add('mbc-mobile-open');
      document.body.style.overflow = 'hidden';
    }

    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (header.classList.contains('mbc-mobile-open')) {
        close();
      } else {
        open();
      }
    });

    // Close on link click (except dropdown-toggle parents that just expand)
    var menuLinks = header.querySelectorAll('.navbar-collapse a');
    for (var i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener('click', function (e) {
        if (this.classList.contains('dropdown-toggle')) return;
        if (this.getAttribute('href') === '#' || this.getAttribute('href') === '') return;
        close();
      });
    }

    // ESC closes the overlay
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('mbc-mobile-open')) {
        close();
      }
    });

    // If viewport grows beyond mobile, close overlay automatically
    window.addEventListener('resize', function () {
      if (window.innerWidth > 992 && header.classList.contains('mbc-mobile-open')) {
        close();
      }
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
