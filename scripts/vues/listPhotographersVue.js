/**
 * Manages the display of photographers on the homepage.
 * Processes photographer data and renders artist cards.
 *
 * @class listPhotographersVue
 */
class listPhotographersVue {
    /**
     * Displays a list of photographers by creating and appending artist cards.
     *
     * @param {Array<Object>} photographers - Array of photographer objects.
     * @returns {void}
     */
    displayPhotographers(photographers) {
        photographers.forEach(photographer => this.createArtistCard(photographer));
    }

    /**
     * Creates and appends an artist card for a photographer.
     *
     * @param {Object} photographer - Photographer data object.
     * @param {number} photographer.id - Unique photographer ID.
     * @param {string} photographer.name - Photographer's name.
     * @param {string} photographer.portrait - Filename of the portrait image.
     * @param {string} photographer.city - Photographer's city.
     * @param {string} photographer.country - Photographer's country.
     * @param {string} photographer.tagline - Photographer's tagline.
     * @param {number} photographer.price - Photographer's daily rate in euros.
     * @returns {void}
     */
    createArtistCard(photographer) {
        const section = document.querySelector(".photographer_section");
        const urlAttribute = `photographer.html?id=${photographer.id}`;
        const pictureSrc = `./assets/photographers/${photographer.portrait}`;
        const artistCardHtml = `
            <div class="artistHero">
                <a href="${urlAttribute}">
                    <img src="${pictureSrc}" alt="">
                    <h2 class="name">${photographer.name}</h2>
                </a>
            </div>
            <div class="artistDetails">
                <p class="localisation">${photographer.city}, ${photographer.country}</p>
                <p class="tagline">${photographer.tagline}</p>
                <p class="pricing">${photographer.price}€/jour</p>
            </div>`;

        const artistCard = document.createElement("article");
        artistCard.innerHTML = artistCardHtml;
        section.appendChild(artistCard);
    }
}
