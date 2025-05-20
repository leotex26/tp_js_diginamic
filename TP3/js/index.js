const membresParDefaut = ["Blob", "Alice"];


const membres = JSON.parse(localStorage.getItem("membres")) || ["Blob"];
const biblios = JSON.parse(localStorage.getItem("bibliothecaires")) || ["OIM"];

const membreSelect = document.getElementById("membre-select");
const biblioSelect = document.getElementById("biblio-select");
const inputNouveauMembre = document.getElementById("nouveau-membre");
const inputNouveauBiblio = document.getElementById("nouveau-biblio");

// Injecter les options
function remplirSelect(select, liste, dernierOption) {
  liste.forEach(nom => {
    const option = document.createElement("option");
    option.value = nom;
    option.textContent = nom;
    select.insertBefore(option, dernierOption);
  });
}

remplirSelect(membreSelect, membres, membreSelect.lastElementChild);
remplirSelect(biblioSelect, biblios, biblioSelect.lastElementChild);

// Affichage des champs "nouveau"
membreSelect.addEventListener("change", () => {
  inputNouveauMembre.style.display = membreSelect.value === "__nouveau__" ? "block" : "none";
});

biblioSelect.addEventListener("change", () => {
  inputNouveauBiblio.style.display = biblioSelect.value === "__nouveau__" ? "block" : "none";
});

document.getElementById("valider").addEventListener("click", () => {
  let membre = membreSelect.value;
  let biblio = biblioSelect.value;

  if (membre && biblio) {
    alert("Veuillez choisir soit un membre soit un bibliothécaire, pas les deux.");
    membreSelect.value = "";
    biblioSelect.value = "";
    return;
  }

  if (!membre && !biblio) {
    alert("Veuillez choisir un utilisateur.");
    membreSelect.value = "";
    biblioSelect.value = "";
    return;
  }

  if (membre === "__nouveau__") {
    const nom = inputNouveauMembre.value.trim();
    if (!nom) return alert("Entrez un nom pour le membre.");
    membre = nom;
    if (!membres.includes(nom)) {
      membres.push(nom);
      localStorage.setItem("membres", JSON.stringify(membres));
    }
  }

  if (biblio === "__nouveau__") {
    const nom = inputNouveauBiblio.value.trim();
    if (!nom) return alert("Entrez un nom pour le bibliothécaire.");
    biblio = nom;
    if (!biblios.includes(nom)) {
      biblios.push(nom);
      localStorage.setItem("bibliothecaires", JSON.stringify(biblios));
    }
  }

  const userType = membre ? "membre" : "biblio";
  const nom = membre || biblio;

  // Redirection avec infos dans l’URL
  window.location.href = `accueil.html?type=${userType}&nom=${encodeURIComponent(nom)}`;
});
