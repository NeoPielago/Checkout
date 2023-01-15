import {productList_serums_treatments} from './product_data.js'

const product_container = document.querySelector('.product-container')

productList_serums_treatments.forEach((product)=>{

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
    product_container.innerHTML += content

})

/* Event Listener*/


function ifProductExist(card, productList){

    const clicked = card.childNodes[1].getAttribute('src')
    const product = productList.filter(obj => Object.values(obj).some(val => val.includes(clicked)))
    //try index of or use includes directly
     console.log(clicked)
}



const serums_treatments_card = document.querySelectorAll('.serums-treatments-card')

serums_treatments_card.forEach((card)=>{

    card.addEventListener('click',()=>{
    
        ifProductExist(card, productList_serums_treatments)
    })

})

