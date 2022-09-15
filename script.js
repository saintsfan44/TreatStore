const mainContainer = document.querySelector('.container');
const candyPage = document.querySelector('.candyPage');
const candyBtn = document.querySelector('.btn');
let  carts = document.querySelectorAll('.add-Cart');
let products = [
    {
        name: 'Candy Apple',
        tag: 'candyapple',
        price: 15,
        inCart: 0
    },
    {
        name: 'Candy Grapes',
        tag: 'candygrapes',
        price: 15,
        inCart: 0
    },
    {
        name: 'Bear Box',
        tag: 'bearbox',
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

onLoadCartNumbers();