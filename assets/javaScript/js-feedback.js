const stelle = document.querySelectorAll(".star");

stelle.forEach((stella, indice) => {
  stella.addEventListener("click", function () {
    stelle.forEach((stella) => stella.classList.remove("simplystar"));

    illuminaStelle(indice);
  });
});

function illuminaStelle(numero) {
  stelle.forEach((stella, indice) => {
    if (indice <= numero) {
      stella.classList.add("simplystar");
    }
  });
}
