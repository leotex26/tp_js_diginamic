import { sauvegarderBibliotheque, chargerBibliotheque } from "./stockage.js";


const bibliotheque = chargerBibliotheque();

window.addEventListener("DOMContentLoaded", () => {

    
    const input = document.getElementById("search-input");
    input.addEventListener("input", () => {
      const query = input.value.trim().toLowerCase();
      console.log(query);
      afficherResultatsRecherche(query);
    });

    }

);


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
  const a = document.createElement("a");

  // Trouver l'index réel du livre dans la bibliothèque
  const indexDansBiblio = bibliotheque.findIndex(l => 
    l.titre === livre.titre && l.auteur === livre.auteur
  );

  a.href = `livre.html?id=${indexDansBiblio}`;
  a.textContent = livre.titre;

  li.appendChild(a);
  ul.appendChild(li);
});


  container.appendChild(ul);
}