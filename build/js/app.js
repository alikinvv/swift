"use strict";

var _this = void 0;

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

var maskPhone = function maskPhone(selector) {
  var masked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '+7 (___) ___-__-__';
  var elems = document.querySelectorAll(selector);

  function mask(event) {
    var keyCode = event.keyCode;
    var template = masked,
        def = template.replace(/\D/g, ''),
        val = this.value.replace(/\D/g, '');
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

$('body').on('click', '.tabs__btn', function (e) {
  $(e.currentTarget).closest('.tabs__list').find('.tabs__btn').removeClass('tabs__btn--active');
  $(e.currentTarget).closest('.tabs').find('.tabs__content').removeClass('tabs__content--active');
  $(".tabs__content[data-tabs-target=\"".concat($(e.currentTarget).attr('data-tabs-path'), "\"]")).addClass('tabs__content--active');
  $(e.currentTarget).closest('.tabs__header').find('.bar').animate({
    width: $(e.currentTarget).width(),
    left: $(e.currentTarget).position().left
  });
});
$('.bar').each(function () {
  $(this).closest('.tabs__header').find('.bar').animate({
    width: $(this).closest('.tabs__header').find('.tabs__btn--active').width(),
    left: $(this).closest('.tabs__header').find('.tabs__btn--active').position().left
  });
});
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

maskPhone('input[name="phone"]'); // Select

document.querySelectorAll('.pretty-select').forEach(function (el) {
  var prettySelect = new Choices(el, {
    searchEnabled: false
  });
}); // tooltips

tippy('[data-tippy-content]'); // Input + placeholder

var $body = $('body');
textInputBoxPlugin($);
$body.textInputBox(); // mobile breadcrumbs

$('body').on('click', '.breadcrumb__toggle', function (e) {
  $(e.currentTarget).toggleClass('active');
  $('.breadcrumb__main').toggleClass('active');
});

if ($(window).width() < 768) {
  $('.breadcrumb__main').addClass('custom-scroll');
}

$('.footer-nav__view').on('click', function (e) {
  e.preventDefault();
  $(this).toggleClass('open');
  $(this).closest('.footer-nav__content').find('.footer-nav__menu').toggleClass('open');
});
var footerNavControl = document.querySelectorAll('.footer-nav__toggle');
footerNavControl.forEach(function (el) {
  el.addEventListener('click', function (e) {
    var self = e.currentTarget.closest('.footer-nav__group');
    self.classList.toggle('footer-nav__group--open');
    return false;
  });
});
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
}); //Breadcrumb

var breadcrumb = new Swiper('.breadcrumb-slider', {
  loop: false,
  slidesPerView: 'auto',
  simulateTouch: false
}); // Base Range

var $area = $('.slider-area');
var areamin = 1;
var areamax = 400;
var areafrom = 15;
var areato = 270;
var $cost = $('.slider-cost');
var costmin = 0.5;
var costmax = 150;
var costfrom = 5.9;
var costto = 127.7;
var $floor = $('.slider-floor');
var floormin = 0;
var floormax = 30;
var floorfrom = 7;
var floorto = 22;
var $date = $('.slider-date');
var datemin = 0;
var datemax = 13;
var datefrom = 1;
var dateto = 14;
var $price = $('.slider-price');
var pricemin = 500000;
var pricemax = 50000000;
var pricefrom = 3000000;
var $first = $('.slider-first');
var firstmin = 500000;
var firstmax = 15000000;
var firstfrom = 3000000;
var $time = $('.slider-time');
var timemin = 1;
var timemax = 30;
var timefrom = 10;
var instance;
$area.ionRangeSlider({
  grid: false,
  skin: 'round',
  min: areamin,
  max: areamax,
  type: 'double',
  from: areafrom,
  to: areato,
  step: 1,
  onChange: function onChange(data) {
    sliderChange(data, 'area');
  }
});
$cost.ionRangeSlider({
  grid: false,
  skin: 'round',
  min: costmin,
  max: costmax,
  type: 'double',
  from: costfrom,
  to: costto,
  step: 0.1,
  onChange: function onChange(data) {
    sliderChange(data, 'cost');
  }
});
$floor.ionRangeSlider({
  grid: false,
  skin: 'round',
  min: floormin,
  max: floormax,
  type: 'double',
  from: floorfrom,
  to: floorto,
  step: 1,
  onChange: function onChange(data) {
    sliderChange(data, 'floor');
  }
});
$date.ionRangeSlider({
  grid: false,
  skin: 'round',
  onChange: function onChange(data) {}
});
$price.ionRangeSlider({
  grid: false,
  skin: 'round',
  min: pricemin,
  max: pricemax,
  type: 'single',
  prettify_enabled: true,
  prettify_separator: ' ',
  from: pricefrom,
  step: 1,
  onChange: function onChange(data) {
    sliderChange(data, 'price');
  }
});
$first.ionRangeSlider({
  grid: false,
  skin: 'round',
  min: firstmin,
  max: firstmax,
  type: 'single',
  from: firstfrom,
  prettify_enabled: true,
  prettify_separator: ' ',
  step: 1,
  onChange: function onChange(data) {
    sliderChange(data, 'first');
  }
});
$time.ionRangeSlider({
  grid: false,
  skin: 'round',
  min: timemin,
  max: timemax,
  type: 'single',
  from: timefrom,
  step: 1,
  onChange: function onChange(data) {
    sliderChange(data, 'time');
  }
});
$('body').on('keypress', '.range__value', function (event) {
  return event.charCode >= 48 && event.charCode <= 57 || event.charCode == 46 || event.charCode == 44 || event.charCode == 0;
});
$('body').on('keyup', '.range__value', function (event) {
  this.value = this.value.replace(/ /g, '');
  var number = this.value;
  this.value = number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
});

