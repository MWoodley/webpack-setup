export function accordian(id, userOptions = {}) {
    const defaultOptions = {
        autoClose: true,
        callback: function(open, header, body) {},
    };

    const options = { ...defaultOptions, ...userOptions };

    const container = document.getElementById(id);
    /**
     * Ensure we have a container
     */
    if (!container) {
        return;
    }

    /**
     * Ensure we have an even number of children
     */
    if (
        container.childElementCount === 0 ||
        container.childElementCount % 2 == 1
    ) {
        return;
    }

    /**
     * Get headers and bodies
     */
    const headers = Array.from(container.children).filter(
        (child, i) => i % 2 === 0
    );
    const bodies = Array.from(container.children).filter(
        (child, i) => i % 2 === 1
    );

    /**
     * Hide the bodies
     */
    bodies.forEach((body, i) => {
        body.style.display = "none";
        body.setAttribute("data-open", "0");
    });

    /**
     * Handle on click
     */
    headers.forEach((header, i) => {
        header.addEventListener("click", function(e) {
            const body = bodies[i];
            const open = body.getAttribute("data-open") === "1";

            options.callback(open, header, body);

            if (open) {
                body.style.display = "none";
                body.setAttribute("data-open", "0");
            } else {
                body.style.display = "block";
                body.setAttribute("data-open", "1");

                if (options.autoClose) {
                    bodies.forEach((el, index) => {
                        const subHeader = headers[index];

                        if (
                            index === i ||
                            el.getAttribute("data-open") === "0"
                        ) {
                            return;
                        }
                        el.style.display = "none";
                        el.setAttribute("data-open", "0");
                        options.callback(false, subHeader, el);
                    });
                }
            }
        });
    });
}
