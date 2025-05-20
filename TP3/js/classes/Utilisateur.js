export class Utilisateur {
  constructor(nom) {
    this.nom = nom;
    this.idUtilisateur = Date.now().toString();
  }

  voirProfil() {
    return `Nom: ${this.nom} (ID: ${this.idUtilisateur})`;
  }
}
