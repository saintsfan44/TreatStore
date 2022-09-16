const mainContainer = document.querySelector('.container');
const candyPage = document.querySelector('.candyPage');
const candyBtn = document.querySelector('.btn');
let  carts = document.querySelectorAll('.add-Cart');
let products = [
    {
        name: 'Candy Apple',
        tag: 'candyapples',
        price: 15,
        inCart: 0
    },
    {
        name: 'Candy Grapes',
        tag: 'grapes',
        price: 15,
        inCart: 0
    },
    {
        name: 'Bear Box',
        tag: 'bearbox (1)',
        price: 15,
        inCart: 0
    },
    {
        name: 'Candy Oreos',
        tag: 'candyoreos',
        price: 15,
        inCart: 0
    }
]

/**************************************/
/**************************************/


for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers ) {
        document.querySelector('.cart-items').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    console.log("The product clicked is", product)
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart-items').textContent = 1;
    }

    setItems(product);
    
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    

    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
    //console.log("the product price is", product.price);

    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost +  product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }

    

}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class="fa-sharp fa-solid fa-circle-xmark"></i>
                <img src="Images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price}.00</div>
            <div class="quantity">
            <i class="fa-solid fa-minus"></i>
            <span>${item.inCart}</span>
            <i class="fa-sharp fa-solid fa-plus"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price}.00
            </div>

            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost}.00
                </h4>
        `
    }
}

onLoadCartNumbers();
displayCart();