function inputValidation(event){
    if(loginForm.username.value.length === 0 || loginForm.password.value.length === 0){
        errorMessage.classList.remove('hidden')
        event.preventDefault();

        if(loginForm.username.value.length === 0){
            loginForm.username.classList.add('compulsory')
        }
        else{
            loginForm.username.classList.remove('compulsory')
        }
    
        if(loginForm.password.value.length === 0){
            loginForm.password.classList.add('compulsory')
        }
        else{
            loginForm.password.classList.remove('compulsory')
        }
    }
    else{
        errorMessage.classList.add('hidden')
        loginForm.username.classList.remove('compulsory')
        loginForm.password.classList.remove('compulsory')
    }
}

const loginform = document.forms['loginForm']
loginform.addEventListener('submit', inputValidation)

const errorMessage = document.querySelector('#inputAlert')