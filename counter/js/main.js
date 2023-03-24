let count = 0;

let number = document.querySelector("#number");
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    if (e.currentTarget.classList.contains("decrease")) {
      count--;
    } else if (e.currentTarget.classList.contains("reset")) {
      count = "0";
    } else {
      count++;
    }
    if (count > 0) {
      number.style.color = "green";
    } else if (count == 0) {
      number.style.color = "#8f59c5";
    } else {
      number.style.color = "red";
    }
    number.innerHTML = count;
  });
});
