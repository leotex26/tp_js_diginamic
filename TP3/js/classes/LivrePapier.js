import { Livre } from "./Livre.js";


export class LivrePapier extends Livre {
  constructor(titre, auteur, annee, nombrePages) {
    super(titre, auteur, annee);
    this.nombrePages = nombrePages;
  }

  afficherInfos() {
    return `${super.afficherInfos()} - Papier (${this.nombrePages} pages)`;
  }
}
