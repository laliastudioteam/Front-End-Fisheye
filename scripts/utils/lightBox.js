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