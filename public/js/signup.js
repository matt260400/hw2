function onResponse(response) {
    if (response.ok) {
        return response.json();
    }
}

function checkForm() {
    if (usernameValidation === true && emailValidation === true && passwordValidation === true && passwordCheckValidation === true) {
        firstPage.classList.add('hidden')
        secondPage.classList.remove('hidden')
        thirdPage.classList.add('hidden')
    }
    else {
        if (username.value === '') {
            username.parentElement.querySelector('p').textContent = 'Inserisci un nome utente.'
            username.parentElement.querySelector('p').classList.remove('hidden')
            username.classList.remove('available')
            username.classList.add('compulsory')
            usernameValidation = false
        }

        if (email.value === '') {
            email.parentElement.querySelector('p').textContent = 'Inserisci un indirizzo email.'
            email.parentElement.querySelector('p').classList.remove('hidden')
            email.classList.remove('available')
            email.classList.add('compulsory')
            emailValidation = false
        }

        if (password.value === '') {
            password.parentElement.querySelector('p').textContent = 'Lunghezza minima 8 caratteri (almeno una maiuscola, un numero e uno dei caratteri: @$!%*?&).'
            password.parentElement.querySelector('p').classList.remove('hidden')
            password.classList.remove('available')
            password.classList.add('compulsory')
            passwordValidation = false
        }

        if (passwordCheck.value === '') {
            passwordCheck.parentElement.querySelector('p').classList.remove('hidden');
            passwordCheck.parentElement.querySelector('p').textContent = 'Ripeti la password!'
            passwordCheck.classList.remove('available')
            passwordCheck.classList.add('compulsory')
            passwordCheckValidation = false
        }
    }
}

function agreementCheck() {
    const agreementTick = document.querySelector('#tick')
    if (!agreementTick.classList.contains('checkboxColor')) {
        agreementCheckError.textContent = ''
        agreementCheckError.classList.add('hidden')
        agreementTick.classList.add('checkboxColor')
        agreementCheckValidation = true
    }
    else {
        agreementTick.classList.remove('checkboxColor')
        agreementCheckValidation = false
    }
}

function changePage(event) {
    const pageSelector = event.currentTarget

    if (pageSelector.classList.contains('goToFirstPage')) {
        firstPage.classList.remove('hidden')
        secondPage.classList.add('hidden')
        thirdPage.classList.add('hidden')
    }

    if (pageSelector.classList.contains('goBackToSecondPage')) {
        firstPage.classList.add('hidden')
        secondPage.classList.remove('hidden')
        thirdPage.classList.add('hidden')
    }

    if (pageSelector.classList.contains('goToThirdPage')) {
        firstPage.classList.add('hidden')
        secondPage.classList.add('hidden')
        thirdPage.classList.remove('hidden')
    }
}

function highlightRed(event) {
    const isEmpty = event.currentTarget

    if (event.keyCode !== 9 && event.keyCode !== 16
        && event.keyCode !== 17 && event.keyCode !== 18 && event.keyCode !== 20) { // Verifico che non vengano premuti: 'tab', 'shift', 'ctrl', 'alt', 'caps lock'
        if (isEmpty.value === '') {
            isEmpty.classList.remove('available')
            isEmpty.classList.add('compulsory')
        }
    }
}

function favouriteArtistSend() {
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const data = document.querySelectorAll('#favouriteArtists div')

    artistList = {}
    let keyCount = 0

    for (item of data) {
        artistList["key" + keyCount] = item.dataset.id;
        keyCount++
    }

    const artistListStringify = JSON.stringify(artistList)

    if (Object.entries(artistList).length !== 0) {
        fetch('/hw2/public/favourite/addToFavouriteSignup', {
            method: 'POST',
            body: artistListStringify,
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        })
    }
}

function signupDataSend(event) {
    event.preventDefault()
    if (usernameValidation === true && emailValidation === true && passwordValidation === true && passwordCheckValidation === true && agreementCheckValidation === true) {
        const formData = { method: 'post', body: new FormData(document.querySelector('form')) }
        fetch("/hw2/public/register", formData).then(onResponseCheck).then(redirectURL)
    }
    else {
        if (agreementCheckValidation === false) {
            agreementCheckError.textContent = 'Si prega di accettare spontaneamente i termini di servizio.'
            agreementCheckError.classList.remove('hidden')
        }
    }
}

function onResponseCheck(response) {
    if (response.ok) {
        favouriteArtistSend()
        return response.text()
    }
}

function redirectURL(URL) {
    window.location.replace(URL)
}

const agreementButton = document.querySelector('#checkbox')
const firstPage = document.querySelector('#firstPage')
const secondPage = document.querySelector('#secondPage')
const thirdPage = document.querySelector('#thirdPage')
const goToFirstPage = document.querySelector('.goToFirstPage')
const goToSecondPage = document.querySelector('.goToSecondPage')
const goBackToSecondPage = document.querySelector('.goBackToSecondPage')
const goToThirdPage = document.querySelector('.goToThirdPage')
const compulsoryText = document.querySelectorAll('#firstPage .textBox')
const agreementCheckError = document.querySelector('#agreementError')
const formRegistration = document.querySelector('form')

let artistList = {}

goToSecondPage.addEventListener('click', checkForm)


for (item of compulsoryText) {
    item.addEventListener('keyup', highlightRed)
}

agreementButton.addEventListener('click', agreementCheck)
goToFirstPage.addEventListener('click', changePage)
goBackToSecondPage.addEventListener('click', changePage)
goToThirdPage.addEventListener('click', changePage)
formRegistration.addEventListener('submit', signupDataSend)

const username = document.querySelector('input[name="username"]')
const email = document.querySelector('input[name="email"]')
const password = document.querySelector('input[name="password"]')
const passwordCheck = document.querySelector('input[name="passwordCheck"]')

let usernameValidation = false
let emailValidation = false
let passwordValidation = false
let passwordCheckValidation = false
let agreementCheckValidation = false

username.addEventListener('click', checkUsernameOld)
username.addEventListener('keyup', checkUsername)
email.addEventListener('click', checkEmailOld)
email.addEventListener('keyup', checkEmail)
password.addEventListener('keyup', checkPassword)
password.addEventListener('blur', checkPasswordPawnd)
passwordCheck.addEventListener('keyup', checkPasswordConfirmation)