/* Elementor static animation polyfill */
(function () {
  function reduce() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function revealEl(el) {
    if (!el || el.dataset.ectRevealed === '1') return;
    el.dataset.ectRevealed = '1';
    var settings = {};
    try {
      var raw = el.getAttribute('data-settings');
      if (raw) settings = JSON.parse(raw);
    } catch (e) {}
    var anim = settings.animation || settings._animation || '';
    el.classList.remove('elementor-invisible');
    if (anim && !reduce()) {
      el.style.animationName = anim;
      el.classList.add('animated', anim);
      // load CSS if Elementor didn't
      var href =
        '/wp-content/plugins/elementor/assets/lib/animations/styles/' +
        anim +
        '.min.css';
      if (!document.querySelector('link[href*="' + anim + '.min"]')) {
        var l = document.createElement('link');
        l.rel = 'stylesheet';
        l.href = href;
        document.head.appendChild(l);
      }
    } else {
      el.style.opacity = '1';
      el.style.visibility = 'visible';
    }
  }

  function initEntrance() {
    var nodes = document.querySelectorAll('.elementor-invisible, [data-settings*="animation"]');
    if (!nodes.length) return;

    if (reduce() || !('IntersectionObserver' in window)) {
      nodes.forEach(revealEl);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          revealEl(entry.target);
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });

    // above-the-fold immediate
    setTimeout(function () {
      nodes.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.9 && r.bottom > 0) revealEl(el);
      });
    }, 100);

    // failsafe: never leave invisible
    setTimeout(function () {
      document.querySelectorAll('.elementor-invisible').forEach(revealEl);
    }, 2000);
  }

  function initLottieFallback() {
    if (reduce()) return;
    var hosts = document.querySelectorAll('.elementor-widget-lottie, .e-lottie__container');
    if (!hosts.length) return;

    function run(lottie) {
      if (!lottie || !lottie.loadAnimation) return;
      document.querySelectorAll('.elementor-widget-lottie').forEach(function (widget) {
        if (widget.dataset.ectLottie === '1') return;
        var container = widget.querySelector('.e-lottie__animation') || widget;
        if (container.querySelector('svg')) return; // already rendered by Elementor
        var settings = {};
        try {
          var el = widget.closest('.elementor-element') || widget;
          var raw = el.getAttribute('data-settings');
          if (raw) settings = JSON.parse(raw);
        } catch (e) {}
        var url =
          (settings.source_json && settings.source_json.url) ||
          (settings.custom_json_url && settings.custom_json_url.url) ||
          '';
        if (!url) return;
        widget.dataset.ectLottie = '1';
        try {
          lottie.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: settings.loop !== 'no',
            autoplay: true,
            path: url,
          });
        } catch (err) {
          console.warn('[ect] lottie', err);
        }
      });
    }

    // Prefer already-loaded lottie from Elementor
    if (window.lottie) {
      // Wait a bit for Elementor Pro to init first
      setTimeout(function () {
        run(window.lottie);
      }, 800);
      return;
    }

    var s = document.createElement('script');
    s.src = '/wp-content/plugins/elementor-pro/assets/lib/lottie/lottie.min.js';
    s.onload = function () {
      setTimeout(function () {
        run(window.lottie);
      }, 200);
    };
    document.head.appendChild(s);
  }

  function boot() {
    initEntrance();
    initLottieFallback();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
  // Elementor may finish later
  window.addEventListener('elementor/frontend/init', function () {
    setTimeout(initLottieFallback, 300);
  });
  setTimeout(boot, 1500);
})();
