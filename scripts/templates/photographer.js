function photographerTemplate(data) {
	const {name, portrait, city, country, tagline, price, id} = data;

	const picture = `assets/photographers/${portrait}`;

	function getUserCardDOM() {
		const article = document.createElement("article");
		article.classList.add("photograph-article");
		const lien = document.createElement("a");
		lien.setAttribute("href", "./photographer.html?id=" + id);
		lien.classList.add("photograph-article__link");
		const img = document.createElement("img");
		img.classList.add("photograph-article__img");
		img.setAttribute("src", picture);
		img.setAttribute("alt", "Photo de "+name);
		const h2 = document.createElement("h2");
		h2.classList.add("photograph-article__title");
		h2.textContent = name;
		const geographicZone = document.createElement("span");
		geographicZone.classList.add("photograph-article__geographic");
		geographicZone.textContent = city + " , " + country;
		const taglineZone = document.createElement("p");
		taglineZone.textContent = tagline;
		taglineZone.classList.add("photograph-article__tagline");
		const priceZone = document.createElement("span");
		priceZone.textContent = price + "€/jour";
		priceZone.classList.add("photograph-article__price");
		article.appendChild(lien);
		lien.appendChild(img);
		lien.appendChild(h2);
		article.appendChild(geographicZone);
		article.appendChild(taglineZone);
		article.appendChild(priceZone);
		return article;
	}
	return {name, picture, getUserCardDOM};
}

function photographerUniqtemplate(data) {
	const {name, portrait, city, country, tagline, price, id} = data[0];

	const picture = `assets/photographers/${portrait}`;

	const modalPicture=document.querySelector(".modal__picture");
	modalPicture.setAttribute("src",picture);
	modalPicture.setAttribute("alt", name);

	function getUserHeaderDOM() {
		const containerHeader = document.createElement("div");
		containerHeader.classList.add("container-header");
		const divText = document.createElement("div");
		divText.classList.add("group-photographinfos");
		const h2 = document.createElement("h1");
		h2.textContent = name;
		const geographicZone = document.createElement("span");
		geographicZone.classList.add("geographic");
		geographicZone.textContent = city + " , " + country;
		const taglineZone = document.createElement("p");
		taglineZone.textContent = tagline;
		taglineZone.classList.add("tagline");
		containerHeader.appendChild(divText);
		divText.appendChild(h2);
		divText.appendChild(geographicZone);
		divText.appendChild(taglineZone);

		const divButton = document.createElement("div");
		const buttonModal = document.createElement("button");
		buttonModal.classList.add("contact_button");
		buttonModal.innerText = "Contactez-moi";
		buttonModal.addEventListener("click", displayModal);

		divButton.appendChild(buttonModal);
		containerHeader.appendChild(divButton);

		const divPicture = document.createElement("div");

		const picturePortrait = document.createElement("img");
		picturePortrait.setAttribute("src", picture);

		picturePortrait.setAttribute("alt", name);

		containerHeader.appendChild(divPicture);
		divPicture.appendChild(picturePortrait);

		return containerHeader;
	}
	return {name, picture, getUserHeaderDOM};
}

function photographerMediatemplate(data) {
	const {date, id, photographerId, title, image, likes, price, video} = data;

	const picture = `assets/medias/${photographerId}/${image}`;

	function getUserMediaDOM() {
		const cardPhotograph = document.createElement("div");
		cardPhotograph.classList.add("card-media");
		cardPhotograph.style.animationDelay = Math.floor(Math.random() * 1000)+"ms";
		const lienCardPhotographer = document.createElement("a");
		lienCardPhotographer.setAttribute("href", "#");
		lienCardPhotographer.setAttribute("id", "card-media-img-" + id);
		lienCardPhotographer.classList.add("card-media__lien");
		lienCardPhotographer.setAttribute("aria-label","Voir le media "+ title);
		const cardPhotographHeader = document.createElement("div");
		cardPhotographHeader.classList.add("card-media__header");
		const cardPhotographBody = document.createElement("div");
		cardPhotographBody.classList.add("card-media__body");
		const cardPhotographLegend = document.createElement("div");
		cardPhotographLegend.classList.add("card-media__body__legend");
		cardPhotographLegend.textContent = title;
		const cardPhotographDate = document.createElement("div");
		cardPhotographDate.classList.add("card-media__body__date");
		cardPhotographDate.textContent = date;
		const cardPhotographLikes = document.createElement("div");
		cardPhotographLikes.classList.add("card-media__body__likes");
		const cardphotographLikesText = document.createElement("div");
		cardphotographLikesText.classList.add("card-media__body__likes__text");
		cardphotographLikesText.setAttribute("id", "likes-text-" + id);
		cardphotographLikesText.textContent = likes;
		const cardphotographLikesIcon = document.createElement("div");
		cardphotographLikesIcon.classList.add("card-media__body__likes__icon");
		cardphotographLikesIcon.setAttribute("id", "likes-icon-" + id);
		cardphotographLikesIcon.classList.add("fa-solid");
		cardphotographLikesIcon.classList.add("fa-heart");
		cardphotographLikesIcon.setAttribute("id", "likes-icon-" + id);
		cardphotographLikesIcon.setAttribute("aria-label", "Liker");
		cardPhotograph.appendChild(lienCardPhotographer);
		lienCardPhotographer.appendChild(cardPhotographHeader);
		if (image === undefined) {
			const videoHeader = document.createElement("video");
			videoHeader.setAttribute("tabIndex", 0);
			videoHeader.setAttribute("alt", title);
			videoHeader.setAttribute("aria-label", title);
			videoHeader.setAttribute(
				"src",
				"assets/medias/" +
				photographerId +
					"/" +
					video
			);
			videoHeader.load();
			cardPhotographHeader.appendChild(videoHeader);
		} else {
			const imageHeader = document.createElement("img");
			imageHeader.setAttribute("tabindex", 0);
			imageHeader.setAttribute("alt", title);
			imageHeader.setAttribute("aria-label", title);
			imageHeader.setAttribute("src", picture);
			cardPhotographHeader.appendChild(imageHeader);
		}
		cardPhotograph.appendChild(cardPhotographBody);
		cardPhotographBody.appendChild(cardPhotographLegend);
		cardPhotographBody.appendChild(cardPhotographDate);
		cardPhotographBody.appendChild(cardPhotographLikes);
		cardPhotographLikes.appendChild(cardphotographLikesText);
		cardPhotographLikes.appendChild(cardphotographLikesIcon);

		return cardPhotograph;
	}
	return {title, getUserMediaDOM};
}
