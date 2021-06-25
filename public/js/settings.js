function modifyAccount(event) {
    if (event.currentTarget.parentElement.querySelector('input').readOnly && event.currentTarget.parentElement.querySelector('input').name !== 'passwordOld') {
        event.currentTarget.parentElement.querySelector('input').readOnly = false

        const index = event.currentTarget.parentElement.querySelector('.textbox').value.length
        const position = event.currentTarget.parentElement.querySelector('.textbox')

        position.focus()

        /*
            The HTMLInputElement.setSelectionRange() method sets the start and end positions of the current text selection in an <input> or <textarea> element.
        */

        if (event.currentTarget.parentElement.querySelector('input').name === 'username') {
            username.addEventListener('keyup', checkUsername)
            position.setSelectionRange(index, index);
        }

        if (event.currentTarget.parentElement.querySelector('input').name === 'email') {
            email.addEventListener('keyup', checkEmail)
            position.setSelectionRange(index, index);
        }

        if (event.currentTarget.parentElement.querySelector('input').name === 'proPic') {
            proPic.addEventListener('keyup', checkProPic)
            position.setSelectionRange(0, index);
        }
    }
    else {
        event.currentTarget.parentElement.querySelector('input').readOnly = true

        if (event.currentTarget.parentElement.querySelector('input').name === 'username') {
            username.removeEventListener('keyup', checkUsername)
        }

        if (event.currentTarget.parentElement.querySelector('input').name === 'email') {
            email.removeEventListener('keyup', checkEmail)
        }

        if (event.currentTarget.parentElement.querySelector('input').name === 'proPic') {
            proPic.removeEventListener('keyup', checkProPic)
        }
    }

    if (event.currentTarget.parentElement.querySelector('input').name === 'passwordOld') {
        event.currentTarget.parentElement.querySelector('input').focus()
        event.currentTarget.parentElement.querySelector('input').setSelectionRange(0, event.currentTarget.parentElement.querySelector('input').value.length)
        passwordModify()
    }
}

