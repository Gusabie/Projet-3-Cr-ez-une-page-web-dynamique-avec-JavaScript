import { generergallery } from "/script.js";
//Ajout de la barre "Mode édition" en tête de page
const UrlAPIworks = "http://localhost:5678/api/works/"; // variable contenant l'adresse de l'api
const UrlAPIcategory = "http://localhost:5678/api/categories"; //variable contenant l'adresse de l'api des catégories
const works = await fetch(UrlAPIworks).then((works) => works.json()); //Récupere les information de l'API/Works et les stocke dans un JSON
const authToken = localStorage.getItem("authToken"); //récuperer le token depuis le localstorage

if (authToken) {
  //si connecté

  let divedition = document.createElement("div"); //crée une div

  divedition.classList.add("mode-edition"); // ajouter une class à la div créée

  const lienedition = document.createElement("a"); //creer une balise lien
  const iconeedition = document.createElement("img"); //creer une balise image
  const textedition = document.createElement("p"); //creer une balise paragraphe

  lienedition.href = "#modal"; // cible du lien
  lienedition.classList.add("modal-trigger"); // ajout de la classe modal-trigger
  iconeedition.src = "assets/icons/edition.png"; //importer l'image
  textedition.textContent = "Mode édition"; // ajouter un texte

  lienedition.appendChild(iconeedition); //placer l'image dans le lien
  lienedition.appendChild(textedition); // placer le texte dans le lien

  divedition.appendChild(lienedition); // placer le lien dans la div

  let body = document.querySelector(".div-edit"); //cibler la balise qui acceuillera les balises créees
  body.appendChild(divedition); // placer les nouvelles balises

  let filtres = document.querySelector(".filtre"); //cibler les filtres
  filtres.style.display = "none"; //desactiver ses affichages

  const lienmodifier = document.createElement("a");
  const iconemodifier = document.createElement("img");
  const textmodifier = document.createElement("p");
  const divmodifier = document.querySelector(".projet");
  divmodifier.classList.add("modifier");

  lienmodifier.href = "#modal";
  lienmodifier.classList.add("modifier");
  lienmodifier.classList.add("modal-trigger");
  iconemodifier.src = "assets/icons/modifier.png";
  textmodifier.textContent = "modifier";
  lienmodifier.appendChild(iconemodifier);
  lienmodifier.appendChild(textmodifier);
  divmodifier.appendChild(lienmodifier);
}

// Création des fichier HTML pour la modale

const modalcontainer = document.createElement("div"); //Creation de la modal
modalcontainer.id = "modal"; //ajout de l'id "modal"
modalcontainer.classList.add("modal-container"); //ajout de la classe"modal-container"
document.body.appendChild(modalcontainer); //Placer la modal dans le body

let overlaymodal = document.createElement("div"); // Creation de la div "overlay"
overlaymodal.classList.add("overlay"); //ajout de la classe "overlay"
overlaymodal.classList.add("modal-trigger"); //ajout de la classe "modal-trigger"
modalcontainer.appendChild(overlaymodal); //Placer la div dans la modal

let galmodal = document.createElement("div"); //creation de la div qui accueillera la gallerie
galmodal.classList.add("galmodal"); //ajout de la classe "galmodal"
modalcontainer.appendChild(galmodal); //Placer la gallerie dans la modal

let modal = document.createElement("div"); //creation d'une div qui accueil tout les elements de la modal
modal.classList.add("modal"); //ajout de la class "modal"
galmodal.appendChild(modal); //Placer la div dans la modal "gallerie"

let closemodal = document.createElement("img"); //creation de la balise image pour l'icone "close-modal"
closemodal.src = "assets/icons/closemodal.png"; // ajout de l'image
closemodal.classList.add("close-modal"); //ajout de la classe "close-modal"
closemodal.classList.add("modal-trigger"); //ajout de la classe "modal-trigger"
modal.appendChild(closemodal); //Placer l'image dans la balise "modal"

let titremodale = document.createElement("h3"); //creation de la balise titre "Galerie photo"
titremodale.textContent = "Galerie photo"; //Ajout du texte dans la balise
modal.appendChild(titremodale); //Placer le titre dans la balise "modal"

