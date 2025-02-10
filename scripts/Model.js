class Model{
    constructor(){
        this.data = null;
    }

    /**
     * Fetches and imports data from a JSON file located at "data/photographers.json".
     *
     * @return {Promise<Object>} A promise that resolves to the parsed JSON data.
     */
    async getData(){
        if (this.data == null){
            const response = await fetch("data/photographers.json");
            this.data = await response.json();
        }
        return this.data;
    }

    async getPhotographers(){
        const data = await this.getData();
        return data.photographers;
    }

    async getMedia(){
        const data = await this.getData();
        return data.media;
    }
}

