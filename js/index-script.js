const featuredProdContainer = document.querySelector('.featured-products')

let featured_prodList = [
    {
        id: 4 ,
        Brandname: 'CERAVE',
        Productname: 'Cerave Renewing SA Face Cleanser (237ml)',
        Price: 'P1,500.00',
        Img:'assets/products/cleansers&toners/ICON_Cerave_Renewing_SA_Face_Cleanser.webp'
    },
    {
        id: 13 ,
        Brandname: 'DEAR KLAIRS',
        Productname: 'DEAR KLAIRS Rich Moist Soothing Serum (80ml)',
        Price: 'P1,280.00',
        Img: 'assets/products/serums&treatments/ICON_Dear_Klairs_Rich_Moist_Smoothing_Serum.webp'
    },
    {
        id: 45 ,
        Brandname: 'LA ROCHE-POSAY',
        Productname: 'LA ROCHE-POSAY Anthelios Dry Touch Gel Cream SPF50+(50ml)',
        Price: 'P1,450.00',
        Img: 'assets/products/sun_protection/ICON_LA_Roche_Posay_Anthelios_Dry_Touch_Gel_Cream_SPF50.webp'
    
    },
    {
        id: 11 ,
        Brandname: 'THE ORDINARY',
        Productname: 'THE ORDINARY Hyaluronic Acid 2% + B5 (30ml)',
        Price: 'P695.00',
        Img: 'assets/products/serums&treatments/ICON_The_Ordinary_Hyaluronic_Acid.webp'
    }
]



/* Featured products */
featured_prodList.forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card featured-card' value=${product.id}>
            <img class='card-img' src=${product.Img}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
           
        </div>
    `
    featuredProdContainer.innerHTML += content
})

/* Event listener */
const featured_cards = document.querySelectorAll('.featured-card')
featured_cards.forEach((card)=>{

    card.addEventListener('click',()=>{
     
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
     
    })
})



/* Top products  */

const topProdContainer = document.querySelector('.top-products')

let top_prodList = [
    {
        id: 53 ,
        Brandname: 'THE ORDINARY',
        Productname: 'THE ORDINARY AHA 30% + BHA 2% Peeling Solution(30ml)',
        Price: 'P780.00',
        Img:'assets/Products/Best_sellers/ICON_The_Ordinary_AHA_30_BHA_Peeling_Solution.webp'
    },
    {
        id: 1 ,
        Brandname: 'COSRX',
        Productname: 'COSRX Low pH Good Morning Gel Cleanser (150ml)',
        Price: 'P395.00',
        Img: 'assets/Products/cleansers&toners/ICON_Corsrx_Low_Ph_Goodmorning_Gel_Cleanser.webp'
    },
    {
        id: 6 ,
        Brandname: 'THAYERS',
        Productname: 'THAYERS Alcohol-Free Rose Petal Witch Hazel Toner(355ml)',
        Price: 'P780.00',
        Img: 'assets/Products/cleansers&toners/ICON_Thayers_Alcohol-Free_Rose_Petal_Witch_Hazel_Toner.webp'
    
    },
    {
        id: 19 ,    
        Brandname: 'COSRX',
        Productname: 'COSRX Acne Pimple Master Patch (Overnight) - 24 Patches',
        Price: 'P140.00',
        Img: 'assets/Products/serums&treatments/ICON_Acne_Pimple_Master_Patch_Overnight_24.webp'
    }
]


top_prodList.forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card top-products-card' value =${product.id}>
            <img class='card-img ' src=${product.Img}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
            <input type="hidden" value=${product.id}>
        </div>
    `
    topProdContainer.innerHTML += content
})


function queryString(id){

    const string = 'id=' + id
    const url = 'view-product.html?'
    const searchParams = new URLSearchParams(string)
    return url + searchParams
}

const top_cards = document.querySelectorAll('.top-products-card')
top_cards.forEach((card)=>{

    card.addEventListener('click',()=>{
     
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
     
    })
})


const title = document.querySelector('title')
const tab = document.querySelector('.home-tab')
console.log(tab)

if(title.textContent === 'Checkout | Home'){

    tab.style.color = '#D7BE78'
    tab.style.fontWeight = '600'

}

