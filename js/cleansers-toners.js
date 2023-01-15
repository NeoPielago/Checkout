import {productList_cleansers_toners} from './product_data.js'

const product_container = document.querySelector('.product-container')

productList_cleansers_toners.forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card cleansers-toners-card' value =${product.id}>
            <img class='card-img' src=${product.Icon}>
            <strong><p class ='card-brand-name card-p'>${product.Brandname}</p></strong>
            <p class='card-product-name card-p'>${product.Productname}</p>
            <p class='card-price card-p'>${product.Price}</p>
        </div>
    `
    product_container.innerHTML += content

})

/* Event Listener*/


function queryString(id){

    const string = 'id=' + id
    const url = 'view-product.html?'
    const searchParams = new URLSearchParams(string)
    return url + searchParams
}




const cleansers_toners = document.querySelectorAll('.cleansers-toners-card')

cleansers_toners.forEach((card)=>{

    card.addEventListener('click',()=>{
    
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
    })

})