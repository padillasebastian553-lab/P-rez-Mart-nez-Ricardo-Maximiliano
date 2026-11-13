document.addEventListener("DOMContentLoaded", () => {

    // MENU DE NAVEGACION
    const menuButton = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-links");

    if (menuButton && nav) {
        menuButton.addEventListener("click", () => {
            nav.classList.toggle("open");

            menuButton.textContent =
                nav.classList.contains("open") ? "×" : "☰";
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menuButton.textContent = "☰";
            });
        });
    }

    // VENTANAS DE INFORMACION
    const modal = document.getElementById("infoModal");

    if (modal) {
        const modalTitle = document.getElementById("modalTitle");
        const modalText = document.getElementById("modalText");

        document.querySelectorAll(".more-btn").forEach(button => {
            button.addEventListener("click", () => {

                modalTitle.textContent = button.dataset.title;
                modalText.textContent = button.dataset.info;

                modal.classList.add("show");
                modal.setAttribute("aria-hidden", "false");

            });
        });

        function closeModal() {
            modal.classList.remove("show");
            modal.setAttribute("aria-hidden", "true");
        }

        modal.querySelector(".modal-close")
            .addEventListener("click", closeModal);

        modal.querySelector(".modal-ok")
            .addEventListener("click", closeModal);

        modal.addEventListener("click", event => {
            if (event.target === modal) closeModal();
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeModal();
        });
    }

    // FORMULARIO
    const form = document.getElementById("contactForm");

    if (form) {
        form.addEventListener("submit", event => {

            event.preventDefault();

            const name = document.getElementById("name").value;

            document.getElementById("formNotice").textContent =
                "Gracias, " + name +
                ". Tu formulario de demostración fue validado correctamente.";

            form.reset();

        });
    }

});
