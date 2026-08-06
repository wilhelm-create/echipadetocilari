/**
 * Scroll reveals + Lottie. Content is never hidden — only transform animations.
 */
(function () {
  'use strict';

  var SELECTOR = '[data-animate], .reveal';
  var readyAttr = 'data-motion-ready';

  function reducedMotion() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch (e) {
      return false;
    }
  }

  function markInView(el) {
    if (!el || el.classList.contains('is-inview')) return;
    el.classList.add('is-inview');
  }

  function initReveal() {
    var nodes = document.querySelectorAll(SELECTOR);
    if (!nodes.length) return;

    // Mark everything currently in viewport immediately
    function revealVisible() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      nodes.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        // partially visible
        if (rect.top < vh * 0.95 && rect.bottom > 0) {
          markInView(el);
        }
      });
    }

    if (reducedMotion()) {
      nodes.forEach(markInView);
      return;
    }

    revealVisible();

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(markInView);
      return;
    }

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var delay = parseInt(el.getAttribute('data-delay') || '0', 10) || 0;
          var stagger = parseInt(el.getAttribute('data-stagger') || '0', 10) || 0;
          var extra = stagger > 0 ? (stagger - 1) * 70 : 0;
          window.setTimeout(function () {
            markInView(el);
          }, delay + extra);
          io.unobserve(el);
        });
      },
      { threshold: 0.05, rootMargin: '40px 0px 0px 0px' }
    );

    nodes.forEach(function (el) {
      if (!el.classList.contains('is-inview')) io.observe(el);
    });

    // Failsafe
    window.setTimeout(function () {
      document.querySelectorAll(SELECTOR).forEach(markInView);
    }, 1200);
  }

  function initLottie() {
    var hosts = document.querySelectorAll('[data-lottie]');
    if (!hosts.length || reducedMotion()) return;

    function boot(lottie) {
      if (!lottie || typeof lottie.loadAnimation !== 'function') return;

      hosts.forEach(function (host) {
        if (host.getAttribute(readyAttr) === '1') return;
        var path = host.getAttribute('data-lottie');
        if (!path) return;
        host.setAttribute(readyAttr, '1');

        try {
          lottie.loadAnimation({
            container: host,
            renderer: 'svg',
            loop: host.getAttribute('data-lottie-loop') !== 'false',
            autoplay: true,
            path: path,
          });
        } catch (err) {
          console.warn('[motion] lottie', err);
        }
      });
    }

    if (window.lottie) {
      boot(window.lottie);
      return;
    }

    var s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    s.async = true;
    s.onload = function () {
      boot(window.lottie);
    };
    document.head.appendChild(s);
  }

  function init() {
    initReveal();
    initLottie();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
