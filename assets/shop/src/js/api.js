// eslint-disable-next-line no-unused-vars
class App extends EventTarget {
  /** @private */
  static API = 'https://api.escuelajs.co/api/v1'

  /** @private */
  abortController = null

  constructor() {
    super()
    this.revalidateCache().then(() => {
      this.dispatchEvent(new Event('ready'))
    })
  }

  /**
   * It makes a request to the API, and returns the response.
   * @returns An array of categories.
   */
  async getCategories() {
    const categories = await this.makeRequest('/categories', 20)
    return categories.filter((c) => c.name !== 'flowers')
  }

  /**
   * It gets all the categories, then it finds the category with the id that matches the id that was
   * passed in
   * @param {number} id - The id of the category you want to get
   * @returns The category object with the matching id.
   */
  async getCategoryById(id) {
    const categories = await this.getCategories()
    const category = categories.find((_category) => _category.id === id)
    return category
  }

  /**
   * It makes a request to the API, and returns the products.
   * @returns An array of products.
   */
  async getProducts() {
    const products = await this.makeRequest('/products', 20)
    return products.filter((p) => p.images.every((i) => i.startsWith('http')))
  }

  /**
   * It returns a product object from the products array that matches the id passed in as an argument
   * @param {number} id - The id of the product you want to get
   * @returns The product object with the matching id.
   */
  async getProductById(id) {
    const products = await this.getProducts()
    const product = products.find((product) => product.id === id)
    return product
  }

  /**
   * It takes a keyword, converts it to lowercase, gets all the products, filters the products by
   * whether the keyword is included in the title or description, and returns the filtered products
   * @param {string} keyword - The keyword to search for.
   * @returns An array of products that match the keyword.
   */
  async getProductsByKeyword(keyword) {
    keyword = keyword.toLowerCase()
    const products = await this.getProducts()
    const filteredProducts = products.filter((product) => {
      const includesInTitle = product.title.toLowerCase().includes(keyword)
      const includesInDescription = product.description
        .toLowerCase()
        .includes(keyword)
      return includesInTitle || includesInDescription
    })
    return filteredProducts
  }

  /**
   * It gets a category by its id, if the category exists, it gets all the products, and then filters
   * the products by the category id.
   * @param {number} categoryId - The id of the category you want to get the products for.
   * @returns An array of products that belong to the category with the given id.
   */
  async getProductsByCategory(categoryId) {
    const category = await this.getCategoryById(categoryId)
    if (!category) return []
    const products = await this.getProducts()
    const filteredProducts = products.filter(
      (product) => product.category.id === category.id
    )
    return filteredProducts
  }

  /**
   * It gets a product by id, if it exists, it gets the cached quantities from local storage, if it
   * doesn't exist, it creates an empty array, it then finds the index of the product in the array, if
   * it doesn't exist, it adds it to the array and returns the index, if it does exist, it returns the
   * index
   * @param {number} id - The id of the product
   * @returns The index of the product in the quantities array.
   */
  async getProductQuantityIndex(id) {
    const product = await this.getProductById(id)
    if (!product) return -1
    const quantities = JSON.parse(
      localStorage.getItem('cached-quantities') || '[]'
    )
    let index = quantities.findIndex((_product) => _product.id === id)
    if (index <= -1) {
      index = quantities.length
      quantities.push({ id, quantity: 200 })
      localStorage.setItem('cached-quantities', JSON.stringify(quantities))
      return index
    }
    return index
  }

  /**
   * It gets the index of the product in the cached-quantities array, then gets the quantity of the
   * product at that index.
   * @param {number} id - the id of the product
   * @returns The quantity of the product.
   */
  async getProductQuantity(id) {
    const index = await this.getProductQuantityIndex(id)
    const quantities = JSON.parse(localStorage.getItem('cached-quantities'))
    const quantity = quantities[index].quantity
    return quantity
  }

