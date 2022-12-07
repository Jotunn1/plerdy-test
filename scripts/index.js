document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body')
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modal = document.getElementById('modal');
    const openModalBtns = document.getElementsByClassName('open-modal');
    const inputName = document.getElementById('name');
    const inputPhone = document.getElementById('phone');
    const form = document.querySelector('form');
    const menuBtn = document.querySelector('.burger-menu')
    const mobileMenu = document.querySelector('.mobile-menu')
    let dialCode = 0;

    const clearForm = () => {
        inputName.value = '';
        inputPhone.value = ''
    }

    const submitUser = (userObj) => {
        // just verify user data and here we can send user data to backend
        // in this case i only log user to console
        const isObjVerified = Object.values(userObj).every(value => value);
        if (isObjVerified) {
            const phone = userObj.phone;
            userObj.phone = dialCode + ' ' + phone;
            console.log(userObj, 'user');
            clearForm();
        }
        else console.log(isObjVerified, 'isObjVerified')
    }

    const closeModal = () => {
        modal.classList.add('hidden');
        body.classList.remove('stop-scroll')
    }

    const openModal = () => {
        if (modal.classList.contains('hidden')) {
            modal.classList.remove('hidden');

        }
        modal.classList.add('active');
        body.classList.add('stop-scroll')
    }

    const verifyInput = (input) => {
        if (input.value === '') {
            input.closest('label').classList.add('error')
        }
        return input.value
    }

    const removeInputError = (input) => {
        if (input.value !== '' && input.closest('label').classList.contains('error')) {
            input.closest('label').classList.remove('error')
        }
    }

    const mobileMenuToggle = () => {
        if (mobileMenu.classList.contains('closed')) {
            mobileMenu.classList.remove('closed')
            mobileMenu.classList.add('open');
            body.classList.add('stop-scroll')
        }
        else {
            mobileMenu.classList.remove('open')
            mobileMenu.classList.add('closed')
            body.classList.remove('stop-scroll')
        }
    }

    const setDialCode = () => {
        setTimeout(() => {
            //hack that i need because dial code select are made with scripts after first DOM render, and i need to select it asynchronously
            const dialCodeInput = document.querySelector('.iti__selected-dial-code');
            dialCode = dialCodeInput.innerHTML;
        }, 0)
    }
    setDialCode();

    //slider
    const swiper = new Swiper('.swiper', {
        loop: false,
        slidesPerView: 1,
        navigation: {
            nextEl: '.btn-next',
            prevEl: '.btn-prev',
        },
        pagination: {
            el: '.swiper-pagination'
        },
        spaceBetween: 10,
        breakpoints: {
            768: {
                slidesPerView: 2
            },
            1024: {
                slidesPerView: 4
            }
        }
    });
    // dial code select with flags
    window.intlTelInput(inputPhone, {
        separateDialCode: true,
        initialCountry: "ua",
        onlyCountries: ["pl", "no", "ua"],
    });

    form.addEventListener('submit', (e) => {
        const user = {
            name: verifyInput(inputName),
            phone: verifyInput(inputPhone)
        }
        e.preventDefault();
        submitUser(user);
    })
    inputName.addEventListener('input', (e) => removeInputError(e.target));
    inputPhone.addEventListener('input', (e) => removeInputError(e.target));
    inputPhone.addEventListener('countrychange', (e) => {
        setDialCode();
    })
    Array.from(openModalBtns).forEach(element => {
        element.addEventListener('click', () => openModal())
    });
    closeModalBtn.addEventListener('click', () => closeModal());
    menuBtn.addEventListener('click', () => mobileMenuToggle())
})