var sliderChange = function sliderChange(data, slider) {
  var $sliderFrom = $("input.range__value--from[data-slider=\"".concat(slider, "\"]"));
  var $sliderTo = $("input.range__value--to[data-slider=\"".concat(slider, "\"]"));
  $sliderFrom.val(data.from_pretty);

  if ($sliderTo.length > 0) {
    $sliderTo.val(data.to_pretty);
  }

  if ($(".slider-".concat(slider)).closest('.range').find('.range__value--percent').length > 0) {
    $(".slider-".concat(slider)).closest('.range').find('.range__value--percent').text(Math.ceil(data.from * 100 / data.max) + '%');
  }
};

$('.range__value--from').on('change', function () {
  var val = $(this).prop('value').replace(/ /g, '');
  var instance = null;

  if ($(this).attr('data-slider') === 'price') {
    pricefrom = $price.closest('.range').find('.range__value--from').val();
    instance = $price.data('ionRangeSlider');
    val = validateFrom(val, pricemin);
    instance.update({
      from: val
    });
  }

  if ($(this).attr('data-slider') === 'area') {
    areafrom = $area.closest('.range').find('.range__value--from').val();
    areato = $area.closest('.range').find('.range__value--to').val();
    instance = $area.data('ionRangeSlider');
    val = validateFrom(val, areamin, areato);
    instance.update({
      from: val
    });
  }

  if ($(this).attr('data-slider') === 'cost') {
    costfrom = $cost.closest('.range').find('.range__value--from').val();
    costto = $cost.closest('.range').find('.range__value--to').val();
    instance = $cost.data('ionRangeSlider');
    val = validateFrom(val, costmin, costto);
    instance.update({
      from: val
    });
  }

  if ($(this).attr('data-slider') === 'floor') {
    floorfrom = $floor.closest('.range').find('.range__value--from').val();
    floorto = $floor.closest('.range').find('.range__value--to').val();
    instance = $floor.data('ionRangeSlider');
    val = validateFrom(val, floormin, floorto);
    instance.update({
      from: val
    });
  }

  $(this).prop('value', val);
});

var setFrom = function setFrom(from, to, $slider, val, min) {
  var instance = null;
  from = $slider.closest('.range').find('.range__value--from').val();
  to = $slider.closest('.range').find('.range__value--to').val();
  instance = $slider.data('ionRangeSlider');
  val = parseFloat(val);
  val = validateFrom(val, min, to);
  instance.update({
    from: val
  });
  $slider.closest('.range').find('.range__value--from').val(0);
};

var validateFrom = function validateFrom(val, min, to) {
  if (parseFloat(val) < min) {
    val = min;
  } else if (parseFloat(val) > to) {
    val = to;
  }

  return val;
};

$('.range__value--to').on('change', function () {
  var val = $(this).prop('value');
  var instance = null;

  if ($(this).attr('data-slider') === 'area') {
    areafrom = $area.closest('.range').find('.range__value--from').val();
    areato = $area.closest('.range').find('.range__value--to').val();
    instance = $area.data('ionRangeSlider');
    val = validateTo(val, areamax, areafrom);
    instance.update({
      to: val
    });
  }

  if ($(this).attr('data-slider') === 'cost') {
    costfrom = $cost.closest('.range').find('.range__value--from').val();
    costto = $cost.closest('.range').find('.range__value--to').val();
    instance = $cost.data('ionRangeSlider');
    val = validateTo(val, costmax, costfrom);
    instance.update({
      to: val
    });
  }

  if ($(this).attr('data-slider') === 'floor') {
    floorfrom = $floor.closest('.range').find('.range__value--from').val();
    floorto = $floor.closest('.range').find('.range__value--to').val();
    instance = $floor.data('ionRangeSlider');
    val = validateTo(val, floormax, floorfrom);
    instance.update({
      to: val
    });
  }

  $(this).prop('value', val);
});

var setTo = function setTo(from, to, $slider, val, max) {
  from = $slider.closest('.range').find('.range__value--from').val();
  to = $slider.closest('.range').find('.range__value--to').val();
  instance = $slider.data('ionRangeSlider');
  val = validateTo(val, max, from);
  instance.update({
    to: val
  });
  $slider.closest('.range').find('.range__value--to').val(val);
};

var validateTo = function validateTo(val, max, from) {
  if (parseFloat(val) < from) {
    val = from;
  } else if (parseFloat(val) > max) {
    val = max;
  }

  return val;
};

$date.on('change', function () {
  var $inp = $(this);
  var $rangeField = $inp.closest('.range');
  var rangeFrom = $inp.data('from');
  var rangeTo = $inp.data('to');
  var rangeValues = $inp.attr('data-range-values');
  var $rangeValFrom = $rangeField.find('.range__value--from');
  var $rangeValTo = $rangeField.find('.range__value--to');
  var arrRangeValues = rangeValues.split(',');
  var arrRangeFrom = arrRangeValues[rangeFrom];
  var arrRangeTo = arrRangeValues[rangeTo];
  $rangeValFrom.text(arrRangeFrom);
  $rangeValTo.text(arrRangeTo);
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
}); // drop-down list field

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
}); // Item

$('.item__toggle').on('click', function (e) {
  e.preventDefault();
  var $item = $(this).closest('.item');
  $item.toggleClass('item--switch');
});

if ($(window).width() > 1024) {
  $('.item__tags--toggle').on('mouseover', function (e) {
    var $item = $(this).closest('.item__tags');
    $item.addClass('show');
  });
  $('.item__tags--toggle').on('mouseleave', function (e) {
    var $item = $(this).closest('.item__tags');
    $item.removeClass('show');
  });
} // item tags on touch devices


