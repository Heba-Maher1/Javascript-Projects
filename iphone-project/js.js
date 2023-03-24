let mainImage = document.querySelector(".mainImage");
let container = document.querySelector(".container");

function changePhone(phone) {
  mainImage.src = phone;
}
function changeColor(color) {
  container.style.backgroundColor = color;
}
