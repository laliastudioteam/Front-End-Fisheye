//Mettre le code JavaScript lié à la page photographer.html

// Declaration de la constante des données du photographe
let dataGlobalPhotographer = new Array();
let dataGlobalPhotographerMedia = new Array();
let indexMedia = 0;

async function getPhotographers() {
	// GO Fetch real user data
	const reponse = await fetch("./data/photographers.json");
	const photographers = await reponse.json();
	//console.log(photographers);

	return photographers;
}

async function getPhotographerData(idPhotographer, photographerArray, type) {
	if (type == "photographer") {
		let photographerFilter = photographerArray.filter(
			s => s.id === Number(idPhotographer)
		);
		return photographerFilter;
	} else {
		let photographerMediaFilter = photographerArray.filter(
			s => s.photographerId === Number(idPhotographer)
		);
		//console.log("media non classé :" + photographerMediaFilter);
		photographerMediaFilter = sortMedia("popularite", photographerMediaFilter);
		//console.log("test"+photographerMediaFilter);
		return photographerMediaFilter;
	}
}

async function displayData(photographerData) {
	const photographerSection = document.querySelector(".photograph-header");
	const photographerModel = photographerUniqtemplate(photographerData);
	const userHeaderDOM = photographerModel.getUserHeaderDOM();
	photographerSection.appendChild(userHeaderDOM);
}

async function displayMedia(mediaData) {
	let photographerMediaSection = document.querySelector(".photograph-media");
	console.log("recreation de la zone media");
	photographerMediaSection.innerHTML = "";
	//console.log("avec ces donnees classees"+mediaData);
	mediaData.forEach(mediaData => {
		const photographerMediaModel = photographerMediatemplate(mediaData);
		const userMediaDOM = photographerMediaModel.getUserMediaDOM();
		photographerMediaSection.appendChild(userMediaDOM);
		void photographerMediaSection.offsetWidth;
	});
}

// Fonction de recuperation du parametre d'identification
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

// Fonction d'initalisation des ecouteurs sur les images
function initLightboxSystem(media) {
	let imageToClick = document.querySelectorAll(".card-media__lien");
	//console.log(imageToClick);
	imageToClick.forEach(image => {
		console.log(imageToClick.id);
		image.addEventListener("click", () => {
			lightboxSystem(media, image.id.substring(15));
		});
	});
}

// Fonction d'initialisation des filtres
async function initFilters() {
	//console.log("données data : "+dataGlobalPhotographerMedia);
	const selectFilters = document.querySelectorAll(".selectFilterOption");

	const getSelectedValue = e => {
		//console.log(e.target.id);

		sortMedia(e.target.id, dataGlobalPhotographerMedia);

		displayMedia(dataGlobalPhotographerMedia);

		initLikeSystem(dataGlobalPhotographerMedia);

		updateAllLikes(dataGlobalPhotographerMedia);

		initLightboxSystem(dataGlobalPhotographerMedia);
	};

	selectFilters.forEach(selectFilter => {
		selectFilter.addEventListener("change", getSelectedValue);
	});

	console.log("Ecouteurs filtres ok");
}
// Modal Button
const modalButton = document.querySelector(".contact_button");

modalButton.addEventListener("click", function (event) {
	console.log("YOU CLICKED IT");
	event.preventDefault();
	submitForm();
});

function submitForm() {
	const forenameInput = document.getElementById("forename");
	const lastnameInput = document.getElementById("lastname");
	const emailInput = document.getElementById("email");
	const messageInput = document.getElementById("message");
let errorsForm=0;

// Fix error Variables
const minFirst = 2;
const minLast = 2;
const checkById = [];

// Empty error content
const errorAlerts = {
	first: [
		"Le prénom contient des chiffres ou compte moins de " + minFirst+ " lettres",
		checkFirst,
	],
	last: [
		"Le nom contient des chiffres ou compte moins de " + minLast + " lettres",
		checkLast,
	],
	email: ["L'email est de forme invalide", checkEmail],
	message: ["Le message est vide", checkMessage],

};





}

// Tri par filtre
function sortMedia(type, arrayData) {
	switch (type) {
		case "popularite":
			console.log("classement par popularité");
			arrayData.sort(function (a, b) {
				return parseFloat(a.likes) - parseFloat(b.likes);
			});
			return arrayData;
			break;
		case "date":
			console.log("Classement par date");
			arrayData.sort(function (a, b) {
				return a.date.localeCompare(b.date);
			});
			return arrayData;
			break;
		case "titre":
			console.log("classement par titre");
			arrayData.sort(function (a, b) {
				return a.title.localeCompare(b.title);
			});
			return arrayData;
			break;
		default:
			console.log(`Aucun classement reconnu`);
	}
}