$('body').on('click', '.item__tags--toggle', function (e) {
  if ($(window).width() <= 1024) {
    $(e.currentTarget).parent().find('.item__tag').toggleClass('active');
    $(e.currentTarget).toggleClass('active');
  }
}); // Main slider

var mainSlider = new Swiper('.main__slider', {
  slidesPerView: 1,
  spaceBetween: 16,
  effect: 'fade',
  loop: true,
  navigation: {
    nextEl: '.main .slider-next',
    prevEl: '.main .slider-prev'
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  breakpoints: {
    1024: {
      spaceBetween: 16
    },
    1200: {
      spaceBetween: 24
    }
  },
  on: {
    slideChange: function slideChange(index) {
      $('.main__num span').removeClass('active');
      $('.main__line').removeClass('active');

      if ($('.main .swiper-slide').length - 2 === index.activeIndex - 1) {
        $('.main__num span').eq(0).addClass('active');
        $('.main__num span').eq(0).next().addClass('active');
      } else {
        $('.main__num span').eq(index.activeIndex - 1).addClass('active');
        $('.main__num span').eq(index.activeIndex - 1).next().addClass('active');
      }
    }
  }
});
$('body').on('click', '.main__num span', function (e) {
  mainSlider.slideTo($(e.currentTarget).text());
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
      spaceBetween: 24
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
});
$('.filter-toggle').on('click', function (e) {
  e.preventDefault();
  $('.filter').toggleClass('open');
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
  $('.yandex-btn').toggleClass('active');
}); // sorter__item

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
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
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
var objectPromoSliderFull = new Swiper('.object-promo-slider-full:not(.fade)', {
  slidesPerView: 1,
  spaceBetween: 8,
  allowTouchMove: true,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.object-promo-next',
    prevEl: '.object-promo-prev'
  },
  breakpoints: {
    768: {
      spaceBetween: 16
    },
    1200: {
      spaceBetween: 24,
      allowTouchMove: false
    }
  }
});
var objectPromoSliderFullFade = new Swiper('.object-promo-slider-full.fade', {
  slidesPerView: 1,
  spaceBetween: 8,
  allowTouchMove: true,
  loop: true,
  effect: 'fade',
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction'
  },
  navigation: {
    nextEl: '.object-promo-next',
    prevEl: '.object-promo-prev'
  },
  breakpoints: {
    768: {
      spaceBetween: 16
    },
    1200: {
      spaceBetween: 24,
      allowTouchMove: false
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
}); // credit filter

$('.credit-filter__toggle').on('click', function (e) {
  e.preventDefault();
  $(e.currentTarget).toggleClass('filter__toggle--open');
  $('.credit-filter__additional').slideToggle('fast');
});
$('.credit__main--primary').on('click', function () {
  $(this).closest('.credit').toggleClass('credit--open');
  $(this).closest('.credit').find('.credit__options').slideToggle('fast');
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
}); // scrolltop button

$('body').on('click', '.scrolltop', function () {
  $('html, body').stop().animate({
    scrollTop: 0
  }, 500, 'swing');
}); // click on checkbox tooltip on mobile

$('body').on('click', '.btn-checkbox', function (e) {
  if ($(window).width() <= 1279) {
    if ($(e.target)[0].tagName === 'use' || $(e.target)[0].tagName === 'svg') {
      var $input = $(e.currentTarget).find('input');

      if ($input.is(':checked')) {
        $input.prop('checked', false);
      } else {
        $input.prop('checked', true);
      }
    }
  }
}); // location

$('body').on('click', '.open-location', function () {
  $('html, body').toggleClass('overflow');
  $('.location').toggleClass('active');
});
$('body').on('click', '.location__close', function () {
  $('html, body').toggleClass('overflow');
  $('.location').toggleClass('active');
});
$('body').on('click', '.metro__filter .btn-reset, .location .btn-reset', function (e) {
  $('.select.ln .select__input').val('');
  $('.select.ln .select__count').remove();
  $('.metro__filter .checkbox-group__input').prop('checked', false);
  $('.tabs__content--active .location__content input[type="checkbox"]').prop('checked', false);
  $('.tabs__content--active .MetroMap_station_item,.tabs__content--active .MetroMap_stop,.tabs__content--active .MetroMap_transit_group,.tabs__content--active .MetroMap_line_item').removeClass('selected');
  $('.tabs__content--active circle[r="8"]').attr('r', 6);
  $('.tabs__btn--active').removeClass('hasFilter');
  $('.location__controls .btn-reset').removeClass('show');
  $('.metro__filter .btn-reset').removeClass('active');
});
$('body').on('change', '.location .checkbox-group__input', function () {
  if ($('.location .tabs__content--active .checkbox-group__input:checked').length === 0) {
    $('.tabs__btn--active').removeClass('hasFilter');
  } else {
    $('.tabs__btn--active').addClass('hasFilter');
  }
}); // set target tab

$('body').on('click', '[open-tab]', function (e) {
  $('.tabs__btn').removeClass('tabs__btn--active');
  $('.tabs__content').removeClass('tabs__content--active');
  $(".tabs__btn[data-tabs-path=\"".concat($(e.currentTarget).attr('open-tab'), "\"]")).addClass('tabs__btn--active');
  $(".tabs__content[data-tabs-target=\"".concat($(e.currentTarget).attr('open-tab'), "\"]")).addClass('tabs__content--active');
  $('.tabs').find('.bar').animate({
    width: $('.tabs').find('.tabs__btn--active').width(),
    left: $('.tabs').find('.tabs__btn--active').position().left
  });
}); // sticky elements

if ($(window).width() >= 1024 && $('.credit-filter').length > 0) {
  var sticky = new Sticky('.credit-filter', {
    marginTop: 100
  });
}

$('body').on('click', 'a[data-view]', function (e) {
  $('a[data-view]').removeClass('active');
  $('div[data-view]').removeClass('active');
  $("a[data-view=\"".concat($(e.currentTarget).attr('data-view'), "\"]")).addClass('active');
  $("div[data-view=\"".concat($(e.currentTarget).attr('data-view'), "\"]")).addClass('active');

  if ($('.items-list').hasClass('active')) {
    var stickyTable = new Sticky('.table__header', {});
  }
});

if ($('#map').length > 0) {
  // google map
  var initMap = function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 55.776212,
        lng: 37.750353
      },
      zoom: 13
    });
    var icons = {
      house: {
        icon: 'img/marker.png'
      },
      shop: {},
      pharmacy: {
        icon: 'img/icons/pharmacy.svg'
      },
      policlinic: {
        icon: 'img/icons/policlinic.svg'
      },
      restaurant: {
        icon: 'img/icons/restaurant.svg'
      },
      school: {
        icon: 'img/icons/school.svg'
      },
      kinder: {
        icon: 'img/icons/kinder.svg'
      },
      mall: {
        icon: 'img/icons/mall.svg'
      },
      temples: {
        icon: 'img/icons/temples.svg'
      }
    };
    var house = {
      type: 'house',
      icon: 'img/marker.png',
      items: [{
        name: 'Пятерочка',
        addr: 'Московский проспект 4, корпус 12',
        position: new google.maps.LatLng(55.782838, 37.738592)
      }]
    };
    var shop = {
      type: 'shop',
      icon: 'img/icons/shop.svg',
      items: [{
        name: 'Пятерочка',
        addr: 'Московский проспект 4, корпус 12',
        position: new google.maps.LatLng(55.776212, 37.750353)
      }, {
        name: 'Пятерочка',
        addr: 'Московский проспект 4, корпус 12',
        position: new google.maps.LatLng(55.777314, 37.745887)
      }]
    };
    var pharmacy = {
      type: 'pharmacy',
      icon: 'img/icons/pharmacy.svg',
      items: [{
        name: 'Пятерочка',
        addr: 'Московский проспект 4, корпус 12',
        position: new google.maps.LatLng(55.783382, 37.73202)
      }, {
        name: 'Пятерочка',
        addr: 'Московский проспект 4, корпус 12',
        position: new google.maps.LatLng(55.764132, 37.710215)
      }]
    };

    function setMarkers(markers) {
      var _loop = function _loop(i) {
        var marker = new google.maps.Marker({
          position: markers.items[i].position,
          icon: markers.icon,
          map: map
        });
        var infowindow = new google.maps.InfoWindow({
          content: "<div class=\"marker-name\">".concat(markers.items[i].name, "</div><div class=\"marker-addr\">").concat(markers.items[i].addr, "</div>")
        });

        if ($(window).width() > 1024) {
          marker.addListener('mouseover', function () {
            infowindow.open({
              anchor: marker,
              map: map,
              shouldFocus: false
            });
          });
          marker.addListener('mouseout', function () {
            infowindow.close();
          });
        } else {
          marker.addListener('click', function () {
            setTimeout(function () {
              infowindow.open({
                anchor: marker,
                map: map,
                shouldFocus: false
              });
            }, 100);
          });
          map.addListener('click', function () {
            infowindow.close();
          });
        }
      };

      for (var i = 0; i < markers.items.length; i++) {
        _loop(i);
      }
    }

    setMarkers(house);
    setMarkers(shop);
    setMarkers(pharmacy);
  };
}

