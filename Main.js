//common
const sortArr = (arr) => {
    arr.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });
}

const builtSelectProduct = (product) => {
    const newProduct = document.createElement("button");
    const text = document.createTextNode(product.name)
    newProduct.className = "select_product";
    newProduct.id = product.name;
    newProduct.onclick = (event) => {
        showProductDetails(event);
    }
    
    newProduct.appendChild(text);

    return newProduct;
}

const displayProductsArray = (products) => {
    products.forEach((product) => {
        const newProduct = builtSelectProduct(product);
        results.appendChild(newProduct);
    });
}

const deleteDisplayedProducts = (filteredProducts) => {
    filteredProducts.forEach((product) => {
        const name = product.name;
        document.getElementById(name).remove();
    });
}

// timer
const formatZeros = (time) => {
    const timeString = time.toString();
    return timeString.length < 2 ? "0" + timeString : timeString;
}

const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${formatZeros(hours)}:${formatZeros(minutes)}:${formatZeros(seconds)}`;
}

const updateTime = () => {
    const date = new Date();
    timerLabel.textContent = formatTime(date);
}

const timerLabel = document.getElementById("timer");

updateTime();
setInterval(updateTime, 1000);

// items
const showProductDetails = (event) => {
    const product = products.find((product) => product.name === event.currentTarget.id);
    document.getElementById("product_name").textContent = product.name;
    document.getElementById("product_price").textContent = product.price;
    document.getElementById("product_in_stock").textContent = product.in_stock;
}

const products = [
    { "name": "שווארמה", "price": "50", "in_stock": "10" },
    { "name": "קוביות קרח", "price": "10", "in_stock": "100" },
    { "name": "פינג פונג", "price": "22", "in_stock": "2000" },
    { "name": "אישור כניסה", "price": "15", "in_stock": "88" },
    { "name": "קפה שחור", "price": "12", "in_stock": "321" }
];

sortArr(products);

const filteredProducts = products.slice();

const results = document.getElementById("results");

displayProductsArray(filteredProducts);

// show/hide products
const hideProducts = () => {
    deleteDisplayedProducts(filteredProducts);
    document.getElementById("product_name").textContent = "";
    document.getElementById("product_price").textContent = "";
    document.getElementById("product_in_stock").textContent = "";

    productsVisibility.textContent = "הצג מוצרים";
    productsVisibility.onclick = showProducts;
}

const showProducts = () => {
    filteredProducts = products.slice();
    displayProductsArray(products);
    productsVisibility.textContent = "הסתר מוצרים";
    productsVisibility.onclick = hideProducts;
}

const productsVisibility = document.getElementById("products_visibility");

// search bar
const showAllProducts = () => {
    deleteDisplayedProducts(filteredProducts);
    filteredProducts = products.slice();
    displayProductsArray(filteredProducts);
}

const searchForItems = () => {
    const searchWord = serachBar.value;

    if (searchWord === "") {
        showAllProducts();
    }
        
    const deleteProducts = filteredProducts.filter(product => !product.name.includes(searchWord));

    deleteProducts.forEach(deleteProduct => {
        const index = filteredProducts.findIndex(product => product.name === deleteProduct.name);
        filteredProducts.splice(index,1);
    });

    deleteDisplayedProducts(deleteProducts);
}

const serachBar = document.getElementById("serach_bar");

serachBar.addEventListener("input", (event) => {
    searchForItems();
})

// sort
const sortAscending = () => {
    sortArr(products);
    sortArr(filteredProducts);

    deleteDisplayedProducts(filteredProducts);
    displayProductsArray(filteredProducts);
}

const sortDescending = () => {
    products.reverse();
    filteredProducts.reverse();

    deleteDisplayedProducts(filteredProducts);
    displayProductsArray(filteredProducts);
}