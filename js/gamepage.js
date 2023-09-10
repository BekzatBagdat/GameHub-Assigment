//Selecting DOM elements
const body = document.querySelector('.gamepage-body')
const gamepageContainer = document.querySelector('.gamepage-div')
const infoContainer = document.querySelector('.gamepage-product-info-div')
//Fetch
const getGames = async () => {
    try {
        gamepageContainer.textContent = 'Loading...'
        gamepageContainer.style.fontSize = "2rem"
        infoContainer.textContent = 'Loading...'
        infoContainer.style.fontSize = "1.5rem"
        //Getting parameters from the query string
        const queryString = document.location.search;
        const params = new URLSearchParams(queryString)
        const id = params.get("id")
        const url = 'https://api.noroff.dev/api/v1/gamehub/' + id
        //fetching
        const response = await fetch(url)
        const json = await response.json()
        const gameData = json
        //Running createHtml functions
        htmlGamepage(gameData)
        htmlInfoPage(gameData)
    } catch (error) {
        body.textContent = `${error} 🤡`
        body.style.fontSize = '2rem'
        body.style.margin = "2rem"
    }
}
getGames()

//Gamepage Section -Creating HTML
const htmlGamepage = game => {
    //Removing loader indication
    gamepageContainer.innerHTML = ""
    //html elements
    const html = `
            <img src="${game.image}" alt="${game.title}">
                <div class="gamepage-txt-pri-btn">
                    <div class="gamepage-text">
                        <h1>${game.title}</h1>
                        <p>${game.description}</p>
                    </div>
                    <div class="gamepage-pri-btn">
                        <div class="gamepage-price-div">
                            <h2>${game.price} $</h2>
                            <h2 class="gamepage-discount">${game.discountedPrice} $</h2>
                        </div>
                        <div class="gamepage-btn">
                            <a href="cart.html?id=${game.id}">Add to cart</a>
                        </div>
                    </div>`
    gamepageContainer.innerHTML = html
    //Changing the Elements if no discount for the game 
    if (game.price === game.discountedPrice) {
        const h2NoDiscount = document.querySelector('.gamepage-price-div > h2')
        h2NoDiscount.style.textDecoration = "none"
        const h2Discount = document.querySelector('.gamepage-discount')
        h2Discount.remove()
    }
}
//Infopage Section -Creating HTMl
const htmlInfoPage = game => {
    //Removing loader indication
    infoContainer.textContent = ""
    //html info
    const html = `
    <h2>Product Information</h2>
    
    <div class="gamepage-info">
            <h3>Genre:</h3>
            <p>${game.genre}</p>
    </div>

    <div class="gamepage-info">
            <h3>Age Rating:</h3>
            <p>${game.ageRating}</p>
    </div>

    <div class="gamepage-info">
                <h3>Release Date:</h3>
                <p>${game.released}</p>
    </div>`
    infoContainer.innerHTML = html
}