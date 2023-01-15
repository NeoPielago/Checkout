import {productList} from './data_copy.js'

const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        const productId =  urlParams.get('id')
        // console.log(productId)

        const product = productList.find(val => val.id ==  productId)
  
        const productInfo = `

        <div class="product-container">

            <img class="product-img" src='${product.Img}' alt="${product.Productname}">

            <div class="info">
                <p class="brand-name">${product.Brandname}</p>
                <p class="product-name">${product.Productname}</p>
                <p class="product-price">${product.Price}</p>
                <div class="quantity">
                    <p class="quantity-label">Quantity</p>
                    <input type="number" name="number" id="number" min="1" value="1">
                    <button type="btn-add-to-cart" class="btn-add-to-cart">Add to Cart</button>
                </div>

                <i class="fa-solid fa-truck-fast"><span>Speed Delivery</span></i>
                <span class="delivery">24-48 hour delivery within Metro Manila</span>

                <p class="payment-options">Payment Options</p>

                <div class="payment">
                    <div class="option1">
                        <i class="fa-brands fa-cc-paypal"><span>Paypal</span></i>
                        <i class="fa-brands fa-cc-visa"><span>Visa</span></i>
                        <i class="fa-brands fa-cc-mastercard"><span>Mastercard</span> </i>
                    </div>

                    <div class="option2">
                        <i class="fa-solid fa-truck"><span>Cash on Delivery</span> </i>
                        <i class="fa-solid fa-building-columns"><span>Bank Deposit</span></i>
                    </div>
                </div>
            </div>

            </div>

            <div class="description">
            <p class="description-label">Description</p>    
            <p class="product-description">${product.Description}</p>
            <p class="ingredients">${product.Ingredients}</p>
            </div>

        `

        const container = document.querySelector('.product-view')
        
        container.innerHTML = productInfo



