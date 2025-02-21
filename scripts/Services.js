class Services{
    static getParam(param, value){
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        const data = urlParams.get(param);

        return data;
    }
}