  /**
   * It takes an id, and a callback function, and returns the quantity of the product with the given
   * id.
   *
   * The callback function is used to update the quantity of the product.
   *
   * The callback function takes the current quantity of the product as an argument, and returns the
   * new quantity of the product.
   *
   * The callback function is called with the current quantity of the product as an argument.
   *
   * Here is an example on how to use it:
   *
   * ```javascript
   * const updatedQuantity = app.updateProductQuantity(function (currentQuantity) {
   *   const newQuantity = currentQuantity - 1
   *   return newQuantity >= 0 ? newQuantity : 0
   * })
   *```
   * @param {number} id - The id of the product
   * @param {Promise<Function>|Function} callback - a function that takes in the current quantity and returns the new quantity
   * @returns The quantity of the product.
   */
  async updateProductQuantity(id, callback) {
    const index = await this.getProductQuantityIndex(id)
    const quantities = JSON.parse(localStorage.getItem('cached-quantities'))
    const product = quantities[index]
    product.quantity = await callback(product.quantity)
    if (product.quantity < 0) product.quantities = 0
    localStorage.setItem('cached-quantities', JSON.stringify(quantities))
    return product.quantity
  }

  /**
   * It gets the index of a product in the cart by its id.
   * @param {number} id - the id of the product you want to find in the cart
   * @returns The index of the product in the cart.
   */
  async getProductIndexFromCart(id) {
    const cache = localStorage.getItem('cart')
    if (!cache) localStorage.setItem('cart', '[]')
    const cart = JSON.parse(localStorage.getItem('cart'))
    const index = cart.findIndex((product) => product.id === id)
    return index
  }

  /**
   * It gets all the products from the cart, populates them with their quantity and total price, and
   * returns them.
   * @returns An array of promises.
   */
  async getProductsFromCart() {
    const products = JSON.parse(localStorage.getItem('cart') || '[]')
    const populatedProducts = products.map(async (product) => {
      const _product = await this.getProductById(product.id)
      _product.quantity = await this.getProductQuantityFromCart(product.id)
      _product.total_price = _product.quantity * _product.price
      return _product
    })
    return Promise.all(populatedProducts)
  }

  /**
   * Get the quantity of a product in the cart by its id.
   * @param {number} id - the id of the product
   * @returns The quantity of the product in the cart.
   */
  async getProductQuantityFromCart(id) {
    const index = await this.getProductIndexFromCart(id)
    if (index < 0) return 0
    const products = JSON.parse(localStorage.getItem('cart'))
    const product = products[index]
    const quantity = product.quantity
    return quantity
  }

  /**
   * It takes an id and a callback function, and then it updates the quantity of the product with that
   * id in the cart, and then it returns the new quantity of the product.
   *
   * The callback function is a function that takes the current quantity of the product and returns the
   * new quantity of the product.
   *
   * The callback function is used to update the quantity of the product from cart.
   *
   * The callback function is used to update the quantity
   * @param {number} id - the id of the product
   * @param {Promise<Function>|Function} callback - a function that takes the current quantity of the product and returns the new
   * quantity
   * @returns The quantity of the product.
   */
  async updateProductQuantityFromCart(id, callback) {
    let index = await this.getProductIndexFromCart(id)
    const products = JSON.parse(localStorage.getItem('cart'))
    const productQuantity = await this.getProductQuantity(id)
    if (index < 0) {
      index = products.length
      products.push({ id, quantity: 0 })
    }
    const product = products[index]
    product.quantity = await callback(product.quantity)
    if (product.quantity <= 0) products.splice(index, 1)
    if (product.quantity > productQuantity) product.quantity = productQuantity
    localStorage.setItem('cart', JSON.stringify(products))
    return product.quantity
  }

  /**
   * It removes the cart from local storage.
   */
  async clearCart() {
    localStorage.removeItem('cart')
  }

  /**
   * It gets the credit from local storage, or if it doesn't exist, it returns 20,000.
   * @returns The credit value is being returned.
   */
  async getCredit() {
    const credit = parseInt(localStorage.getItem('credit') || '20000', 10)
    return credit
  }

