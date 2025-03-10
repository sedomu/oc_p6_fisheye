/**
 * Entry point of the application
 * Router function uses the html page name to call to adequate Controller
 */
async function router() {
    const currentPage = window.location.pathname;
    const controller = new Controller(); // Une seule instance du Controller

    if (currentPage.endsWith("index.html") || currentPage.endsWith(".html") === false) {
        controller.displayPhotographersPage();
    } else if (currentPage.endsWith("photographer.html")) {
        console.log("je vais lancer la construction de la page");
        await controller.displayPhotographerProfile("popularity", true);
        console.log("je vais lancer le composant Sort");
        const sortComponent = new PhotographerMediasSorter(controller);
        console.log("TOUT EST LANCÉ");
    }

    //keyboard preventdefault for space key (get rid of the annoying scroll)
    document.addEventListener("keydown", (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    })
}

/**
 * Entry point of the application
 * Execution of router()
 */
router();
