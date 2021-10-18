let canUseWebp = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
};

if (canUseWebp() === false) {
    const lazyBgItems = document.querySelectorAll('.lazy[data-bg-fallback]');

    lazyBgItems.forEach((item) => {
        const srcBgFallback = item.getAttribute('data-bg-fallback');
        item.setAttribute('data-bg', srcBgFallback);
    });
}

// eslint-disable-next-line no-unused-vars
const lazyLoadInstance = new LazyLoad({
    elements_selector: '.lazy',
});

$('.mobile-nav__next').on('click', function (e) {
    e.preventDefault();
    let secondNav = '.' + $(this).attr('data-nav');
    $('.mobile-nav__subnav').removeClass('active');
    $(secondNav).addClass('active');
    $('.mobile-nav__second').addClass('mobile-nav__second--open');
});

$('.mobile-nav__back').on('click', function (e) {
    e.preventDefault();
    $('.mobile-nav__second').removeClass('mobile-nav__second--open');
});

const collapseControl = document.querySelectorAll('.collapse-control');

collapseControl.forEach((el) => {
    el.addEventListener('click', (e) => {
        const self = e.currentTarget.closest('.collapse');
        const control = self.querySelector('.collapse-control');
        const content = self.querySelector('.collapse-content');

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

let maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
        const keyCode = event.keyCode;
        const template = masked,
            def = template.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');
        let i = 0,
            newValue = template.replace(/[_\d]/g, function (a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
            });
        i = newValue.indexOf('_');
        if (i !== -1) {
            newValue = newValue.slice(0, i);
        }
        let reg = template
            .substr(0, this.value.length)
            .replace(/_+/g, function (a) {
                return '\\d{1,' + a.length + '}';
            })
            .replace(/[+()]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (!reg.test(this.value) || this.value.length < 5 || (keyCode > 47 && keyCode < 58)) {
            this.value = newValue;
        }
        if (event.type === 'blur' && this.value.length < 5) {
            this.value = '';
        }
    }

    for (const elem of elems) {
        elem.addEventListener('input', mask);
        elem.addEventListener('focus', mask);
        elem.addEventListener('blur', mask);
    }
};

const tabs = document.querySelector('.tabs');
const tabsBtn = document.querySelectorAll('.tabs__btn');
const tabsContent = document.querySelectorAll('.tabs__content');

if (tabs) {
    tabs.addEventListener('click', (e) => {
        if (e.target.classList.contains('tabs__btn')) {
            const tabsPath = e.target.dataset.tabsPath;
            tabsBtn.forEach((el) => {
                el.classList.remove('tabs__btn--active');
            });
            document.querySelector(`[data-tabs-path="${tabsPath}"]`).classList.add('tabs__btn--active');
            tabsHandler(tabsPath);

            $('.tabs')
                .find('.bar')
                .animate({
                    width: $('.tabs').find('.tabs__btn--active').width(),
                    left: $('.tabs').find('.tabs__btn--active').position().left,
                });
        }
    });

    $('.tabs')
        .find('.bar')
        .css('left', $('.tabs').find('.tabs__btn--active').position().left)
        .animate({
            width: $('.tabs').find('.tabs__btn--active').width(),
        });
}

const tabsHandler = (path) => {
    tabsContent.forEach((el) => {
        el.classList.remove('tabs__content--active');
    });
    document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
};

const accordions = document.querySelectorAll('.accordion-control');

accordions.forEach((el) => {
    el.addEventListener('click', (e) => {
        const self = e.currentTarget.closest('.accordion-item');
        const control = self.querySelector('.accordion-control');
        const content = self.querySelector('.accordion-content');

        self.classList.toggle('open');

        // если открыт аккордеон
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

let textInputBoxPlugin = function ($) {
    $.fn.textInputBox = function (boxClass) {
        if (!boxClass) boxClass = 'input-field';
        $(this)
            .find('.' + boxClass)
            .each(function (index, element) {
                const $box = $(element);
                const $input = $box.find('input, textarea');
                if ($input.attr('required') && !$box.hasClass(`${boxClass}_required`)) {
                    $box.addClass(`${boxClass}_required`);
                }
                if ($input.attr('placeholder')) {
                    $box.attr('data-placeholder', $input.attr('placeholder'));
                }
                hasValue();
                $input.on('change', hasValue);
                $input
                    .on('focus', function () {
                        $box.addClass(`${boxClass}_focus`);
                        hasValue();
                    })
                    .on('blur', function () {
                        $box.removeClass(`${boxClass}_focus`);
                        hasValue();
                    });

                function hasValue() {
                    const hasValueClass = `${boxClass}_has-value`;
                    if ($input.val().length > 0) {
                        if (!$box.hasClass(hasValueClass)) $box.addClass(hasValueClass);
                    } else {
                        if ($box.hasClass(hasValueClass)) $box.removeClass(hasValueClass);
                    }
                }
            });
    };
};

maskPhone('input[name="phone"]');

// Select
document.querySelectorAll('.pretty-select').forEach((el) => {
    const prettySelect = new Choices(el, {
        searchEnabled: false,
    });
});

// tooltips
tippy('[data-tippy-content]');

// Input + placeholder
const $body = $('body');
textInputBoxPlugin($);
$body.textInputBox();

// mobile breadcrumbs
$('body').on('click', '.breadcrumb__toggle', (e) => {
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

const footerNavControl = document.querySelectorAll('.footer-nav__toggle');
footerNavControl.forEach((el) => {
    el.addEventListener('click', (e) => {
        const self = e.currentTarget.closest('.footer-nav__group');
        self.classList.toggle('footer-nav__group--open');
        return false;
    });
});

$('.sidebar__primary--toggle').on('mouseenter', function () {
    let sideNavTarget = '.' + $(this).attr('data-nav');
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

//Breadcrumb
const breadcrumb = new Swiper('.breadcrumb-slider', {
    loop: false,
    slidesPerView: 'auto',
    simulateTouch: false,
});

// Base Range
let $area = $('.slider-area');
let areamin = 1;
let areamax = 400;
let areafrom = 15;
let areato = 270;

let $cost = $('.slider-cost');
let costmin = 0.5;
let costmax = 150;
let costfrom = 5.9;
let costto = 127.7;

let $floor = $('.slider-floor');
let floormin = 0;
let floormax = 30;
let floorfrom = 7;
let floorto = 22;

let $date = $('.slider-date');
let datemin = 0;
let datemax = 13;
let datefrom = 1;
let dateto = 14;

let $price = $('.slider-price');
let pricemin = 500000;
let pricemax = 50000000;
let pricefrom = 3000000;

let $first = $('.slider-first');
let firstmin = 500000;
let firstmax = 15000000;
let firstfrom = 3000000;

let $time = $('.slider-time');
let timemin = 1;
let timemax = 30;
let timefrom = 10;

let instance;

$area.ionRangeSlider({
    grid: false,
    skin: 'round',
    min: areamin,
    max: areamax,
    type: 'double',
    from: areafrom,
    to: areato,
    step: 1,
    onChange: function (data) {
        sliderChange(data, 'area');
    },
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
    onChange: function (data) {
        sliderChange(data, 'cost');
    },
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
    onChange: function (data) {
        sliderChange(data, 'floor');
    },
});

$date.ionRangeSlider({
    grid: false,
    skin: 'round',
    onChange: function (data) {},
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
    onChange: function (data) {
        sliderChange(data, 'price');
    },
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
    onChange: function (data) {
        sliderChange(data, 'first');
    },
});

$time.ionRangeSlider({
    grid: false,
    skin: 'round',
    min: timemin,
    max: timemax,
    type: 'single',
    from: timefrom,
    step: 1,
    onChange: function (data) {
        sliderChange(data, 'time');
    },
});

$('body').on('keypress', '.range__value', function (event) {
    return (event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46 || event.charCode == 44 || event.charCode == 0;
});

$('body').on('keyup', '.range__value', function (event) {
    this.value = this.value.replace(/ /g, '');
    var number = this.value;
    this.value = number.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
});

let sliderChange = (data, slider) => {
    let $sliderFrom = $(`input.range__value--from[data-slider="${slider}"]`);
    let $sliderTo = $(`input.range__value--to[data-slider="${slider}"]`);

    $sliderFrom.val(data.from_pretty);

    if ($sliderTo.length > 0) {
        $sliderTo.val(data.to_pretty);
    }

    if ($(`.slider-${slider}`).closest('.range').find('.range__value--percent').length > 0) {
        $(`.slider-${slider}`)
            .closest('.range')
            .find('.range__value--percent')
            .text(Math.ceil((data.from * 100) / data.max) + '%');
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
            from: val,
        });
    }

    if ($(this).attr('data-slider') === 'area') {
        areafrom = $area.closest('.range').find('.range__value--from').val();
        areato = $area.closest('.range').find('.range__value--to').val();

        instance = $area.data('ionRangeSlider');

        val = validateFrom(val, areamin, areato);

        instance.update({
            from: val,
        });
    }

    if ($(this).attr('data-slider') === 'cost') {
        costfrom = $cost.closest('.range').find('.range__value--from').val();
        costto = $cost.closest('.range').find('.range__value--to').val();

        instance = $cost.data('ionRangeSlider');

        val = validateFrom(val, costmin, costto);

        instance.update({
            from: val,
        });
    }

    if ($(this).attr('data-slider') === 'floor') {
        floorfrom = $floor.closest('.range').find('.range__value--from').val();
        floorto = $floor.closest('.range').find('.range__value--to').val();

        instance = $floor.data('ionRangeSlider');

        val = validateFrom(val, floormin, floorto);

        instance.update({
            from: val,
        });
    }

    $(this).prop('value', val);
});

let setFrom = (from, to, $slider, val, min) => {
    var instance = null;
    from = $slider.closest('.range').find('.range__value--from').val();
    to = $slider.closest('.range').find('.range__value--to').val();

    instance = $slider.data('ionRangeSlider');

    val = parseFloat(val);
    val = validateFrom(val, min, to);

    instance.update({
        from: val,
    });

    $slider.closest('.range').find('.range__value--from').val(0);
};

let validateFrom = (val, min, to) => {
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
            to: val,
        });
    }

    if ($(this).attr('data-slider') === 'cost') {
        costfrom = $cost.closest('.range').find('.range__value--from').val();
        costto = $cost.closest('.range').find('.range__value--to').val();

        instance = $cost.data('ionRangeSlider');

        val = validateTo(val, costmax, costfrom);

        instance.update({
            to: val,
        });
    }

    if ($(this).attr('data-slider') === 'floor') {
        floorfrom = $floor.closest('.range').find('.range__value--from').val();
        floorto = $floor.closest('.range').find('.range__value--to').val();

        instance = $floor.data('ionRangeSlider');

        val = validateTo(val, floormax, floorfrom);

        instance.update({
            to: val,
        });
    }

    $(this).prop('value', val);
});

let setTo = (from, to, $slider, val, max) => {
    from = $slider.closest('.range').find('.range__value--from').val();
    to = $slider.closest('.range').find('.range__value--to').val();

    instance = $slider.data('ionRangeSlider');

    val = validateTo(val, max, from);

    instance.update({
        to: val,
    });

    $slider.closest('.range').find('.range__value--to').val(val);
};

let validateTo = (val, max, from) => {
    if (parseFloat(val) < from) {
        val = from;
    } else if (parseFloat(val) > max) {
        val = max;
    }

    return val;
};

$date.on('change', function () {
    let $inp = $(this);
    let $rangeField = $inp.closest('.range');
    let rangeFrom = $inp.data('from');
    let rangeTo = $inp.data('to');
    let rangeValues = $inp.attr('data-range-values');
    let $rangeValFrom = $rangeField.find('.range__value--from');
    let $rangeValTo = $rangeField.find('.range__value--to');

    let arrRangeValues = rangeValues.split(',');
    let arrRangeFrom = arrRangeValues[rangeFrom];
    let arrRangeTo = arrRangeValues[rangeTo];

    $rangeValFrom.text(arrRangeFrom);
    $rangeValTo.text(arrRangeTo);
});

$('.range__dropdown--button').on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    let $range = $this.closest('.range');
    if ($this.hasClass('active')) {
        $this.removeClass('active');
        $range.removeClass('range--fix-dropdown');
    } else {
        $range.find('.range__dropdown--button').removeClass('active');
        $this.addClass('active');
        $range.addClass('range--fix-dropdown');
    }
});

// drop-down list field
$('.field__select').on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    let $field = $this.closest('.field');
    $field.toggleClass('is-open');
});

$('.field__dropdown--item').on('click', function (e) {
    e.preventDefault();
    let $field = $(this).closest('.field');
    $field.removeClass('is-open');
});

$('.field__dropdown--clear').on('click', function (e) {
    e.preventDefault();
    let $field = $(this).closest('.field');
    $field.removeClass('is-open');
});

$body.on('click', function (event) {
    if ($(event.target).closest('.field').length === 0) {
        $('.field').removeClass('is-open');
    }
});

document.querySelectorAll('.field__dropdown--scroll').forEach((el) => {
    new SimpleBar(el);
});

// Item
$('.item__toggle').on('click', function (e) {
    e.preventDefault();
    let $item = $(this).closest('.item');
    $item.toggleClass('item--switch');
});

if ($(window).width() > 1024) {
    $('.item__tags--toggle').on('mouseover', function (e) {
        let $item = $(this).closest('.item__tags');
        $item.addClass('show');
    });

    $('.item__tags--toggle').on('mouseleave', function (e) {
        let $item = $(this).closest('.item__tags');
        $item.removeClass('show');
    });
}

// item tags on touch devices
$('body').on('click', '.item__tags--toggle', (e) => {
    if ($(window).width() <= 1024) {
        $(e.currentTarget).parent().find('.item__tag').toggleClass('active');
        $(e.currentTarget).toggleClass('active');
    }
});

// Main slider
const mainSlider = new Swiper('.main__slider', {
    slidesPerView: 1,
    spaceBetween: 16,
    effect: 'fade',
    loop: true,
    navigation: {
        nextEl: '.main .slider-next',
        prevEl: '.main .slider-prev',
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        1024: {
            spaceBetween: 16,
        },
        1200: {
            spaceBetween: 24,
        },
    },
    on: {
        slideChange: function (index) {
            $('.main__num span').removeClass('active');
            $('.main__line').removeClass('active');

            if ($('.main .swiper-slide').length - 2 === index.activeIndex - 1) {
                $('.main__num span').eq(0).addClass('active');
                $('.main__num span').eq(0).next().addClass('active');
            } else {
                $('.main__num span')
                    .eq(index.activeIndex - 1)
                    .addClass('active');
                $('.main__num span')
                    .eq(index.activeIndex - 1)
                    .next()
                    .addClass('active');
            }
        },
    },
});

// Condition slider
const serviceSlider = new Swiper('.conditions__slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: {
        nextEl: '.conditions-next',
        prevEl: '.conditions-prev',
    },
    breakpoints: {
        1024: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        1200: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },

        1760: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
    },
});