$('body').on('change', '.map .checkbox-group__input', function (e) {
  if (!$(e.currentTarget).is(':checked')) {
    $("#map img[src=\"img/icons/".concat($(e.currentTarget).val(), ".svg\"]")).show();
  } else {
    $("#map img[src=\"img/icons/".concat($(e.currentTarget).val(), ".svg\"]")).hide();
  }
});
$('body').on('click', '.map__toggle:not(.is-hide)', function () {
  $('.map__controls-list').slideUp();
  $('.map__toggle').addClass('is-hide').text('Развернуть');
});
$('body').on('click', '.map__toggle.is-hide', function () {
  $('.map__controls-list').slideDown();
  $('.map__toggle').removeClass('is-hide').text('Свернуть');
});
$('body').on('click', '.map:not(.active)', function (e) {
  if ($(window).width() <= 767) {
    $(e.currentTarget).addClass('active');
    $('html, body').addClass('overflow');
  }
});
$('body').on('click', '.map.active .map__close', function () {
  $('.map').removeClass('active');
  $('html, body').removeClass('overflow');
});
$('body').on('click', '.map.active .btn-mobile', function () {
  $('.map__controls').addClass('active');
});
$('body').on('click', '.map__controls-close', function () {
  $('.map__controls').removeClass('active');
}); // rightmodal

$('body').on('click', '.nav-box__btn', function (e) {
  $('.nav-box__btn').removeClass('active');
  $(e.currentTarget).toggleClass('active');
  $('.rightmodal').removeClass('show');
  $(".rightmodal[data-rightmodal=\"".concat($(e.currentTarget).attr('data-rightmodal'), "\"]")).toggleClass('show');

  if ($(window).width() >= 768) {
    hideRightmodal();
  }

  if ($(window).width() < 768) {
    hideRightmodal();
    $('html, body').addClass('overflow');
  }
});
$('body').on('click', '.rightmodal__close', function () {
  $('.rightmodal').removeClass('show');
  $('.nav-box__btn').removeClass('active');
  $('html, body').removeClass('overflow');
});

var hideRightmodal = function hideRightmodal() {
  $(window).scroll(function () {
    $('.rightmodal').removeClass('show');
    $('.nav-box__btn').removeClass('active');
  });
}; // metro


