import {productList_sun_protection} from './product_data.js'

const product_container = document.querySelector('.product-container')
productList_sun_protection.forEach((product)=>{

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
    product_container.innerHTML += content

})

/* Event Listener*/


function ifProductExist(card, productList){

    const clicked = card.childNodes[1].getAttribute('src')
    const product = productList.filter(obj => Object.values(obj).some(val => val.includes(clicked)))
    //try index of or use includes directly
     console.log(clicked)
}



const sun_protection_cards = document.querySelectorAll('.sun-protection-card')

sun_protection_cards.forEach((card)=>{

    card.addEventListener('click',()=>{
    
        ifProductExist(card, productList_sun_protection)
    })

})

