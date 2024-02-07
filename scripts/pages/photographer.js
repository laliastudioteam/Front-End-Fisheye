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
