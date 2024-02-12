//Mettre le code JavaScript lié à la page photographer.html

// Declaration de la constante des données du photographe
let dataGlobalPhotographer = new Array();
let dataGlobalPhotographerMedia = new Array();
let indexMedia = 0;
const limitLikeVote = 1;

async function getPhotographers() {
	// GO Fetch real user data
	const reponse = await fetch("./data/photographers.json");
	const photographers = await reponse.json();

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

		photographerMediaFilter = sortMedia("popularite", photographerMediaFilter);

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

	photographerMediaSection.innerHTML = "";

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
		heart.addEventListener(
			"click",
			(f = () => {
				clickonlike(media, heart.id.substring(11));
			}),
			{once: true}
		);
	});
}

// Fonction d'initalisation des ecouteurs sur les images
function initLightboxSystem(media) {
	let imageToClick = document.querySelectorAll(".card-media__lien");

	imageToClick.forEach(image => {
		image.addEventListener("click", () => {
			lightboxSystem(media, image.id.substring(15));
		});
	});
}

const selectFilters = document.querySelectorAll(
	".accessibility-filter__choice-zone__form__list__option__input"
);
const buttonFilters = document.querySelector(".accessibility-filter__button");
const choiceZoneFilters = document.querySelector(
	".accessibility-filter__choice-zone"
);
const radioFilter = document.querySelector("input[name=filter]:checked");
const radioFilters = document.querySelectorAll(
	".accessibility-filter__choice-zone__form__list__option__input"
);

// Fonction d'initialisation des filtres
async function initFilters() {

	window.addEventListener('click', function(e){  

		if (document.querySelector(".accessibility-filter").contains(e.target)){

		} else{
		  document.querySelector(".accessibility-filter__button").classList.remove("button-open");
		  choiceZoneFilters.style.display = "none";
		}
	  });

	  // detection de la touche entrée de clavier
	document.addEventListener("keydown", function (e) {
		 if (e.keyCode === 13) {
		document.querySelector(".accessibility-filter__button").classList.remove("button-open");
			choiceZoneFilters.style.display = "none";
	}
	});
	buttonFilters.addEventListener("click", () => {

		if (choiceZoneFilters.style.display == "none") {
			choiceZoneFilters.style.display = "block";
			radioFilter.focus();
			document
				.querySelector(".accessibility-filter__button")
				.classList.add("button-open");
		
		} else {
			document.querySelector(".accessibility-filter__button").classList.remove("button-open");
			choiceZoneFilters.style.display = "none";
		}
	});

	const getSelectedValue = e => {

		sortMedia(e.target.id, dataGlobalPhotographerMedia);

		displayMedia(dataGlobalPhotographerMedia);

		initLikeSystem(dataGlobalPhotographerMedia);

		updateAllLikes(dataGlobalPhotographerMedia);

		initLightboxSystem(dataGlobalPhotographerMedia);
	};

	selectFilters.forEach(selectFilter => {
		selectFilter.addEventListener("change", getSelectedValue);
	
	});
}

// Tri par filtre
function sortMedia(type, arrayData) {
	switch (type) {
		case "popularite":
			buttonFilters.textContent = "Popularité";
			arrayData.sort(function (a, b) {
				return parseFloat(a.likes) - parseFloat(b.likes);
			});
			return arrayData;
			break;
		case "date":
			buttonFilters.textContent = "Date";
			arrayData.sort(function (a, b) {
				return a.date.localeCompare(b.date);
			});
			return arrayData;
			break;
		case "titre":
			buttonFilters.textContent = "Titre";
			arrayData.sort(function (a, b) {
				return a.title.localeCompare(b.title);
			});
			return arrayData;
			break;
		default:
			console.log(`Aucun classement reconnu`);
	}
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