function usernameModify() {
    const fetchObj = {}
    fetchObj["username"] = username.value

    const newUsername = JSON.stringify(fetchObj)

    usernameValueOld = username.value

    fetch('/hw2/public/settings/username', {
        method: 'POST',
        body: newUsername,
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(onResultUsername)
}

function emailModify() {
    const fetchObj = {}
    fetchObj["email"] = email.value

    const newEmail = JSON.stringify(fetchObj)

    emailValueOld = email.value

    fetch('/hw2/public/settings/email', {
        method: 'POST',
        body: newEmail,
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(onResultEmail)
}

function proPicModify() {
    const fetchObj = {}
    fetchObj["proPic"] = proPic.value

    const newProPic = JSON.stringify(fetchObj)

    proPicValueOld = proPic.value

    fetch('/hw2/public/settings/proPic', {
        method: 'POST',
        body: newProPic,
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(onResultProPic)
}

function onResultUsername(json) {
    if (json === 'perfect_username') {
        const fetchResult = document.querySelector('.username').parentElement.querySelector('p')
        fetchResult.classList.remove('inputError')
        fetchResult.classList.add('inputSuccess')
        fetchResult.classList.remove('hidden')
        fetchResult.textContent = 'Username modificato con successo.'
        usernameValidation = false
        saveMod()
    }
    else {
        const fetchResult = document.querySelector('.username').parentElement.querySelector('p')
        fetchResult.textContent = 'Si è verificato un errore nella modifica dell\'username, riprova.'
    }
}

function onResultEmail(json) {
    if (json === 'perfect_email') {
        const fetchResult = document.querySelector('.email').parentElement.querySelector('p')
        fetchResult.classList.remove('inputError')
        fetchResult.classList.add('inputSuccess')
        fetchResult.classList.remove('hidden')
        fetchResult.textContent = 'Email modificata con successo.'
        emailValidation = false
        saveMod()
    }
    else {
        const fetchResult = document.querySelector('.email').parentElement.querySelector('p')
        fetchResult.textContent = 'Si è verificato un errore nella modifica dell\'email, riprova.'
    }
}

function checkProPic() {
    proPicValidation = true
    saveMod()
}

function onResultProPic(json) {
    if (json === 'perfect_proPic') {
        const fetchResult = document.querySelector('.proPic').parentElement.querySelector('p')
        console.log(fetchResult)
        fetchResult.classList.remove('inputError')
        fetchResult.classList.add('inputSuccess')
        fetchResult.classList.remove('hidden')
        fetchResult.textContent = 'Immagine di profilo modificata con successo.'
        proPicValidation = false
        saveMod()
    }
    else {
        const fetchResult = document.querySelector('.proPic').parentElement.querySelector('p')
        fetchResult.textContent = 'Si è verificato un errore nella modifica dell\'immagine di profilo, riprova.'
    }
}

function passwordModify() {
    if (document.querySelector('.passwordChoice').parentElement.classList.contains('hidden')) {
        document.querySelector('.password').querySelector('input').readOnly = false
        document.querySelector('.password').parentElement.querySelector('p').classList.remove('hidden')
        document.querySelector('.passwordChoice').parentElement.classList.remove('hidden')
        submitButtonDiv.classList.remove('hidden')
        submitButton.classList.remove('commitButtonYep')
        submitButton.classList.add('commitButtonNope')
    }
    else {
        document.querySelector('.password').querySelector('input').readOnly = true
        document.querySelector('.password').parentElement.querySelector('p').classList.add('hidden')
        document.querySelector('.passwordChoice').parentElement.classList.add('hidden')
        submitButtonDiv.classList.add('hidden')
    }
}

function passwordCommitChanges(event) {
    event.preventDefault()

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

    if (passwordValidation === true && passwordCheckValidation === true) {
        submitButton.classList.remove('commitButtonYep')
        submitButton.classList.add('commitButtonYep')
        const formData = { method: 'post', body: new FormData(document.querySelector('form')) }
        fetch("/hw2/public/settings/password", formData).then(onResponse).then(showMessage)
    }
}

function onResponse(response) {
    if (response.ok) {
        return response.json();
    }
}

function showMessage(json) {
    const fetchResult = document.querySelector('.password').parentElement.querySelector('p')

    submitButton.classList.remove('commitButtonYep')
    submitButton.classList.add('commitButtonNope')

    if (json === 'error') {
        fetchResult.textContent = 'Probabilmente hai sbagliato qualcosa, riprova.'
    }
    else {
        fetchResult.classList.remove('inputError')
        fetchResult.classList.add('inputSuccess')
        fetchResult.textContent = 'Password modificata con successo.'
    }
}

function saveMod() {
    if (usernameValidation === true || emailValidation === true || proPicValidation === true) {
        saveButton.classList.remove('commitButtonNope')
        saveButton.classList.add('commitButtonYep')
        saveButton.classList.add('hoverButton')
        saveButton.addEventListener('click', commitChanges)
    }
    else {
        saveButton.classList.add('commitButtonNope')
        saveButton.classList.remove('commitButtonYep')
        saveButton.classList.remove('hoverButton')
        saveButton.removeEventListener('click', commitChanges)
    }
}

function commitChanges() {
    if (usernameValidation === true) {
        usernameModify()
    }

    if (emailValidation === true) {
        emailModify()
    }

    if (proPicValidation === true) {
        proPicModify()
    }
}

function reset() {
    username.value = usernameValueOld
    email.value = emailValueOld
    proPic.value = proPicValueOld

    username.classList.remove('available')
    username.classList.remove('compulsory')

    email.classList.remove('available')
    email.classList.remove('compulsory')

    proPic.classList.remove('available')
    proPic.classList.remove('compulsory')

    saveButton.classList.add('commitButtonNope')
    saveButton.classList.remove('commitButtonYep')
    saveButton.classList.remove('hoverButton')

    saveButton.removeEventListener('click', commitChanges)

    document.querySelector('.username').parentElement.querySelector('p').classList.add('hidden')
    document.querySelector('.email').parentElement.querySelector('p').classList.add('hidden')
    document.querySelector('.proPic').parentElement.querySelector('p').classList.add('hidden')
}

const pencil = document.querySelectorAll('.pencil')

for (item of pencil) {
    item.addEventListener('click', modifyAccount)
}

const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const username = document.querySelector('input[name="username"]')
const email = document.querySelector('input[name="email"]')
const password = document.querySelector('input[name="password"]')
const passwordCheck = document.querySelector('input[name="passwordCheck"]')
const proPic = document.querySelector('input[name="proPic"]')
const submit = document.querySelector('form')
const submitButtonDiv = document.querySelector('#submitButtonDiv')
const submitButton = document.querySelector('#submitButton')
const cancelButton = document.querySelector('#cancel')
const saveButton = document.querySelector('#save')

let usernameValidation = false
let emailValidation = false
let passwordValidation = false
let passwordCheckValidation = false
let proPicValidation = false

let usernameValueOld = username.value
let emailValueOld = email.value
let proPicValueOld = proPic.value

password.addEventListener('keyup', checkPassword)
password.addEventListener('blur', checkPasswordPawnd)
passwordCheck.addEventListener('keyup', checkPasswordConfirmation)
submit.addEventListener('submit', passwordCommitChanges)
saveButton.addEventListener('click', commitChanges)
cancelButton.addEventListener('click', reset)