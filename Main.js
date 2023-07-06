//common
const sortArr = (arr) => {
    arr.sort((a, b) => {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });
}

const builtSelectProduct = (product) => {
    const new_product = document.createElement("button");
    const text = document.createTextNode(product.name)
    new_product.className = "select_product";
    new_product.id = product.name;
    new_product.onclick = function (event) {
        showProductDetails(event);
    }
    
    new_product.appendChild(text);

    return new_product;
}

const displayProductsArray = (products) => {
    products.forEach((product) => {
        const new_product = builtSelectProduct(product);
        results.appendChild(new_product);
    });
}

const deleteDisplayedProducts = (filtered_products) => {
    filtered_products.forEach((product) => {
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
    timer_label.textContent = formatTime(date);
}

const timer_label = document.getElementById("timer");

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

var filtered_products = products.slice();

const results = document.getElementById("results");

displayProductsArray(filtered_products);

// show/hide products
const hideProducts = () => {
    deleteDisplayedProducts(filtered_products);
    document.getElementById("product_name").textContent = "";
    document.getElementById("product_price").textContent = "";
    document.getElementById("product_in_stock").textContent = "";

    show_products.textContent = "הצג מוצרים";
    show_products.onclick = showProducts;
}

const showProducts = () => {
    filtered_products = products.slice();
    displayProductsArray(products);
    show_products.textContent = "הסתר מוצרים";
    show_products.onclick = hideProducts;
}

const show_products = document.getElementById("products_visibility");

// search bar
const showAllProducts = () => {
    deleteDisplayedProducts(filtered_products);
    filtered_products = products.slice();
    displayProductsArray(filtered_products);
}

const searchForItems = () => {
    const search_word = serach_bar.value;

    if (search_word === "") {
        showAllProducts();
    }
        
    const delete_products = filtered_products.filter(product => !product.name.includes(search_word));

    delete_products.forEach(delete_product => {
        const index = filtered_products.findIndex(product => product.name === delete_product.name);
        filtered_products.splice(index,1);
    });

    deleteDisplayedProducts(delete_products);
}

const serach_bar = document.getElementById("serach_bar");

serach_bar.addEventListener("input", (event) => {
    searchForItems();
})

// sort
const sortAscending = () => {
    sortArr(products);
    sortArr(filtered_products);

    deleteDisplayedProducts(filtered_products);
    displayProductsArray(filtered_products);
}

const sortDescending = () => {
    products.reverse();
    filtered_products.reverse();

    deleteDisplayedProducts(filtered_products);
    displayProductsArray(filtered_products);
}