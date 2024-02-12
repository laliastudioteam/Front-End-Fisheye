// Fonction Lightbox
function lightboxSystem(media, id) {

	const lightbox = document.querySelector(".lightbox");
    const lightboxZoneImage = document.querySelector(".lightbox__zone-image");
	const lightboxImg = document.querySelector(".lightbox__zone-image__img");
	const lightboxLegend = document.querySelector(".lightbox__zone-image__legend");
	const lightboxVid = document.querySelector(".lightbox__zone-video__vid");
	const lightboxZoneVideo = document.querySelector(".lightbox__zone-video");
	const lightboxVidSource = document.querySelector(".lightbox__zone-video__vid__source");
	const lightboxVidLegend = document.querySelector(".lightbox__zone-video__legend");
	const lengthMedia = media.length;

	let indexMedia = media.findIndex(s => s.id === Number(id));

	changePictureVideo();

	function closeLightboxSystem() {
		const lightbox = document.querySelector(".lightbox");
		lightbox.style.display = "none";
	}

	function prevPicture() {

		indexMedia -= 1;
		if (indexMedia < 0) {
			indexMedia = lengthMedia - 1;
		}

		changePictureVideo();
	}

	function nextPicture() {
	
		indexMedia += 1;
		if (indexMedia >= lengthMedia) {
			indexMedia = 0;
		}
		changePictureVideo();
	}

	function changePictureVideo() {


		if (media[indexMedia].image === undefined) {
	
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
	const closeLightbox = document.querySelector(".lightbox__close__link");
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

