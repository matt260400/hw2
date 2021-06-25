function showFavourites() {
    hideMainPage = true

    let variable = document.querySelector('.emptyHomepageDiv')

    if (variable !== null) {
        const emptyHomepageDiv = document.querySelector('.emptyHomepageDiv')
        emptyHomepageDiv.classList.add('hidden')
    }

    const customContents = document.querySelector('#customContents')
    customContents.classList.add('hidden')

    const searchResultsSpotify = document.querySelector('#searchResultsSpotify')
    searchResultsSpotify.classList.add('hidden')

    lyricsContainer.innerHTML = ''

    favourite.innerHTML = ''

    loading.classList.add('hidden')

    artistPageLink.classList.remove('pagina_attuale')

    favouriteLink.classList.add('pagina_attuale')

    const selectFavourite = document.createElement('div')
    const selectDiv = document.createElement('div')
    const selectTrack = document.createElement('p')
    const selectArtist = document.createElement('p')
    const searchBar = document.createElement('div')
    const inputBar = document.createElement('input')
    const trackContainer = document.createElement('div')
    const artistContainer = document.createElement('div')

    selectFavourite.classList.add('favouriteSelection')
    selectDiv.classList.add('favouriteSelectionDiv')
    searchBar.classList.add('searchBarDiv')
    selectTrack.classList.add('trackSelection')
    selectArtist.classList.add('unclicked')
    selectArtist.classList.add('artistSelection')
    inputBar.classList.add('textBox')
    trackContainer.classList.add('favouriteTrackContainer')
    artistContainer.classList.add('favouriteArtistContainer')
    artistContainer.classList.add('hidden')

    selectTrack.innerText = 'Brani'
    selectArtist.innerText = 'Artisti'
    inputBar.setAttribute('placeholder', 'Filtra')

    selectTrack.addEventListener('click', selectTrackList)
    selectArtist.addEventListener('click', selectArtistList)
    inputBar.addEventListener('keyup', filter)

    favourite.appendChild(selectFavourite)
    selectFavourite.appendChild(selectDiv)
    selectDiv.appendChild(selectTrack)
    selectDiv.appendChild(selectArtist)
    selectFavourite.appendChild(searchBar)
    searchBar.appendChild(inputBar)
    favourite.appendChild(trackContainer)
    favourite.appendChild(artistContainer)

    fetch('/hw2/public/spotify/token')

    fetch('/hw2/public/favourite/favouriteTracks').then(onFavouriteResponseSearch).then(onFavouritePageJsonTracks)
    fetch('/hw2/public/favourite/favouriteArtists').then(onFavouriteResponseSearch).then(onFavouritePageJsonArtists)

    favourite.classList.remove('hidden')
}