if ($('#metro').length > 0 && $(window).width() >= 1280) {
  var panZoom = svgPanZoom('#metro', {
    zoomEnabled: true,
    controlIconsEnabled: false,
    zoomScaleSensitivity: 0.5,
    minZoom: 1,
    maxZoom: 5,
    dblClickZoomEnabled: false
  });
  setTimeout(function () {
    panZoom.zoom(2.5);
  }, 100);
  document.getElementById('zoom-in').addEventListener('click', function (ev) {
    ev.preventDefault();
    panZoom.zoomIn();
  });
  document.getElementById('zoom-out').addEventListener('click', function (ev) {
    ev.preventDefault();
    panZoom.zoomOut();
  });
}

if ($(window).width() < 1280) {
  $('.metro').remove();
}

for (var i = 0; i < $('.MetroMap_line_item').length; i++) {
  $('.ln .btn-reset').after("\n    <div class=\"select__item\" data-value=\"".concat($('.MetroMap_line_item').eq(i).attr('data-name'), "\">\n            <div class=\"checkbox-group__item\">\n                <label class=\"checkbox-group__button\">\n                    <input type=\"checkbox\" class=\"checkbox-group__input\" name=\"check-group\" value=\"\">\n                    <span class=\"checkbox-group__label checkbox-mark checkbox-500\">\n                        <span class=\"line fill\" style=\"background-color: ").concat($('.MetroMap_line_item').eq(i).find('.MetroMap_top').attr('stroke'), "\"></span>\n                        ").concat($('.MetroMap_line_item').eq(i).attr('data-name'), "\n                    </span>\n                </label>\n            </div>\n        </div>\n    "));
}

var lines = 0;
$('body').on('click', '.MetroMap_line_item:not(.selected)', function (e) {
  var id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');
  $(e.currentTarget).addClass('selected');
  mapClassAdd(id, 'selected');
  resetButton();
  var $select = $('.select.ln');
  var selectValue = '';

  for (var _i = 0; _i < $('.MetroMap_line_item.selected').length; _i++) {
    selectValue += $('.MetroMap_line_item.selected').eq(_i).attr('data-name') + ', ';
  }

  lines++;

  if (lines > 1) {
    if ($select.find('.select__count').length === 0) {
      $select.find('.select__input').after('<div class="select__count"></div>');
    }

    $select.find('.select__count').text(lines);
  }

  console.log(selectValue);

  if (lines <= 1 && $select.find('.select__count').length > 0) {
    $select.find('.select__count').remove();
  }

  $select.find('.select__input').val(selectValue);
  $select.find(".select__item[data-value=\"".concat($(e.currentTarget).attr('data-name'), "\"]")).find('.checkbox-group__input').prop('checked', true);
  console.log(lines);
});
$('body').on('click', '.MetroMap_line_item.selected', function (e) {
  var id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');
  $(e.currentTarget).removeClass('selected');
  mapClassRemove(id, 'selected');
  resetButton();
  var $select = $('.select.ln');
  var selectValue = '';

  for (var _i2 = 0; _i2 < $('.MetroMap_line_item.selected').length; _i2++) {
    selectValue += $('.MetroMap_line_item.selected').eq(_i2).attr('data-name') + ', ';
  }

  lines--;

  if (lines > 1) {
    if ($select.find('.select__count').length === 0) {
      $select.find('.select__input').after('<div class="select__count"></div>');
    }

    $select.find('.select__count').text(lines);
  }

  if (lines === 1 && $select.find('.select__count').length > 0) {
    $select.find('.select__count').remove();
  }

  console.log(lines);
  $select.find('.select__input').val(selectValue);
  $select.find(".select__item[data-value=\"".concat($(e.currentTarget).attr('data-name'), "\"]")).find('.checkbox-group__input').prop('checked', false);
});
$('body').on('mouseover', '.MetroMap_line_item', function (e) {
  var id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');
  mapClassAdd(id, 'hover');
});
$('body').on('mouseleave', '.MetroMap_line_item', function (e) {
  var id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');
  mapClassRemove(id, 'hover');
});
$('body').on('click', '.MetroMap_station_item', function (e) {
  var id = $(e.currentTarget).attr('id').replace('MetroMap_station_', '');
  $(e.currentTarget).toggleClass('selected');
  $(".MetroMap_to_".concat(id)).toggleClass('selected');
  resetButton();
});
$('body').on('mouseover', '.MetroMap_station_item', function (e) {
  var id = $(e.currentTarget).attr('id').replace('MetroMap_station_', '');
  $(e.currentTarget).addClass('hover');
  $(".MetroMap_to_".concat(id)).addClass('hover').find('circle').attr('r', '8');
});
$('body').on('mouseleave', '.MetroMap_station_item', function (e) {
  var id = $(e.currentTarget).attr('id').replace('MetroMap_station_', '');
  $(e.currentTarget).removeClass('hover');
  $(".MetroMap_to_".concat(id)).removeClass('hover').find('circle').attr('r', '6');
});

var resetButton = function resetButton() {
  var count = $('.MetroMap_station_item.selected').length;

  if (count > 0) {
    $('.location__controls .btn-reset').addClass('show');
    $('.metro__filter .btn-reset').addClass('active');
    $('.location__controls .btn-reset span').text("\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C ".concat(count, " \u0441\u0442\u0430\u043D\u0446\u0438\u0439"));
    $('.tabs__btn--active').addClass('hasFilter');
  } else {
    $('.location__controls .btn-reset').removeClass('show');
    $('.metro__filter .btn-reset').removeClass('active');
    $('.tabs__btn--active').removeClass('hasFilter');
  }
};

