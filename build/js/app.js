"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var canUseWebp = function canUseWebp() {
  var elem = document.createElement('canvas');

  if (elem.getContext && elem.getContext('2d')) {
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  return false;
};

var lazyImages = function lazyImages() {
  if (canUseWebp() === false) {
    var lazyBgItems = document.querySelectorAll('.lazy[data-bg-fallback]');
    lazyBgItems.forEach(function (item) {
      var srcBgFallback = item.getAttribute('data-bg-fallback');
      item.setAttribute('data-bg', srcBgFallback);
    });
  } // eslint-disable-next-line no-unused-vars


  var lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy'
  });
};

var mobileNav = function mobileNav() {
  var pageNavToggle = document.querySelectorAll('.nav-toggle');

  if (pageNavToggle) {
    pageNavToggle.forEach(function (el) {
      el.addEventListener('click', function (e) {
        var self = document.querySelector('.root');
        self.classList.toggle('nav-open');
        $('.mobile-nav__second').removeClass('mobile-nav__second--open');
        return false;
      });
    });
  }

  $('.mobile-nav__next').on('click', function (e) {
    e.preventDefault();
    var secondNav = '.' + $(this).attr('data-nav');
    $('.mobile-nav__subnav').removeClass('active');
    $(secondNav).addClass('active');
    $('.mobile-nav__second').addClass('mobile-nav__second--open');
  });
  $('.mobile-nav__back').on('click', function (e) {
    e.preventDefault();
    $('.mobile-nav__second').removeClass('mobile-nav__second--open');
  });
};

var collapce = function collapce() {
  var collapseControl = document.querySelectorAll('.collapse-control');
  collapseControl.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var self = e.currentTarget.closest('.collapse');
      var control = self.querySelector('.collapse-control');
      var content = self.querySelector('.collapse-content');
      self.classList.toggle('open');

      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        content.style.maxHeight = null;
      }

      return false;
    });
  });
};

var maskPhone = function maskPhone(selector) {
  var masked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+7 (___) ___-__-__';
  var elems = document.querySelectorAll(selector);

  function mask(event) {
    var keyCode = event.keyCode;
    var template = masked,
        def = template.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
    console.log(template);
    var i = 0,
        newValue = template.replace(/[_\d]/g, function (a) {
      return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
    });
    i = newValue.indexOf('_');

    if (i !== -1) {
      newValue = newValue.slice(0, i);
    }

    var reg = template.substr(0, this.value.length).replace(/_+/g, function (a) {
      return '\\d{1,' + a.length + '}';
    }).replace(/[+()]/g, '\\$&');
    reg = new RegExp('^' + reg + '$');

    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
      this.value = newValue;
    }

    if (event.type === 'blur' && this.value.length < 5) {
      this.value = '';
    }
  }

  var _iterator = _createForOfIteratorHelper(elems),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var elem = _step.value;
      elem.addEventListener('input', mask);
      elem.addEventListener('focus', mask);
      elem.addEventListener('blur', mask);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};

var tabs = function tabs() {
  var tabs = document.querySelector('.tabs');
  var tabsBtn = document.querySelectorAll('.tabs__btn');
  var tabsContent = document.querySelectorAll('.tabs__content');

  if (tabs) {
    tabs.addEventListener('click', function (e) {
      if (e.target.classList.contains('tabs__btn')) {
        var tabsPath = e.target.dataset.tabsPath;
        tabsBtn.forEach(function (el) {
          el.classList.remove('tabs__btn--active');
        });
        document.querySelector("[data-tabs-path=\"".concat(tabsPath, "\"]")).classList.add('tabs__btn--active');
        tabsHandler(tabsPath);
      }

      if (e.target.classList.contains('tabs__arrow--prev')) {
        var activeBtn = document.querySelector('.tabs__btn--active');
        var activeParent = activeBtn.closest('.tabs__item');
        var previousParent = activeParent.previousElementSibling;

        if (previousParent) {
          var prevActive = previousParent.querySelector('.tabs__btn');
          tabsBtn.forEach(function (el) {
            el.classList.remove('tabs__btn--active');
          });
          prevActive.classList.add('tabs__btn--active');
          var path = prevActive.dataset.tabsPath;
          tabsHandler(path);
        }
      }

      if (e.target.classList.contains('tabs__arrow--next')) {
        var _activeBtn = document.querySelector('.tabs__btn--active');

        var _activeParent = _activeBtn.closest('.tabs__item');

        var nextParent = _activeParent.nextElementSibling;

        if (nextParent) {
          var nextActive = nextParent.querySelector('.tabs__btn');
          tabsBtn.forEach(function (el) {
            el.classList.remove('tabs__btn--active');
          });
          nextActive.classList.add('tabs__btn--active');
          var _path = nextActive.dataset.tabsPath;
          tabsHandler(_path);
        }
      }
    });
  }

  var tabsHandler = function tabsHandler(path) {
    tabsContent.forEach(function (el) {
      el.classList.remove('tabs__content--active');
    });
    document.querySelector("[data-tabs-target=\"".concat(path, "\"]")).classList.add('tabs__content--active');
  };
};

