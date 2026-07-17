document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.querySelector(".contact-form");
    const formStatus = document.querySelector(".form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!contactForm.checkValidity()) {
                formStatus.textContent = "Please complete the required fields before sending.";
                contactForm.reportValidity();
                return;
            }

            const name = contactForm.querySelector('[name="name"]').value;
            formStatus.textContent = `Thanks, ${name}! Your message has been sent. 🌱`;
            contactForm.reset();
        });
    }
});
