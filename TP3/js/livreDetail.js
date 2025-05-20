import { chargerBibliotheque } from "./stockage.js";


const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const bibliotheque = chargerBibliotheque();
const livre = bibliotheque[id];
const commentairesPage = {id, commentaires : []}; // TO DO


window.addEventListener("DOMContentLoaded", () => {

    

if (livre) {
  const container = document.getElementById("livre-details");

  const titre = document.createElement("h2");
  titre.textContent = livre.titre;

  const auteur = document.createElement("p");
  auteur.textContent = "Auteur : " + livre.auteur;

  const annee = document.createElement("p");
  annee.textContent = "Année : " + livre.annee;

  const type = document.createElement("p");
  type.textContent = "Type : " + livre.type;

  const areaCommentaire = document.createElement("textarea");
  areaCommentaire.placeholder = "Laissez un commentaire";
  areaCommentaire.rows = 4;
  areaCommentaire.cols = 40;




  container.append(titre, auteur, annee, type, areaCommentaire);


   // recuperation des commentaires depuis le localStorage

    const commentaires = recupererCommentaire(id); // tableau
  
    commentaires.forEach(element => {

        const paragrapheCom = document.createElement("p"); // creation de l'element
        paragrapheCom.textContent = element;
        paragrapheCom.style.fontStyle = "italic";
        container.append(paragrapheCom); // met dans la page
    });


   // ** j'ai répété le meme code ailleur TO DO**



      areaCommentaire.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        const contenuCommentaire = areaCommentaire.value.trim();
        if (contenuCommentaire !== "") {
          enregistrerCommentaire(contenuCommentaire);
          areaCommentaire.value = ""; 
        }
      }
    });

} else {
  document.getElementById("livre-details").textContent = "Livre introuvable.";
}



});


function enregistrerCommentaire(texte) {
  console.log("enregistrerCommentaire démarre avec le commentaire :", texte);
// affichage
  const com = document.createElement("p");
  com.style.fontStyle = "italic";
  com.textContent = texte; 

  
  const comContainer = document.getElementById("commentaires");
  comContainer.appendChild(com);

  // enregistrement
  commentairesPage.commentaires.push(texte);


  localStorage.setItem("commentaires_" + commentairesPage.id, JSON.stringify(commentairesPage.commentaires));


}


function recupererCommentaire(id) {
  const commentairesJson = localStorage.getItem("commentaires_" + id);
  return commentairesJson ? JSON.parse(commentairesJson) : [];
}
