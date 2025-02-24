/**
 * Entry point of the application
 * Router function uses the html page name to call to adequate Controller
 */
function router() {
    const currentPage = window.location.pathname;
    const controller = new Controller(); // Une seule instance du Controller

    if (currentPage.endsWith("index.html")|| currentPage.endsWith(".html") === false) {
        controller.displayPhotographersPage();
    } else if (currentPage.endsWith("photographer.html")) {
        controller.displayPhotographerProfile("default", controller.initMediasSorter.bind(controller));
    }
}

/**
 * Entry point of the application
 * Execution of router()
 */
router();
