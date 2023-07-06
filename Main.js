// timer
const timer_label = document.getElementById("timer");

updateTime();
setInterval(updateTime, 1000);

function updateTime() {
    const date = new Date();
    timer_label.innerHTML = formatTime(date);
}

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    hours = formatZeros(hours);
    minutes = formatZeros(minutes);
    seconds = formatZeros(seconds);

    return `${hours}:${minutes}:${seconds}`;
}

function formatZeros(time) {
    const timeString = time.toString();
    return timeString.length < 2 ? "0" + timeString : timeString;
}

// items
const products = [
    { "name": "שווארמה", "price": "50", "in_stock": "10" },
    { "name": "קוביות קרח", "price": "10", "in_stock": "100" },
    { "name": "פינג פונג", "price": "22", "in_stock": "2000" },
    { "name": "אישור כניסה", "price": "15", "in_stock": "88" },
    { "name": "קפה שחור", "price": "12", "in_stock": "321" }
];

products.sort(function (a, b) {
    if (a.name < b.name) { return -1; }
    if (a.name > b.name) { return 1; }
    return 0;
});

var filtered_products = products.slice();

const results = document.getElementById("results");

displayProductsArray(filtered_products);

function displayProductsArray(products) {
    for (const index in products) {
        const elem = builtSelectItemComponent(products, index);
        results.appendChild(elem);
    }
}

function builtSelectItemComponent(array, index) {
    var elem = document.createElement("button");
    const text = document.createTextNode(array[index].name)
    elem.className = "select_product";
    elem.id = array[index].name;
    elem.onclick = function (event) {
        showProductDetails(event);
    }
    
    elem.appendChild(text);

    return elem;
}

function showProductDetails(event) {
    const product_index = products.findIndex((product) => product.name === event.currentTarget.id);
    document.getElementById("product_name").innerHTML = products[product_index].name;
    document.getElementById("product_price").innerHTML = products[product_index].price;
    document.getElementById("product_in_stock").innerHTML = products[product_index].in_stock;
}

// show/hide products
const show_products = document.getElementById("show_products");

function hideProducts() {
    deleteDisplayedProducts(filtered_products);
    document.getElementById("product_name").innerHTML = "";
    document.getElementById("product_price").innerHTML = "";
    document.getElementById("product_in_stock").innerHTML = "";

    show_products.innerHTML = "הצג מוצרים";
    show_products.onclick = showProducts;
}

function showProducts() {
    filtered_products = products.slice();
    displayProductsArray(products);
    show_products.innerHTML = "הסתר מוצרים";
    show_products.onclick = hideProducts;
}

function deleteDisplayedProducts(filtered_products) {
    for (let index in filtered_products) {
        const name = filtered_products[index].name;
        document.getElementById(name).remove();
    }
}

// search bar
const serach_bar = document.getElementById("serach_bar");

function searchForItems() {
    const search_word = serach_bar.value;

    if (search_word === "") {
        deleteDisplayedProducts(filtered_products);
        filtered_products = products.slice();
        displayProductsArray(filtered_products);
    }
    
    const indexes = [];
    filtered_products.forEach((product, index) => {
        if (!product.name.includes(search_word)) {
            indexes.push(index);
        }
    });

    const deleted_products = [];
    indexes.reverse();
    for (let i = 0; i < indexes.length; i++) {
        deleted_products.push(filtered_products.splice(indexes[i], 1)[0]);
    }

    deleteDisplayedProducts(deleted_products);
}

// sort
function sortAscending() {
    products.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });

    filtered_products.sort(function (a, b) {
        if (a.name < b.name) { return -1; }
        if (a.name > b.name) { return 1; }
        return 0;
    });

    deleteDisplayedProducts(filtered_products);
    displayProductsArray(filtered_products);
}

function sortDescending() {
    products.reverse();
    filtered_products.reverse();

    deleteDisplayedProducts(filtered_products);
    displayProductsArray(filtered_products);
}