var mapClassAdd = function mapClassAdd(id, cl) {
  $("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item")).addClass(cl);

  for (var _i3 = 0; _i3 < $("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item")).length; _i3++) {
    if ($("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item:nth-child(").concat(_i3, ")")).attr('id') !== undefined) {
      var num = $("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item:nth-child(").concat(_i3, ")")).attr('id').replace('MetroMap_station_', '');
      $(".MetroMap_to_".concat(num)).addClass(cl).find('circle').attr('r', '8');
    }
  }
};

var mapClassRemove = function mapClassRemove(id, cl) {
  $("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item")).removeClass(cl);

  for (var _i4 = 0; _i4 < $("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item")).length; _i4++) {
    if ($("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item:nth-child(").concat(_i4, ")")).attr('id') !== undefined) {
      var num = $("#MetroMap_stations #MetroMap_l_".concat(id, " .MetroMap_station_item:nth-child(").concat(_i4, ")")).attr('id').replace('MetroMap_station_', '');
      $(".MetroMap_to_".concat(num)).removeClass(cl).find('circle').attr('r', '6');
    }
  }
}; // select


$('body').on('click', '.select:not(.active)', function (e) {
  $(e.currentTarget).toggleClass('active');
});
$('body').on('click', '.select.active', function (e) {
  if ($(e.target)[0].classList[0] === 'select') {
    $(e.currentTarget).toggleClass('active');
  }

  if ($(e.currentTarget).find('.select__input').val() !== '') {
    $(e.currentTarget).addClass('fill');
  } else {
    $(e.currentTarget).removeClass('fill');
  }
});
$('body').on('click', '.select__item', function (e) {
  var $select = $(e.currentTarget).closest('.select');
  var $input = $select.find('.select__input');

  if (!$select.hasClass('checkbox')) {
    $select.removeClass('active');
    $input.val($(e.currentTarget).attr('data-value'));
  } else {
    var value = '';
    var count = $select.find(".select__item input:checked").length;

    for (var _i5 = 0; _i5 < $select.find('.select__item').length; _i5++) {
      if ($select.find(".select__item:nth-child(".concat(_i5, ")")).find('input').is(':checked')) {
        value += "".concat($select.find(".select__item:nth-child(".concat(_i5, ")")).attr('data-value'), ", ");
      }
    }

    if (count > 1) {
      if ($select.find('.select__count').length === 0) {
        $input.after('<div class="select__count"></div>');
      }

      $select.find('.select__count').text(count);
    }

    if (count <= 1 && $select.find('.select__count').length > 0) {
      $select.find('.select__count').remove();
    }

    if ($(e.currentTarget).find('.checkbox-group__input').is(':checked')) {
      $(".MetroMap_line_item[data-name=\"".concat($(e.currentTarget).attr('data-value'), "\"]")).addClass('selected');
      var id = $(".MetroMap_line_item[data-name=\"".concat($(e.currentTarget).attr('data-value'), "\"]")).attr('id').replace('MetroMap_line_', '');
      $(e.currentTarget).addClass('selected');
      mapClassAdd(id, 'selected');
      resetButton();
    } else {
      $(".MetroMap_line_item[data-name=\"".concat($(e.currentTarget).attr('data-value'), "\"]")).removeClass('selected');

      var _id = $(".MetroMap_line_item[data-name=\"".concat($(e.currentTarget).attr('data-value'), "\"]")).attr('id').replace('MetroMap_line_', '');

      $(e.currentTarget).removeClass('selected');
      mapClassRemove(_id, 'selected');
      resetButton();
    }

    $input.val(value);
  }
});
$('body').on('click', '.select__count', function (e) {
  $(e.currentTarget).closest('.select').removeClass('active');
  $(e.currentTarget).closest('.select').find('.checkbox-group__input').prop('checked', false);
  $(e.currentTarget).closest('.select').find('.select__input').val('');
  $(e.currentTarget).remove();
}); // hamburger

$('body').on('click', '.hamburger', function (e) {
  $(e.currentTarget).toggleClass('active');
  $('.menu').addClass('active');
}); // mobile menu

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
} // subscribe input


$('body').on('blur', '.subscribe input', function (e) {
  if ($(e.currentTarget).val() !== '') {
    $(e.currentTarget).addClass('fill');
  } else {
    $(e.currentTarget).removeClass('fill');
  }
}); // set same height cards

for (var _i6 = 0; _i6 < $('.items-grid').length; _i6++) {
  var $this = $('.item__content').eq(_i6);
  $this.find('.item__content--hover').css('height', $this.find('.item__content--base').outerHeight());
} // flat menu


var lastScrollTop = 0;

if ($('.object-header').length > 0) {
  $(window).scroll(function () {
    var st = $(_this).scrollTop();

    for (var _i7 = 0; _i7 < $('.menu-step').length; _i7++) {
      if ($(document).scrollTop() + $(window).height() * 0.7 > $('.menu-step').eq(_i7).offset().top && !$('body').hasClass('animate')) {
        $('.top-bar__nav li').removeClass('active');
        $(".top-bar__nav li[data-menu=\"".concat($('.menu-step').eq(_i7).attr('data-menu'), "\"]")).addClass('active');
      }

      if (!st > lastScrollTop && $(document).scrollTop() + $(window).height() * 0.7 < $('.menu-step').eq(_i7).offset().top + $('.menu-step').outerHeight() && !$('body').hasClass('animate')) {
        $('.top-bar__nav li').removeClass('active');
      }
    }

    lastScrollTop = st;
  });
}