let galleryModale = document.createElement("div"); //div qui accueil la gallerie dans la modal
galleryModale.classList.add("gallerymodale"); // ajout de la classe"gallerymodale"
modal.appendChild(galleryModale); //placer la gallerie dans la balise "modal"

let inputmodale = document.createElement("input"); //creation de la balise input
inputmodale.type = "submit"; //ajout du type d'input
inputmodale.value = "Ajouter une photo"; //ajout du texte de la balise
inputmodale.classList.add("ajout-btn"); //ajout de la class "ajout-btn"
modal.appendChild(inputmodale); //placer l'input dans la balise "modal"

//fonction qui affiche la gallerie dans la modale

function generergallerymodal(works) {
  //appel des informations de works
  for (let i = 0; i < works.length; i++) {
    const item = works[i]; //recupere chaque element de works

    const galleryContainer = document.querySelector(".gallerymodale"); //Selectionner les balises ayant la classe "gallerymodale"
    const itemContainer = document.createElement("div"); //creer un conteneur qui accueillera chaque element de l'api
    itemContainer.dataset.id = item.id; //Octroie l'id de chaque element à la div qui l'accueil

    const imgElement = document.createElement("img"); // Créez une image pour chaque element
    imgElement.src = item.imageUrl; //recupere les images de chaque element
    itemContainer.appendChild(imgElement); // Ajoutez l'image au conteneur de l'élément

    galleryContainer.appendChild(itemContainer); // Ajoute le conteneur de l'élément à la galerie

    const deleteimg = document.createElement("img"); //creer la balise qui accueillera l'icone de suppression

    //Supprimer un element

    deleteimg.classList.add("delete-icon"); //ajout de la classe"delete-icon" à l'image
    deleteimg.src = "assets/icons/delete.png"; //chemin de l'icone de suppression
    // Ajoute l'image et l'icône de suppression à l'élément de galerie
    itemContainer.appendChild(deleteimg);

    deleteimg.addEventListener("click", async (event) => {
      // agit au clique
      const projet = event.target.parentElement; //event qui cible l'element parent de l'icone (la div qui contient l'image de la gallerie)
      const id = projet.dataset.id; // cible l'id de l'element parent de l'icone

      // Requête DELETE à l'API pour supprimer l'élément
      try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
          //cible les elements de l'api Works en fonction de leur ID
          method: "DELETE", //permet de supprimer un element de l'api
          headers: {
            Authorization: `Bearer ${authToken}`, //autorisation d'utiliser la method DELETE
          },
        });

        if (response.ok) {
          console.log(`Élément avec l'ID ${id} supprimé avec succès.`); //affiche le resultat dans la console si la requete réussit
          projet.remove(); // Supprimez l'élément de la galerie ciblé

          const Updategallery = await fetch(UrlAPIworks).then((response) =>
            response.json()
          ); //nouvelle requette pour mettre la gallerie à jour
          document.querySelector(".gallery").innerHTML = ""; //nettoie la galerie
          generergallery(Updategallery); //regenere la gallerie avec les nouveaux elements
        } else {
          console.error(
            `Échec de la suppression de l'élément avec l'ID ${id}.`
          ); //affiche le resultat dans la console si la requete echoue
        }
      } catch (error) {
        //attrape l'erreur
        console.error(
          "Une erreur s'est produite lors de la suppression de l'élément : ",
          error
        ); //affiche l'erreur si le "try" echoue
      }
    });
  }
}

generergallerymodal(works); //appel de la fonction pour afficher la galerie dans la modale

//Ajouter un projet

let formmodal = document.createElement("div"); //ajout de la div de la modal
formmodal.classList.add("form-modal");
modalcontainer.appendChild(formmodal);

let Ajoutphotoform = document.createElement("div"); //ajout de la div qui accueil tous les elements
Ajoutphotoform.classList.add("form-photo");
formmodal.appendChild(Ajoutphotoform);

let returnmodal = document.createElement("img"); //ajout de l'icon de retour
returnmodal.src = "assets/icons/returnmodal.png";
returnmodal.classList.add("return-modal");
Ajoutphotoform.appendChild(returnmodal);

let closemodalphoto = document.createElement("img"); //ajout de l'icone de fermeture
closemodalphoto.src = "assets/icons/closemodal.png";
closemodalphoto.classList.add("close-modal");
closemodalphoto.classList.add("modal-trigger");
Ajoutphotoform.appendChild(closemodalphoto);

