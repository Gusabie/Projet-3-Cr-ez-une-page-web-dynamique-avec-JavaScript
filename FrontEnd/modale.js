//Ajout de la barre "Mode édition" en tête de page

const authToken = localStorage.getItem("authToken"); //récuperer le token depuis le localstorage
if (authToken) {
  //si connecté

  let divedition = document.createElement("div"); //crée une div

  divedition.classList.add("mode-edition"); // ajouter une class à la div créée

  const lienedition = document.createElement("a"); //creer une balise lien
  const iconeedition = document.createElement("img"); //creer une balise image
  const textedition = document.createElement("p") //creer une balise paragraphe
  
  lienedition.href = "#modal" // cible du lien
  lienedition.classList.add("modal-trigger");// ajout de la classe modal-trigger
  iconeedition.src = "assets/icons/edition.png"; //importer l'image
  textedition.textContent = "Mode édition"; // ajouter un texte
  
  lienedition.appendChild(iconeedition); //placer l'image dans le lien
  lienedition.appendChild(textedition); // placer le texte dans le lien


  divedition.appendChild(lienedition); // placer le lien dans la div

  let body = document.querySelector(".div-edit"); //cibler la balise qui acceuillera les balises créees
  body.appendChild(divedition); // placer les nouvelles balises

}

// Création des fichier HTML pour la modale

const modalcontainer = document.createElement("div");
modalcontainer.id = "modal";
modalcontainer.classList.add("modal-container");
document.body.appendChild(modalcontainer);

let overlaymodal = document.createElement("div");
overlaymodal.classList.add("overlay");
overlaymodal.classList.add("modal-trigger");
modalcontainer.appendChild(overlaymodal);

let modal = document.createElement("div");
modal.classList.add("modal");
modalcontainer.appendChild(modal);

let closemodal = document.createElement("button");
closemodal.classList.add("close-modal");
closemodal.classList.add("modal-trigger");
closemodal.textContent = "X";
modal.appendChild(closemodal);

let titremodale = document.createElement("h2");
titremodale.textContent = "Galerie photo";
modal.appendChild(titremodale);


//fonctionnement de la modale
//bouton pour afficher
const modalContainer = document.querySelector(".modal-container"); //Selectionne l'ensemble de la modale
const modalTriggers = document.querySelectorAll(".modal-trigger"); //Selectionne les elements avec la classe modal-trigger (closemodal, bouton et overlay)


for (let i = 0; i < modalTriggers.length; i++) {
    modalTriggers[i].addEventListener("click", toggleModal);
} 

function toggleModal(){
    modalContainer.classList.toggle("active")
}