$('body').on('click', '.top-bar__nav li', function (e) {
  $('.top-bar__nav li').removeClass('active');
  $(e.currentTarget).addClass('active');
  $('body').addClass('animate');
  $('html, body').stop().animate({
    scrollTop: $(".menu-step[data-menu=\"".concat($(e.currentTarget).attr('data-menu'), "\"]")).offset().top - $(window).height() * 0.1
  }, 500, 'swing', function () {
    $('body').removeClass('animate');
  });
});
$('body').on('mouseenter', '.flat-item__media--image', function (e) {
  $(e.currentTarget).parent().find('.flat-item__popup').addClass('show');

  if ($(e.currentTarget).offset().top > $(document).scrollTop() + $(window).height() / 2) {
    $(e.currentTarget).parent().find('.flat-item__popup').addClass('bottom');
  }
});
$('body').on('mouseleave', '.flat-item__media--image', function (e) {
  $(e.currentTarget).parent().find('.flat-item__popup').removeClass('show').removeClass('bottom');
}); //yandex map page

if ($('#yandex').length > 0) {
  ymaps.ready(function () {
    var myIcon = ymaps.templateLayoutFactory.createClass('<div class="yandex__wrap">' + '<div class="yandex__dot">' + '<div class="yandex__count">' + '{{ properties.count }}' + '</div><div class="yandex__price">' + '{{ properties.price }}' + '</div>' + '</div>' + '</div>');
    var myMap = new ymaps.Map('yandex', {
      center: [55.751574, 37.573856],
      zoom: 9,
      controls: ['fullscreenControl']
    }, {
      searchControlProvider: 'yandex#search'
    }),
        // Создаём макет содержимого.
    myPlacemark = new ymaps.Placemark([55.713443, 37.549197], {
      count: '3',
      price: 'от 44,44 млн ₽',
      balloonContentBody: "<div class=\"item\">\n                        <div class=\"item__header\">\n                            <a href=\"javascript:void(0)\" class=\"item__media\">\n                                <div class=\"item__media--image\">\n                                    <img src=\"img/content/item_image__01.jpg\" class=\"img-fluid\" alt=\"\">\n                                </div>\n                            </a>\n                        </div>\n                        <div class=\"item__content\">\n                            <div class=\"item__content--base\">\n                                <div class=\"item__info\">\n                                    <div class=\"item__info--completion\">\u0414\u043E\u043C\u0430 \u0441\u0434\u0430\u043D\u044B</div>\n                                    <div class=\"item__info--developer\">\u0413\u0440\u0430\u043D\u0435\u043B\u044C</div>\n                                </div>\n                                <div class=\"item__title\">\u0411\u043E\u044F\u0440\u0441\u043A\u0438\u0439 \u043F\u0430\u043B\u0438\u0441\u0430\u0434\u043D\u0438\u043A</div>\n                                <div class=\"item__district\">\n                                    <div class=\"item__district--icon\" style=\"background-color: #FFD702;\"></div>\n                                    <div class=\"item__district--name\">\u0420\u0430\u043C\u0435\u043D\u043A\u0438</div>\n                                    <div class=\"item__district--distance\">\n                                        <i>\n                                            <svg class=\"ico-svg\" viewBox=\"0 0 10 15\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <use xlink:href=\"img/sprites/sprite-mono.svg#distanceicon\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"></use>\n                                            </svg>\n                                        </i>\n                                        <span>22 \u043C\u0438\u043D\u0443\u0442\u044B</span>\n                                    </div>\n                                </div>\n                                <div class=\"item__data\">\n                                    <div class=\"item__data--price\">\u043E\u0442 15,3 \u043C\u043B\u043D \u20BD</div>\n                                    <div class=\"item__data--apartments\">440 \u043A\u0432\u0430\u0440\u0442\u0438\u0440</div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>"
    }, {
      iconLayout: 'default#imageWithContent',
      // Размеры метки.
      iconImageSize: [48, 48],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-24, -24],
      // Смещение слоя с содержимым относительно слоя с картинкой.
      iconContentOffset: [15, 15],
      // Макет содержимого.
      iconContentLayout: myIcon
    }),
        myPlacemark2 = new ymaps.Placemark([55.684758, 37.738521], {
      balloonContentBody: "<div class=\"item\">\n                        <div class=\"item__header\">\n                            <a href=\"javascript:void(0)\" class=\"item__media\">\n                                <div class=\"item__media--image\">\n                                    <img src=\"img/content/item_image__01.jpg\" class=\"img-fluid\" alt=\"\">\n                                </div>\n                            </a>\n                        </div>\n                        <div class=\"item__content\">\n                            <div class=\"item__content--base\">\n                                <div class=\"item__info\">\n                                    <div class=\"item__info--completion\">\u0421\u0434\u0430\u0447\u0430 IV \u043A\u0432 2022</div>\n                                    <div class=\"item__info--developer\">\u041B\u0421\u0420 \u043D\u0435\u0434\u0432\u0438\u0436\u0438\u043C\u043E\u0441\u0442\u044C</div>\n                                </div>\n                                <div class=\"item__title\">\u041C\u043E\u0441\u0444\u0438\u043B\u044C\u043C\u043E\u0432\u0441\u043A\u0438\u0439</div>\n                                <div class=\"item__district\">\n                                    <div class=\"item__district--icon\" style=\"background-color: #FFD702;\"></div>\n                                    <div class=\"item__district--name\">\u0421\u043E\u043A\u043E\u043B</div>\n                                    <div class=\"item__district--distance\">\n                                        <i>\n                                            <svg class=\"ico-svg\" viewBox=\"0 0 10 15\" xmlns=\"http://www.w3.org/2000/svg\">\n                                                <use xlink:href=\"img/sprites/sprite-mono.svg#distanceicon\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"></use>\n                                            </svg>\n                                        </i>\n                                        <span>12 \u043C\u0438\u043D\u0443\u0442</span>\n                                    </div>\n                                </div>\n                                <div class=\"item__data\">\n                                    <div class=\"item__data--price\">\u043E\u0442 28,61 \u043C\u043B\u043D \u20BD</div>\n                                    <div class=\"item__data--apartments\">43 \u043A\u0432\u0430\u0440\u0442\u0438\u0440\u044B</div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>"
    }, {
      iconLayout: 'default#image',
      iconImageHref: '/img/icons/map-dot.svg',
      iconImageSize: [12, 12],
      iconImageOffset: [-6, -6]
    });
    myMap.events.add('click', function (e) {
      return e.get('target').balloon.close();
    });
    myMap.geoObjects.add(myPlacemark).add(myPlacemark2);
  });
}