// Viewed slider
const viewedSlider = new Swiper('.viewed__slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    navigation: {
        nextEl: '.viewed-next',
        prevEl: '.viewed-prev',
    },
    breakpoints: {
        1024: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        1200: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
        1420: {
            slidesPerView: 'auto',
            spaceBetween: 40,
        },
        1760: {
            slidesPerView: 'auto',
            spaceBetween: 40,
        },
    },
});

// Articles slider
const articlesSlider = new Swiper('.articles-slider', {
    slidesPerView: 2,
    spaceBetween: 24,
    navigation: {
        nextEl: '.articles-next',
        prevEl: '.articles-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 24,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
        1420: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1760: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
    },
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
});

// sorter__item

$('.sorter__item').on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    let $sorter = $this.closest('.sorter');

    if ($this.hasClass('active')) {
        $this.toggleClass('sorter-invert');
    } else {
        $sorter.find('.sorter__item').removeClass('active');
        $this.addClass('active');
    }
});

const postProjectSlider = new Swiper('.post-projects__slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    simulateTouch: false,
    breakpoints: {
        768: {
            slidesPerView: 3,
            spaceBetween: 16,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 40,
        },

        1760: {
            slidesPerView: 'auto',
            spaceBetween: 40,
        },
    },
});

const postGallerySlider = new Swiper('.post-gallery__slider', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
        nextEl: '.slider-next',
        prevEl: '.slider-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
});