let titreformmodale = document.createElement("h3"); //ajout du titre
titreformmodale.textContent = "Ajout Photo";
Ajoutphotoform.appendChild(titreformmodale);

let Ajoutphoto = document.createElement("form"); //ajout du formulaire
Ajoutphoto.id = "ajout-photo";
Ajoutphoto.innerHTML = `

<div class="AddImg">
<img src="assets/icons/image.png" alt="logo image" class="logoimage">

<label for=imageUrl> <span class="ajout"> + Ajouter photo</span> </label>

<p><span class="textajout">jpg, png : 4mo max</span></p>

</div>
<label class="Customfile">
<input type="file" name="imageUrl" id="imageUrl" accept="image/*" required>
</label>
<img id="imagePreview" src="#" alt="Image Preview">
<br>

<label for="title">Titre</label>
<br>
<input type="text" name="title" id="title" required>
<br>

<label for="Catégorie">Catégorie</label>
<br>
<select name="Categorie" id="Catégorie" required>
<option value="" selected></option>
</select>
`;
Ajoutphotoform.appendChild(Ajoutphoto);

const selectElement = document.getElementById("Catégorie"); //afficher les catégories dans le menu deroulant
fetch(UrlAPIcategory) //appel de l'api recuperer l'ensemble des catégories
  .then((response) => response.json())
  .then((category) => {
    for (let i = 0; i < category.length; i++) {
      const item = category[i]; //pour chaque categorie
      const option = document.createElement("option"); //ajouter une balise option
      option.value = item.id; //recupere l'id de chaque element
      option.textContent = item.name; // recupere le nom de chaque element
      selectElement.appendChild(option); //envoie les balises options vers la balise Select
    }
  });
{
}

let inputvalider = document.createElement("input"); //creer un input pour envoyer le formulaire
inputvalider.type = "submit"; // ajout du type d'input
inputvalider.value = "Valider"; // valeur de l'input
inputvalider.classList.add("valider-btn"); // ajout de la classe"valider-btn"
Ajoutphotoform.appendChild(inputvalider); //envoie de l'input dans le formulaire

//Afficher le formulaire au clique sur le bouton "Ajouter une photo"

function afficherformulaire() {
  const modalgallery = document.querySelector(".galmodal"); //selectionne la modale gallerie
  const modalform = document.querySelector(".form-modal"); //selectionne la modale formulaire

  if (modalgallery.classList.contains("active")) {
    //si la modale gallerie est active
    galmodal.classList.remove("active"); //desactive la modale gallerie
    modalform.classList.toggle("active"); // active la modale formulaire
  }
}

const ajoutphoto = document.querySelector(".ajout-btn"); //selectionne le bouton ajoutphoto
ajoutphoto.addEventListener("click", afficherformulaire); // permet d'afficher le formulaire et de désactiver la gallerie dans la modale au clique sur le bouton

// retour modal au clique sur la fleche

function Retourmodal() {
  const modalgallery = document.querySelector(".galmodal"); //selectionne la modale gallerie
  const modalform = document.querySelector(".form-modal"); //selectionne la modale formulaire

  if (modalform.classList.contains("active")) {
    //si la modale formulaire est active
    modalform.classList.remove("active"); // desactiver la modale formulaire
    modalgallery.classList.toggle("active"); //activer la modale galerie
  }
}

const boutonreturnmodal = document.querySelector(".return-modal"); //selectionne le bouton retour
boutonreturnmodal.addEventListener("click", Retourmodal); //appel la fonction Retourmodal au clique sur le bouton retour

//fonctionnement de la modale
//bouton pour afficher
const modalContainer = document.querySelector(".modal-container"); //Selectionne l'ensemble de la modale
const modalTriggers = document.querySelectorAll(".modal-trigger"); //Selectionne les elements avec la classe modal-trigger (closemodal, bouton et overlay)

for (let i = 0; i < modalTriggers.length; i++) {
  //pour chaque element ayant la classe "modalTriggers"
  modalTriggers[i].addEventListener("click", toggleModal); //appel de la fonction "toggleModal" au clique.
}

