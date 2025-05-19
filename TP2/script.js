window.addEventListener("DOMContentLoaded", () => {
  const path = window.location.pathname;
  const searchInput = document.getElementById("search-input");

  //  Page principale (index.html)
  if (path.includes("index.html") || path === "/") {
    const afficherButton = document.getElementById("afficher-btn");
    if (afficherButton) {
      afficherButton.addEventListener("click", () => {
        afficherTousLesLivres("book-list");
      });
    }
  }

  //  Page formulaire (formulaire.html)
  if (path.includes("formulaire.html")) {
    const formulaire = document.getElementById("add-book-form");
    if (formulaire) {
      formulaire.addEventListener("submit", function (event) {
        event.preventDefault();
        const titre = document.getElementById("title").value.trim();
        if (titre) {
          ajouterLivre(titre, "Auteur inconnu", "2025");
          alert("Livre ajouté !");
          formulaire.reset();
        }
      });
    }
  }

  //  Page recherche (recherche.html)
  if (path.includes("recherche.html")) {
    const input = document.getElementById("search-input");
    if (input) {
      input.addEventListener("input", () => {
        const query = input.value.trim().toLowerCase();
        afficherResultatsRecherche(query, "results");
      });
    }
  }

    if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const query = event.target.value.trim().toLowerCase();
      afficherResultatsRecherche(query);
    });
    }


});



const librairie = [];

function ajouterLivre(titre, auteur, annee) {
  const livres = JSON.parse(localStorage.getItem("librairie") || "[]");
  livres.push({ titre, auteur, annee });
  localStorage.setItem("librairie", JSON.stringify(livres));
}

function supprimerLivre(index) {
  const livres = JSON.parse(localStorage.getItem("librairie") || "[]");
  livres.splice(index, 1); 
  localStorage.setItem("librairie", JSON.stringify(livres));
  afficherTousLesLivres(); 
}


function afficherTousLesLivres(containerId = 'book-list') {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const livres = JSON.parse(localStorage.getItem("librairie") || "[]");

  if (livres.length === 0) {
    container.textContent = "Aucun livre pour le moment.";
    return;
  }

  const ul = document.createElement('ul');

  livres.forEach((livre, index) => {
    const li = document.createElement('li');
    li.textContent = `"${livre.titre}" de ${livre.auteur} (${livre.annee})`;

    // Créer le bouton Supprimer
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = "❌ Supprimer";
    boutonSupprimer.style.marginLeft = "10px";
    boutonSupprimer.addEventListener("click", () => {
      supprimerLivre(index); // Passer l'index du livre à supprimer
    });

    li.appendChild(boutonSupprimer);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}



function afficherResultatsRecherche(query, containerId = 'results') {
  const livres = JSON.parse(localStorage.getItem("librairie") || "[]");
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  const matches = livres.filter(livre =>
    livre.titre.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    const noResult = document.createElement('p');
    noResult.textContent = "No results found";
    noResult.classList.add("no-results");
    container.appendChild(noResult);
    return;
  }

  const ul = document.createElement("ul");
  matches.forEach(livre => {
    const li = document.createElement("li");
    li.textContent = `"${livre.titre}" de ${livre.auteur} (${livre.annee})`;
    ul.appendChild(li);
  });

  container.appendChild(ul);
}

