/**
 * Router function that routes to the appropriate Controller method
 * based on the current page URL.
 *
 * Displays the photographer's page or profile based on the URL.
 */
async function router() {
    const currentPage = window.location.pathname;
    const controller = new Controller(); // Single Controller instance

    if (currentPage.endsWith("index.html") || currentPage.endsWith(".html") === false) {
        controller.displayPhotographersPage();
    } else if (currentPage.endsWith("photographer.html")) {
        await controller.displayPhotographerProfile("popularity", true);
        const sortComponent = new PhotographerMediasSorter(controller);
    }

    // Prevents page scroll on space key press
    document.addEventListener("keydown", (e) => {
        if (e.key === " ") {
            e.preventDefault();
        }
    })
}

/**
 * Executes the router function to route to the appropriate page.
 */
router();
