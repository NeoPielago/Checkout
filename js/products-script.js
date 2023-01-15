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

        <div class = 'card best-seller-card'>
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

        <div class = 'card cleansers-toners-card'>
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

        <div class = 'card eyes-lips-card'>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    eyes_lips.innerHTML += content

})


productList_Moisturizers.slice(5).forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card moisturizers-card'>
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

        <div class = 'card serums-treatments-card'>
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

        <div class = 'card sun-protection-card'>
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



function isProductExist(card, productList){

    const clicked = card.childNodes[1].getAttribute('src')
    const product = productList.filter(obj => Object.values(obj).some(val => val.includes(clicked)))
    //try index of or use includes directly
     console.log(product)
}


best_seller_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        isProductExist(card, productList_Best_sellers)
    })

})


cleansers_toners_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        isProductExist(card, productList_cleansers_toners)
    })

})

serums_treatments_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        isProductExist(card, productList_serums_treatments)
    })

})


moisturizers_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        isProductExist(card, productList_Moisturizers)
    })

})

eyes_lips_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        isProductExist(card, productList_eyes_lips)
    })

})

sun_protection_cards.forEach((card)=>{

    card.addEventListener('click', ()=>{
        isProductExist(card, productList_sun_protection)
    })

})
