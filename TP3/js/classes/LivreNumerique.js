import { Livre } from "./Livre.js";


export class LivreNumerique extends Livre {
  constructor(titre, auteur, annee, tailleFichier) {
    super(titre, auteur, annee);
    this.tailleFichier = tailleFichier; // en Mo
  }

  afficherInfos() {
    return `${super.afficherInfos()} - Numérique (${this.tailleFichier} Mo)`;
  }
}
