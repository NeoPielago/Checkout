'use strict'
;(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var getLazyImages = function () {
      return Array.from(document.querySelectorAll('img[data-lazy-src]'))
    }
    var loadImage = function (image) {
      var lazySrc = image.dataset.lazySrc
      if (typeof lazySrc !== 'string') return
      image.removeAttribute('data-lazy-src')
      image.setAttribute('src', lazySrc)
    }
    if ('IntersectionObserver' in window) {
      var intersectionObserver = new IntersectionObserver(function (
        entries,
        observer
      ) {
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
          var entry = entries_1[_i]
          if (entry.isIntersecting) {
            loadImage(entry.target)
            observer.unobserve(entry.target)
          }
        }
      })
      for (var _i = 0, _a = getLazyImages(); _i < _a.length; _i++) {
        var image = _a[_i]
        intersectionObserver.observe(image)
      }
      return
    }
    try {
      var isInViewPort_1 = function (image) {
        var rect = image.getBoundingClientRect()
        return (
          rect.top >= -rect.height &&
          rect.left >= -rect.width &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) +
              rect.height &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth) +
              rect.width
        )
      }
      var handler = function () {
        for (var _i = 0, _a = getLazyImages(); _i < _a.length; _i++) {
          var image = _a[_i]
          if (isInViewPort_1(image)) loadImage(image)
        }
        if (getLazyImages().length < 1) {
          clearInterval(listener_1)
        }
      }
      var listener_1 = setInterval(handler, 10)
      return
    } catch (error) {
      /** Do nothing */
    }
    for (var _b = 0, _c = getLazyImages(); _b < _c.length; _b++) {
      // eslint-disable-next-line no-redeclare
      var image = _c[_b]
      loadImage(image)
      image.setAttribute('loading', 'lazy')
    }
  })
})()
