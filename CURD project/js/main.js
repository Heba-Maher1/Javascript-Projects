let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let small = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchTitle = document.getElementById("searchTitle");
let searchCategory = document.getElementById("searchCategory");
let mode = "create";
let tmp;
// get total
function total() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - discount.value;
    small.innerHTML = result;
    small.style.backgroundColor = "green";
  } else {
    small.innerHTML = "";
    small.style.backgroundColor = "#a00d02 ";
  }
}
// create product
let productsArray;
if (localStorage.product != null) {
  productsArray = JSON.parse(localStorage.product);
} else {
  productsArray = [];
}
submit.onclick = function () {
  let newProduct = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: small.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 100
  ) {
    if (mode === "create") {
      if (newProduct.count > 1) {
        for (let i = 0; i < newProduct.count; i++) {
          productsArray.push(newProduct);
        }
      } else {
        productsArray.push(newProduct);
      }
    } else {
      productsArray[tmp] = newProduct;
      mode = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
    clearData();
  }

  //   save into local storage
  localStorage.setItem("product", JSON.stringify(productsArray));
  showData();
};
// clear input
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  small.innerHTML = "";
  count.value = "";
  category.value = "";
}

function showData() {
  total();
  let table = "";
  for (let i = 0; i < productsArray.length; i++) {
    table += `
    <tr>
    <td>${i}</td>
    <td>${productsArray[i].title}</td>
    <td>${productsArray[i].price}</td>
    <td>${productsArray[i].taxes}</td>
    <td>${productsArray[i].ads}</td>
    <td>${productsArray[i].count}</td>
    <td>${productsArray[i].discount}</td>
    <td>${productsArray[i].total}</td>
    <td>${productsArray[i].category}</td>
    <td><button onclick = "update(${i})">Update</Button></td>
    <td><button onclick="deleteProduct(${i})">Delete</Button></td>
    `;
  }
  clearData();
  total();
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deletAll");
  if (productsArray.length > 0) {
    btnDelete.innerHTML = `<button onclick = "deleteAll()">Delete All</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showData();

// delete product
function deleteProduct(i) {
  productsArray.splice(i, 1);
  localStorage.product = JSON.stringify(productsArray);
  showData();
}

// delete all products
function deleteAll() {
  productsArray.splice(0, productsArray.length);
  localStorage.product = JSON.stringify(productsArray);
  showData();
}

// update
function update(i) {
  title.value = productsArray[i].title;
  price.value = productsArray[i].price;
  taxes.value = productsArray[i].taxes;
  ads.value = productsArray[i].ads;
  total();
  count.style.display = "none";
  discount.value = productsArray[i].discount;
  category.value = productsArray[i].category;
  submit.innerHTML = "Update";
  mode = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";
function getSearchMood(id) {
  let search = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  search.placeholder = "Search By " + searchMood;

  search.focus();
  search.value = "";
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < productsArray.length; i++) {
    if (searchMood == "title") {
      if (productsArray[i].title.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${productsArray[i].title}</td>
        <td>${productsArray[i].price}</td>
        <td>${productsArray[i].taxes}</td>
        <td>${productsArray[i].ads}</td>
        <td>${productsArray[i].count}</td>
        <td>${productsArray[i].discount}</td>
        <td>${productsArray[i].total}</td>
        <td>${productsArray[i].category}</td>
        <td><button onclick = "update(${i})">Update</Button></td>
        <td><button onclick="deleteProduct(${i})">Delete</Button></td>
        `;
      }
    } else {
      if (productsArray[i].category.includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${productsArray[i].title}</td>
        <td>${productsArray[i].price}</td>
        <td>${productsArray[i].taxes}</td>
        <td>${productsArray[i].ads}</td>
        <td>${productsArray[i].count}</td>
        <td>${productsArray[i].discount}</td>
        <td>${productsArray[i].total}</td>
        <td>${productsArray[i].category}</td>
        <td><button onclick = "update(${i})">Update</Button></td>
        <td><button onclick="deleteProduct(${i})">Delete</Button></td>
        `;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}

// clean data