$('.subscribe__close').on('click', function (e) {
    e.preventDefault();
    $('.subscribe').hide();
});

const tagSlider = new Swiper('.tags__slider', {
    slidesPerView: 'auto',
    spaceBetween: 8,
    simulateTouch: false,
    breakpoints: {
        1200: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
    },
});

const objectPromoSlider = new Swiper('.object-promo-slider', {
    slidesPerView: 'auto',
    spaceBetween: 8,
    loop: true,
    navigation: {
        nextEl: '.object-promo-next',
        prevEl: '.object-promo-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        1200: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
    },
});

const objectPromoSliderFull = new Swiper('.object-promo-slider-full:not(.fade)', {
    slidesPerView: 1,
    spaceBetween: 8,
    allowTouchMove: true,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.object-promo-next',
        prevEl: '.object-promo-prev',
    },
    breakpoints: {
        768: {
            spaceBetween: 16,
        },
        1200: {
            spaceBetween: 24,
            allowTouchMove: false,
        },
    },
});

const objectPromoSliderFullFade = new Swiper('.object-promo-slider-full.fade', {
    slidesPerView: 1,
    spaceBetween: 8,
    allowTouchMove: true,
    loop: true,
    effect: 'fade',
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false,
    // },
    pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
    },
    navigation: {
        nextEl: '.object-promo-next',
        prevEl: '.object-promo-prev',
    },
    breakpoints: {
        768: {
            spaceBetween: 16,
        },
        1200: {
            spaceBetween: 24,
            allowTouchMove: false,
        },
    },
});

