function konamiCodeFunction(event) {
    let key = allowedKeys[event.keyCode]
    let requiredKey = konamiCode[konamiCodePosition]

    if (key == requiredKey) {
        konamiCodePosition++

        if (konamiCodePosition == konamiCode.length) {
            activateCheats()
            konamiCodePosition = 0
        }
    }
    else {
        konamiCodePosition = 0
    }
}

function activateCheats() {
    if (audio === true) {
        audio = false
        alert("Easter Egg deactivated")
    }
    else {
        audio = true
        alert("Easter Egg activated")
    }
}

let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'a',
    66: 'b'
}

let konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a']

let konamiCodePosition = 0

let audio = false

document.querySelector('body').addEventListener('keydown', konamiCodeFunction)