function toggleModal() {
  modalContainer.classList.toggle("active"); //active le conteneur des modales
  if (!galmodal.classList.contains("active")) {
    //si galmodal n'est pas active
    galmodal.classList.toggle("active"); //l'activer
  } else {
    //sinon
    formmodal.classList.remove("active"); //desactiver la modale formulaire
  }
  if (!modalContainer.classList.contains("active")) {
    //si le conteneur des modales n'est pas actif
    formmodal.classList.remove("active"); //desactiver la modale formulaire
    galmodal.classList.remove("active"); //désactiver la modale gallerie
  }
}

//Récuperer les informations du formulaire
const formulaireajout = document.getElementById("ajout-photo"); //selection du formulaire
const valider = document.querySelector(".valider-btn"); // selection du bouton "Valider"

valider.addEventListener("click", async function (e) {
  //ecoute d'evenement au click sur le bouton "valider"
  e.preventDefault();
  //Recupere les valeurs du formulaire
  const imageUrl = document.getElementById("imageUrl").files[0];
  const title = document.getElementById("title").value; //recupere la valeur entrée dans le champ titre
  const categorie = document.getElementById("Catégorie").value; //recupere la valeur entrée dans le champ Catégorie

  //stocker les données du formulaire
  const formData = new FormData(); //création d'un nouvelle objet
  formData.append("image", imageUrl); //ajoute les données dans imageUrl
  formData.append("title", title); //ajoute la valeur de title dans title
  formData.append("category", categorie); //ajoute la valeur de categorie dans category
  //Envoyer les données vers l'API
  try {
    const response = await fetch(UrlAPIworks, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.ok) {
      // Traitez la réponse de l'API
      alert("Données envoyées avec succès !");

      const Updategallery = await fetch(UrlAPIworks).then((response) =>
        response.json()
      ); //nouvelle requette pour mettre la gallerie à jour
      document.querySelector(".gallery").innerHTML = ""; //nettoie la galerie
      generergallery(Updategallery); //regenere la gallerie avec les nouveaux elements
      toggleModal(); //ferme la modale
      const Updategallerymodal = await fetch(UrlAPIworks).then((response) =>
        response.json()
      ); //nouvelle requette pour mettre la gallerie à jour
      document.querySelector(".gallerymodale").innerHTML = ""; //nettoie la galerie
      generergallerymodal(Updategallerymodal); //met à jour la gallerie de la modale
    } else {
      alert("Erreur lors de l'envoi des données : " + error);
    }
  } catch (error) {
    console.error("Erreur lors de l'envoi des données : " + error);
    alert("Erreur lors de l'envoi des données, remplissez tous les champs.");
  }
});

//griser le bouton quand le formulaire n'est pas rempli et l'activer quand il est rempli
valider.setAttribute("disabled", true); //desactive le bouton
function FormValide() {
  const imageUrl = document.getElementById("imageUrl").files[0];
  const title = document.getElementById("title").value;
  const categorie = document.getElementById("Catégorie").value;

  // Vérifiez si toutes les valeurs nécessaires sont remplies
  return imageUrl && title && categorie;
}

// Écoutez les modifications du formulaire
formulaireajout.addEventListener("input", function () {
  if (FormValide()) {
    valider.removeAttribute("disabled"); // Activez le bouton
  } else {
    valider.setAttribute("disabled", true); // Désactivez le bouton
  }
});

//aperçu de l'image selectionné
const inputImage = document.getElementById("imageUrl"); //selectionne l'input du fichier
const imagePreview = document.getElementById("imagePreview"); //selectionne l'image ajouté
const addImg = document.querySelector(".AddImg"); //selectionne la balise du fond de l'input

inputImage.addEventListener("change", function () {
  if (inputImage.files && inputImage.files[0]) {
    const reader = new FileReader(); //creer un objet FileReader (l'image ajouté)
    reader.onload = function (e) {
      //gerer l'evenement de chargement
      imagePreview.src = e.target.result; //Defini la source de l'aperçu de l'image
      imagePreview.style.display = "block"; //active l'affichage de l'image en changeant le display
      addImg.classList.add("hide-addimg"); // cacher le fond de l'input
    };
    reader.readAsDataURL(inputImage.files[0]); //lit le fichier en tant que URL
  } else {
    addImg.classList.remove("hide-addimg"); //reactive le fond de l'input
    imagePreview.style.display = "none"; //désactive l'aperçu de l'image
  }
});
