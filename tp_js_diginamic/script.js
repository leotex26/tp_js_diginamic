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
        finito = choice(finito);
    }


}


function choice(finito) {
    let choix = prompt(
        "1 - Consulter vos listes de livres\n2 - Créer un livre\n3 - Afficher un livre par son titre\n4 - Supprimer un livre par son titre\n5 - Fermer"
    );

    switch (choix) {
        case "1":
            consulterListes();
            break;

        case "2":
            creerLivre();
            break;

        case "3":
            afficherLivreParSontTitre();
            break;

        case "4":
            supprimerLivreParSonTitre();
            break;

        case "5":
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


function consulterLivre(livre) {
    alert(
        `Titre : ${livre.titre}\nAuteur : ${livre.auteur}\nAnnée : ${livre.annee}`
    );
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

function afficherLivreParSontTitre() {
    let nomLivre = prompt("Entrez le nom du livre").trim().toLowerCase();
    let trouve = false;

    for (let genre in librairies) {
        for (let livre of librairies[genre]) {
            if (livre.titre.toLowerCase() === nomLivre) {
                consulterLivre(livre);
                trouve = true;
                break;
            }
        }
        if (trouve) break;
    }

    if (!trouve) {
        alert("Livre non trouvé !");
    }
}


function supprimerLivreParSonTitre() {
    let nomLivre = prompt("Entrez le nom du livre").trim().toLowerCase();
    let trouve = false;

    for (let genre in librairies) {
        let livres = librairies[genre];
        for (let i = 0; i < livres.length; i++) {
            if (livres[i].titre.toLowerCase() === nomLivre) {
                livres.splice(i, 1);  
                trouve = true;
                alert(`Livre supprimé de la catégorie ${genre}.`);
                break;
            }
        }
        if (trouve) break;
    }

    if (!trouve) {
        alert("Livre non trouvé !");
    }
}