const objectFlatsSlider = new Swiper('.object-flats-slider', {
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: false,
    breakpoints: {
        768: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        1024: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
        1200: {
            slidesPerView: 'auto',
            spaceBetween: 36,
        },
        1420: {
            slidesPerView: 'auto',
            spaceBetween: 36,
        },
        1760: {
            slidesPerView: 'auto',
            spaceBetween: 48,
        },
    },
});

$('.finishing-nav__label').on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    let $elem = $this.closest('.finishing-nav__switch');
    $elem.toggleClass('finishing-nav__switch--open');
});

$('.finishing-nav__item').on('click', function (e) {
    e.preventDefault();
    let $this = $(this);
    let $switch = $(this).closest('.finishing-nav__switch');
    let $elem = $this.closest('.finishing');
    let Tab = $this.attr('data-target');
    let thisName = $this.text();

    $switch.removeClass('finishing-nav__switch--open');
    $switch.find('.finishing-nav__label--active').text(thisName);
});

$body.on('click', function (event) {
    if ($(event.target).closest('.finishing-nav__switch').length === 0) {
        $('.finishing-nav__switch').removeClass('finishing-nav__switch--open');
    }
});

const projectProgressSlider = new Swiper('.project-progress-slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: false,
    simulateTouch: true,
    navigation: {
        nextEl: '.progress-next',
        prevEl: '.progress-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        1200: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
        1760: {
            slidesPerView: 'auto',
            spaceBetween: 40,
        },
    },
});

// credit filter
$('.credit-filter__toggle').on('click', function (e) {
    e.preventDefault();
    $(e.currentTarget).toggleClass('filter__toggle--open');
    $('.credit-filter__additional').slideToggle('fast');
});

$('.credit__main--primary').on('click', function () {
    $(this).closest('.credit').toggleClass('credit--open');
    $(this).closest('.credit').find('.credit__options').slideToggle('fast');
});

const postSlider = new Swiper('.post-slider', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    loop: false,
    simulateTouch: true,
    navigation: {
        nextEl: '.post-next',
        prevEl: '.post-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 'auto',
            spaceBetween: 24,
        },
        1760: {
            slidesPerView: 'auto',
            spaceBetween: 40,
        },
    },
});

$('.docs-view').on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('open');
    $('.docs').toggleClass('docs--open');
});

const bar = document.querySelector('.top-bar');

if (bar) {
    let $bar = $(bar);
    let $h = $bar.offset().top;

    $(window).scroll(function () {
        if ($(window).scrollTop() > $h) {
            $bar.addClass('top-bar--visible');
        } else {
            $bar.removeClass('top-bar--visible');
        }
    });
}

const flatThumbs = new Swiper('.flat-media-thumbs', {
    slidesPerView: 4,
    spaceBetween: 16,
    loop: true,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});

const flatGallery = new Swiper('.flat-media-gallery', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    thumbs: {
        swiper: flatThumbs,
    },
    navigation: {
        nextEl: '.gallery-next',
        prevEl: '.gallery-prev',
    },
    breakpoints: {
        768: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        1024: {
            slidesPerView: 1,
            spaceBetween: 24,
        },
    },
});

$('.flat-info-view').on('click', function (e) {
    e.preventDefault();

    $(this).toggleClass('open');
    $('.flat__info--advance').slideToggle('fast');
});

// scrolltop button
$('body').on('click', '.scrolltop', () => {
    $('html, body').stop().animate({ scrollTop: 0 }, 500, 'swing');
});

// click on checkbox tooltip on mobile
$('body').on('click', '.btn-checkbox', (e) => {
    if ($(window).width() <= 1279) {
        if ($(e.target)[0].tagName === 'use' || $(e.target)[0].tagName === 'svg') {
            let $input = $(e.currentTarget).find('input');

            if ($input.is(':checked')) {
                $input.prop('checked', false);
            } else {
                $input.prop('checked', true);
            }
        }
    }
});

// location
$('body').on('click', '.open-location', () => {
    $('html, body').toggleClass('overflow');
    $('.location').toggleClass('active');
});

$('body').on('click', '.location__close', () => {
    $('html, body').toggleClass('overflow');
    $('.location').toggleClass('active');
});

$('body').on('click', '.metro__filter .btn-reset, .location .btn-reset', (e) => {
    $('.select.ln .select__input').val('');
    $('.select.ln .select__count').remove();
    $('.metro__filter .checkbox-group__input').prop('checked', false);
    $('.tabs__content--active .location__content input[type="checkbox"]').prop('checked', false);
    $(
        '.tabs__content--active .MetroMap_station_item,.tabs__content--active .MetroMap_stop,.tabs__content--active .MetroMap_transit_group,.tabs__content--active .MetroMap_line_item'
    ).removeClass('selected');
    $('.tabs__content--active circle[r="8"]').attr('r', 6);
    $('.tabs__btn--active').removeClass('hasFilter');
    $('.location__controls .btn-reset').removeClass('show');
    $('.metro__filter .btn-reset').removeClass('active');
});

$('body').on('change', '.location .checkbox-group__input', () => {
    if ($('.location .tabs__content--active .checkbox-group__input:checked').length === 0) {
        $('.tabs__btn--active').removeClass('hasFilter');
    } else {
        $('.tabs__btn--active').addClass('hasFilter');
    }
});

