function requestToken() {
    fetch('/hw2/public/spotify/token').then(onTokenResponse)
}

function onTokenResponse(response) {
    if (response.ok) {
        fetch('/hw2/public/favourite/favouriteTracks').then(onResponse).then(onFavouriteTracksJson)
        fetch('/hw2/public/spotify/spotifyFetchTopTracks').then(onResponse).then(favouriteTrackJson)
        fetch('/hw2/public/spotify/spotifyFetchAlbums').then(onResponse).then(favouriteAlbumJson)
        fetch('/hw2/public/spotify/spotifyFetchRelatedArtists').then(onResponse).then(relatedArtistsJson)
    }
}

function onFavouriteTracksJson(json) {
    favouriteTracks = json;
}

function onResponse(response) {
    return response.json()
}

function favouriteTrackJson(trackArrayJson) {
    if (trackArrayJson.length !== 0) {
        for (trackArray of trackArrayJson) {
            for (track of trackArray.tracks) {
                favouriteTrackCardCreate(track)
            }
        }
    }
}

function favouriteAlbumJson(albumArrayJson) {
    if (albumArrayJson.length !== 0) {
        for (albumArray of albumArrayJson) {
            for (album of albumArray.items) {
                favouriteAlbumCardCreate(album)
            }
        }
        loading.classList.add('hidden')
        if (hideMainPage === false) {
            customContents.classList.remove('hidden')
            artistPageLink.addEventListener('click', showArtistPage)
        }
        else {
            artistPageLink.addEventListener('click', showArtistPage)
        }
    }
    else {
        loading.classList.add('hidden')
        if (hideMainPage === false) {
            customContents.classList.add('hidden')
            emptyHomepage()
            artistPageLink.addEventListener('click', showArtistPage)
        }
        else {
            artistPageLink.addEventListener('click', showArtistPage)
        }
    }
}

function relatedArtistsJson(relatedArtistsArrayJson) {
    if (relatedArtistsArrayJson.length !== 0) {
        for (relatedArtistsArray of relatedArtistsArrayJson) {
            for (artist of relatedArtistsArray.artists) {
                relatedArtistsCardCreate(artist)
            }
        }
    }
}