function onFavouritePageJsonTracks(json) {
    if (json.length !== 0) {
        fetch('/hw2/public/spotify/getSeveralTracks', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(onFavouriteResponseSearch).then(onFavouritePageCardPreTracks)
    }
    else {
        emptyFavouriteTracks()
    }
}

function onFavouritePageJsonArtists(json) {
    if (json.length !== 0) {
        fetch('/hw2/public/spotify/getSeveralArtists', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(onFavouriteResponseSearch).then(onFavouritePageCardPreArtists)
    }
    else {
        emptyFavouriteArtists()
    }
}

function onFavouritePageCardPreTracks(json) {
    for (tracksArray of json) {
        for (track of tracksArray.tracks) {
            onFavouritePageCardCreateTracks(track)
        }
    }
}

function onFavouritePageCardPreArtists(json) {
    for (artistsArray of json) {
        for (artist of artistsArray.artists) {
            onFavouritePageCardCreateArtists(artist)
        }
    }
}

function onFavouritePageCardCreateTracks(trackArray) {
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
    trackLinkSenutia.classList.add('favouriteLyricsLink')

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

    const box = document.querySelector('.favouriteTrackContainer')

    box.appendChild(trackCard)
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

    const removeFavouriteButtonDiv = document.createElement('div')
    const removeFavouriteIcon = document.createElement('img')

    removeFavouriteIcon.src = "img/heart.png"

    removeFavouriteButtonDiv.classList.add('addedToFavourite')
    removeFavouriteButtonDiv.classList.add('fromFavouritePage')

    removeFavouriteButtonDiv.setAttribute("data-id", trackArray.id)
    removeFavouriteButtonDiv.setAttribute("data-type", 'track')

    trackImgDiv.appendChild(removeFavouriteButtonDiv)
    removeFavouriteButtonDiv.appendChild(removeFavouriteIcon)

    removeFavouriteButtonDiv.addEventListener('click', removeFromFavouriteInit)

}

function emptyFavouriteTracks() {
    const box = document.querySelector('.favouriteTrackContainer')

    const warningDiv = document.createElement('div')
    const warning = document.createElement('p')

    warning.textContent = 'Non hai nessun brano tra i preferiti, torna quando ne avrai aggiunto qualcuno!'

    box.appendChild(warningDiv)
    warningDiv.appendChild(warning)
}

function onFavouritePageCardCreateArtists(item) {
    const card = document.createElement('div')
    const imgDiv = document.createElement('div')
    const img = document.createElement('img')
    const cardInfo = document.createElement('div')
    const title = document.createElement('p')
    const link = document.createElement('a')
    const linkIcon = document.createElement('img')

    card.classList.add('card')
    imgDiv.classList.add('imgDiv')
    cardInfo.classList.add('cardInfo')
    title.classList.add('searchTitle')

    img.src = item.images[0].url
    linkIcon.src = 'img/spotifyLink.png'
    link.setAttribute("href", item.external_urls['spotify'])
    link.setAttribute("target", "_blank")
    card.setAttribute("data-title", item.name)
    card.setAttribute("title", item.name)

    title.textContent = item.name

    const box = document.querySelector('.favouriteArtistContainer')

    box.appendChild(card)
    card.appendChild(imgDiv)
    imgDiv.appendChild(img)
    card.appendChild(cardInfo)
    cardInfo.appendChild(title)
    cardInfo.appendChild(link)
    link.appendChild(linkIcon)

    const removeFavouriteButtonDiv = document.createElement('div')
    const removeFavouriteIcon = document.createElement('img')

    removeFavouriteIcon.src = "img/heart.png"

    removeFavouriteButtonDiv.classList.add('addedToFavourite')
    removeFavouriteButtonDiv.classList.add('fromFavouritePage')

    removeFavouriteButtonDiv.setAttribute("data-id", item.id)

    removeFavouriteButtonDiv.setAttribute("data-type", 'artist')
    imgDiv.appendChild(removeFavouriteButtonDiv)
    removeFavouriteButtonDiv.appendChild(removeFavouriteIcon)

    removeFavouriteButtonDiv.addEventListener('click', removeFromFavouriteInit)

    imgDiv.appendChild(removeFavouriteButtonDiv)
    removeFavouriteButtonDiv.appendChild(removeFavouriteIcon)
}

function emptyFavouriteArtists() {
    const box = document.querySelector('.favouriteArtistContainer')

    const warningDiv = document.createElement('div')
    const warning = document.createElement('p')

    warning.textContent = 'Non hai nessun artista tra i preferiti, torna quando ne avrai aggiunto qualcuno!'

    box.classList.add('emptyArtists')

    box.appendChild(warningDiv)
    warningDiv.appendChild(warning)
}

function selectTrackList() {
    document.querySelector('.searchBarDiv .textbox').classList.remove('hidden')
    document.querySelector('.trackSelection').classList.remove('unclicked')
    document.querySelector('.artistSelection').classList.add('unclicked')
    document.querySelector('.favouriteTrackContainer').classList.remove('hidden')
    document.querySelector('.favouriteArtistContainer').classList.add('hidden')
}

function selectArtistList() {
    document.querySelector('.searchBarDiv .textbox').classList.add('hidden')
    document.querySelector('.artistSelection').classList.remove('unclicked')
    document.querySelector('.trackSelection').classList.add('unclicked')
    document.querySelector('.favouriteArtistContainer').classList.remove('hidden')
    document.querySelector('.favouriteTrackContainer').classList.add('hidden')
}

function filter(event) {
    const filterSearch = event.currentTarget.value.toLowerCase();
    const track = document.querySelectorAll('.favouriteTrackContainer .track')

    if (filterSearch !== "") {
        for (item of track) {
            const title = item.dataset.title.toLowerCase()
            const author = item.dataset.author.toLowerCase()
            if (title.indexOf(filterSearch) === -1 && author.indexOf(filterSearch) === -1) {
                item.classList.add('hidden')
            }
            else {
                item.classList.remove('hidden')
            }
        }
    }
    else {
        for (item of track) {
            item.classList.remove('hidden')
        }
    }
}

const favouriteLink = document.querySelector('#favouriteLink')
const favourite = document.querySelector('#favourites')

let hideMainPage = false

favouriteLink.addEventListener('click', showFavourites)