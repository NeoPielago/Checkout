const app = new App()

app.addEventListener('ready', async () => {
  const credit = await app.getCredit()
  const categories = await app.getCategories()
  const paginationButtons = document.querySelectorAll(
    'button[data-action-paginate]'
  )
  const allProductsButton = document.querySelector('#all-products')
  const modalContainer = document.querySelector('#modal-container')
  const viewDecrementBtn = document.querySelector(
    '#view-modal #view-quantity-request-decrement'
  )
  const viewIncrementBtn = document.querySelector(
    '#view-modal #view-quantity-request-increment'
  )
  const viewQuantity = document.querySelector('#view-modal #view-quantity')
  const viewRequestQuantity = document.querySelector(
    '#view-modal #view-request-quantity'
  )
  const viewSubmitButton = document.querySelector(
    '#view-modal #view-quantity-request-submit'
  )

  await app.setCurrentCategory(0)
  void loadCredit(credit)
  void loadCategories(categories)
  void loadPaginationButtons(Array.from(paginationButtons))
  allProductsButton.addEventListener('click', async () => {
    void outputProducts((await app.getProducts()).slice(0, 6))
    sessionStorage.setItem('pagination-skip', 0)
  })
  allProductsButton.click()
  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer || e.target === modalContainer.children[0])
      toggleViewModal(false)
  })
  viewDecrementBtn.addEventListener('click', () => {
    const quantity = parseInt(viewRequestQuantity.textContent, 10)
    if (quantity - 1 < 1) return
    viewRequestQuantity.textContent = quantity - 1
  })
  viewIncrementBtn.addEventListener('click', () => {
    const quantity = parseInt(viewRequestQuantity.textContent, 10)
    const limit = parseInt(viewQuantity.textContent, 10)
    if (quantity + 1 > limit) return
    viewRequestQuantity.textContent = quantity + 1
  })
  viewSubmitButton.addEventListener('click', addToCart)
})

/**
 * It takes a number and displays it in the HTML element with the id "credit"
 * @param {number} credit - The credit amount to be displayed.
 */
function loadCredit(credit) {
  const container = document.querySelector('#credit')
  container.textContent = credit.toString(10)
}

/**
 * It takes an array of categories and creates a div for each category, then appends the div to the
 * #categories element
 * @param {Array<any>} categories - an array of objects with the following properties:
 */
function loadCategories(categories) {
  const categoriesContainer = document.querySelector('#categories')
  for (const category of categories) {
    const container = document.createElement('div')
    container.className = 'bg-slate-100 shadow'
    const imageContainer = document.createElement('div')
    imageContainer.className = 'relative h-[300px] overflow-hidden'
    const image = document.createElement('img')
    image.className =
      'w-full h-full relative left-0 top-0 object-cover transition-transform hover:scale-105'
    image.src = category.image
    image.alt = category.name
    image.width = 300
    image.height = 300
    imageContainer.append(image)
    container.append(imageContainer)
    const linkContainer = document.createElement('div')
    const link = document.createElement('a')
    link.className = 'flex gap-x-2 items-center hover:text-orange-500 group p-4'
    link.href = '#products'
    link.addEventListener('click', async () => {
      app.setCurrentCategory(category.id)
      const selected = (await app.getProductsByCategory(category.id)).slice(
        0,
        6
      )
      outputProducts(selected)
      sessionStorage.setItem('pagination-skip', 0)
    })
    const linkContent = document.createElement('span')
    linkContent.className = 'font-bold transition-colors capitalize'
    linkContent.append(document.createTextNode(category.name))
    const linkIcon = document.createElement('span')
    linkIcon.className = 'transition-all group-hover:translate-x-2'
    linkIcon.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" > <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/> </svg>'
    link.append(linkContent, linkIcon)
    linkContainer.append(link)
    container.append(linkContainer)
    categoriesContainer.append(container)
  }
}

/**
 * It loads the pagination buttons with the appropriate event listeners
 * @param {HTMLButtonElement[]} buttons - the buttons that are clicked to change the page
 */
