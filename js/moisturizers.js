import {productList_Moisturizers} from './product_data.js'

const product_container = document.querySelector('.product-container')

productList_Moisturizers.forEach((product)=>{

    const card = document.createElement('div')
    card.classList = 'card-body'

    const content = `

        <div class = 'card moisturizers-card' value =${product.id}>
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



const moisturizers_cards = document.querySelectorAll('.moisturizers-card')

moisturizers_cards.forEach((card)=>{

    card.addEventListener('click',()=>{
    
        const id = card.getAttribute('value')
        window.location.href = queryString(id)
     
    })

})