$('body').on('click', '.yandex__grid', function (e) {
  $(e.currentTarget).toggle();
  $('.filter').toggle();
  $('.yandex__list').toggle();
  $('.yandex__back').show();
});
$('body').on('click', '.yandex__back', function (e) {
  $(e.currentTarget).toggle();
  $('.filter').toggle();
  $('.yandex__list').toggle();
  $('.yandex__grid').show();
}); //contacts map page

if ($('#contacts').length > 0) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('contacts', {
      center: [55.751574, 37.573856],
      zoom: 12,
      controls: ['fullscreenControl']
    }, {
      searchControlProvider: 'yandex#search'
    });
    var myCollection = new ymaps.GeoObjectCollection();

    function createPlacemark(image, coords, num, active) {
      var animatedLayout = ymaps.templateLayoutFactory.createClass("<div class=\"placemark\" data-card=\"".concat(num, "\"></div>"), {
        build: function build() {
          animatedLayout.superclass.build.call(this);
          var element = this.getParentElement().getElementsByClassName('placemark')[0];
          element.style.backgroundImage = image;
          var size = this.isActive ? 80 : 64;
          var smallShape = {
            type: 'Circle',
            coordinates: [0, 0],
            radius: size / 2
          };
          this.getData().options.set('shape', smallShape);

          if (active) {
            element.classList.add('active');
          }

          this.getData().geoObject.events.add('click', function (e) {
            if ($(window).width() < 768) {
              for (var i = 0; i < document.getElementsByClassName('placemark').length; i++) {
                document.getElementsByClassName('placemark')[i].classList.remove('active');
              }

              element.classList.add('active');
              $(".contacts__item[data-card=\"".concat(num, "\"]")).addClass('show');
            }
          }, this);
        }
      });
      myCollection.add(new ymaps.Placemark(coords, {
        test: 'test'
      }, {
        iconLayout: animatedLayout,
        hasBalloon: false,
        test: 'test'
      }));
    }

    createPlacemark("url('img/map-marker1.png')", [55.684758, 37.738521], 1);
    createPlacemark("url('img/map-marker2.png')", [55.751574, 37.573856], 2);
    createPlacemark("url('img/map-marker3.png')", [55.775821, 37.59562], 3, true);
    myMap.geoObjects.add(myCollection);
    myMap.events.add('click', function (e) {
      return e.get('target').balloon.close();
    });
  });
}

$('body').on('mouseenter', '.contacts__item', function (e) {
  $('.placemark').removeClass('active');
  $(".placemark[data-card=\"".concat($(e.currentTarget).attr('data-card'), "\"]")).addClass('active');
});

if ($(window).width() > 767) {
  $('.contacts__list').addClass('custom-scroll');
} // Custom scroll


document.querySelectorAll('.custom-scroll').forEach(function (el) {
  new SimpleBar(el);
}); // fancybox

Fancybox.bind('[data-fancybox]', {
  placeFocusBack: false
});
var cursor = $('.object-promo__slider-full .swiper-pagination-fraction');
$('body').on('mouseenter', '.object-promo__slider-full', function (e) {
  cursor.show().css('display', 'flex');
  $('html').addClass('cursor');
  $(window).mousemove(function (e) {
    cursor.css({
      top: e.clientY - cursor.height() / 2,
      left: e.clientX - cursor.width() / 2
    });
  });
});
$('body').on('mouseleave', '.object-promo__slider-full', function (e) {
  cursor.hide();
  $('html').removeClass('cursor');
  $(window).mousemove(function (e) {
    cursor.css({
      top: e.clientY - cursor.height() / 2,
      left: e.clientX - cursor.width() / 2
    });
  });
});
$('body').on('mouseenter', '.object-promo__slider-full .object-promo__nav--prev', function (e) {
  cursor.addClass('left');
});
$('body').on('mouseleave', '.object-promo__slider-full .object-promo__nav--prev', function (e) {
  cursor.removeClass('left');
});
$('body').on('mouseenter', '.object-promo__slider-full .object-promo__nav--next', function (e) {
  cursor.addClass('right');
});
$('body').on('mouseleave', '.object-promo__slider-full .object-promo__nav--next', function (e) {
  cursor.removeClass('right');
});
$('body').on('click', '.contacts .mobile', function (e) {
  $('.contacts__map').addClass('active');
  $('.contacts__item').addClass('active');
  $('.contacts').addClass('active');
  $('html, body').toggleClass('overflow');
});
$('body').on('click', '.contacts__close', function (e) {
  $('.contacts__item').removeClass('show');
  $('.placemark').removeClass('active');
});

var someHeight = function someHeight(selector, element) {
  for (var _i8 = 0; _i8 < $(selector).length; _i8++) {
    var $step = $(selector).eq(_i8);
    var stepHeight = 0;

    for (var j = 0; j < $step.find(element).length; j++) {
      if ($step.find(element).eq(j).height() > stepHeight) {
        stepHeight = $step.find(element).eq(j).height();
      }
    }

    $step.find(element).height(stepHeight);
  }
};

someHeight('.viewed__slider', '.flat-item__object');
someHeight('.viewed__slider', '.flat-item__price');