var accordion = function accordion() {
  var accordions = document.querySelectorAll('.accordion-control');
  accordions.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var self = e.currentTarget.closest('.accordion-item');
      var control = self.querySelector('.accordion-control');
      var content = self.querySelector('.accordion-content');
      self.classList.toggle('open'); // если открыт аккордеон

      if (self.classList.contains('open')) {
        control.setAttribute('aria-expanded', true);
        content.setAttribute('aria-hidden', false);
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        control.setAttribute('aria-expanded', false);
        content.setAttribute('aria-hidden', true);
        content.style.maxHeight = null;
      }
    });
  });
};

var textInputBoxPlugin = function textInputBoxPlugin($) {
  $.fn.textInputBox = function (boxClass) {
    if (!boxClass) boxClass = 'input-field';
    $(this).find('.' + boxClass).each(function (index, element) {
      var $box = $(element);
      var $input = $box.find('input, textarea');

      if ($input.attr('required') && !$box.hasClass("".concat(boxClass, "_required"))) {
        $box.addClass("".concat(boxClass, "_required"));
      }

      if ($input.attr('placeholder')) {
        $box.attr('data-placeholder', $input.attr('placeholder'));
      }

      hasValue();
      $input.on('change', hasValue);
      $input.on('focus', function () {
        $box.addClass("".concat(boxClass, "_focus"));
        hasValue();
      }).on('blur', function () {
        $box.removeClass("".concat(boxClass, "_focus"));
        hasValue();
      });

      function hasValue() {
        var hasValueClass = "".concat(boxClass, "_has-value");

        if ($input.val().length > 0) {
          if (!$box.hasClass(hasValueClass)) $box.addClass(hasValueClass);
        } else {
          if ($box.hasClass(hasValueClass)) $box.removeClass(hasValueClass);
        }
      }
    });
  };
};

lazyImages();
tabs();
mobileNav();
collapce();
accordion();
maskPhone('input[name="phone"]'); // Select

var selectElem = document.querySelectorAll('.pretty-select');
selectElem.forEach(function (el) {
  var prettySelect = new Choices(el, {
    searchEnabled: false
  });
}); // tooltips

tippy('[data-tippy-content]'); // Input + placeholder

var $body = $('body');
textInputBoxPlugin($);
$body.textInputBox(); // Custom scroll

document.querySelectorAll('.custom-scroll').forEach(function (el) {
  new SimpleBar(el);
});
$('.footer-nav__view').on('click', function (e) {
  e.preventDefault();
  $(this).toggleClass('open');
  $(this).closest('.footer-nav__content').find('.footer-nav__menu').toggleClass('open');
});

var footerNavToggle = function footerNavToggle() {
  var footerNavControl = document.querySelectorAll('.footer-nav__toggle');
  footerNavControl.forEach(function (el) {
    el.addEventListener('click', function (e) {
      var self = e.currentTarget.closest('.footer-nav__group');
      self.classList.toggle('footer-nav__group--open');
      return false;
    });
  });
};

footerNavToggle();

var sideNav = function sideNav() {
  $('.sidebar__primary--toggle').on('mouseenter', function () {
    var sideNavTarget = '.' + $(this).attr('data-nav');
    $('.sidebar__subnav').removeClass('active');
    $(sideNavTarget).addClass('active');
    $('.sidebar__second').addClass('sidebar__second--open');
  });
  $('.sidebar__primary--link').on('mouseenter', function () {
    $('.sidebar__second').removeClass('sidebar__second--open');
  });
  $('.sidebar').on('mouseleave', function () {
    $('.sidebar__second').removeClass('sidebar__second--open');
  });
};

sideNav(); //Breadcrumb

var breadcrumb = new Swiper('.breadcrumb-slider', {
  loop: false,
  slidesPerView: 'auto',
  simulateTouch: false
}); // Base Range

