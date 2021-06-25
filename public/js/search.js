function spotifySearch(event) {
    if (event.keyCode === 13 || event.currentTarget === searchArtistButton) {
        event.preventDefault();

        const csrf = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        artistResult.innerHTML = ''

        const fetchObj = {}

        fetchObj["name"] = searchArtistInput.value

        const fetchValue = JSON.stringify(fetchObj)

        fetch('/hw2/public/spotify/searchArtistSignup', {
            method: 'POST',
            body: fetchValue,
            headers: {
                'Content-type': 'application/json',
                'X-CSRF-TOKEN': csrf
            }
        }).then(onResponse).then(onJsonResponse)
    }
}

function onResponse(response) {
    return response.json()
}

function onJsonResponse(json) {
    createArtistList(json.artists.items)
}

function createArtistList(json) {
    for (item of json) {
        const artistDiv = document.createElement('div')
        const artistName = document.createElement('p')

        artistDiv.addEventListener('click', addToFavourite)

        artistDiv.setAttribute("data-id", item.id)

        artistName.innerText = item.name


        if (item.images.length > 0) {
            const artistProPic = document.createElement('img')
            artistDiv.setAttribute("data-img", true)
            artistProPic.src = item.images[0].url
            artistDiv.appendChild(artistProPic)
        }
        if (item.images.length === 0) {
            artistDiv.setAttribute("data-img", false)
        }

        searchResultContainer.appendChild(artistDiv)
        artistDiv.appendChild(artistName)
    }
}

function addToFavourite(event) {
    let alreadyAdded = false
    for (item of document.querySelectorAll('#favouriteArtists div')) {
        if (item.dataset.id === event.currentTarget.dataset.id) {
            alreadyAdded = true
            break
        }
        else {
            alreadyAdded = false
        }
    }

    if (document.querySelectorAll('#favouriteArtists div').length < 7) {
        if (alreadyAdded === false) {
            maxArtistError.classList.add('hidden')
            const parentElement = event.currentTarget
            parentElement.removeEventListener('click', addToFavourite)

            artistChoice.classList.remove('hidden')

            const favouriteDiv = document.createElement('div')
            const artistName = document.createElement('p')
            const artistProPic = document.createElement('img')
            const removeFavouriteIcon = document.createElement('img')

            if (event.currentTarget.dataset.img === 'true') {
                artistProPic.src = event.currentTarget.querySelector('img').src
            }

            artistName.innerText = event.currentTarget.innerText
            removeFavouriteIcon.src = "img/whiteCross.png"
            favouriteDiv.setAttribute("data-ID", event.currentTarget.dataset.id)

            removeFavouriteIcon.classList.add('removeDiv')

            favouriteArtist.appendChild(favouriteDiv)
            favouriteDiv.appendChild(removeFavouriteIcon)
            if (event.currentTarget.dataset.img === 'true') {
                favouriteDiv.appendChild(artistProPic)
            }
            favouriteDiv.appendChild(artistName)

            removeFavouriteIcon.addEventListener('click', function () { removeFromFavourite(favouriteDiv, parentElement) })
        }
        else {
            maxArtistError.textContent = 'Artista già aggiunto ai preferiti!'
            maxArtistError.classList.remove('hidden')
        }
    }
    else {
        maxArtistError.textContent = 'Puoi scegliere massimo 7 artisti!'
        maxArtistError.classList.remove('hidden')
    }
}

function removeFromFavourite(favouriteDiv, parentElement) {
    favouriteDiv.remove()
    parentElement.addEventListener('click', addToFavourite)

    if (document.querySelectorAll('#favouriteArtists div').length === 0) {
        artistChoice.classList.add('hidden')
    }
    if (document.querySelectorAll('#favouriteArtists div').length < 7) {
        maxArtistError.classList.add('hidden')
    }
}

const searchResultContainer = document.querySelector("#searchResult .artist")
const searchArtistButton = document.querySelector('#spotifySearch img')
const searchArtistInput = document.querySelector('#artistSearch')
const artistResult = document.querySelector('.artist')
const artistChoice = document.querySelector('#choices')
const favouriteArtist = document.querySelector('#favouriteArtists')
const maxArtistError = document.querySelector('#maxArtistError')


searchArtistInput.addEventListener('keyup', spotifySearch)
searchArtistButton.addEventListener('click', spotifySearch)