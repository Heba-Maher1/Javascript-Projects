let click = document.querySelector("#click");
let color = document.querySelector("#color");
let hex = document.querySelector("#hex");
let simple = document.querySelector("#simple");

const colors = ["green", "red", "rgba(133 , 122 , 200)", "#f15025"];

click.addEventListener("click", () => {
  let randomNum = getRandomNumber();
  color.innerHTML = colors[randomNum];
  document.body.style.backgroundColor = colors[randomNum];
  getRandomNumber();
});

function getRandomNumber() {
  return Math.floor(Math.random() * colors.length);
}
