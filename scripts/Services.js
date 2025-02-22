/**
 * Utility class for handling URL parameters.
 *
 * @class Services
 * @method getParam - Retrieves a specified query parameter from the current URL.
 */
class Services {
    /**
     * Retrieves the value of a specific query parameter from the current URL.
     * An optional `value` parameter is included for potential future use.
     *
     * @static
     * @param {string} param - The name of the query parameter to retrieve.
     * @param {*} [value] - (Optional) Placeholder for future functionality.
     * @returns {string|null} The value of the parameter, or null if not found.
     */
    static getParam(param, value) {
        const url = window.location.search;
        const urlParams = new URLSearchParams(url);
        return urlParams.get(param);
    }
}