async function loadPaginationButtons(buttons) {
  const getSkip = () => parseInt(sessionStorage.getItem('pagination-skip'), 10)
  const updateSkip = (n) =>
    sessionStorage.setItem('pagination-skip', (getSkip() + n).toString())
  const getProducts = async () => {
    const currentCategory = await app.getCurrentCategory()
    return currentCategory === null
      ? await app.getProducts()
      : await app.getProductsByCategory(currentCategory.id)
  }
  for (const button of buttons) {
    const action = button.dataset.actionPaginate
    if (action === 'prev') {
      button.addEventListener('click', async () => {
        if (getSkip() - 6 >= 0) updateSkip(-6)
        const products = await getProducts()
        const skip = getSkip()
        const take = skip + 6
        const selected = products.slice(skip, take)
        if (selected.length < 1) return
        outputProducts(selected)
      })
      continue
    }
    button.addEventListener('click', async () => {
      const products = await getProducts()
      if (getSkip() <= products.length - getSkip()) updateSkip(6)
      const skip = getSkip() + 6
      const take = skip + 6
      const selected = products.slice(skip, take)
      if (selected.length < 1) return
      outputProducts(selected)
    })
  }
}

/**
 * It takes an array of products and outputs them to the DOM
 * @param {Array<any>} products - an array of objects that contain the product information
 */
function outputProducts(products) {
  const mainContainer = document.querySelector('#product-list')
  mainContainer.innerHTML = ''
  for (const product of products) {
    const container = document.createElement('div')
    container.className = 'shadow'
    const imageContainer = document.createElement('div')
    imageContainer.className = 'relative h-[300px] overflow-hidden'
    const image = document.createElement('img')
    image.className =
      'w-full h-full relative left-0 top-0 object-cover transition-transform hover:scale-105'
    image.src = product.images[0]
    image.width = 300
    image.height = 300
    image.alt = product.title
    const informationContainer = document.createElement('div')
    const productName = document.createElement('p')
    productName.className =
      'text-orange-500 font-bold font-poppins bg-orange-100 mb-2 p-4'
    productName.append(document.createTextNode(product.title))
    const info = document.createElement('div')
    info.className = 'flex items-center justify-between m-4'
    const productPrice = document.createElement('p')
    productPrice.className = 'font-bold'
    productPrice.append(document.createTextNode(`Price: ${product.price}`))
    const viewButton = document.createElement('button')
    viewButton.className =
      'border border-orange-500 rounded-full px-4 py-2 text-orange-500 hover:bg-orange-100'
    viewButton.type = 'button'
    viewButton.append(document.createTextNode('View'))
    viewButton.addEventListener('click', () => {
      viewProduct(product.id)
    })
    info.append(productPrice, viewButton)
    imageContainer.append(image)
    informationContainer.append(productName, info)
    container.append(imageContainer, informationContainer)
    mainContainer.append(container)
  }
}

/**
 * It takes an id, gets the product by that id, gets the quantity of that product, and then displays
 * the product's image, title, description, quantity, and price in the view modal.
 * @param {number} id - The id of the product to view
 * @returns the value of the last expression evaluated.
 */
async function viewProduct(id) {
  const product = await app.getProductById(id)
  if (!product) return
  const productQuantity = await app.getProductQuantity(id)
  const viewModal = document.querySelector('#view-modal')
  const image = viewModal.querySelector('#view-image')
  const title = viewModal.querySelector('#view-title')
  const description = viewModal.querySelector('#view-description')
  const quantity = viewModal.querySelector('#view-quantity')
  const price = viewModal.querySelector('#view-price')
  const requestQuantity = viewModal.querySelector('#view-request-quantity')
  image.src = product.images[0]
  image.alt = product.title
  title.textContent = product.title
  description.textContent = product.description
  quantity.textContent = `Qty: ${productQuantity}`
  price.textContent = `Price: ${product.price}`
  requestQuantity.textContent = '1'
  document.querySelector('#view-modal #view-id').textContent = id
  toggleViewModal(true)
}

/**
 * It toggles the `z-50` class on the modal container, and the `overflow-hidden` class on the body,
 * based on the value of the `visible` argument.
 *
 * @param {boolean} [visible=false] - boolean - whether the modal should be visible or not
 */
function toggleViewModal(visible = false) {
  const modalContainer = document.querySelector('#modal-container')
  document.body.classList.toggle('overflow-hidden', visible)
  modalContainer.classList.toggle('z-50', visible)
  modalContainer.classList.toggle('-z-50', !visible)
  modalContainer.classList.toggle('invisible', !visible)
}

async function addToCart() {
  const viewRequestQuantity = parseInt(
    document.querySelector('#view-modal #view-request-quantity').textContent,
    10
  )
  const productId = parseInt(
    document.querySelector('#view-modal #view-id').textContent,
    10
  )
  const quantity = await app.updateProductQuantityFromCart(
    productId,
    (currentQuantity) => currentQuantity + viewRequestQuantity
  )
  await app.updateProductQuantity(
    productId,
    (currentQuantity) => currentQuantity - quantity
  )
  toggleViewModal(false)
  alert('Added to cart!')
}
