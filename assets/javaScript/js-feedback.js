const stelle = document.querySelectorAll('.star');

stelle.forEach(function(stella, indice) {
    stella.addEventListener('click', function() {
        stelle.forEach(stella => stella.classList.remove('simplystar')); // Resetta tutte le stelle
        illuminaStelle(indice); // Illumina fino all'indice selezionato
    });
});

// Funzione per illuminare le stelle fino all'indice
function illuminaStelle(numero) {
    stelle.forEach(function(stella, indice) {
        if (indice <= numero) {
            stella.classList.add('simplystar');
        }
    });
}
