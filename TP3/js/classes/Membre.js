import { Utilisateur } from "./Utilisateur.js"


export class Membre extends Utilisateur {
  constructor(nom) {
    super(nom);
    this.livresEmpruntes = [];
  }

  emprunterLivre(livre) {
    this.livresEmpruntes.push(livre);
    alert(`${this.nom} a emprunté "${livre.titre}"`);
  }
}