// set target tab
$('body').on('click', '[open-tab]', (e) => {
    $('.tabs__btn').removeClass('tabs__btn--active');
    $('.tabs__content').removeClass('tabs__content--active');
    $(`.tabs__btn[data-tabs-path="${$(e.currentTarget).attr('open-tab')}"]`).addClass('tabs__btn--active');
    $(`.tabs__content[data-tabs-target="${$(e.currentTarget).attr('open-tab')}"]`).addClass('tabs__content--active');

    $('.tabs')
        .find('.bar')
        .animate({
            width: $('.tabs').find('.tabs__btn--active').width(),
            left: $('.tabs').find('.tabs__btn--active').position().left,
        });
});
// sticky elements

if ($(window).width() >= 1024 && $('.credit-filter').length > 0) {
    let sticky = new Sticky('.credit-filter', {
        marginTop: 100,
    });
}

$('body').on('click', 'a[data-view]', (e) => {
    $('a[data-view]').removeClass('active');
    $('div[data-view]').removeClass('active');
    $(`a[data-view="${$(e.currentTarget).attr('data-view')}"]`).addClass('active');
    $(`div[data-view="${$(e.currentTarget).attr('data-view')}"]`).addClass('active');
    if ($('.items-list').hasClass('active')) {
        let stickyTable = new Sticky('.table__header', {});
    }
});

if ($('#map').length > 0) {
    // google map
    function initMap() {
        let map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 55.776212, lng: 37.750353 },
            zoom: 13,
        });

        const icons = {
            house: {
                icon: 'img/marker.png',
            },
            shop: {},
            pharmacy: {
                icon: 'img/icons/pharmacy.svg',
            },
            policlinic: {
                icon: 'img/icons/policlinic.svg',
            },
            restaurant: {
                icon: 'img/icons/restaurant.svg',
            },
            school: {
                icon: 'img/icons/school.svg',
            },
            kinder: {
                icon: 'img/icons/kinder.svg',
            },
            mall: {
                icon: 'img/icons/mall.svg',
            },
            temples: {
                icon: 'img/icons/temples.svg',
            },
        };

        const house = {
            type: 'house',
            icon: 'img/marker.png',
            items: [
                {
                    name: 'Пятерочка',
                    addr: 'Московский проспект 4, корпус 12',
                    position: new google.maps.LatLng(55.782838, 37.738592),
                },
            ],
        };

        const shop = {
            type: 'shop',
            icon: 'img/icons/shop.svg',
            items: [
                {
                    name: 'Пятерочка',
                    addr: 'Московский проспект 4, корпус 12',
                    position: new google.maps.LatLng(55.776212, 37.750353),
                },
                {
                    name: 'Пятерочка',
                    addr: 'Московский проспект 4, корпус 12',
                    position: new google.maps.LatLng(55.777314, 37.745887),
                },
            ],
        };

        const pharmacy = {
            type: 'pharmacy',
            icon: 'img/icons/pharmacy.svg',
            items: [
                {
                    name: 'Пятерочка',
                    addr: 'Московский проспект 4, корпус 12',
                    position: new google.maps.LatLng(55.783382, 37.73202),
                },
                {
                    name: 'Пятерочка',
                    addr: 'Московский проспект 4, корпус 12',
                    position: new google.maps.LatLng(55.764132, 37.710215),
                },
            ],
        };

        function setMarkers(markers) {
            for (let i = 0; i < markers.items.length; i++) {
                const marker = new google.maps.Marker({
                    position: markers.items[i].position,
                    icon: markers.icon,
                    map: map,
                });

                const infowindow = new google.maps.InfoWindow({
                    content: `<div class="marker-name">${markers.items[i].name}</div><div class="marker-addr">${markers.items[i].addr}</div>`,
                });

                if ($(window).width() > 1024) {
                    marker.addListener('mouseover', () => {
                        infowindow.open({
                            anchor: marker,
                            map,
                            shouldFocus: false,
                        });
                    });

                    marker.addListener('mouseout', () => {
                        infowindow.close();
                    });
                } else {
                    marker.addListener('click', () => {
                        setTimeout(() => {
                            infowindow.open({
                                anchor: marker,
                                map,
                                shouldFocus: false,
                            });
                        }, 100);
                    });

                    map.addListener('click', () => {
                        infowindow.close();
                    });
                }
            }
        }

        setMarkers(house);
        setMarkers(shop);
        setMarkers(pharmacy);
    }
}

$('body').on('change', '.map .checkbox-group__input', (e) => {
    if (!$(e.currentTarget).is(':checked')) {
        $(`#map img[src="img/icons/${$(e.currentTarget).val()}.svg"]`).show();
    } else {
        $(`#map img[src="img/icons/${$(e.currentTarget).val()}.svg"]`).hide();
    }
});

$('body').on('click', '.map__toggle:not(.is-hide)', () => {
    $('.map__controls-list').slideUp();
    $('.map__toggle').addClass('is-hide').text('Развернуть');
});

$('body').on('click', '.map__toggle.is-hide', () => {
    $('.map__controls-list').slideDown();
    $('.map__toggle').removeClass('is-hide').text('Свернуть');
});

$('body').on('click', '.map:not(.active)', (e) => {
    if ($(window).width() <= 767) {
        $(e.currentTarget).addClass('active');
        $('html, body').addClass('overflow');
    }
});

$('body').on('click', '.map.active .map__close', () => {
    $('.map').removeClass('active');
    $('html, body').removeClass('overflow');
});

$('body').on('click', '.map.active .btn-mobile', () => {
    $('.map__controls').addClass('active');
});

$('body').on('click', '.map__controls-close', () => {
    $('.map__controls').removeClass('active');
});

