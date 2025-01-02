/**
 * Converts a raw HTML string into an element.
 * @param {string} htmlString The processed HTML string.
 * @returns {Element} The resulting DOM element.
 */
function htmlFromString(htmlString) {
    const template = document.createElement("template");
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
}

function applyAttributes(element, attributes, except = []) {
    for (const attr of Array.from(attributes)) {
        if (except.includes(attr.name)) {
            continue;
        }
        if (attr.name == "class") {
            if (element.className.length) {
                element.className += " " + attr.value;
            } else {
                element.setAttribute(attr.name, attr.value);
            }
        } else {
            element.setAttribute(attr.name, attr.value);
        }
    }
}
