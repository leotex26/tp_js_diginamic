import { Membre } from "./classes/Membre.js";
import { Bibliothecaire } from "./classes/Bibliothecaire.js";
import { LivrePapier } from "./classes/LivrePapier.js";
import { LivreNumerique } from "./classes/LivreNumerique.js";
import { sauvegarderBibliotheque, chargerBibliotheque } from "./stockage.js";
import { afficherTousLesLivres } from "./gestionUI.js";

const bibliotheque = chargerBibliotheque();
const admin = new Bibliothecaire("OIM");
const membre = new Membre("Blob");

window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;

  console.log("ça demarre !");

  if (path.includes("index.html") || path === "/") {
    const afficherButton = document.getElementById("afficher-btn");
    if (afficherButton) {
      afficherButton.addEventListener("click", () => {
        afficherTousLesLivres(bibliotheque, "book-list", membre, supprimerLivre);
      });
    }
  }

  if (path.includes("formulaire.html")) {
    const formulaire = document.getElementById("add-book-form");

if (formulaire) {
    
    console.log("formulaire détécté");
    formulaire.addEventListener("submit", e => {
      e.preventDefault();
      const titre = document.getElementById("title").value.trim();
      const auteur = document.getElementById("author").value.trim();
      const annee = parseInt(document.getElementById("year").value);
      const type = document.getElementById("book-type").value;
      const tailleFichier = parseFloat(document.getElementById("file-size").value);
      const nombrePages = parseInt(document.getElementById("page-count").value);

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

  if (path.includes("recherche.html")) {
    const input = document.getElementById("search-input");
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      afficherResultatsRecherche(query);
    });
  }
};

function supprimerLivre(index) {
  bibliotheque.splice(index, 1);
  sauvegarderBibliotheque(bibliotheque);
  afficherTousLesLivres(bibliotheque, "book-list", membre, supprimerLivre);
}


function afficherResultatsRecherche(query) {
  const container = document.getElementById("results");
  container.innerHTML = "";

  const results = bibliotheque.filter(livre =>
    livre.titre.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Aucun résultat trouvé";
    container.appendChild(p);
    return;
  }

  const ul = document.createElement("ul");
  results.forEach(livre => {
    const li = document.createElement("li");
    li.textContent = livre.afficherInfos();
    ul.appendChild(li);
  });

  container.appendChild(ul);
}
});