function favouriteTrackCardCreate(trackArray) {
    let alreadyAdded = false

    /*
        Eseguo un ciclo for per vedere se un brano è già tra i preferiti.
        Utilizzo splice per rimuovere l'elemento all'i-esima posizione,
        in questo modo non sarà necessario effettuare dei confronti su
        elementi che sono già stati filtrati.
    */

    for (let i = 0; i < favouriteTracks.length; i++) {
        if (favouriteTracks[i] === trackArray.id) {
            favouriteTracks.splice(i, 1)
            alreadyAdded = true
            break
        }
    }

    const trackCard = document.createElement('div')
    const trackImgAndInfoDiv = document.createElement('div')
    const trackImgDiv = document.createElement('div')
    const trackImg = document.createElement('img')
    const trackInfoDiv = document.createElement('div')
    const trackTitle = document.createElement('p')
    const trackAuthor = document.createElement('p')
    const trackLinksDiv = document.createElement('div')
    const trackLinkDiv = document.createElement('div')
    const trackLinkSenutia = document.createElement('a')
    const trackLinkSenutiaIcon = document.createElement('img')
    const trackLinkSpotify = document.createElement('a')
    const trackLinkSpotifyIcon = document.createElement('img')

    trackCard.classList.add('track')
    trackImgAndInfoDiv.classList.add('trackImgAndInfoDiv')
    trackImgDiv.classList.add('trackImg')
    trackInfoDiv.classList.add('trackInfo')
    trackTitle.classList.add('trackTitle')
    trackAuthor.classList.add('trackAuthor')
    trackLinksDiv.classList.add('trackLinksDiv')
    trackLinkDiv.classList.add('trackLink')
    trackLinkSenutia.classList.add('homepageLyricsLink')

    trackImg.src = trackArray.album.images[0].url
    trackTitle.textContent = trackArray.name
    trackAuthor.textContent = trackArray.artists[0].name
    trackLinkSenutiaIcon.src = "img/senutiaLink.png"
    trackLinkSpotifyIcon.src = "img/spotifyLink.png"

    trackCard.setAttribute("data-title", trackArray.name)
    trackCard.setAttribute("title", trackArray.name)
    trackCard.setAttribute("data-author", trackArray.artists[0].name)
    trackCard.setAttribute("data-album", trackArray.album.name)
    trackCard.setAttribute("data-release_date", trackArray.album.release_date)
    trackLinkSpotify.setAttribute("href", trackArray.external_urls['spotify'])
    trackLinkSpotify.setAttribute("target", "_blank")
    trackLinkSenutiaIcon.addEventListener('click', showLyrics)

    trackContainer.appendChild(trackCard)
    trackCard.appendChild(trackImgAndInfoDiv)
    trackImgAndInfoDiv.appendChild(trackImgDiv)
    trackImgDiv.appendChild(trackImg)
    trackImgAndInfoDiv.appendChild(trackInfoDiv)
    trackInfoDiv.appendChild(trackTitle)
    trackInfoDiv.appendChild(trackAuthor)
    trackCard.appendChild(trackLinksDiv)
    trackLinksDiv.appendChild(trackLinkDiv)
    trackLinkDiv.appendChild(trackLinkSenutia)
    trackLinkSenutia.appendChild(trackLinkSenutiaIcon)
    trackLinkDiv.appendChild(trackLinkSpotify)
    trackLinkSpotify.appendChild(trackLinkSpotifyIcon)

    if (alreadyAdded === true) {
        const removeFavouriteButtonDiv = document.createElement('div')
        const removeFavouriteIcon = document.createElement('img')

        removeFavouriteIcon.src = "img/heart.png"

        removeFavouriteButtonDiv.classList.add('addedToFavourite')

        removeFavouriteButtonDiv.setAttribute("data-id", trackArray.id)
        removeFavouriteButtonDiv.setAttribute("data-type", 'track')

        trackImgDiv.appendChild(removeFavouriteButtonDiv)
        removeFavouriteButtonDiv.appendChild(removeFavouriteIcon)

        removeFavouriteButtonDiv.addEventListener('click', removeFromFavouriteInit)
    }
    else {
        const trackFavouriteButtonDiv = document.createElement('div')
        const trackFavouriteButtonImg = document.createElement('img')

        trackFavouriteButtonImg.src = "img/white_heart.png"

        trackImgDiv.classList.add('opacity')
        trackFavouriteButtonDiv.classList.add('favouriteButton')

        trackFavouriteButtonDiv.setAttribute("data-id", trackArray.id)
        trackFavouriteButtonDiv.setAttribute("data-type", 'track')

        trackImgDiv.appendChild(trackFavouriteButtonDiv)
        trackFavouriteButtonDiv.appendChild(trackFavouriteButtonImg)

        trackFavouriteButtonDiv.addEventListener('click', addToFavourite)
    }
}

