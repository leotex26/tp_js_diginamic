export function afficherTousLesLivres(bibliotheque, containerId, membre, supprimerCallback) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  console.log("la fonction afficherTousLesLivres demarre !!!");

  if (bibliotheque.length === 0) {
    container.textContent = "Aucun livre pour le moment.";
    return;
  }

  const ul = document.createElement("ul");

  bibliotheque.forEach((livre, index) => {
    const li = document.createElement("li");
    li.textContent = livre.afficherInfos();

    const boutonEmprunter = document.createElement("button");
    boutonEmprunter.textContent = "📚 Emprunter";
    boutonEmprunter.onclick = () => membre.emprunterLivre(livre);

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.textContent = "❌ Supprimer";
    boutonSupprimer.onclick = () => supprimerCallback(index);

    li.appendChild(boutonEmprunter);
    li.appendChild(boutonSupprimer);
    ul.appendChild(li);
  });

  container.appendChild(ul);
}
