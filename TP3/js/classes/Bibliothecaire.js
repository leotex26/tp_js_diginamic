import { Utilisateur } from "./Utilisateur.js"



export class Bibliothecaire extends Utilisateur {
  ajouterLivre(livre, bibliotheque) {
    bibliotheque.push(livre);
    alert(`Livre "${livre.titre}" ajouté à la bibliothèque.`);
  }
}