// Fonction Lightbox
function lightboxSystem(media, id) {
	console.log("Lancement de la lightbox");
	const lightbox = document.querySelector(".lightbox");
	const lightboxImg = document.querySelector(".lightbox-img");
	const lightboxLegend = document.getElementById("legendPicture");
	const lightboxVid = document.querySelector(".lightbox-vid");
	const lightboxZoneVideo = document.querySelector(".lightbox-zone-video");
	const lightboxVidSource = document.querySelector(".ligthbox-vid-source");
	const lightboxVidLegend = document.getElementById("legendVideo");
	const lightboxZoneImage = document.querySelector(".lightbox-zone-image");
	const lengthMedia = media.length;
	//console.log(lengthMedia);
	let indexMedia = media.findIndex(s => s.id === Number(id));
	//console.log("Index actuel : " + indexMedia);
	//let mediaSelected = mediaList.filter(s => s.id === Number(id));
	changePictureVideo();

	//console.log(mediaSelected);

	function closeLightboxSystem() {
		const lightbox = document.querySelector(".lightbox");
		lightbox.style.display = "none";
	}

	function prevPicture() {
		console.log("prev");
		indexMedia -= 1;
		if (indexMedia < 0) {
			indexMedia = lengthMedia - 1;
		}

		changePictureVideo();
	}

	function nextPicture() {
		console.log("next");
		indexMedia += 1;
		if (indexMedia >= lengthMedia) {
			indexMedia = 0;
		}
		changePictureVideo();
	}

	function changePictureVideo() {
		console.log("change image");

		if (media[indexMedia].image === undefined) {
			console.log("video");
			lightbox.style.display = "block";
			lightboxZoneImage.style.display = "none";
			lightboxZoneVideo.style.display = "flex";
			lightboxVidLegend.style.display = "block";
			lightboxLegend.style.display = "none";
			lightboxVidLegend.textContent = media[indexMedia].title;
			lightboxVidSource.setAttribute(
				"src",
				"assets/medias/" +
					media[indexMedia].photographerId +
					"/" +
					media[indexMedia].video
			);
			lightboxVidSource.setAttribute("alt", media[indexMedia].title);
			lightboxVid.load();
			lightboxVid.play();
		} else {
			console.log("image");
			lightbox.style.display = "block";
			lightboxZoneVideo.style.display = "none";
			lightboxZoneImage.style.display = "flex";
			lightboxVidLegend.style.display = "none";
			lightboxLegend.style.display = "block";
			lightboxLegend.textContent = media[indexMedia].title;
			lightboxImg.classList.remove("animation-fadeOut");
			lightboxImg.classList.remove("animation-fadeIn");

			lightboxImg.classList.add("animation-fadeOut");
			void lightboxImg.offsetWidth;
			console.log("fadeOut");
			lightboxImg.setAttribute(
				"src",
				"assets/medias/" +
					media[indexMedia].photographerId +
					"/" +
					media[indexMedia].image
			);
			lightboxImg.setAttribute("alt", media[indexMedia].title);
			lightboxImg.classList.remove("animation-fadeOut");
			lightboxImg.classList.add("animation-fadeIn");
			void lightboxImg.offsetWidth;
		}
	}

	// detection des touches de clavier
	document.addEventListener("keydown", function (e) {
		if (e.keyCode === 37) {
			prevPicture();
		} else if (e.keyCode === 39) {
			nextPicture();
		} else if (e.keyCode === 27) {
			closeLightboxSystem();
		}
	});

	// Init close system
	const closeLightbox = document.querySelector(".lightbox-close-link");
	closeLightbox.addEventListener("click", () => {
		closeLightboxSystem();
	});

	const prevLightbox = document.getElementById("prevPicture");
	prevLightbox.addEventListener("click", () => {
		prevPicture();
	});

	const nextLightbox = document.getElementById("nextPicture");
	nextLightbox.addEventListener("click", () => {
		nextPicture();
	});
}

// Function de mise a jour des clicks
function clickonlike(photographerMedia, id) {
	let likestorise = document.getElementById("likes-text-" + id);
	let likesicontorise = document.getElementById("likes-icon-" + id);
	let alllikesicon = document.querySelector(".container-price__like__icon");
	index = photographerMedia.findIndex(x => x.id === Number(id));
	photographerMedia[index]["likes"]++;
	likestorise.textContent = photographerMedia[index]["likes"];
	likesicontorise.classList.remove("card-media__body__likes__icon__animation");
	void likesicontorise.offsetWidth;
	likesicontorise.classList.add("card-media__body__likes__icon__animation");
	alllikesicon.classList.remove("container-price__like__icon__animation");
	void alllikesicon.offsetWidth;
	alllikesicon.classList.add("container-price__like__icon__animation");

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
	dataGlobalPhotographer = await getPhotographerData(
		getUrlParamValue(idPhotographerParam),
		photographers,
		"photographer"
	);

	// Media du photographe
	dataGlobalPhotographerMedia = await getPhotographerData(
		getUrlParamValue(idPhotographerParam),
		media,
		"media"
	);

	displayData(dataGlobalPhotographer);

	displayMedia(dataGlobalPhotographerMedia);

	updatePrice(dataGlobalPhotographer);

	initLikeSystem(dataGlobalPhotographerMedia);

	updateAllLikes(dataGlobalPhotographerMedia);

	initLightboxSystem(dataGlobalPhotographerMedia);

	await initFilters();
}

init();
