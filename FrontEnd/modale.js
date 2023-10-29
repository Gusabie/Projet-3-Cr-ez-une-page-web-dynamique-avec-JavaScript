
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

  let filtres=document.querySelector(".filtre") //cibler les filtres
  filtres.style.display = "none"; //desactiver ses affichages

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

let galmodal = document.createElement("div");
galmodal.classList.add("galmodal");
modalcontainer.appendChild(galmodal);

let modal = document.createElement("div");
modal.classList.add("modal");
galmodal.appendChild(modal);

let closemodal = document.createElement("img");
closemodal.src = "assets/icons/closemodal.png";
closemodal.classList.add("close-modal");
closemodal.classList.add("modal-trigger");
modal.appendChild(closemodal);

let titremodale = document.createElement("h3");
titremodale.textContent = "Galerie photo";
modal.appendChild(titremodale);

let galleryModale = document.createElement("div")
galleryModale.classList.add("gallerymodale")
modal.appendChild(galleryModale);

let inputmodale = document.createElement("input")
inputmodale.type ="submit";
inputmodale.value = "Ajouter une photo";
inputmodale.classList.add("ajout-btn");
modal.appendChild(inputmodale);




const UrlAPIworks = "http://localhost:5678/api/works/";
const works = await fetch(UrlAPIworks).then((works) => works.json()); //Récupere les information de l'API/Works et les stocke dans un JSON

function generergallerymodal(works) {
  for (let i = 0; i < works.length; i++) {
    const item = works[i];

    const galleryContainer = document.querySelector(".gallerymodale");
    // Créez un conteneur pour chaque élément
    const itemContainer = document.createElement("div");

    // Créez une image
    const imgElement = document.createElement("img");
    imgElement.src = item.imageUrl;
 
    // Ajoutez l'image au conteneur de l'élément

    itemContainer.appendChild(imgElement);

    // Ajoutez le conteneur de l'élément à la galerie
    galleryContainer.appendChild(itemContainer);

    const deleteimg = document.createElement('img'); //creer la balise qui accueillera l'icone de suppression
    

    deleteimg.classList.add("delete-icon");
    deleteimg.src ="assets/icons/delete.png";
        // Ajoutez l'image et l'icône de suppression à l'élément de galerie
        itemContainer.appendChild(deleteimg);

  }
}

generergallerymodal(works); 


//Ajouter un projet

let formmodal = document.createElement("div");
formmodal.classList.add("form-modal");
modalcontainer.appendChild(formmodal);

let Ajoutphotoform = document.createElement("div");
Ajoutphotoform.classList.add("form-photo");
formmodal.appendChild(Ajoutphotoform);

let returnmodal = document.createElement("img");
returnmodal.src = "assets/icons/returnmodal.png";
returnmodal.classList.add("return-modal");
Ajoutphotoform.appendChild(returnmodal);

let closemodalphoto = document.createElement("img");
closemodalphoto.src = "assets/icons/closemodal.png";
closemodalphoto.classList.add("close-modal");
closemodalphoto.classList.add("modal-trigger");
Ajoutphotoform.appendChild(closemodalphoto);

let titreformmodale = document.createElement("h3");
titreformmodale.textContent = "Ajout Photo";
Ajoutphotoform.appendChild(titreformmodale);

let Ajoutphoto = document.createElement("form");
Ajoutphoto.id = "ajout-photo"
Ajoutphoto.innerHTML = `
<input type="file" name="imageUrl" id="imageUrl" required>
<br>

<label for="title">Titre</label>
<br>
<input type="text" name="title" id="title" required>
<br>

<label for="Catégorie">Catégorie</label>
<br>
<select name="Categorie" id="Catégorie" required>
<option value="Objets" selected>Objets</option>
<option value="Appartements" >Appartements</option>
<option value="Hotels & Restaurant" >Hotels & Restaurant</option>
</select>
`
Ajoutphotoform.appendChild(Ajoutphoto);

let inputvalider = document.createElement("input")
inputvalider.type ="submit";
inputvalider.value = "Valider";
inputvalider.classList.add("valider-btn");
Ajoutphotoform.appendChild(inputvalider);

//Afficher le formulaire au clique surle bouton "Ajouter une photo"

function afficherformulaire() {
    const modalgallery = document.querySelector(".galmodal");
    const modalform = document.querySelector(".form-modal");

    if (modalgallery.classList.contains("active")) {
      galmodal.classList.remove("active");
      modalform.classList.toggle("active");
    }
}

const ajoutphoto = document.querySelector(".ajout-btn");
ajoutphoto.addEventListener("click", afficherformulaire)

// retour modal au clique sur la fleche

function Retourmodal() {
  const modalgallery = document.querySelector(".galmodal");
  const modalform = document.querySelector(".form-modal");

  if (modalform.classList.contains("active")) {
    modalform.classList.remove("active")
    modalgallery.classList.toggle("active")
  }
}

const boutonreturnmodal = document.querySelector(".return-modal");
boutonreturnmodal.addEventListener("click", Retourmodal)


//fonctionnement de la modale
//bouton pour afficher
const modalContainer = document.querySelector(".modal-container"); //Selectionne l'ensemble de la modale
const modalTriggers = document.querySelectorAll(".modal-trigger"); //Selectionne les elements avec la classe modal-trigger (closemodal, bouton et overlay)


for (let i = 0; i < modalTriggers.length; i++) {
    modalTriggers[i].addEventListener("click", toggleModal);
} 

function toggleModal(){
    modalContainer.classList.toggle("active");
    if (!galmodal.classList.contains("active")){
    galmodal.classList.toggle("active");
    } else {
      formmodal.classList.remove("active");
    }
    if (!modalContainer.classList.contains("active")){
      formmodal.classList.remove("active");
      galmodal.classList.remove("active")
    }
}