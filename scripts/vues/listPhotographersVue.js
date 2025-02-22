/**
 * Handles the display of photographers on the homepage.
 *
 * @class listPhotographersVue
 * @method displayPhotographers - Processes and renders photographer data as artist cards.
 * @method createArtistCard - Creates and appends an artist card to the DOM.
 */
class listPhotographersVue {
    /**
     * Displays a list of photographers by creating and appending artist cards to the DOM.
     *
     * @param {Array<Object>} photographers - An array of photographer objects.
     * @returns {void}
     */
    displayPhotographers(photographers) {
        for (let i = 0; i < photographers.length; i++) {
            this.createArtistCard(photographers[i]);
        }
    }

    /**
     * Creates and appends an artist card to the photographer section of the DOM.
     *
     * @param {Object} photographers - An object containing data about a photographer.
     * @param {number} photographers.id - The unique identifier for the photographer.
     * @param {string} photographers.name - The name of the photographer.
     * @param {string} photographers.portrait - The file name of the photographer's portrait image.
     * @param {string} photographers.city - The city where the photographer is located.
     * @param {string} photographers.country - The country where the photographer is located.
     * @param {string} photographers.tagline - The photographer's tagline or description.
     * @param {number} photographers.price - The photographer's daily pricing in euros.
     * @returns {void}
     */
    createArtistCard(photographers) {
        // Mapping DOM
        const section = document.querySelector(".photographer_section");

        // Generating photographer details
        const urlAttribute = `photographer.html?id=${photographers.id}`;
        const pictureSrc = `./assets/photographers/${photographers.portrait}`;
        const name = photographers.name;
        const localisation = `${photographers.city}, ${photographers.country}`;
        const tagline = photographers.tagline;
        const pricing = `${photographers.price}€/jour`;

        // Creating artist card HTML
        const artistCardHtml = `
            <div class="artistHero">
                <a href="${urlAttribute}">
                    <img src="${pictureSrc}" alt="Portrait de ${name}">
                    <h2 class="name">${name}</h2>
                </a>
            </div>
            <div class="artistDetails">
                <p class="localisation">${localisation}</p>
                <p class="tagline">${tagline}</p>
                <p class="pricing">${pricing}</p>
            </div>`;

        // Creating artist card element
        const artistCard = document.createElement("article");
        artistCard.innerHTML = artistCardHtml;

        // Inserting card into the section
        section.appendChild(artistCard);
    }
}