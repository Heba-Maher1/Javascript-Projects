click.addEventListener("click", () => {
  color.innerHTML = Math.floor(Math.random() * 0xffffff).toString(16);
  color.innerHTML = `#${color.innerHTML.padStart(6, "0")}`;
  document.body.style.backgroundColor = color.innerHTML;
});
