function search(event) {
    event.preventDefault();

    hideMainPage = true

    loading.classList.add('hidden')

    const searchValue = document.querySelector('#search').value.toLowerCase();

    if (searchValue === '') {
        return 0;
    }

    const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    lyricsContainer.innerHTML = ''

    favouriteLink.classList.remove('pagina_attuale')
    artistPageLink.classList.add('pagina_attuale')

    fetch('/hw2/public/spotify/token')

    fetch('/hw2/public/favourite/favouriteTracks').then(onFavouriteResponseSearch).then(onFavouriteTracksJsonSearch)
    fetch('/hw2/public/favourite/favouriteArtists').then(onFavouriteResponseSearch).then(onFavouriteArtistsJsonSearch)

    let variable = document.querySelector('.emptyHomepageDiv')

    if (variable !== null) {
        const emptyHomepageDiv = document.querySelector('.emptyHomepageDiv')
        emptyHomepageDiv.classList.add('hidden')
    }

    const customContents = document.querySelector('#customContents')
    customContents.classList.add('hidden')

    const searchResultsSpotify = document.querySelector('#searchResultsSpotify')
    searchResultsSpotify.classList.remove('hidden')

    favourite.classList.add('hidden')

    const albumSearchResult = document.querySelector('#albumSearchResult .resultsCard')
    albumSearchResult.innerHTML = ''

    const trackSearchResult = document.querySelector('#trackSearchResult .resultsCard')
    trackSearchResult.innerHTML = ''

    const artistSearchResult = document.querySelector('#artistSearchResult .resultsCard')
    artistSearchResult.innerHTML = ''

    const artistSearch = {}
    const trackSearch = {}
    const albumSearch = {}

    albumSearch["query"] = searchValue
    trackSearch["query"] = searchValue
    artistSearch["query"] = searchValue

    const fetchValueAlbums = JSON.stringify(trackSearch)
    const fetchValueTracks = JSON.stringify(trackSearch)
    const fetchValueArtists = JSON.stringify(trackSearch)

    fetch('/hw2/public/spotify/searchAlbums', {
        method: 'POST',
        body: fetchValueAlbums,
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(onJsonAlbumSearchResponse)

    fetch('/hw2/public/spotify/searchTracks', {
        method: 'POST',
        body: fetchValueTracks,
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(onJsonTrackSearchResponse)

    fetch('/hw2/public/spotify/searchArtists', {
        method: 'POST',
        body: fetchValueArtists,
        headers: {
            'Content-type': 'application/json',
            'X-CSRF-TOKEN': csrf
        }
    }).then(onResponse).then(onJsonArtistSearchResponse)
}

function onFavouriteResponseSearch(response) {
    if (response.ok) {
        return response.json()
    }
}

function onFavouriteTracksJsonSearch(json) {
    favouriteTrackSearch = json
}

function onFavouriteArtistsJsonSearch(json) {
    favouriteArtistSearch = json
    favouriteArtistLength = favouriteArtistSearch.length
}

function onJsonAlbumSearchResponse(json) {
    searchCardCreation(json.albums.items)
}

function onJsonTrackSearchResponse(json) {
    searchCardCreation(json.tracks.items)
}

function onJsonArtistSearchResponse(json) {
    searchCardCreation(json.artists.items)
}

function searchCardCreation(json) {
    for (item of json) {
        let alreadyAdded = false

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

        if (item.type !== 'track') {
            for (let i = 0; i < favouriteArtistSearch.length; i++) {
                if (favouriteArtistSearch[i] === item.id) {
                    favouriteArtistSearch.splice(i, 1)
                    alreadyAdded = true
                    break
                }
            }

            img.src = item.images[0].url
            linkIcon.src = 'img/spotifyLink.png'
            link.setAttribute("href", item.external_urls['spotify'])
            link.setAttribute("target", "_blank")
            card.setAttribute("data-title", item.name)
            card.setAttribute("title", item.name)
        }
        else {
            for (let i = 0; i < favouriteTrackSearch.length; i++) {
                if (favouriteTrackSearch[i] === item.id) {
                    favouriteTrackSearch.splice(i, 1)
                    alreadyAdded = true
                    break
                }
            }

            img.src = item.album.images[0].url
            link.classList.add('linkFromSearch')
            linkIcon.src = "img/senutiaLink.png"
            linkIcon.addEventListener('click', showLyrics)
            card.setAttribute("data-title", item.name)
            card.setAttribute("title", item.name)
            card.setAttribute("data-author", item.artists[0].name)
            card.setAttribute("data-album", item.album.name)
            card.setAttribute("data-release_date", item.album.release_date)
        }

        title.textContent = item.name

        if (item.type === 'album') {
            const container = document.querySelector('#albumSearchResult .resultsCard')
            container.appendChild(card)
        }

        if (item.type === 'track') {
            const container = document.querySelector('#trackSearchResult .resultsCard')
            container.appendChild(card)
        }

        if (item.type === 'artist') {
            const container = document.querySelector('#artistSearchResult .resultsCard')
            container.appendChild(card)
        }

        card.appendChild(imgDiv)
        imgDiv.appendChild(img)
        card.appendChild(cardInfo)
        cardInfo.appendChild(title)
        cardInfo.appendChild(link)
        link.appendChild(linkIcon)

        if (item.type === 'track' || item.type === 'artist') {
            if (alreadyAdded === true) {
                const removeFavouriteButtonDiv = document.createElement('div')
                const removeFavouriteIcon = document.createElement('img')

                removeFavouriteIcon.src = "img/heart.png"

                removeFavouriteButtonDiv.classList.add('addedToFavourite')

                removeFavouriteButtonDiv.setAttribute("data-id", item.id)

                if (item.type === 'track') {
                    removeFavouriteButtonDiv.setAttribute("data-type", 'track')
                }
                else {
                    removeFavouriteButtonDiv.setAttribute("data-type", 'artist')
                }

                imgDiv.appendChild(removeFavouriteButtonDiv)
                removeFavouriteButtonDiv.appendChild(removeFavouriteIcon)

                removeFavouriteButtonDiv.addEventListener('click', removeFromFavouriteInit)

                imgDiv.appendChild(removeFavouriteButtonDiv)
                removeFavouriteButtonDiv.appendChild(removeFavouriteIcon)
            }
            else {
                const trackFavouriteButtonDiv = document.createElement('div')
                const trackFavouriteButtonImg = document.createElement('img')

                trackFavouriteButtonImg.src = "img/white_heart.png"

                imgDiv.classList.add('opacity')
                trackFavouriteButtonDiv.classList.add('favouriteButton')

                trackFavouriteButtonDiv.setAttribute("data-id", item.id)

                if (item.type === 'track') {
                    trackFavouriteButtonDiv.setAttribute("data-type", 'track')
                }
                else {
                    trackFavouriteButtonDiv.setAttribute("data-type", 'artist')
                }

                imgDiv.appendChild(trackFavouriteButtonDiv)
                trackFavouriteButtonDiv.appendChild(trackFavouriteButtonImg)

                imgDiv.appendChild(trackFavouriteButtonDiv)
                trackFavouriteButtonDiv.appendChild(trackFavouriteButtonImg)

                trackFavouriteButtonDiv.addEventListener('click', addToFavourite)
            }
        }
    }
}
let favouriteTrackSearch = {}
let favouriteArtistSearch = {}
let favouriteArtistLength

const searchIcon = document.querySelector('#searchIcon')

const searchBar = document.querySelector('#searchBar')

searchBar.addEventListener('submit', search)
searchIcon.addEventListener('click', search)