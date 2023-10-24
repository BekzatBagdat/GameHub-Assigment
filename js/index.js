//Selecting DOM Elements
const body = document.querySelector('body')
const listOfGamesContainer = document.querySelector('.newreleases-listofgames')
const discountContainer = document.querySelector('.discounts-redbox')
const topSellCountainer = document.querySelector('.topselling-bluebox')
//Fetch
const getGames = async () => {
    try {
        //Adding Loader
        listOfGamesContainer.textContent = 'Loading...'
        listOfGamesContainer.style.fontSize = "2rem"
        discountContainer.textContent = 'Loading...'
        discountContainer.style.fontSize = '1rem'
        discountContainer.style.color = 'white'
        topSellCountainer.textContent = 'Loading...'
        topSellCountainer.style.fontSize = '1rem'
        topSellCountainer.style.color = 'white'
        //Fetching
        const url = 'http://bekzatbagdat.no/wp-json/wc/store/products/'
        const response = await fetch(url)
        const json = await response.json()
        const gamesData = json
        //Running createHtml functions
        htmlNewReleases(gamesData)
        htmlDiscount(gamesData)
        htmlTopSell(gamesData)
    } catch (error) {
        body.textContent = `${error} 🤡`
        body.style.fontSize = '2rem'
        body.style.margin = "2rem"
    }
}
getGames()

//New Releases Section -Creating HTML
const htmlNewReleases = games => {
    //Removing loader indicator
    listOfGamesContainer.textContent = ''
    
    games.forEach(game => {
        //div
        const div = document.createElement('div')
        div.className = "newreleases-products"
        //img
        const img = document.createElement('img')
        img.className = "newreleases-product-img"
        img.src = game.images[0].src
        div.append(img)
        //h2
        const h2 = document.createElement('h2')
        h2.className = "newreleases-product-title"
        h2.textContent = game.name
        div.append(h2)
        //p for Platform
        const pPlatform = document.createElement('p')
        pPlatform.className = "newreleases-product-platform"
        pPlatform.textContent = "Playbox"
        div.append(pPlatform)
        //p for Price
        const pPrice = document.createElement('p')
        pPrice.className = "newreleases-product-price"
        pPrice.textContent = `${game.prices.price / 100} Kr`
        div.append(pPrice)
        //a
        const a = document.createElement('a')
        a.className = "newreleases-btn"
        a.textContent = "Buy Now"
        div.append(a)
        a.href = `gamepage.html?id=${game.id}`
        //Appending new elements to the list of games
        listOfGamesContainer.appendChild(div)
    });
}

//Discount Section -Creating HTML
const htmlDiscount = games => {
    //Removing loader indicator
    discountContainer.textContent = ""
    //div
    const div = document.createElement('div')
    div.className = "discounts-products"
    //img
    const img = document.createElement('img')
    img.className = "discounts-product-img"
    img.src = games[2].images[0].src
    div.append(img)
    //h3
    const h3 = document.createElement('h3')
    h3.className = "discounts-product-title"
    h3.textContent = games[2].name
    div.append(h3)
    //p for Platform
    const pPlatform = document.createElement('p')
    pPlatform.className = "discounts-product-platform"
    pPlatform.textContent = "Playbox"
    div.append(pPlatform)
    //p for Price
    const pPrice = document.createElement('p')
    pPrice.className = "discounts-product-oldprice"
    pPrice.textContent = `${games[2].prices.regular_price / 100} Kr`
    div.append(pPrice)
    //p for Discounted Price
    const pPriceDiscount = document.createElement('p')
    pPriceDiscount.className = "discounts-product-price"
    pPriceDiscount.textContent = `${games[2].prices.sale_price / 100} kr`
    div.append(pPriceDiscount)
    //a
    const a = document.createElement('a')
    a.className = "discounts-btn"
    a.textContent = "Buy Now"
    div.append(a)
    a.href = `gamepage.html?id=${games[2].id}`
    //Appending new elements to the discount container
    discountContainer.append(div)
}

//Top selling section -Creating HTML
const htmlTopSell = games => {
    //Removing loader indicator
    topSellCountainer.textContent = '';
    for (let i = 1; i <= 5; i++) {
        //div
        const div = document.createElement('div')
        div.className = 'list-div'
        //h3
        const h3 = document.createElement('h3')
        h3.textContent = `${i}.`
        div.append(h3)
        //h4
        const h4 = document.createElement('h4')
        h4.textContent = games[i].name
        div.append(h4)
        //a 
        const a = document.createElement('a')
        a.className = 'topselling-btn'
        a.textContent = 'Buy Now'
        a.href = `gamepage.html?id=${games[i].id}`
        div.append(a)
        //Appending new elements to the top selling container
        topSellCountainer.append(div)
    }
}

