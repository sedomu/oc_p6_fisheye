/**
 * Handles the lightbox modal for media viewing (images/videos) with navigation and controls.
 *
 * @class Lightbox
 * @property {boolean} modalState - Tracks the visibility state of the modal.
 * @property {HTMLElement} element - The lightbox background element.
 * @property {HTMLElement} close - The close button of the modal.
 * @property {HTMLElement} viewer - The media viewer element.
 * @property {HTMLElement} previous - The previous media button.
 * @property {HTMLElement} next - The next media button.
 * @property {HTMLElement} heading - The title of the media displayed.
 * @property {HTMLElement} body - The body element, used to control scroll behavior.
 * @property {number} currentItem - The index of the currently displayed media.
 */
class Lightbox {
    /**
     * Initializes the lightbox with event listeners for media navigation and controls.
     */
    constructor() {
        this.modalState = false;
        this.element = document.querySelector('.lightbox-bg');
        this.close = document.querySelector('.lightbox-modal__close');
        this.viewer = document.querySelector('.lightbox-modal__viewer');
        this.previous = document.querySelector('.lightbox-modal__previous');
        this.next = document.querySelector('.lightbox-modal__next');
        this.heading = document.querySelector('.lightbox-modal__title');
        this.body = document.querySelector("body");
        this.currentItem = null;

        // Event listeners for controls
        this.previous.addEventListener('click', () => this.handlePreviousMedia());
        this.next.addEventListener('click', () => this.handleNextMedia());
        this.close.addEventListener('click', () => this.closeModal());

        // Keyboard navigation
        document.addEventListener('keyup', (e) => this.handleKeyup(e));
        document.addEventListener("keyup", (e) => this.handleOpenMediaOnKey(e));
        document.addEventListener("click", (e) => this.handleOpenMediaOnClick(e));
    }

    /**
     * Handles keyup events for navigation and closing the modal.
     *
     * @param {KeyboardEvent} e - The keyup event.
     */
    handleKeyup(e) {
        if (this.modalState) {
            if (e.key === 'ArrowLeft') this.handlePreviousMedia();
            if (e.key === 'ArrowRight') this.handleNextMedia();
            if (e.key === 'Escape') this.closeModal();
        }
    }

    /**
     * Handles opening the media from the keypress event.
     *
     * @param {KeyboardEvent} e - The keyup event.
     */
    handleOpenMediaOnKey(e) {
        if ((!this.modalState && (e.key === "Enter" || e.key === " ")) && (e.target.tagName === "IMG" || e.target.tagName === "VIDEO")) {
            this.handleOpenMedia(Number(e.target.getAttribute("e-number")));
        }
    }

    /**
     * Handles opening media when clicked.
     *
     * @param {MouseEvent} e - The click event.
     */
    handleOpenMediaOnClick(e) {
        if (e.target.classList.contains("media-card__media-object")) {
            this.handleOpenMedia(e.target.getAttribute("e-number"));
        }
    }

    /**
     * Closes the lightbox modal.
     */
    closeModal() {
        this.element.style.display = 'none';
        this.body.style.overflowY = 'auto';
        this.modalState = false;
    }

    /**
     * Opens the lightbox modal.
     */
    openModal() {
        this.element.style.display = 'block';
        this.body.style.overflowY = 'hidden';
        this.modalState = true;
    }

    /**
     * Displays the media in the lightbox viewer.
     *
     * @param {HTMLElement} media - The media element (image or video).
     */
    displayOpenMedia(media) {
        this.viewer.replaceChild(media, this.viewer.firstChild);
        this.heading.innerText = media.title;
        this.openModal();
    }

    /**
     * Handles opening a specific media by index.
     *
     * @param {number} i - The index of the media to open.
     */
    handleOpenMedia(i) {
        this.currentItem = Number(i);
        this.medias = document.querySelectorAll(".media-card__media > *");

        const media = document.createElement(this.medias[this.currentItem].tagName);
        if (media.tagName === "VIDEO") media.controls = "controls";
        media.src = this.medias[this.currentItem].src;
        media.title = this.medias[this.currentItem].title;

        this.displayOpenMedia(media);
    }

    /**
     * Displays the previous media in the viewer.
     */
    handlePreviousMedia() {
        this.handleOpenMedia((this.currentItem === 0) ? this.medias.length - 1 : this.currentItem - 1);
    }

    /**
     * Displays the next media in the viewer.
     */
    handleNextMedia() {
        this.handleOpenMedia((this.currentItem === this.medias.length - 1) ? 0 : this.currentItem + 1);
    }
}
