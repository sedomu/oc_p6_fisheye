class listPhotographersVue{
    /**
     * Retrieves a list of photographers, processes the data,
     * and creates artist cards for each photographer.
     *
     * @return {Promise<void>} A promise that resolves when the photographers are processed and artist cards are created.
     */
     displayPhotographers(photographers){
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
     * @return {void} This function does not return a value.
     */
    createArtistCard(photographers){
        // Mapping DOM
        const section = document.querySelector(".photographer_section");


        // Generating Photographers' details variables
        const urlAttribute = `photographer.html?id=${photographers.id}`;
        const pictureSrc = `./assets/photographers/${photographers.portrait}`;
        const name = photographers.name;
        const localisation = `${photographers.city}, ${photographers.country}`;
        const tagline = photographers.tagline;
        const pricing = `${photographers.price}€/jour`;

        // Creating artist card's html code
        const artistCardHtml = `
                <div class="artistHero">
                    <a href="${urlAttribute}">
                        <img src="${pictureSrc}">
                        <h2 class="name">${name}</h2>
                    </a>
                </div>
                <div class="artistDetails">
                    <p class="localisation">${localisation}</p>
                    <p class="tagline">${tagline}</p>
                    <p class="pricing">${pricing}</p>
                </div>`;

        // Creating artistCard article element
        const artistCard = document.createElement("article");
        artistCard.innerHTML = artistCardHtml

        // Inserting card
        section.appendChild(artistCard);

        // Just for fun: below the former code with creating each element and appending it in the tree:
        // Creating all elements
        // Structure divs
        // const artist = document.createElement("article");
        // const artistHero = document.createElement("div");
        // artistHero.classList.add("artistHero");
        // const artistDetails = document.createElement("div");
        // artistDetails.classList.add("artistDetails");

        // const link = document.createElement("a");
        // link.setAttribute("href", urlAttribute);

        // const picture = document.createElement("img");
        // picture.setAttribute("src", pictureSrc);

        // Photographer's name
        // const name = document.createElement("h2");
        // name.innerText = photographers.name;
        // name.classList.add("name");

        // const city = document.createElement("p");
        // city.innerText = localisation;
        // city.classList.add("localisation");

        // Photographer's tagline
        // const tagline = document.createElement("p");
        // tagline.innerText = photographers.tagline;
        // tagline.classList.add("tagline");

        // const price = document.createElement("p");
        // price.innerText = pricing;
        // price.classList.add("pricing");

        // Assembling elements
        //Photographer's hero section
        // link.appendChild(picture);
        // link.appendChild(name);
        // artistHero.appendChild(link);

        // Photographer's details
        // artistDetails.appendChild(city);
        // artistDetails.appendChild(tagline);
        // artistDetails.appendChild(price);

        // Card
        // artist.appendChild(artistHero);
        // artist.appendChild(artistDetails);
    }
}