var rangeField = function rangeField() {
  var $range = $('.range-field-slider');
  $range.ionRangeSlider({
    grid: false,
    skin: 'round',
    onChange: function onChange(data) {}
  });
  $range.on('change', function (data) {
    var $inp = $(this);
    var $rangeField = $inp.closest('.range');
    var rangeFrom = $inp.data('from');
    var rangeTo = $inp.data('to');
    var rangeMax = $inp.attr('data-max');
    var rangeParam = $inp.attr('data-param');
    var rangeValues = $inp.attr('data-range-values');
    var $rangeValFrom = $rangeField.find('.range__value--from');
    var $rangeValTo = $rangeField.find('.range__value--to');
    var $rangePercent = $rangeField.find('.range__value--percent');
    var rangePercentValue = Math.ceil(rangeFrom * 100 / rangeMax) + '%';

    if (rangeValues) {
      var arrRangeValues = rangeValues.split(',');
      var arrRangeFrom = arrRangeValues[rangeFrom];
      var arrRangeTo = arrRangeValues[rangeTo];
      $rangeValFrom.text(arrRangeFrom);
      $rangeValTo.text(arrRangeTo);
    } else {
      $rangeValFrom.text(rangeFrom);
      $rangeValTo.text(rangeTo);
    }

    $rangePercent.text(rangePercentValue);
  });
  $('.range__dropdown--button').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $range = $this.closest('.range');

    if ($this.hasClass('active')) {
      $this.removeClass('active');
      $range.removeClass('range--fix-dropdown');
    } else {
      $range.find('.range__dropdown--button').removeClass('active');
      $this.addClass('active');
      $range.addClass('range--fix-dropdown');
    }
  });
};

rangeField(); // drop-down list field

var prettyField = function prettyField() {
  $('.field__select').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $field = $this.closest('.field');
    $field.toggleClass('is-open');
  });
  $('.field__dropdown--item').on('click', function (e) {
    e.preventDefault();
    var $field = $(this).closest('.field');
    $field.removeClass('is-open');
  });
  $('.field__dropdown--clear').on('click', function (e) {
    e.preventDefault();
    var $field = $(this).closest('.field');
    $field.removeClass('is-open');
  });
  $body.on('click', function (event) {
    if ($(event.target).closest('.field').length === 0) {
      $('.field').removeClass('is-open');
    }
  });
  document.querySelectorAll('.field__dropdown--scroll').forEach(function (el) {
    new SimpleBar(el);
  });
};

prettyField(); // Item

$('.item__toggle').on('click', function (e) {
  e.preventDefault();
  var $item = $(this).closest('.item');
  $item.toggleClass('item--switch');
});
$('.item__tags--toggle').on('click', function (e) {
  e.preventDefault();
  var $item = $(this).closest('.item__tags');
  $item.toggleClass('open');
  $item.find('.item__tags--dropdown').slideToggle('fast');
}); // Condition slider

var serviceSlider = new Swiper('.conditions__slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  navigation: {
    nextEl: '.conditions-next',
    prevEl: '.conditions-prev'
  },
  breakpoints: {
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 16
    },
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 24
    },
    1760: {
      slidesPerView: 'auto',
      spaceBetween: 40
    }
  }
}); // Viewed slider

var viewedSlider = new Swiper('.viewed__slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  navigation: {
    nextEl: '.viewed-next',
    prevEl: '.viewed-prev'
  },
  breakpoints: {
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 16
    },
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 24
    },
    1420: {
      slidesPerView: 'auto',
      spaceBetween: 40
    },
    1760: {
      slidesPerView: 'auto',
      spaceBetween: 40
    }
  }
}); // Articles slider

var articlesSlider = new Swiper('.articles-slider', {
  slidesPerView: 2,
  spaceBetween: 24,
  navigation: {
    nextEl: '.articles-next',
    prevEl: '.articles-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 24
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 24
    },
    1420: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1760: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
}); // filter

var filter = function filter() {
  $('.filter-toggle').on('click', function (e) {
    e.preventDefault();
    $('.filter-mobile').toggleClass('open');
  });
  $('.filter-mobile-accept').on('click', function (e) {
    e.preventDefault();
    $('.filter-mobile').removeClass('open');
  });
  $('.filter-mobile__toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('filter-mobile__toggle--open');
    $('.filter-mobile__secondary').toggleClass('filter-mobile__secondary--open');
  });
  $('.filter__toggle').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('filter__toggle--open');
    $('.filter__secondary').slideToggle('fast');
  });
};

filter(); // sorter__item

