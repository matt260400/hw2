/* Username check */

function checkUsernameRegex() {
    if (!/^[a-zA-Z0-9_]{1,16}$/.test(username.value)) {
        if (username.parentElement.parentElement.classList.contains('typeSection')) {
            username.parentElement.parentElement.querySelector('p').textContent = 'Username non valido! Sono ammessi lettere, numeri e il carattere underscore. Lunghezza massima di 16 caratteri.'
            username.parentElement.parentElement.querySelector('p').classList.remove('hidden')
            username.classList.remove('available')
            username.classList.add('compulsory')
            usernameValidation = false
        }
        else {
            username.parentElement.querySelector('p').textContent = 'Username non valido! Sono ammessi lettere, numeri e il carattere underscore. Lunghezza massima di 16 caratteri.'
            username.parentElement.querySelector('p').classList.remove('hidden')
            username.classList.remove('available')
            username.classList.add('compulsory')
            usernameValidation = false
        }
    } else {
        fetch("/hw2/public/register/username/" + encodeURIComponent(username.value)).then(onResponse).then(checkUsernameAvailability)
    }
}

function checkUsernameOld() {
    if (username.value !== '') {
        checkUsernameRegex()
    }
}

function checkUsername(event) {
    if (username.value !== '') {
        if (event.keyCode !== 37 && event.keyCode !== 38
            && event.keyCode !== 39 && event.keyCode !== 40) {
            checkUsernameRegex()
        }
    }
    else {
        if (username.parentElement.parentElement.classList.contains('typeSection')) {
            username.parentElement.parentElement.querySelector('p').textContent = 'Inserisci un nome utente.'
            username.parentElement.parentElement.querySelector('p').classList.remove('hidden')
            username.classList.remove('available')
            username.classList.add('compulsory')
            usernameValidation = false
        }
        else {
            username.parentElement.querySelector('p').textContent = 'Inserisci un nome utente.'
            username.parentElement.querySelector('p').classList.remove('hidden')
            usernameValidation = false
        }
    }
}

function checkUsernameAvailability(json) {
    if (json === true) {
        if (username.parentElement.parentElement.classList.contains('typeSection')) {
            username.parentElement.parentElement.querySelector('p').classList.add('hidden')
            username.parentElement.parentElement.querySelector('p').classList.remove('inputSuccess')
            username.parentElement.parentElement.querySelector('p').classList.add('inputError')
            username.classList.remove('compulsory')
            username.classList.add('available')
            usernameValidation = true
            saveMod()
        }
        else {
            username.parentElement.querySelector('p').classList.add('hidden')
            username.classList.remove('compulsory')
            username.classList.add('available')
            usernameValidation = true
        }
    } else {
        if (username.parentElement.parentElement.classList.contains('typeSection')) {
            username.parentElement.parentElement.querySelector('p').textContent = 'Nome utente non disponibile!'
            username.parentElement.parentElement.querySelector('p').classList.remove('hidden')
            username.classList.remove('available')
            username.classList.add('compulsory')
            usernameValidation = false
            saveMod()
        }
        else {
            username.parentElement.querySelector('p').textContent = 'Nome utente non disponibile!'
            username.parentElement.querySelector('p').classList.remove('hidden')
            username.classList.remove('available')
            username.classList.add('compulsory')
            usernameValidation = false
        }
    }
}

/* Email check */

function checkEmailRegex() {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email.value).toLowerCase())) {
        if (email.parentElement.parentElement.classList.contains('typeSection')) {
            email.parentElement.parentElement.querySelector('p').textContent = "Email non valida!"
            email.parentElement.parentElement.querySelector('p').classList.remove('hidden')
            email.classList.remove('available')
            email.classList.add('compulsory')
            emailValidation = false
        }
        else {
            email.parentElement.querySelector('p').textContent = "Email non valida!"
            email.parentElement.querySelector('p').classList.remove('hidden')
            email.classList.remove('available')
            email.classList.add('compulsory')
            emailValidation = false
        }
    } else {
        fetch("/hw2/public/register/email/" + encodeURIComponent(email.value.toLowerCase())).then(onResponse).then(checkEmailAvailability);
    }
}

function checkEmailOld() {
    if (email.value !== '') {
        checkEmailRegex()
    }
}

