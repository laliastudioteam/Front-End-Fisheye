function photographerTemplate(data) {
    console.log(data);
    const { name, portrait, city, country , tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;
    console.log(picture);

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const geographicZone = document.createElement( 'span' );
        geographicZone.classList.add("geographic");
        geographicZone.textContent = city + " , " + country;
        const taglineZone = document.createElement( 'p' );
        taglineZone.textContent = tagline;
        taglineZone.classList.add("tagline");
        const priceZone = document.createElement( 'span' );
        priceZone.textContent = price+"€/jour";
        priceZone.classList.add("price");
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(geographicZone);
        article.appendChild(taglineZone);
        article.appendChild(priceZone);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}