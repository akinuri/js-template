/**
 * Converts an HTML string into an array of DOM elements.
 *
 * @param {string} htmlString - The HTML string to convert.
 * @returns {Array<Node|Element>} An array of child nodes/elements of the created DOM element.
 */
function htmlFromString(htmlString, onlyElements = false) {
    const template = document.createElement("template");
    template.innerHTML = htmlString.trim();
    let nodes = Array.from(template.content.childNodes);
    if (onlyElements) {
        nodes = nodes.filter((node) => node.nodeType === Node.ELEMENT_NODE);
    }
    return nodes;
}

/**
 * Applies a set of attributes to a given DOM element, with an option to exclude specific attributes.
 *
 * @param {Element} element - The DOM element to which the attributes will be applied.
 * @param {NamedNodeMap} attributes - `attributes` object of an element.
 * @param {Array<string>} [except=[]] - An optional array of attribute names to be excluded from being applied.
 */
function applyAttributes(element, attributes, except = []) {
    for (const attr of attributes) {
        if (except.includes(attr.name)) {
            continue;
        }
        if (attr.name === "class") {
            element.classList.add(...attr.value.split(" "));
        } else {
            element.setAttribute(attr.name, attr.value);
        }
    }
}

/**
 * Replaces a target DOM element with a new set of DOM elements.
 *
 * @param {Element} targetEl - The target element to be replaced.
 * @param {Array<Element>|Element} newEls - An array of new elements to replace the target element.
 */
function replaceElement(targetEl, newEls) {
    if (!Array.isArray(newEls) && newEls instanceof Element) {
        newEls = [newEls];
    }
    if (newEls.length == 0) {
        return;
    }
    targetEl.replaceWith(newEls[0]);
    let lastEl = newEls[0];
    for (const element of newEls.slice(1)) {
        lastEl.after(element);
        lastEl = element;
    }
}

/**
 * Fetches HTML content from a given URL.
 *
 * @async
 * @param {string} url - The URL to fetch the HTML content from.
 * @returns {Promise<string>} A promise that resolves to the HTML content as a string.
 * @throws Throws an error if the HTTP response is not ok or the content type is not text/html.
 */
async function fetchHtmlFromUrl(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    // if (!contentType || !contentType.includes("text/html")) {
    //     throw new Error("Content type is not text/html.");
    // }
    let html = await response.text();
    return html;
}
