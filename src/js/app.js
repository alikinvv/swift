let canUseWebp = () => {
    const elem = document.createElement('canvas');
    if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
};

let lazyImages = () => {
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
};

let mobileNav = () => {
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
};

let collapce = () => {
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
};

let maskPhone = (selector, masked = '+7 (___) ___-__-__') => {
    const elems = document.querySelectorAll(selector);

    function mask(event) {
        const keyCode = event.keyCode;
        const template = masked,
            def = template.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');
        console.log(template);
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

let tabs = () => {
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
            }

            if (e.target.classList.contains('tabs__arrow--prev')) {
                let activeBtn = document.querySelector('.tabs__btn--active');
                let activeParent = activeBtn.closest('.tabs__item');
                let previousParent = activeParent.previousElementSibling;

                if (previousParent) {
                    let prevActive = previousParent.querySelector('.tabs__btn');
                    tabsBtn.forEach((el) => {
                        el.classList.remove('tabs__btn--active');
                    });
                    prevActive.classList.add('tabs__btn--active');

                    let path = prevActive.dataset.tabsPath;
                    tabsHandler(path);
                }
            }

            if (e.target.classList.contains('tabs__arrow--next')) {
                let activeBtn = document.querySelector('.tabs__btn--active');
                let activeParent = activeBtn.closest('.tabs__item');
                let nextParent = activeParent.nextElementSibling;

                if (nextParent) {
                    let nextActive = nextParent.querySelector('.tabs__btn');
                    tabsBtn.forEach((el) => {
                        el.classList.remove('tabs__btn--active');
                    });
                    nextActive.classList.add('tabs__btn--active');

                    let path = nextActive.dataset.tabsPath;
                    tabsHandler(path);
                }
            }
        });
    }

    const tabsHandler = (path) => {
        tabsContent.forEach((el) => {
            el.classList.remove('tabs__content--active');
        });
        document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
    };
};

let accordion = () => {
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
};

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

lazyImages();
tabs();
mobileNav();
collapce();
accordion();
maskPhone('input[name="phone"]');

// Select
const selectElem = document.querySelectorAll('.pretty-select');

selectElem.forEach((el) => {
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

// Custom scroll
document.querySelectorAll('.custom-scroll').forEach((el) => {
    new SimpleBar(el);
});

$('.footer-nav__view').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('open');
    $(this).closest('.footer-nav__content').find('.footer-nav__menu').toggleClass('open');
});

let footerNavToggle = function () {
    const footerNavControl = document.querySelectorAll('.footer-nav__toggle');
    footerNavControl.forEach((el) => {
        el.addEventListener('click', (e) => {
            const self = e.currentTarget.closest('.footer-nav__group');
            self.classList.toggle('footer-nav__group--open');
            return false;
        });
    });
};
footerNavToggle();

let sideNav = function () {
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
};
sideNav();

//Breadcrumb
const breadcrumb = new Swiper('.breadcrumb-slider', {
    loop: false,
    slidesPerView: 'auto',
    simulateTouch: false,
});

// Base Range
let rangeField = function () {
    let $range = $('.range-field-slider');
    $range.ionRangeSlider({
        grid: false,
        skin: 'round',
        onChange: function (data) {},
    });

    $range.on('change', function (data) {
        let $inp = $(this);
        let $rangeField = $inp.closest('.range');
        let rangeFrom = $inp.data('from');
        let rangeTo = $inp.data('to');
        let rangeMax = $inp.attr('data-max');
        let rangeParam = $inp.attr('data-param');
        let rangeValues = $inp.attr('data-range-values');
        let $rangeValFrom = $rangeField.find('.range__value--from');
        let $rangeValTo = $rangeField.find('.range__value--to');
        let $rangePercent = $rangeField.find('.range__value--percent');
        let rangePercentValue = Math.ceil((rangeFrom * 100) / rangeMax) + '%';

        if (rangeValues) {
            let arrRangeValues = rangeValues.split(',');
            let arrRangeFrom = arrRangeValues[rangeFrom];
            let arrRangeTo = arrRangeValues[rangeTo];

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
};
rangeField();

// drop-down list field
let prettyField = function () {
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
};
prettyField();

// Item
$('.item__toggle').on('click', function (e) {
    e.preventDefault();
    let $item = $(this).closest('.item');
    $item.toggleClass('item--switch');
});
$('.item__tags--toggle').on('click', function (e) {
    e.preventDefault();
    let $item = $(this).closest('.item__tags');
    $item.toggleClass('open');
    $item.find('.item__tags--dropdown').slideToggle('fast');
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
            spaceBetween: 40,
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

// filter
let filter = function () {
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
filter();

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

let finishing = function () {
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
};
finishing();

let projectProgress = function () {
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
};
projectProgress();

// credit filter
$('.credit-filter__toggle').on('click', function (e) {
    e.preventDefault();
    $('.credit-filter__additional').slideToggle('fast');
});

$('.credit__toggle').on('click', function (e) {
    e.preventDefault();
    let $item = $(this).closest('.credit');

    $item.toggleClass('credit--open');
    $item.find('.credit__options').slideToggle('fast');
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

let projectTop = function () {
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
};
projectTop();

// Flat Gallery
let flatMedia = function () {
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
};
flatMedia();
