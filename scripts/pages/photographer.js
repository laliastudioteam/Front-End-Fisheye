//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
	// GO Fetch real user data
	const reponse = await fetch("./data/photographers.json");
	const photographers = await reponse.json();
	console.log(photographers);
	return photographers;
}

async function getPhotographerData(idPhotographer, photographerArray, type) {
	if (type == "photographer") {
		return photographerArray.filter(s => s.id === Number(idPhotographer));
	} else {
		return photographerArray.filter(
			s => s.photographerId === Number(idPhotographer)
		);
	}
}

async function displayData(photographerData) {
	const photographerSection = document.querySelector(".photograph-header");
	const photographerModel = photographerUniqtemplate(photographerData);
	const userHeaderDOM = photographerModel.getUserHeaderDOM();
	photographerSection.appendChild(userHeaderDOM);
}

async function displayMedia(mediaData) {
	const photographerMediaSection = document.querySelector(".photograph-media");
	mediaData.forEach(mediaData => {
		const photographerMediaModel = photographerMediatemplate(mediaData);
		const userMediaDOM = photographerMediaModel.getUserMediaDOM();
		photographerMediaSection.appendChild(userMediaDOM);
	});
}

// Focntion de recuperationdu parametre d'identification
function getUrlParamValue(paramName) {
	const currentUrl = window.document.location;
	let url = new URL(currentUrl);
	return (paramValue = url.searchParams.get(paramName));
}

// Function d'initalisation des ecouteurs sur les likes
function initLikeSystem(media) {
	let likeButton = document.querySelectorAll(".card-media__body__likes__icon");
	likeButton.forEach(heart => {
		heart.addEventListener("click", () => {
			clickonlike(media, heart.id.substring(11));
		});
	});
}

// Function d'initalisation des ecouteurs sur les images
function initLightboxSystem(media) {
	let imageToClick = document.querySelectorAll(".card-media__lien");
	imageToClick.forEach(image => {
		image.addEventListener("click", () => {
           lightboxSystem(media, image.id.substring(11));
		});
	});

    // Init close system
    const closeLightbox = document.querySelector(".lightbox-close-link");
   
    closeLightbox.addEventListener("click",() => {closeLightboxSystem();});
}

// Fonction Lightbox
function lightboxSystem(media){
    console.log("Lancement de la lightbox");
	const lightbox = document.querySelector(".lightbox");
    lightbox.style.display="block";
}

function closeLightboxSystem(){

	const lightbox = document.querySelector(".lightbox");
    lightbox.style.display="none";
}

// Function de mise a jour des clicks
function clickonlike(photographerMedia, id) {
	let likestorise = document.getElementById("likes-text-" + id);
	index = photographerMedia.findIndex(x => x.id === Number(id));
	photographerMedia[index]["likes"]++;
	likestorise.textContent = photographerMedia[index]["likes"];
	updateAllLikes(photographerMedia);
}

// Function de mise a jour du total des clicks
function updateAllLikes(medias) {
	let allLikes = 0;
	medias.forEach(media => {
		allLikes += media["likes"];
	});
	let totalLikes = document.querySelector(".container-price__like__text");
	totalLikes.textContent = allLikes;
}

function updatePrice(data) {
	let priceBottom = document.querySelector(".container-price__price");
	priceBottom.textContent = data[0]["price"] + "€/jour";
}


async function init() {
	// Récuperer la valeur de l'ID du protographe
	const idPhotographerParam = "id";

	// Récupère les datas du photographe
	const {photographers, media} = await getPhotographers();

	// Données du photographe
	const photographerData = await getPhotographerData(
		getUrlParamValue(idPhotographerParam),
		photographers,
		"photographer"
	);

	// Media du photographe
	const photographerMedia = await getPhotographerData(
		getUrlParamValue(idPhotographerParam),
		media,
		"media"
	);

	displayData(photographerData);

	displayMedia(photographerMedia);

	updatePrice(photographerData);

	initLikeSystem(photographerMedia);

	updateAllLikes(photographerMedia);

    initLightboxSystem(photographerMedia);
}

init();
