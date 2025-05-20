import { Membre } from "./classes/Membre.js";
import { Bibliothecaire } from "./classes/Bibliothecaire.js";
import { LivrePapier } from "./classes/LivrePapier.js";
import { LivreNumerique } from "./classes/LivreNumerique.js";
import { sauvegarderBibliotheque, chargerBibliotheque } from "./stockage.js";
import { afficherTousLesLivres } from "./gestionUI.js";

const bibliotheque = chargerBibliotheque();
const membre = new Membre("Blob");
const admin = new Bibliothecaire("OIM");


window.addEventListener("DOMContentLoaded", () => {

    const formulaire = document.getElementById("formAjoutLivre");

    

    if (formulaire) {
        

        const select = document.getElementById("typeLivre");
        const inputNum = document.getElementById("tailleFichier");
        const inputPhysic = document.getElementById("nombrePages");


        inputPhysic.style.display = "none";
        inputNum.style.display = "block";

        // TO DO pas super propre ^^^^^^

        select.addEventListener("change", event => {

            console.log(select.value); // Console : papier ou numerique
            
            if(select.value == "papier"){
                console.log("test"); // n'apparait pas dans la console
                inputNum.style.display = "none";
                inputPhysic.style.display = "block";
            }
            else if(select.value == "numerique"){
                inputPhysic.style.display = "none";
                inputNum.style.display = "block";
            }

        })

        formulaire.addEventListener("submit", e => {
            console.log("formulaire envoyé");
          e.preventDefault();
            const titre = document.getElementById("titre").value.trim();
            const auteur = document.getElementById("auteur").value.trim();
            const annee = parseInt(document.getElementById("annee").value);
            const type = document.getElementById("typeLivre").value;
            const tailleFichier = parseFloat(document.getElementById("tailleFichier").value);
            const nombrePages = parseInt(document.getElementById("nombrePages").value);

    
          let livre;
          if (type === "numerique") {
            livre = new LivreNumerique(titre, auteur, annee, tailleFichier);
          } else if (type === "papier") {
            livre = new LivrePapier(titre, auteur, annee, nombrePages);
          }
    
          admin.ajouterLivre(livre, bibliotheque);
          sauvegarderBibliotheque(bibliotheque);
          alert("Livre ajouté !");
          formulaire.reset();
        });
    
      }

});