$('.sorter__item').on('click', function (e) {
  e.preventDefault();
  var $this = $(this);
  var $sorter = $this.closest('.sorter');

  if ($this.hasClass('active')) {
    $this.toggleClass('sorter-invert');
  } else {
    $sorter.find('.sorter__item').removeClass('active');
    $this.addClass('active');
  }
});
var postProjectSlider = new Swiper('.post-projects__slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  simulateTouch: false,
  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 16
    },
    992: {
      slidesPerView: 3,
      spaceBetween: 40
    },
    1760: {
      slidesPerView: 'auto',
      spaceBetween: 40
    }
  }
});
var postGallerySlider = new Swiper('.post-gallery__slider', {
  slidesPerView: 1,
  spaceBetween: 24,
  loop: true,
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev'
  }
});
$('.subscribe__close').on('click', function (e) {
  e.preventDefault();
  $('.subscribe').hide();
});
var tagSlider = new Swiper('.tags__slider', {
  slidesPerView: 'auto',
  spaceBetween: 8,
  simulateTouch: false,
  breakpoints: {
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 16
    }
  }
});
var objectPromoSlider = new Swiper('.object-promo-slider', {
  slidesPerView: 'auto',
  spaceBetween: 8,
  loop: true,
  navigation: {
    nextEl: '.object-promo-next',
    prevEl: '.object-promo-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 16
    },
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 24
    }
  }
});
var objectFlatsSlider = new Swiper('.object-flats-slider', {
  slidesPerView: 'auto',
  spaceBetween: 24,
  loop: false,
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 16
    },
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 24
    },
    1200: {
      slidesPerView: 'auto',
      spaceBetween: 36
    },
    1420: {
      slidesPerView: 'auto',
      spaceBetween: 36
    },
    1760: {
      slidesPerView: 'auto',
      spaceBetween: 48
    }
  }
});

var finishing = function finishing() {
  $('.finishing-nav__label').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $elem = $this.closest('.finishing-nav__switch');
    $elem.toggleClass('finishing-nav__switch--open');
  });
  $('.finishing-nav__item').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);
    var $switch = $(this).closest('.finishing-nav__switch');
    var $elem = $this.closest('.finishing');
    var Tab = $this.attr('data-target');
    var thisName = $this.text();
    $switch.removeClass('finishing-nav__switch--open');
    $switch.find('.finishing-nav__label--active').text(thisName);
  });
  $body.on('click', function (event) {
    if ($(event.target).closest('.finishing-nav__switch').length === 0) {
      $('.finishing-nav__switch').removeClass('finishing-nav__switch--open');
    }
  });
};

finishing();

var projectProgress = function projectProgress() {
  var projectProgressSlider = new Swiper('.project-progress-slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: false,
    simulateTouch: true,
    navigation: {
      nextEl: '.progress-next',
      prevEl: '.progress-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 16
      },
      1200: {
        slidesPerView: 'auto',
        spaceBetween: 24
      },
      1760: {
        slidesPerView: 'auto',
        spaceBetween: 40
      }
    }
  });
};

projectProgress(); // credit filter

$('.credit-filter__toggle').on('click', function (e) {
  e.preventDefault();
  $('.credit-filter__additional').slideToggle('fast');
});
$('.credit__toggle').on('click', function (e) {
  e.preventDefault();
  var $item = $(this).closest('.credit');
  $item.toggleClass('credit--open');
  $item.find('.credit__options').slideToggle('fast');
});
var postSlider = new Swiper('.post-slider', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  loop: false,
  simulateTouch: true,
  navigation: {
    nextEl: '.post-next',
    prevEl: '.post-prev'
  },
  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 24
    },
    1760: {
      slidesPerView: 'auto',
      spaceBetween: 40
    }
  }
});
$('.docs-view').on('click', function (e) {
  e.preventDefault();
  $(this).toggleClass('open');
  $('.docs').toggleClass('docs--open');
});

var projectTop = function projectTop() {
  var bar = document.querySelector('.top-bar');

  if (bar) {
    var $bar = $(bar);
    var $h = $bar.offset().top;
    $(window).scroll(function () {
      if ($(window).scrollTop() > $h) {
        $bar.addClass('top-bar--visible');
      } else {
        $bar.removeClass('top-bar--visible');
      }
    });
  }
};

projectTop(); // Flat Gallery

var flatMedia = function flatMedia() {
  var flatThumbs = new Swiper('.flat-media-thumbs', {
    slidesPerView: 4,
    spaceBetween: 16,
    loop: true,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true
  });
  var flatGallery = new Swiper('.flat-media-gallery', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    thumbs: {
      swiper: flatThumbs
    },
    navigation: {
      nextEl: '.gallery-next',
      prevEl: '.gallery-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        spaceBetween: 16
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 24
      }
    }
  });
  $('.flat-info-view').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $('.flat__info--advance').slideToggle('fast');
  });
};

flatMedia();
$('body').on('click', '.scrolltop', function () {
  $('html, body').stop().animate({
    scrollTop: 0
  }, 500, 'swing');
});