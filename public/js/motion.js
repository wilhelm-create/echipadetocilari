/**
 * Scroll reveals + Lottie — plain IIFE, no bundler, no circular deps.
 * Loaded as classic <script defer src="/js/motion.js">
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

    // Always show content eventually (a11y + no-JS-failsafe already in CSS)
    if (reducedMotion()) {
      nodes.forEach(markInView);
      return;
    }

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
          var extra = stagger > 0 ? (stagger - 1) * 80 : 0;
          window.setTimeout(function () {
            markInView(el);
          }, delay + extra);
          io.unobserve(el);
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -5% 0px',
      }
    );

    nodes.forEach(function (el) {
      io.observe(el);
    });

    // Failsafe: nothing stays invisible forever
    window.setTimeout(function () {
      document.querySelectorAll(SELECTOR).forEach(function (el) {
        if (!el.classList.contains('is-inview')) markInView(el);
      });
    }, 2500);
  }

  function initLottie() {
    var hosts = document.querySelectorAll('[data-lottie]');
    if (!hosts.length) return;
    if (reducedMotion()) return;

    function boot(lottie) {
      if (!lottie || typeof lottie.loadAnimation !== 'function') {
        console.warn('[motion] lottie.loadAnimation missing');
        return;
      }

      hosts.forEach(function (host) {
        if (host.getAttribute(readyAttr) === '1') return;
        var path = host.getAttribute('data-lottie');
        if (!path) return;
        host.setAttribute(readyAttr, '1');

        var loop = host.getAttribute('data-lottie-loop') !== 'false';
        var anim;
        try {
          anim = lottie.loadAnimation({
            container: host,
            renderer: 'svg',
            loop: loop,
            autoplay: true,
            path: path,
          });
        } catch (err) {
          console.warn('[motion] lottie error', err);
          return;
        }

        if ('IntersectionObserver' in window) {
          var pio = new IntersectionObserver(
            function (entries) {
              entries.forEach(function (entry) {
                if (!anim) return;
                if (entry.isIntersecting) anim.play();
                else anim.pause();
              });
            },
            { threshold: 0.05 }
          );
          pio.observe(host);
        }
      });
    }

    // Prefer global from CDN; else dynamic import of local vendor file
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
    s.onerror = function () {
      console.warn('[motion] failed to load lottie CDN');
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
