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

async function fetchTemplatesFromUrl(url) {
    return fetch(url)
        .then((response) => response.text())
        .then((html) => html);
}

async function loadTemplatesFromUrl(url, useNewContainer = true) {
    let html = await fetchTemplatesFromUrl(url);
    if (useNewContainer) {
        const container = document.createElement("div");
        container.hidden = true;
        container.classList.add("template-container");
        container.innerHTML = html;
        document.body.append(container);
    } else {
        const container = document.querySelector(".template-container");
        if (!container) {
            throw new Error("No .template-container found.");
        }
        container.innerHTML += html;
    }
}