function checkEmail(event) {
    if (email.value !== '') {
        if (event.keyCode !== 37 && event.keyCode !== 38
            && event.keyCode !== 39 && event.keyCode !== 40) {
            checkEmailRegex()
        }
    }
    else {
        if (email.parentElement.parentElement.classList.contains('typeSection')) {
            email.parentElement.parentElement.querySelector('p').textContent = 'Inserisci un indirizzo email.'
            email.parentElement.parentElement.querySelector('p').classList.remove('hidden')
            email.classList.remove('available')
            email.classList.add('compulsory')
            emailValidation = false
        }
        else {
            email.parentElement.querySelector('p').textContent = 'Inserisci un indirizzo email.'
            email.parentElement.querySelector('p').classList.remove('hidden')
            emailValidation = false
        }
    }
}

function checkEmailAvailability(json) {
    if (json === true) {
        if (email.parentElement.parentElement.classList.contains('typeSection')) {
            email.parentElement.parentElement.querySelector('p').classList.add('hidden')
            email.classList.remove('compulsory')
            email.classList.add('available')
            emailValidation = true
            saveMod()
        }
        else {
            email.parentElement.querySelector('p').classList.add('hidden')
            email.classList.remove('compulsory')
            email.classList.add('available')
            emailValidation = true
        }
    } else {
        if (email.parentElement.parentElement.classList.contains('typeSection')) {
            email.parentElement.parentElement.querySelector('p').textContent = 'Indirizzo email già utilizzato!'
            email.parentElement.parentElement.querySelector('p').classList.remove('hidden')
            email.parentElement.parentElement.querySelector('p').classList.remove('inputSuccess')
            email.parentElement.parentElement.querySelector('p').classList.add('inputError')
            email.classList.remove('available')
            email.classList.add('compulsory')
            emailValidation = false
            saveMod()
        }
        else {
            email.parentElement.querySelector('p').textContent = 'Indirizzo email già utilizzato!'
            email.parentElement.querySelector('p').classList.remove('hidden')
            email.classList.remove('available')
            email.classList.add('compulsory')
            emailValidation = false
        }
    }
}

/* Password check */

function checkPassword() {
    password.parentElement.querySelector('p').classList.add('hidden')
    if (password.value !== '') {
        password.parentElement.querySelector('p').textContent = ''
        password.parentElement.querySelector('p').classList.add('hidden')
        checkPasswordConfirmation()
        if ((/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value))) {
            password.parentElement.querySelector('p').classList.add('hidden')
            password.classList.remove('compulsory')
            password.classList.add('available')
        }
        else {
            password.parentElement.querySelector('p').textContent = 'Lunghezza minima 8 caratteri (almeno una maiuscola, un numero e uno dei caratteri: @$!%*?&).'
            password.parentElement.querySelector('p').classList.remove('hidden')
            password.classList.remove('available')
            password.classList.add('compulsory')
            passwordValidation = false
        }
    }
    else {
        checkPasswordConfirmation()
        password.parentElement.querySelector('p').textContent = 'Lunghezza minima 8 caratteri (almeno una maiuscola, un numero e uno dei caratteri: @$!%*?&).'
        password.parentElement.querySelector('p').classList.remove('hidden')
        password.classList.remove('available')
        passwordValidation = false
    }
}

function checkPasswordConfirmation() {
    if (passwordCheck.value !== '') {
        if (password.value === passwordCheck.value) {
            passwordCheck.parentElement.querySelector('p').classList.add('hidden');
            passwordCheck.classList.add('available')
            passwordCheck.classList.remove('compulsory')
            passwordCheck.classList.add('available')
            passwordCheckValidation = true
        } else {
            passwordCheck.parentElement.querySelector('p').textContent = 'Le password non coincidono!'
            passwordCheck.parentElement.querySelector('p').classList.remove('hidden');
            passwordCheck.classList.remove('available')
            passwordCheck.classList.add('compulsory')
            passwordCheckValidation = false
        }
    }
    else {
        passwordCheck.parentElement.querySelector('p').classList.remove('hidden');
        passwordCheck.parentElement.querySelector('p').textContent = 'Ripeti la password!'
        passwordCheckValidation = false
    }
}

/* Password pawn check */

function checkPasswordPawnd() {
    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const fetchObj = {}

    fetchObj["password"] = password.value

    const fetchValue = JSON.stringify(fetchObj)

    fetch('/hw2/public/register/password', {
        method: 'POST',
        body: fetchValue,
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(checkPasswordPawndConfirmation)
}

function checkPasswordPawndConfirmation(json) {
    if (json === true) {
        passwordValidation = true
    }
    else {
        password.parentElement.querySelector('p').textContent = 'La password scelta è apparsa in un data leak. Si prega di scegliere una password diversa.'
        password.parentElement.querySelector('p').classList.remove('hidden')
        password.classList.remove('available')
        password.classList.add('compulsory')
        passwordValidation = false
    }
}