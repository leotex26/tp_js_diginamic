export class Livre {
  constructor(titre, auteur, annee) {
    this.titre = titre;
    this.auteur = auteur;
    this.annee = annee;
    this.id = Date.now().toString(); // ID unique
  }

  afficherInfos() {
    return `${this.titre} par ${this.auteur} (${this.annee})`;
  }
}
