import { LivreNumerique } from "./classes/LivreNumerique.js";
import { LivrePapier } from "./classes/LivrePapier.js";

export function sauvegarderBibliotheque(bibliotheque) {
  const livresBruts = bibliotheque.map(livre => ({
    ...livre,
    type: livre instanceof LivreNumerique ? "numerique" : "papier"
  }));
  localStorage.setItem("librairie", JSON.stringify(livresBruts));
}

export function chargerBibliotheque() {
  const livresBruts = JSON.parse(localStorage.getItem("librairie") || "[]");
  return livresBruts.map(data => {
    if (data.type === "numerique") {
      return new LivreNumerique(data.titre, data.auteur, data.annee, data.tailleFichier);
    } else {
      return new LivrePapier(data.titre, data.auteur, data.annee, data.nombrePages);
    }
  });
}
