import { LivrePapier } from "./classes/LivrePapier.js";
import { LivreNumerique } from "./classes/LivreNumerique.js";
import { sauvegarderBibliotheque, chargerBibliotheque } from "./stockage.js";
import { afficherTousLesLivres } from "./gestionUI.js";
import { Membre } from "./classes/Membre.js";
import { Bibliothecaire } from "./classes/Bibliothecaire.js";





const bibliotheque = chargerBibliotheque();

const params = new URLSearchParams(window.location.search);
const nomMembre = params.get("membre") || "Blob";
const nomBiblio = params.get("biblio") || "OIM";

const membre = new Membre(nomMembre);
const admin = new Bibliothecaire(nomBiblio);

window.addEventListener("DOMContentLoaded", () => {
    let boutonDisplayBook = document.getElementById("afficher-btn");
    
    boutonDisplayBook.addEventListener("click", () => {
        
        //console.log("clic");
        console.log(bibliotheque);
        afficherTousLesLivres(bibliotheque, "book-list", membre, supprimerLivre);
    });
});


function supprimerLivre(index) {
  bibliotheque.splice(index, 1);
  sauvegarderBibliotheque(bibliotheque);
  afficherTousLesLivres(bibliotheque, "book-list", membre, supprimerLivre);
}