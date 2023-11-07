
const UrlAPIworks = "http://localhost:5678/api/works/";

const logo = document.querySelector("h1");
logo.addEventListener("click", function () {
  window.location.href = "index.html"; // redirige vers la page d'accueil
});

/* const reponse = await fetch(UrlAPIworks);//recuperer les informations de l'API
const works = await reponse.json(); // les informations récuperées sont stockées dans un Json */

const works = await fetch(UrlAPIworks).then((works) => works.json()); //Récupere les information de l'API/Works et les stocke dans un JSON

export function generergallery(works) { // la fonction est exporté pour être utilisé dans un autre fichier Javascript
  for (let i = 0; i < works.length; i++) { //pour chaque élément de works
    const item = works[i]; //cible l'élément en fonction de i

    const galleryContainer = document.querySelector(".gallery");
    // Créez un conteneur pour chaque élément
    const itemContainer = document.createElement("div");

    // Créez une image
    const imgElement = document.createElement("img");
    imgElement.src = item.imageUrl;
    // Créez un titre
    const titleElement = document.createElement("p");
    titleElement.textContent = item.title;

    // Ajoutez le titre et l'image au conteneur de l'élément

    itemContainer.appendChild(imgElement);
    itemContainer.appendChild(titleElement);

    // Ajoutez le conteneur de l'élément à la galerie
    galleryContainer.appendChild(itemContainer);
  }
}

generergallery(works); //appele la fonction pour afficher la galerie

//Boutons//
function desactiveboutons() {//fonction pour retirer la classe à tous les boutons
  boutontous.classList.remove("active");
  boutonobjets.classList.remove("active");
  boutonappartements.classList.remove("active");
  boutonhotels.classList.remove("active");
}


//Bouton afficher tous les travaux
const boutontous = document.querySelector(".btn-tous");

boutontous.addEventListener("click", function () { //ecoute l'evenement au clique sur le bouton "tous"
  document.querySelector(".gallery").innerHTML = ""; //efface le contenu HTML de la galerie
  generergallery(works); //appel à la fonction pour regenerer la galerie
  desactiveboutons();//appel à la fonction pour désastivé la classe active des boutons
  boutontous.classList.add("active");//ajoute la classe au bouton actif
});

// bouton filtre objets
const boutonobjets = document.querySelector(".btn-objets");

boutonobjets.addEventListener("click", function () {
  const worksFiltrees = works.filter(function (works) {
    return works.category.name === "Objets"; //si la catégorie est Objets
  });
  document.querySelector(".gallery").innerHTML = "";
  generergallery(worksFiltrees); //
  desactiveboutons();
  boutonobjets.classList.add("active");
});

//Bonton filtre Appartements
const boutonappartements = document.querySelector(".btn-appartements");

boutonappartements.addEventListener("click", function () {
  const worksFiltrees = works.filter(function (works) {
    return works.category.name === "Appartements"; //si la catégorie est appartements
  });
  document.querySelector(".gallery").innerHTML = "";
  generergallery(worksFiltrees);
  desactiveboutons();
  boutonappartements.classList.add("active");
});

// Bouton filtre Hotel et restraurants
const boutonhotels = document.querySelector(".btn-hotels");

boutonhotels.addEventListener("click", function () {
  const worksFiltrees = works.filter(function (works) {
    return works.category.name === "Hotels & restaurants"; //si la catégorie est Hotels & restaurants
  });
  document.querySelector(".gallery").innerHTML = "";
  generergallery(worksFiltrees);
  desactiveboutons();
  boutonhotels.classList.add("active");
});



// Vérifiez le localStorage pour le token d'authentification
const authToken = localStorage.getItem("authToken"); //récuperer le token depuis le localstorage
const loginbouton = document.getElementById("loginbutton"); // permet d'interagir avec le bouton login
if (authToken) {
  loginbouton.textContent = "Logout"; // remplace "login" par "logout" si l'utilisateur est connecté
  // Bouton pour se déconnecter
  loginbouton.addEventListener("click", function () {
    localStorage.removeItem("authToken"); //supprime le token du localstorage
    window.location.href = "login.html"; // redirige vers la page de connexion
  });
}

console.log(works)