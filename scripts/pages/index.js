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
function createArtistCard(photographers){
    // Mapping DOM
    const section = document.querySelector(".photographer_section");

    // Creating all elements
    // Structure divs
    const artist = document.createElement("article");
    const artistHero = document.createElement("div");
    artistHero.classList.add("artistHero");
    const artistDetails = document.createElement("div");
    artistDetails.classList.add("artistDetails");

    // Photographer's page link
    const urlAttribute = `profile.html?id=${photographers.id}`;
    const link = document.createElement("a");
    link.setAttribute("href", urlAttribute);

    // Photographer's profile pic
    const pictureSrc = `./assets/photographers/${photographers.portrait}`;
    const picture = document.createElement("img");
    picture.setAttribute("src", pictureSrc);

    // Photographer's name
    const name = document.createElement("h2");
    name.innerText = photographers.name;
    name.classList.add("name");

    // Photographer's localisation
    const localisation = `${photographers.city}, ${photographers.country}`;
    const city = document.createElement("p");
    city.innerText = localisation;
    city.classList.add("localisation");

    // Photographer's tagline
    const tagline = document.createElement("p");
    tagline.innerText = photographers.tagline;
    tagline.classList.add("tagline");

    // Photographer's pricing
    const pricing = `${photographers.price}€/jour`;
    const price = document.createElement("p");
    price.innerText = pricing;
    price.classList.add("pricing");

    // Assembling elements
    //Photographer's hero section
    link.appendChild(picture);
    link.appendChild(name);
    artistHero.appendChild(link);

    // Photographer's details
    artistDetails.appendChild(city);
    artistDetails.appendChild(tagline);
    artistDetails.appendChild(price);

    // Card
    artist.appendChild(artistHero);
    artist.appendChild(artistDetails);

    // Inserting card
    section.appendChild(artist);
}

/**
 * Fetches and imports data from a JSON file located at "data/photographers.json".
 *
 * @return {Promise<Object>} A promise that resolves to the parsed JSON data.
 */
async function importData(){
    const response = await fetch("data/photographers.json");
    return await response.json();
}

/**
 * Retrieves a list of photographers, processes the data,
 * and creates artist cards for each photographer.
 *
 * @return {Promise<void>} A promise that resolves when the photographers are processed and artist cards are created.
 */
async function getPhotographers(){
    const data = await importData();

    for (let i = 0; i < data["photographers"].length; i++) {
        createArtistCard(data["photographers"][i]);
    }
}

(async function(){
    await getPhotographers();
})();