  /**
   * This function takes a callback function as an argument, and then calls that callback function with
   * the current credit as an argument, and then sets the credit to the return value of the callback
   * function.
   * @param {Promise<Function>|Function} callback - A function that takes the current credit as a parameter and returns the new
   * credit.
   * @returns The return value of the callback function.
   */
  async updateCredit(callback) {
    const credit = await this.getCredit()
    const newCredit = await callback(credit)
    if (typeof newCredit !== 'number') return
    localStorage.setItem('credit', newCredit)
  }

  /**
   * It gets the products from the cart, gets the user's credit, checks if the cart is empty, checks if
   * the user has enough credit, checks if the products are in stock, updates the product quantities,
   * clears the cart, and returns a success callback
   * @param {Promise<Function>|Function} successCallback - a function that will be called if the order is successful
   * @param {Promise<Function>|Function} errorCallback - a function that takes a string as a parameter and returns a promise that
   * resolves to nothing.
   * @returns The return value of the last statement in the function.
   */
  async confirmOrder(successCallback, errorCallback) {
    const productsFromCart = await this.getProductsFromCart()
    const credit = await this.getCredit()
    if (productsFromCart.length < 1) return await errorCallback('Cart is empty')
    let total = 0
    for (const product of productsFromCart) {
      total += product.total_price
      const productQuantity = await this.getProductQuantity(product.id)
      if (credit < total)
        return await errorCallback('You don\'t have enough credit')
      if (productQuantity < product.quantity)
        return await errorCallback('Out of stock')
      await this.updateProductQuantity(product.id, (n) => n - product.quantity)
    }
    await this.clearCart()
    return await successCallback()
  }

  /**
   * If there is a category in session storage, return it, otherwise return null.
   * @returns The category object.
   */
  async getCurrentCategory() {
    const category = sessionStorage.getItem('category')
    if (!category) return null
    return JSON.parse(category)
  }

  /**
   * It takes an id, finds the category with that id, and sets it as the current category.
   * @param {number} id - The id of the category you want to set as the current category.
   * @returns The category object.
   */
  async setCurrentCategory(id) {
    const categories = await this.getCategories()
    let category = categories.find((_category) => _category.id === id)
    if (!category) {
      sessionStorage.removeItem('category')
      return
    }
    sessionStorage.setItem('category', JSON.stringify(category))
  }

  /**
   * It makes a request to the API, if the request fails, it dispatches an error event, if the request
   * succeeds, it caches the data in localStorage and returns the data.
   *
   * The function takes two arguments, the first is the path to the API endpoint, the second is the
   * number of minutes to cache the data for.
   *
   * The function starts by removing any leading slashes from the path, then it checks if the data is
   * cached in localStorage. If it is, it checks if the data has expired, if it hasn't, it returns the
   * data. If the data has expired, it continues to make the request.
   *
   * If the request is already in progress, it aborts it.
   *
   * It then makes the request, if the request fails, it dispatches an error event, if the request
   * succeeds, it caches the data in localStorage and returns the data.
   * @private
   * @param {string} path - The path to the API endpoint.
   * @param {number} [minuteExpires=5] - The number of minutes to cache the data for.
   * @returns The data is being returned.
   */
  async makeRequest(path, minuteExpires = 5) {
    try {
      path = path.replace(/^\/+/g, '')
      const cached = localStorage.getItem(`cached-${path}`)
      if (cached) {
        const { data, expires } = JSON.parse(cached)
        const now = new Date()
        if (now < new Date(expires)) return data
      }
      if (this.abortController) this.abortController.abort()
      const abortController = new AbortController()
      const signal = abortController.signal
      this.abortController = abortController
      const response = await fetch(`${App.API}/${path}`, { signal })
      if (response.status >= 400) throw new Error(response.statusText)
      const data = await response.json()
      const expires = new Date()
      localStorage.setItem(
        `cached-${path}`,
        JSON.stringify({
          data,
          expires: expires.setMinutes(expires.getMinutes() + minuteExpires) // revalidate data every n minutes
        })
      )
      return data
    } catch (error) {
      this.abortController = null
      this.dispatchEvent(new Event('error'))
      console.error(error)
      return []
    }
  }

  /**
   * This function will get the categories and products from the server and store them in the cache.
   * @private
   */
  async revalidateCache() {
    await this.getCategories()
    await this.getProducts()
  }
}
