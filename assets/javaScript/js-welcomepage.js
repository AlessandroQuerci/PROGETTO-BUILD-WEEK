document.getElementById("boxcheck").addEventListener("change", function () {
  const btn = document.getElementById("btnWelcomePage");
  if (this.checked) {
    btn.removeAttribute("disabled");
  } else {
    btn.setAttribute("disabled", "disabled");
  }
});
