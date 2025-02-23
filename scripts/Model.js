/**
 * Handles data retrieval and management for photographers and their media.
 * Fetches data from a JSON file and provides methods to access and sort it.
 *
 * @class Model
 * @property {Object|null} data - Cached data from the JSON file to minimize repeated fetch requests.
 * @method getData - Fetches and caches data from the JSON file.
 * @method getPhotographers - Retrieves a list of photographers.
 * @method getMedias - Retrieves and sorts media based on the specified sorting method.
 * @method getPhotographerDetails - Retrieves profile details of a specific photographer.
 * @method getPhotographerProfileContent - Retrieves media content for a specific photographer.
 */
class Model {
    /**
     * Creates an instance of Model.
     * Initializes data storage to null until fetched.
     */
    constructor() {
        /**
         * Stores fetched data to prevent redundant fetch requests.
         * @type {Object|null}
         */
        this.data = null;
    }

    /**
     * Fetches and caches data from the "data/photographers.json" file.
     * If data has already been fetched, it returns the cached version.
     *
     * @async
     * @returns {Promise<Object>} Resolves with the parsed JSON data.
     */
    async getData() {
        if (this.data === null) {
            const response = await fetch("data/photographers.json");
            this.data = await response.json();
        }
        return this.data;
    }

    /**
     * Retrieves a list of photographers from the dataset.
     *
     * @async
     * @returns {Promise<Array>} Resolves with an array of photographer objects.
     */
    async getPhotographers() {
        const data = await this.getData();
        return data.photographers;
    }

    /**
     * Retrieves and sorts media based on the specified sorting method.
     *
     * @async
     * @param {string} sortMethod - Sorting criteria ("popularity", "date", "title").
     * @returns {Promise<Array>} Resolves with a sorted array of media objects.
     */
    async getMedias(sortMethod) {
        const data = await this.getData();

        switch (sortMethod) {
            case "popularity":
                return data.media.sort((a, b) => b.likes - a.likes);
            case "date":
                return data.media.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
            case "title":
                return data.media.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return data.media;
        }
    }

    /**
     * Retrieves the profile header details of a specific photographer.
     *
     * @async
     * @param {number|string} [photographerId] - The ID of the photographer. Returns all photographers if empty
     * @returns {Promise<Object>} Resolves with the photographer's profile data.
     */
    async getPhotographerDetails(photographerId) {
        const data = await this.getPhotographers();

        if (photographerId === undefined) {
            return data;
        }

        let photographerInfo = {};

        for (let i = 0; i < data.length; i++) {
            if (data[i].id === parseInt(photographerId)) {
                photographerInfo = data[i];
            }
        }

        return photographerInfo;
    }

    /**
     * Retrieves the media content for a specific photographer based on sorting criteria.
     *
     * @async
     * @param {number|string} photographerId - The ID of the photographer.
     * @param {string} sortMethod - The sorting method to be applied.
     * @returns {Promise<Array>} Resolves with an array of media objects belonging to the photographer.
     */
    async getPhotographerProfileContent(photographerId, sortMethod) {
        const data = await this.getMedias(sortMethod);
        let mediaHtmlTags = [];

        for (let i = 0; i < data.length; i++) {
            if (data[i].photographerId === parseInt(photographerId)) {
                mediaHtmlTags.push(data[i]);
            }
        }

        return mediaHtmlTags;
    }
}