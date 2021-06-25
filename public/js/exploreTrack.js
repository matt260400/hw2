function showLyrics(event) {
    if (event.currentTarget.parentElement.classList.contains('linkFromSearch')) {
        whoOpensTrack = 'search'
    }
    if (event.currentTarget.parentElement.classList.contains('favouriteLyricsLink')) {
        whoOpensTrack = 'favourite'
    }
    if (event.currentTarget.parentElement.classList.contains('homepageLyricsLink')) {
        whoOpensTrack = 'homepage'
    }

    scroll(0, 0)

    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    loading.querySelector('p').textContent = 'Attendi mentre carichiamo le robette del brano'

    let variable = document.querySelector('.emptyHomepageDiv')

    if (variable !== null) {
        const emptyHomepageDiv = document.querySelector('.emptyHomepageDiv')
        emptyHomepageDiv.classList.add('hidden')
    }

    searchResultsSpotify.classList.add('hidden')
    customContents.classList.add('hidden')
    favourite.classList.add('hidden')
    loading.classList.remove('hidden')

    lyricsContainer.innerHTML = ''

    const goBackDiv = document.createElement('div')
    const descriptionDiv = document.createElement('div')
    const imgDiv = document.createElement('div')
    const img = document.createElement('img')
    const infoDiv = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const album = document.createElement('p')
    const releaseDate = document.createElement('p')
    const lineBottom = document.createElement('div')
    const lyricsInfoVideoDiv = document.createElement('div')
    const infoVideoDiv = document.createElement('div')

    goBackDiv.addEventListener('click', goBack)

    goBackDiv.classList.add('arrow')
    goBackDiv.classList.add('left')
    lineBottom.classList.add('line')
    descriptionDiv.classList.add('descriptionDiv')
    infoDiv.classList.add('infoDiv')
    title.classList.add('trackTitle')
    lyricsInfoVideoDiv.classList.add('lyricsInfoVideoDiv')
    infoVideoDiv.classList.add('infoVideoDiv')

    lyricsContainer.appendChild(goBackDiv)
    lyricsContainer.appendChild(descriptionDiv)
    descriptionDiv.appendChild(imgDiv)
    imgDiv.appendChild(img)
    descriptionDiv.appendChild(infoDiv)
    infoDiv.appendChild(title)
    infoDiv.appendChild(author)
    infoDiv.appendChild(album)
    infoDiv.appendChild(releaseDate)
    lyricsContainer.appendChild(lineBottom)
    lyricsContainer.appendChild(lyricsInfoVideoDiv)
    lyricsInfoVideoDiv.appendChild(infoVideoDiv)
    let titleToSplit

    const lyricsSearch = {}

    if (!event.currentTarget.parentElement.classList.contains('homepageLyricsLink') && !event.currentTarget.parentElement.classList.contains('favouriteLyricsLink')) {
        img.src = event.currentTarget.parentElement.parentElement.parentElement.querySelector('img').src
        title.innerText = event.currentTarget.parentElement.parentElement.parentElement.dataset.title
        author.innerText = 'Autore: ' + event.currentTarget.parentElement.parentElement.parentElement.dataset.author
        album.innerText = 'Album: ' + event.currentTarget.parentElement.parentElement.parentElement.dataset.album
        releaseDate.innerText = 'Data pubblicazione: ' + event.currentTarget.parentElement.parentElement.parentElement.dataset.release_date
        titleToSplit = event.currentTarget.parentElement.parentElement.parentElement.dataset.title.split('-', 1)
        lyricsSearch['artist'] = event.currentTarget.parentElement.parentElement.parentElement.dataset.author.toLowerCase()
    }
    else {
        img.src = event.currentTarget.parentElement.parentElement.parentElement.parentElement.querySelector('img').src
        title.innerText = event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.title
        author.innerText = 'Autore: ' + event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.author
        album.innerText = 'Album: ' + event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.album
        releaseDate.innerText = 'Data pubblicazione: ' + event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.release_date
        titleToSplit = event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.title.split('-', 1)
        lyricsSearch['artist'] = event.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.author.toLowerCase()
    }

    lyricsSearch['title'] = titleToSplit[0]


    fetch('/hw2/public/lyrics', {
        method: 'POST',
        body: JSON.stringify(lyricsSearch),
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onLyricsResponse).then(onLyricsText)

    maximumRetry = 0

    getInfoFetch(lyricsSearch)


    fetch('/hw2/public/video/search', {
        method: 'POST',
        body: JSON.stringify(lyricsSearch),
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(onYT)
}

function getInfoFetch(lyricsSearch) {
    maximumRetry++
    if (maximumRetry < 5) {
        fetch('/hw2/public/info', {
            method: 'POST',
            body: JSON.stringify(lyricsSearch),
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(onResponseInfo).then(onInfo).catch(function () { getInfoFetch(lyricsSearch) })
    }
    else {
        loading.classList.add('hidden')
        lyricsContainer.classList.remove('hidden')
    }
}

function onResponseInfo(response) {
    if (response.ok) {
        return response.json()
    }
}

function onLyricsResponse(response) {
    if (response.ok) {
        return response.text()
    }
}

function onLyricsText(text) {
    if (text === '' || text === undefined) {
        const lyricsInfoVideoDiv = document.querySelector('.lyricsInfoVideoDiv')
        const infoVideoDiv = document.querySelector('.infoVideoDiv')

        const lyricsDiv = document.createElement('div')
        const lyricsPre = document.createElement('pre')

        lyricsDiv.classList.add('lyricsDiv')
        lyricsPre.classList.add('lyricsTextError')

        lyricsPre.textContent = 'Siamo spiacenti, il testo per il brano cercato non è disponibile.'

        lyricsInfoVideoDiv.insertBefore(lyricsDiv, infoVideoDiv)
        lyricsDiv.appendChild(lyricsPre)
    }
    else {
        const lyricsInfoVideoDiv = document.querySelector('.lyricsInfoVideoDiv')
        const infoVideoDiv = document.querySelector('.infoVideoDiv')

        const lyricsDiv = document.createElement('div')
        const lyricsH1 = document.createElement('h1')
        const lyricsPre = document.createElement('pre')

        lyricsDiv.classList.add('lyricsDiv')
        lyricsPre.classList.add('lyricsText')

        lyricsH1.textContent = 'Testo del brano:'
        lyricsPre.textContent = text

        lyricsInfoVideoDiv.insertBefore(lyricsDiv, infoVideoDiv)
        lyricsDiv.appendChild(lyricsH1)
        lyricsDiv.appendChild(lyricsPre)
    }
}

function onYT(json) {
    const infoVideoDiv = document.querySelector('.infoVideoDiv')

    const videoDiv = document.createElement('div')
    const frame = document.createElement('iframe')


    frame.width = "560"
    frame.height = "315"
    frame.src = 'https://www.youtube.com/embed/' + json.items[0].id.videoId
    frame.title = "YouTube video player"
    frame.frameborder = "0"
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

    /*

    frame.width = "560"
    frame.height = "315"
    frame.src = 'https://www.youtube.com/embed/hc7-Ir29TZM'
    frame.title = "YouTube video player"
    frame.frameborder = "0"
    frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

    */

    infoVideoDiv.appendChild(videoDiv)
    videoDiv.appendChild(frame)
}

function onInfo(json) {

    const infoVideoDiv = document.querySelector('.infoVideoDiv')

    const geniusDiv = document.createElement('div')
    const geniusH1 = document.createElement('h1')
    const geniusPre = document.createElement('pre')

    geniusDiv.classList.add('geniusDiv')
    geniusPre.classList.add('infoText')

    geniusH1.textContent = 'Descrizione del brano:'
    geniusPre.textContent = json.response.song.description.plain

    infoVideoDiv.appendChild(geniusDiv)
    geniusDiv.appendChild(geniusH1)
    geniusDiv.appendChild(geniusPre)

    lyricsContainer.classList.remove('hidden')
    loading.classList.add('hidden')

}

function goBack(event) {
    if (whoOpensTrack === 'search') {
        lyricsContainer.classList.add('hidden')
        searchResultsSpotify.classList.remove('hidden')
    }
    if (whoOpensTrack === 'favourite') {
        lyricsContainer.classList.add('hidden')
        favourite.classList.remove('hidden')
    }
    if (whoOpensTrack === 'homepage') {
        lyricsContainer.classList.add('hidden')
        customContents.classList.remove('hidden')
    }
}

const searchResultsSpotify = document.querySelector('#searchResultsSpotify')
const lyricsContainer = document.querySelector('#lyrics')
const arrowLeft = document.querySelector('.arrow .left')
let whoOpensTrack
let maximumRetry