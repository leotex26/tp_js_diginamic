// Charger les membres existants depuis localStorage (ou en dur)
const membresParDefaut = ["Blob", "Alice"];
let membres = JSON.parse(localStorage.getItem("membres")) || membresParDefaut;

const selectMembre = document.getElementById("membre-select");
const inputNouveau = document.getElementById("nouveau-membre");

membres.forEach(nom => {
  const option = document.createElement("option");
  option.value = nom;
  option.textContent = nom;
  selectMembre.insertBefore(option, selectMembre.lastElementChild); 
});


selectMembre.addEventListener("change", () => {
  if (selectMembre.value === "__nouveau__") {
    inputNouveau.style.display = "block";
  } else {
    inputNouveau.style.display = "none";
  }
});

document.getElementById("valider").addEventListener("click", () => {
  let membre;

  if (selectMembre.value === "__nouveau__") {
    const nom = inputNouveau.value.trim();
    if (!nom) {
      alert("Veuillez entrer un nom.");
      return;
    }
    membre = nom;

    // Ajouter et sauvegarder si le nom n'existe pas déjà
    if (!membres.includes(nom)) {
      membres.push(nom);
      localStorage.setItem("membres", JSON.stringify(membres));
    }

  } else {
    membre = selectMembre.value;
  }

  const biblio = document.getElementById("biblio-select").value;

  // Redirige vers index avec le membre sélectionné
  window.location.href = `accueil.html?membre=${membre}&biblio=${biblio}`;
});