// rightmodal
$('body').on('click', '.nav-box__btn', (e) => {
    $('.nav-box__btn').removeClass('active');
    $(e.currentTarget).toggleClass('active');
    $('.rightmodal').removeClass('show');
    $(`.rightmodal[data-rightmodal="${$(e.currentTarget).attr('data-rightmodal')}"]`).toggleClass('show');

    if ($(window).width() >= 768) {
        hideRightmodal();
    }

    if ($(window).width() < 768) {
        hideRightmodal();
        $('html, body').addClass('overflow');
    }
});

$('body').on('click', '.rightmodal__close', () => {
    $('.rightmodal').removeClass('show');
    $('.nav-box__btn').removeClass('active');
    $('html, body').removeClass('overflow');
});

let hideRightmodal = () => {
    $(window).scroll(() => {
        $('.rightmodal').removeClass('show');
        $('.nav-box__btn').removeClass('active');
    });
};

// metro
if ($('#metro').length > 0 && $(window).width() >= 1280) {
    var panZoom = svgPanZoom('#metro', {
        zoomEnabled: true,
        controlIconsEnabled: false,
        zoomScaleSensitivity: 0.5,
        minZoom: 1,
        maxZoom: 5,
        dblClickZoomEnabled: false,
    });

    setTimeout(() => {
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

for (let i = 0; i < $('.MetroMap_line_item').length; i++) {
    $('.ln .btn-reset').after(`
    <div class="select__item" data-value="${$('.MetroMap_line_item').eq(i).attr('data-name')}">
            <div class="checkbox-group__item">
                <label class="checkbox-group__button">
                    <input type="checkbox" class="checkbox-group__input" name="check-group" value="">
                    <span class="checkbox-group__label checkbox-mark checkbox-500">
                        <span class="line fill" style="background-color: ${$('.MetroMap_line_item').eq(i).find('.MetroMap_top').attr('stroke')}"></span>
                        ${$('.MetroMap_line_item').eq(i).attr('data-name')}
                    </span>
                </label>
            </div>
        </div>
    `);
}

let lines = 0;

$('body').on('click', '.MetroMap_line_item:not(.selected)', (e) => {
    let id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');

    $(e.currentTarget).addClass('selected');
    mapClassAdd(id, 'selected');
    resetButton();

    let $select = $('.select.ln');
    let selectValue = '';

    for (let i = 0; i < $('.MetroMap_line_item.selected').length; i++) {
        selectValue += $('.MetroMap_line_item.selected').eq(i).attr('data-name') + ', ';
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
    $select
        .find(`.select__item[data-value="${$(e.currentTarget).attr('data-name')}"]`)
        .find('.checkbox-group__input')
        .prop('checked', true);

    console.log(lines);
});

$('body').on('click', '.MetroMap_line_item.selected', (e) => {
    let id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');

    $(e.currentTarget).removeClass('selected');
    mapClassRemove(id, 'selected');
    resetButton();

    let $select = $('.select.ln');
    let selectValue = '';

    for (let i = 0; i < $('.MetroMap_line_item.selected').length; i++) {
        selectValue += $('.MetroMap_line_item.selected').eq(i).attr('data-name') + ', ';
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
    $select
        .find(`.select__item[data-value="${$(e.currentTarget).attr('data-name')}"]`)
        .find('.checkbox-group__input')
        .prop('checked', false);
});

$('body').on('mouseover', '.MetroMap_line_item', (e) => {
    let id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');
    mapClassAdd(id, 'hover');
});

$('body').on('mouseleave', '.MetroMap_line_item', (e) => {
    let id = $(e.currentTarget).attr('id').replace('MetroMap_line_', '');
    mapClassRemove(id, 'hover');
});

$('body').on('click', '.MetroMap_station_item', (e) => {
    let id = $(e.currentTarget).attr('id').replace('MetroMap_station_', '');
    $(e.currentTarget).toggleClass('selected');
    $(`.MetroMap_to_${id}`).toggleClass('selected');
    resetButton();
});

$('body').on('mouseover', '.MetroMap_station_item', (e) => {
    let id = $(e.currentTarget).attr('id').replace('MetroMap_station_', '');
    $(e.currentTarget).addClass('hover');
    $(`.MetroMap_to_${id}`).addClass('hover').find('circle').attr('r', '8');
});

$('body').on('mouseleave', '.MetroMap_station_item', (e) => {
    let id = $(e.currentTarget).attr('id').replace('MetroMap_station_', '');
    $(e.currentTarget).removeClass('hover');
    $(`.MetroMap_to_${id}`).removeClass('hover').find('circle').attr('r', '6');
});

let resetButton = () => {
    let count = $('.MetroMap_station_item.selected').length;

    if (count > 0) {
        $('.location__controls .btn-reset').addClass('show');
        $('.metro__filter .btn-reset').addClass('active');
        $('.location__controls .btn-reset span').text(`Сбросить ${count} станций`);
        $('.tabs__btn--active').addClass('hasFilter');
    } else {
        $('.location__controls .btn-reset').removeClass('show');
        $('.metro__filter .btn-reset').removeClass('active');
        $('.tabs__btn--active').removeClass('hasFilter');
    }
};

let mapClassAdd = (id, cl) => {
    $(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item`).addClass(cl);

    for (let i = 0; i < $(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item`).length; i++) {
        if ($(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item:nth-child(${i})`).attr('id') !== undefined) {
            let num = $(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item:nth-child(${i})`).attr('id').replace('MetroMap_station_', '');
            $(`.MetroMap_to_${num}`).addClass(cl).find('circle').attr('r', '8');
        }
    }
};

let mapClassRemove = (id, cl) => {
    $(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item`).removeClass(cl);

    for (let i = 0; i < $(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item`).length; i++) {
        if ($(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item:nth-child(${i})`).attr('id') !== undefined) {
            let num = $(`#MetroMap_stations #MetroMap_l_${id} .MetroMap_station_item:nth-child(${i})`).attr('id').replace('MetroMap_station_', '');
            $(`.MetroMap_to_${num}`).removeClass(cl).find('circle').attr('r', '6');
        }
    }
};

// select
$('body').on('click', '.select:not(.active)', (e) => {
    $(e.currentTarget).toggleClass('active');
});

$('body').on('click', '.select.active', (e) => {
    if ($(e.target)[0].classList[0] === 'select') {
        $(e.currentTarget).toggleClass('active');
    }

    if ($(e.currentTarget).find('.select__input').val() !== '') {
        $(e.currentTarget).addClass('fill');
    } else {
        $(e.currentTarget).removeClass('fill');
    }
});

$('body').on('click', '.select__item', (e) => {
    let $select = $(e.currentTarget).closest('.select');
    let $input = $select.find('.select__input');

    if (!$select.hasClass('checkbox')) {
        $select.removeClass('active');
        $input.val($(e.currentTarget).attr('data-value'));
    } else {
        let value = '';
        let count = $select.find(`.select__item input:checked`).length;

        for (let i = 0; i < $select.find('.select__item').length; i++) {
            if ($select.find(`.select__item:nth-child(${i})`).find('input').is(':checked')) {
                value += `${$select.find(`.select__item:nth-child(${i})`).attr('data-value')}, `;
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
            $(`.MetroMap_line_item[data-name="${$(e.currentTarget).attr('data-value')}"]`).addClass('selected');

            let id = $(`.MetroMap_line_item[data-name="${$(e.currentTarget).attr('data-value')}"]`)
                .attr('id')
                .replace('MetroMap_line_', '');

            $(e.currentTarget).addClass('selected');
            mapClassAdd(id, 'selected');
            resetButton();
        } else {
            $(`.MetroMap_line_item[data-name="${$(e.currentTarget).attr('data-value')}"]`).removeClass('selected');

            let id = $(`.MetroMap_line_item[data-name="${$(e.currentTarget).attr('data-value')}"]`)
                .attr('id')
                .replace('MetroMap_line_', '');

            $(e.currentTarget).removeClass('selected');
            mapClassRemove(id, 'selected');
            resetButton();
        }

        $input.val(value);
    }
});

$('body').on('click', '.select__count', (e) => {
    $(e.currentTarget).closest('.select').removeClass('active');
    $(e.currentTarget).closest('.select').find('.checkbox-group__input').prop('checked', false);
    $(e.currentTarget).closest('.select').find('.select__input').val('');
    $(e.currentTarget).remove();
});

// hamburger
$('body').on('click', '.hamburger', (e) => {
    $(e.currentTarget).toggleClass('active');
    $('.menu').addClass('active');
});

// mobile menu
const pageNavToggle = document.querySelectorAll('.nav-toggle');

if (pageNavToggle) {
    pageNavToggle.forEach((el) => {
        el.addEventListener('click', (e) => {
            const self = document.querySelector('.root');
            self.classList.toggle('nav-open');
            $('.mobile-nav__second').removeClass('mobile-nav__second--open');
            return false;
        });
    });
}

// subscribe input
$('body').on('blur', '.subscribe input', (e) => {
    if ($(e.currentTarget).val() !== '') {
        $(e.currentTarget).addClass('fill');
    } else {
        $(e.currentTarget).removeClass('fill');
    }
});

// set same height cards
for (let i = 0; i < $('.items-grid').length; i++) {
    let $this = $('.item__content').eq(i);
    $this.find('.item__content--hover').css('height', $this.find('.item__content--base').outerHeight());
}

// flat menu
let lastScrollTop = 0;

if ($('.object-header').length > 0) {
    $(window).scroll(() => {
        let st = $(this).scrollTop();

        for (let i = 0; i < $('.menu-step').length; i++) {
            if ($(document).scrollTop() + $(window).height() * 0.7 > $('.menu-step').eq(i).offset().top && !$('body').hasClass('animate')) {
                $('.top-bar__nav li').removeClass('active');
                $(`.top-bar__nav li[data-menu="${$('.menu-step').eq(i).attr('data-menu')}"]`).addClass('active');
            }

            if (
                !st > lastScrollTop &&
                $(document).scrollTop() + $(window).height() * 0.7 < $('.menu-step').eq(i).offset().top + $('.menu-step').outerHeight() &&
                !$('body').hasClass('animate')
            ) {
                $('.top-bar__nav li').removeClass('active');
            }
        }

        lastScrollTop = st;
    });
}

$('body').on('click', '.top-bar__nav li', (e) => {
    $('.top-bar__nav li').removeClass('active');
    $(e.currentTarget).addClass('active');
    $('body').addClass('animate');
    $('html, body')
        .stop()
        .animate(
            { scrollTop: $(`.menu-step[data-menu="${$(e.currentTarget).attr('data-menu')}"]`).offset().top - $(window).height() * 0.1 },
            500,
            'swing',
            () => {
                $('body').removeClass('animate');
            }
        );
});

$('body').on('mouseenter', '.flat-item__media--image', (e) => {
    $(e.currentTarget).parent().find('.flat-item__popup').addClass('show');

    if ($(e.currentTarget).offset().top > $(document).scrollTop() + $(window).height() / 2) {
        $(e.currentTarget).parent().find('.flat-item__popup').addClass('bottom');
    }
});

$('body').on('mouseleave', '.flat-item__media--image', (e) => {
    $(e.currentTarget).parent().find('.flat-item__popup').removeClass('show').removeClass('bottom');
});

//yandex map page
if ($('#yandex').length > 0) {
    ymaps.ready(function () {
        var myIcon = ymaps.templateLayoutFactory.createClass(
            '<div class="yandex__wrap">' +
                '<div class="yandex__dot">' +
                '<div class="yandex__count">' +
                '{{ properties.count }}' +
                '</div><div class="yandex__price">' +
                '{{ properties.price }}' +
                '</div>' +
                '</div>' +
                '</div>'
        );

        var myMap = new ymaps.Map(
                'yandex',
                {
                    center: [55.751574, 37.573856],
                    zoom: 9,
                    controls: ['fullscreenControl'],
                },
                {
                    searchControlProvider: 'yandex#search',
                }
            ),
            // Создаём макет содержимого.
            myPlacemark = new ymaps.Placemark(
                [55.713443, 37.549197],
                {
                    count: '3',
                    price: 'от 44,44 млн ₽',
                    balloonContentBody: `<div class="item">
                        <div class="item__header">
                            <a href="javascript:void(0)" class="item__media">
                                <div class="item__media--image">
                                    <img src="img/content/item_image__01.jpg" class="img-fluid" alt="">
                                </div>
                            </a>
                        </div>
                        <div class="item__content">
                            <div class="item__content--base">
                                <div class="item__info">
                                    <div class="item__info--completion">Дома сданы</div>
                                    <div class="item__info--developer">Гранель</div>
                                </div>
                                <div class="item__title">Боярский палисадник</div>
                                <div class="item__district">
                                    <div class="item__district--icon" style="background-color: #FFD702;"></div>
                                    <div class="item__district--name">Раменки</div>
                                    <div class="item__district--distance">
                                        <i>
                                            <svg class="ico-svg" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg">
                                                <use xlink:href="img/sprites/sprite-mono.svg#distanceicon" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
                                            </svg>
                                        </i>
                                        <span>22 минуты</span>
                                    </div>
                                </div>
                                <div class="item__data">
                                    <div class="item__data--price">от 15,3 млн ₽</div>
                                    <div class="item__data--apartments">440 квартир</div>
                                </div>
                            </div>
                        </div>
                    </div>`,
                },
                {
                    iconLayout: 'default#imageWithContent',
                    // Размеры метки.
                    iconImageSize: [48, 48],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-24, -24],
                    // Смещение слоя с содержимым относительно слоя с картинкой.
                    iconContentOffset: [15, 15],
                    // Макет содержимого.
                    iconContentLayout: myIcon,
                }
            ),
            myPlacemark2 = new ymaps.Placemark(
                [55.684758, 37.738521],
                {
                    balloonContentBody: `<div class="item">
                        <div class="item__header">
                            <a href="javascript:void(0)" class="item__media">
                                <div class="item__media--image">
                                    <img src="img/content/item_image__01.jpg" class="img-fluid" alt="">
                                </div>
                            </a>
                        </div>
                        <div class="item__content">
                            <div class="item__content--base">
                                <div class="item__info">
                                    <div class="item__info--completion">Сдача IV кв 2022</div>
                                    <div class="item__info--developer">ЛСР недвижимость</div>
                                </div>
                                <div class="item__title">Мосфильмовский</div>
                                <div class="item__district">
                                    <div class="item__district--icon" style="background-color: #FFD702;"></div>
                                    <div class="item__district--name">Сокол</div>
                                    <div class="item__district--distance">
                                        <i>
                                            <svg class="ico-svg" viewBox="0 0 10 15" xmlns="http://www.w3.org/2000/svg">
                                                <use xlink:href="img/sprites/sprite-mono.svg#distanceicon" xmlns:xlink="http://www.w3.org/1999/xlink"></use>
                                            </svg>
                                        </i>
                                        <span>12 минут</span>
                                    </div>
                                </div>
                                <div class="item__data">
                                    <div class="item__data--price">от 28,61 млн ₽</div>
                                    <div class="item__data--apartments">43 квартиры</div>
                                </div>
                            </div>
                        </div>
                    </div>`,
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: '/img/icons/map-dot.svg',
                    iconImageSize: [12, 12],
                    iconImageOffset: [-6, -6],
                }
            );

        myMap.events.add('click', (e) => e.get('target').balloon.close());
        myMap.geoObjects.add(myPlacemark).add(myPlacemark2);
    });
}

$('body').on('click', '.yandex__grid', (e) => {
    $(e.currentTarget).toggle();
    $('.filter').toggle();
    $('.yandex__list').toggle();
    $('.yandex__back').show();
});

$('body').on('click', '.yandex__back', (e) => {
    $(e.currentTarget).toggle();
    $('.filter').toggle();
    $('.yandex__list').toggle();
    $('.yandex__grid').show();
});

// Custom scroll
document.querySelectorAll('.custom-scroll').forEach((el) => {
    new SimpleBar(el);
});

// fancybox
Fancybox.bind('[data-fancybox]', {
    placeFocusBack: false,
});

var cursor = $('.object-promo__slider-full .swiper-pagination-fraction');

$('body').on('mouseenter', '.object-promo__slider-full', (e) => {
    cursor.show().css('display', 'flex');
    $('html').addClass('cursor');
    $(window).mousemove(function (e) {
        cursor.css({
            top: e.clientY - cursor.height() / 2,
            left: e.clientX - cursor.width() / 2,
        });
    });
});

$('body').on('mouseleave', '.object-promo__slider-full', (e) => {
    cursor.hide();
    $('html').removeClass('cursor');
    $(window).mousemove(function (e) {
        cursor.css({
            top: e.clientY - cursor.height() / 2,
            left: e.clientX - cursor.width() / 2,
        });
    });
});

$('body').on('mouseenter', '.object-promo__slider-full .object-promo__nav--prev', (e) => {
    cursor.addClass('left');
});

$('body').on('mouseleave', '.object-promo__slider-full .object-promo__nav--prev', (e) => {
    cursor.removeClass('left');
});

$('body').on('mouseenter', '.object-promo__slider-full .object-promo__nav--next', (e) => {
    cursor.addClass('right');
});

$('body').on('mouseleave', '.object-promo__slider-full .object-promo__nav--next', (e) => {
    cursor.removeClass('right');
});
