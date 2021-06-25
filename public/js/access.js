function showInfo(event) {
    event.stopPropagation()
    if (showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.remove('hidden')
    }
}

function closeInfoPage(event) {
    if (!showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.add('hidden')
    }
}

function preventClose(event) {
    event.stopPropagation()
}

const showInfoWindow = document.querySelector('#infoView')
const modalWindow = document.querySelector('.modalWindow')
const infoButton = document.querySelector('#infoButton')
const closeInfo = document.querySelector('#closeInfo')
const closeInfoModalBody = document.querySelector('body')

modalWindow.addEventListener('click', preventClose)
infoButton.addEventListener('click', showInfo)
closeInfo.addEventListener('click', closeInfoPage)
closeInfoModalBody.addEventListener('click', closeInfoPage)