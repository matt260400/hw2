function showInfo(event) {
    event.stopPropagation()
    if (showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.remove('hidden')
        document.querySelector('body').classList.add('noScroll')
    }
}

function closeInfoPage(event) {
    if (!showInfoWindow.classList.contains('hidden')) {
        showInfoWindow.classList.add('hidden')
        document.querySelector('body').classList.remove('noScroll')
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
const scrollToTop = document.querySelector('.scrollToTop').addEventListener('click', function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})

modalWindow.addEventListener('click', preventClose)
infoButton.addEventListener('click', showInfo)
closeInfo.addEventListener('click', closeInfoPage)
closeInfoModalBody.addEventListener('click', closeInfoPage)