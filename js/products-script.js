import {
    productList_Best_sellers,
    productList_cleansers_toners,
    productList_serums_treatments,
    productList_Moisturizers,
    productList_eyes_lips,
    productList_sun_protection

} from './product_data.js'


/* card containers*/
const best_sellers = document.querySelector('.best-sellers')
const cleansers_toners = document.querySelector('.cleansers-toners')
const eyes_lips = document.querySelector('.eyes-lips')
const moisturizers = document.querySelector('.moisturizers')
const serums_treatments = document.querySelector('.serums-treatments')
const sun_protection = document.querySelector('.sun-protection')




/* product card generator*/

productList_Best_sellers.slice(0,5).forEach((product)=>{
    
    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card best-seller-card' value=${product.id}>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    best_sellers.innerHTML += content

})


productList_cleansers_toners.slice(4,9).forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card cleansers-toners-card' value=${product.id}>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    cleansers_toners.innerHTML += content
})


productList_eyes_lips.slice(0,5).forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card eyes-lips-card' value=${product.id}>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    eyes_lips.innerHTML += content

})


productList_Moisturizers.slice(4).forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card moisturizers-card' value=${product.id}>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    moisturizers.innerHTML += content
})

productList_serums_treatments.slice(0,5).forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card serums-treatments-card' value=${product.id}>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    serums_treatments.innerHTML += content

})


productList_sun_protection.slice(0,5).forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card sun-protection-card' value=${product.id}>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    sun_protection.innerHTML += content

})


/* Event listeners */

const best_seller_cards = document.querySelectorAll('.best-seller-card')
const cleansers_toners_cards = document.querySelectorAll('.cleansers-toners-card')
const eyes_lips_cards = document.querySelectorAll('.eyes-lips-card')
const moisturizers_cards = document.querySelectorAll('.moisturizers-card')
const serums_treatments_cards = document.querySelectorAll('.serums-treatments-card')
const sun_protection_cards = document.querySelectorAll('.sun-protection-card')



function queryString(id){

    const string = 'id=' + id
    const url = 'view-product.html?'
    const searchParams = new URLSearchParams(string)
    return url + searchParams
}


best_seller_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
    })

})


cleansers_toners_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
    })

})

serums_treatments_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
    })

})


moisturizers_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
    })

})

eyes_lips_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
    })

})

sun_protection_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
    })

})


const title = document.querySelector('title')
const tab = document.querySelector('.products-tab')

if(title.textContent === 'Checkout | Products'){

    tab.style.color = '#D7BE78'
    tab.style.fontWeight = '600'

}