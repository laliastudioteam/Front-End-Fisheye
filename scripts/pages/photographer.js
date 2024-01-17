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

function getUrlParamValue(paramName) {
	const currentUrl = window.document.location;
	let url = new URL(currentUrl);
	return (paramValue = url.searchParams.get(paramName));
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

 

	function clickonlike(id) {
		let likestorise = document.getElementById("likes-text-" + id);
		index = photographerMedia.findIndex(x => x.id === Number(id));
        photographerMedia[index]["likes"]++;
        likestorise.textContent=photographerMedia[index]["likes"];
        // Add 

	}



	let likeButton = document.querySelectorAll(".card-media__body__likes__icon");
	likeButton.forEach(heart => {
		heart.addEventListener("click", () => {
			clickonlike(heart.id.substring(11));
		});
	});
}

init();
