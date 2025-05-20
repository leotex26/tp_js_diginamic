
import { LivrePapier } from "./classes/LivrePapier.js";
import { LivreNumerique } from "./classes/LivreNumerique.js";
import { sauvegarderBibliotheque, chargerBibliotheque } from "./stockage.js";
import { afficherTousLesLivres } from "./gestionUI.js";
import { Membre } from "./classes/Membre.js";
import { Bibliothecaire } from "./classes/Bibliothecaire.js";





const bibliotheque = chargerBibliotheque();
const membre = new Membre("Blob");

window.addEventListener("DOMContentLoaded", () => {
    let boutonDisplayBook = document.getElementById("afficher-btn");
    
    boutonDisplayBook.addEventListener("click", () => {
        
        //console.log("clic");
        console.log(bibliotheque);
        afficherTousLesLivres(bibliotheque, "afficher-btn", membre, supprimerLivre);
    });
});


function supprimerLivre(index) {
  bibliotheque.splice(index, 1);
  sauvegarderBibliotheque(bibliotheque);
  afficherTousLesLivres(bibliotheque, "book-list", membre, supprimerLivre);
}