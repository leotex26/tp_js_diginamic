window.onload = function() {
    init();

    
};

var librairies = {
    horreur : [],
    polar : [],
};


function init(){

    var finito = false;

    alert("Bienvenu dans votre bibliothèque !!!")
    while(!finito){
        choice(finito);
    }


}


function choice(finito) {
    let choix = prompt(
        "1 - Consulter vos listes de livres\n2 - Créer un livre\n3 - Fermer"
    );

    switch (choix) {
        case "1":
            consulterListes();
            break;

        case "2":
            creerLivre();
            break;

        case "3":
            finito = true;
            break;

        default:
            alert("Désolé, je n'ai pas compris. Veuillez reformuler.");
            break;
    }

    return finito;
}

function consulterListes() {
    let message = "Vos listes de livres :\n\n";

    for (let genre in librairies) {
        message += `--- ${genre.toUpperCase()} ---\n`;
        if (librairies[genre].length === 0) {
            message += "Aucun livre dans cette catégorie.\n";
        } else {
            librairies[genre].forEach((livre, index) => {
                message += `${index + 1}. "${livre.titre}" de ${livre.auteur} (${livre.annee})\n`;
            });
        }
        message += "\n";
    }

    alert(message);
}


function creerLivre() {
    let genre = prompt("Choisissez un genre pour votre livre : "+ enumGenre()).toLowerCase();

    if (!librairies.hasOwnProperty(genre)) {
        alert("Genre non reconnu. Veuillez choisir : "+ enumGenre());
        return;
    }

    let titre = prompt("Entrez le titre du livre :");
    if (!titre) {
        alert("Titre invalide.");
        return;
    }

    let auteur = prompt("Entrez l'auteur du livre :");
    if (!auteur) {
        alert("Auteur invalide.");
        return;
    }

    let annee = prompt("Entrez l'année de publication :");
    if (!annee || isNaN(annee)) {
        alert("Année invalide.");
        return;
    }

    let livre = {
        titre: titre,
        auteur: auteur,
        annee: annee,
    };

    librairies[genre].push(livre);
    alert(`Livre ajouté à la catégorie ${genre}.`);
}


function enumGenre(){

return Object.keys(librairies).join(", ");

}