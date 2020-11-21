'use strict';
window.addEventListener('load', function () {

    // Обработка ползунков калькулятора
    let sum = document.getElementById('sum');
    let term = document.getElementById('term');
    const sumMax = 2000000;
    const sumMin = 90000;
    const termMax = 60;
    const termMin = 13;
    let showSum = document.getElementById('show-sum');
    let showTerm = document.getElementById('show-term');

    sum.addEventListener('input', function () {
        if (this.value <= sumMin) {
            this.value = sumMin
        }
        let sumValue = (this.value * 100) / sumMax;
        sum.style.background = `-webkit-linear-gradient(left, #FEE600 0%, #FEE600 ${sumValue}%, #E1E1E3 ${sumValue}%, #E1E1E3 100%)`;
        showSum.innerText = `${this.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`;
    });

    term.addEventListener('input', function () {
        if (this.value <= termMin) {
            this.value = termMin
        }
        let termValue = (this.value * 100) / termMax;
        term.style.background = `-webkit-linear-gradient(left, #FEE600 0%, #FEE600 ${termValue}%, #E1E1E3 ${termValue}%, #E1E1E3 100%)`;
        showTerm.innerText = `${this.value} мес.`;
    });

    // Расчет ежемесячного платежа
    let calcSum = document.getElementById('sum');
    let calcTerm = document.getElementById('term');
    calcSum.addEventListener('change', function () {
        calculated();
    });
    calcTerm.addEventListener('change', function () {
        calculated();
    });

    // Функция расчета ежемесячного платежа
    function calculated() {
        let interestRate = parseFloat(document.getElementById('interest-rate').textContent.replace(',', '.'));
        let monthlyPayment = document.getElementById('monthly-payment');

        calcSum = document.getElementById('sum');
        calcSum = parseFloat(calcSum.value);
        calcTerm = document.getElementById('term');
        calcTerm = parseInt(calcTerm.value);

        let calculatedPayment = String(Math.ceil(( ((calcSum/100)*interestRate)/12 + calcSum/calcTerm )*calcTerm));
        monthlyPayment.innerText = `${calculatedPayment.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')} ₽`
    }

    // Управлние кнопкой "Оффер"
    let offerButton = document.querySelector('.offer-button');

    offerButton.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('three').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    let scrollPos = 0;
    let scrollDirection = ''; //'UP' 'DOWN'

    let displayThree = document.getElementById('three');
    let displayFour = document.getElementById('four');
    let footerOne = document.querySelector('.content-footer__one');
    let startPoint = null;
    let endPoint = null;
    let footerPoint = null;

    window.addEventListener('scroll', function () {

        let st = this.pageYOffset;
        if (st > scrollPos) {
            scrollDirection = 'DOWN';
        } else {
            scrollDirection = 'UP';
        }
        scrollPos = st;

        if ( scrollDirection === 'DOWN' ) {
            document.getElementById('header').classList.add('header-hide');
        }

        if ( scrollDirection === 'UP' ) {
            document.getElementById('header').classList.remove('header-hide');
        }

        startPoint = displayThree.clientHeight/4 + displayThree.getBoundingClientRect().bottom;
        endPoint = window.pageYOffset + displayFour.getBoundingClientRect().bottom - displayFour.clientHeight;
        footerPoint = window.pageYOffset + footerOne.getBoundingClientRect().top - footerOne.clientHeight * 7

        if (startPoint > window.pageYOffset || endPoint < window.pageYOffset) {
            if (offerButton.classList.contains('button-show') === false) {
                offerButton.classList.add('button-show')
            }
        } else {
            if (offerButton.classList.contains('button-show') === true) {
                offerButton.classList.remove('button-show')
            }
        }

        if (footerPoint > window.pageYOffset && startPoint > window.pageYOffset ||
            footerPoint > window.pageYOffset && endPoint < window.pageYOffset) {
            if (offerButton.classList.contains('button-show') === false) {
                offerButton.classList.add('button-show')
            }
        } else {
            if (offerButton.classList.contains('button-show') === true) {
                offerButton.classList.remove('button-show')
            }
        }

    });

    // Слайдер
    let swiperMobileBank = new Swiper('.mobile-bank', {
        loop: true,
        speed: 1500,
        allowTouchMove: false,
        initialSlide: 0,
        breakpoints: {
            300: {
                slidesPerView: 2,
                spaceBetween: 16,
                slidesPerGroup: 1,
                allowTouchMove: true,
                speed: 600,
                //autoplay: false,
                //loop: false,
                pagination: {
                    el: '.bullet__mobile-bank'
                },
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 20,
                slidesPerGroup: 1,
            }
        },
        navigation: {
            prevEl: '.pagination__mobile-bank .prev',
            nextEl: '.pagination__mobile-bank .next',
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
    });

});