function addToFavourite(event) {
    if (audio === true) {
        var likeSound = new Audio("sound/Like!.mp3");
        likeSound.play();
    }

    const parentElement = event.currentTarget.parentElement
    const element = event.currentTarget

    const fetchObj = {}

    fetchObj["id"] = element.dataset.id

    const fetchValue = JSON.stringify(fetchObj)

    if (element.dataset.type === 'track') {
        fetch('/hw2/public/favourite/addTrackToFavourites', {
            method: 'POST',
            body: fetchValue,
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(function () { onResponseAddToFavourite(element, parentElement) })
    }

    if (element.dataset.type === 'artist') {
        if (favouriteArtistLength > 6) {
            alert('Hai raggiunto il numero massimo di artisti preferiti. Rimuovine qualcuno prima di continuare!')
        }
        else {
            favouriteArtistLength++
            fetch('/hw2/public/favourite/addArtistToFavourites', {
                method: 'POST',
                body: fetchValue,
                headers: {
                    'Content-type': 'application/json',
                    'X-CSRF-TOKEN': csrf
                }
            }).then(function () { onResponseAddToFavourite(element, parentElement) })
        }
    }
}

function onResponseAddToFavourite(element, parentElement) {
    const removeFavouriteButtonDiv = document.createElement('div')
    const removeFavouriteIcon = document.createElement('img')

    removeFavouriteIcon.src = "img/heart.png"

    removeFavouriteButtonDiv.classList.add('addedToFavourite')

    removeFavouriteButtonDiv.setAttribute("data-id", element.dataset.id)

    if (element.dataset.type === 'track') {
        removeFavouriteButtonDiv.setAttribute("data-type", 'track')
    }
    else {
        removeFavouriteButtonDiv.setAttribute("data-type", 'artist')
    }

    element.remove()

    parentElement.classList.remove('opacity')

    parentElement.appendChild(removeFavouriteButtonDiv)
    removeFavouriteButtonDiv.appendChild(removeFavouriteIcon)

    removeFavouriteButtonDiv.addEventListener('click', function () { removeFromFavourite(element, parentElement, removeFavouriteButtonDiv) })
}

function removeFromFavourite(element, parentElement, removeFavouriteButtonDiv) {
    const fetchObj = {}

    fetchObj["id"] = element.dataset.id

    const fetchValue = JSON.stringify(fetchObj)

    if (element.dataset.type === 'track') {
        fetch('/hw2/public/favourite/removeTrackFromFavourites', {
            method: 'POST',
            body: fetchValue,
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(function () { onResponseRemoveFromFavourite(element, parentElement, removeFavouriteButtonDiv) })
    }

    if (element.dataset.type === 'artist') {
        favouriteArtistLength--
        fetch('/hw2/public/favourite/removeArtistFromFavourites', {
            method: 'POST',
            body: fetchValue,
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(function () { onResponseRemoveFromFavourite(element, parentElement, removeFavouriteButtonDiv) })
    }
}

function onResponseRemoveFromFavourite(element, parentElement, removeFavouriteButtonDiv) {
    const trackFavouriteButtonDiv = document.createElement('div')
    const trackFavouriteButtonImg = document.createElement('img')

    trackFavouriteButtonDiv.classList.add('favouriteButton')

    trackFavouriteButtonImg.src = "img/white_heart.png"

    trackFavouriteButtonDiv.setAttribute("data-id", element.dataset.id)

    if (element.dataset.type === 'track') {
        trackFavouriteButtonDiv.setAttribute("data-type", 'track')
    }
    else {
        trackFavouriteButtonDiv.setAttribute("data-type", 'artist')
    }

    removeFavouriteButtonDiv.remove()

    parentElement.classList.add('opacity')

    trackFavouriteButtonDiv.appendChild(trackFavouriteButtonImg)
    parentElement.appendChild(trackFavouriteButtonDiv)

    trackFavouriteButtonDiv.addEventListener('click', addToFavourite)
}

function removeFromFavouriteInit(event) {
    const parentElement = event.currentTarget.parentElement
    const element = event.currentTarget

    const fetchObj = {}

    fetchObj["id"] = element.dataset.id

    const fetchValue = JSON.stringify(fetchObj)

    if (element.dataset.type === 'track') {
        fetch('/hw2/public/favourite/removeTrackFromFavourites', {
            method: 'POST',
            body: fetchValue,
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(function () { onResponseRemoveFromFavouriteInit(element, parentElement) })
    }

    if (element.dataset.type === 'artist') {
        favouriteArtistLength--
        fetch('/hw2/public/favourite/removeArtistFromFavourites', {
            method: 'POST',
            body: fetchValue,
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(function () { onResponseRemoveFromFavouriteInit(element, parentElement) })
    }
}

function onResponseRemoveFromFavouriteInit(element, parentElement) {
    if (element.classList.contains('fromFavouritePage')) {
        if (element.dataset.type === 'track') {
            parentElement.parentElement.parentElement.remove()
        }
        else {
            parentElement.parentElement.remove()
        }
    }
    else {
        const trackFavouriteButtonDiv = document.createElement('div')
        const trackFavouriteButtonImg = document.createElement('img')

        trackFavouriteButtonDiv.classList.add('favouriteButton')

        trackFavouriteButtonImg.src = "img/white_heart.png"

        trackFavouriteButtonDiv.setAttribute("data-id", element.dataset.id)

        if (element.dataset.type === 'track') {
            trackFavouriteButtonDiv.setAttribute("data-type", 'track')
        }
        else {
            trackFavouriteButtonDiv.setAttribute("data-type", 'artist')
        }

        element.remove()

        parentElement.classList.add('opacity')

        trackFavouriteButtonDiv.appendChild(trackFavouriteButtonImg)
        parentElement.appendChild(trackFavouriteButtonDiv)

        trackFavouriteButtonDiv.addEventListener('click', addToFavourite)
    }
}

function favouriteAlbumCardCreate(albumArray) {
    let alreadyAdded = false

    for (item of document.querySelectorAll('#favouriteArtistsAlbums div')) {
        if (item.dataset.title === albumArray.name) {
            alreadyAdded = true
            break
        }
        else {
            alreadyAdded = false
        }
    }

    if (alreadyAdded === false) {
        const albumCard = document.createElement('div')
        const albumImgA = document.createElement('a')
        const albumImg = document.createElement('img')
        const albumInfoDiv = document.createElement('div')
        const albumTitle = document.createElement('p')
        const albumAuthor = document.createElement('p')

        albumCard.classList.add('album')
        albumImgA.classList.add('albumImgA')
        albumInfoDiv.classList.add('albumInfoDiv')
        albumTitle.classList.add('albumTitle')
        albumAuthor.classList.add('albumAuthor')

        albumImg.src = albumArray.images[0].url
        albumTitle.textContent = albumArray.name
        albumAuthor.textContent = albumArray.artists[0].name

        albumCard.setAttribute("data-title", albumArray.name)
        albumCard.setAttribute("title", albumArray.name)
        albumCard.setAttribute("data-author", albumArray.artists[0].name)
        albumCard.setAttribute("data-release_date", albumArray.release_date)
        albumImgA.setAttribute("href", albumArray.external_urls['spotify'])
        albumImgA.setAttribute("target", "_blank")

        albumContainer.appendChild(albumCard)
        albumCard.appendChild(albumImgA)
        albumImgA.appendChild(albumImg)
        albumCard.appendChild(albumInfoDiv)
        albumInfoDiv.appendChild(albumTitle)
        albumInfoDiv.appendChild(albumAuthor)
    }
}

function relatedArtistsCardCreate(relatedArtists) {
    let alreadyAdded = false

    for (item of document.querySelectorAll('#suggestedArtists div')) {
        if (item.dataset.id === relatedArtists.id) {
            alreadyAdded = true
            break
        }
        else {
            alreadyAdded = false
        }
    }

    if (alreadyAdded === false) {
        const artistCard = document.createElement('div')
        const copy = document.createElement('div')
        const copyImg = document.createElement('img')

        const copySuccessDiv = document.createElement('div')
        const copySuccessP = document.createElement('p')

        const artistImgA = document.createElement('a')
        const artistImg = document.createElement('img')
        const artistInfoDiv = document.createElement('div')
        const artistName = document.createElement('p')
        const artistGenre = document.createElement('p')

        artistCard.classList.add('artist')
        copy.classList.add('copy')
        copySuccessDiv.classList.add('copySuccessDiv')
        copySuccessDiv.classList.add('hidden')
        artistImgA.classList.add('artistImgA')
        artistInfoDiv.classList.add('artistInfoDiv')
        artistName.classList.add('artistName')
        artistGenre.classList.add('artistGenre')

        copyImg.src = "img/copy.png"
        copySuccessP.textContent = "Copiato!"
        artistImg.src = relatedArtists.images[0].url
        artistName.textContent = relatedArtists.name
        artistGenre.textContent = relatedArtists.genres[0]

        artistCard.setAttribute("data-id", relatedArtists.id)
        artistCard.setAttribute("title", relatedArtists.name)
        copy.setAttribute("title", 'Copia nella clipboard')
        artistImgA.setAttribute("href", relatedArtists.external_urls['spotify'])
        artistImgA.setAttribute("target", "_blank")

        artistContainer.appendChild(artistCard)
        artistCard.appendChild(copy)
        copy.appendChild(copyImg)
        artistCard.appendChild(copySuccessDiv)
        copySuccessDiv.appendChild(copySuccessP)
        artistCard.appendChild(artistImgA)
        artistImgA.appendChild(artistImg)
        artistCard.appendChild(artistInfoDiv)
        artistInfoDiv.appendChild(artistName)
        artistInfoDiv.appendChild(artistGenre)

        copy.addEventListener('click', copyToClipboard)
    }
}

function copyToClipboard(event) {
    const copied = event.currentTarget.parentElement.querySelector('.copySuccessDiv')

    copied.classList.remove('hidden')

    /* https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout */
    setTimeout(function(){ copied.classList.add('hidden') }, 3000);

    const toCopy = event.currentTarget.parentElement.querySelector('.artistName').innerText

    /* https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText */
    navigator.clipboard.writeText(toCopy)
}

function showrapidSettings(event) {
    event.stopPropagation()

    if (rapidSettingsDiv.classList.contains('hideSettings')) {
        rapidSettingsDiv.classList.remove('hideSettings')
        triangle.classList.remove('triangleUp')
        triangle.classList.add('triangleDown')
    }
    else {
        rapidSettingsDiv.classList.add('hideSettings')
        triangle.classList.remove('triangleDown')
        triangle.classList.add('triangleUp')
    }
}

function closeRapidSettingsFunc(event) {

    if (!rapidSettingsDiv.classList.contains('hideSettings')) {
        rapidSettingsDiv.classList.add('hideSettings')
        triangle.classList.remove('triangleDown')
        triangle.classList.add('triangleUp')
    }
}

function preventClosing(event) {
    event.stopPropagation()
}

function showArtistPage() {
    hideMainPage = false

    artistPageLink.removeEventListener('click', showArtistPage)

    loading.querySelector('p').textContent = 'Attendi mentre carichiamo la tua homepage!'

    customContents.classList.add('hidden')
    loading.classList.remove('hidden')

    const favouriteArtistsTopTracks = document.querySelector('#favouriteArtistsTopTracks')
    const favouriteArtistsAlbums = document.querySelector('#favouriteArtistsAlbums')
    const suggestedArtists = document.querySelector('#suggestedArtists')

    favouriteArtistsTopTracks.innerHTML = ''
    favouriteArtistsAlbums.innerHTML = ''
    suggestedArtists.innerHTML = ''
    lyricsContainer.innerHTML = ''

    requestToken()

    const searchResultsSpotify = document.querySelector('#searchResultsSpotify')
    const lyricsPage = document.querySelector('#lyrics')

    searchResultsSpotify.classList.add('hidden')
    lyricsPage.classList.add('hidden')
    favourite.classList.add('hidden')

    favouriteLink.classList.remove('pagina_attuale')
    artistPageLink.classList.add('pagina_attuale')
}

function emptyHomepage() {
    let variable = document.querySelector('.emptyHomepageDiv')

    if (variable === null) {
        const container = document.querySelector('#mainPageContent')

        const div = document.createElement('div')
        const warning = document.createElement('h1')
        const info = document.createElement('p')
        const memeDiv = document.createElement('div')
        const memeImg = document.createElement('img')

        div.classList.add('emptyHomepageDiv')
        memeDiv.classList.add('emptyHomepageMeme')

        warning.textContent = 'Hey, tu!'
        info.textContent = 'Sembra che tu non abbia alcun artista tra i preferiti. Esplora e aggiungi uno o più artisti per visualizzare questa pagina!'
        memeImg.src = 'https://media1.giphy.com/media/hEc4k5pN17GZq/giphy.gif'

        container.appendChild(div)
        div.appendChild(warning)
        div.appendChild(info)
        div.appendChild(memeDiv)
        memeDiv.appendChild(memeImg)
    }
    else {
        const emptyHomepageDiv = document.querySelector('.emptyHomepageDiv')
        emptyHomepageDiv.classList.remove('hidden')
    }
}

const artistPageLink = document.querySelector('#artistPageLink')
const loading = document.querySelector('#loadingGIF')
const rapidSettings = document.querySelector('.proPicUsername')
let favouriteTracks = {}
const customContents = document.querySelector('#customContents')
const trackContainer = document.querySelector('#favouriteArtistsTopTracks')
const albumContainer = document.querySelector('#favouriteArtistsAlbums')
const artistContainer = document.querySelector('#suggestedArtists')
const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
const scrollRightTrack = document.querySelector('#scrollButtonRight').addEventListener('click', function () { document.querySelector('#favouriteArtistsTopTracks').scrollBy({ left: 595, top: 0, behavior: 'smooth' }) })
const scrollLeftTrack = document.querySelector('#scrollButtonLeft').addEventListener('click', function () { document.querySelector('#favouriteArtistsTopTracks').scrollBy({ left: -595, top: 0, behavior: 'smooth' }) })
const scrollRightArtist = document.querySelector('#scrollButtonRightArtist').addEventListener('click', function () { document.querySelector('#suggestedArtists').scrollBy({ left: 1090, top: 0, behavior: 'smooth' }) })
const scrollLeftArtist = document.querySelector('#scrollButtonLeftArtist').addEventListener('click', function () { document.querySelector('#suggestedArtists').scrollBy({ left: -1090, top: 0, behavior: 'smooth' }) })
const scrollToTop = document.querySelector('.scrollToTop').addEventListener('click', function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
})

const rapidSettingsDiv = document.querySelector('#rapidSettings')
const triangle = document.querySelector('#triangle')
const closeRapidSettingsBody = document.querySelector('body').addEventListener('click', closeRapidSettingsFunc)

artistPageLink.addEventListener('click', showArtistPage)

loading.classList.remove('hidden')
customContents.classList.add('hidden')

rapidSettings.addEventListener('click', showrapidSettings)
rapidSettingsDiv.addEventListener('click', preventClosing)

requestToken()