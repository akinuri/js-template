/**
 * Gets the template elements that has non-empty "data-name" attribute.
 * @param {HTMLElement?} parentEl The parent element to search for the templates. Defaults to `document.body` if not provided.
 * @returns {Object.<string, HTMLTemplateElement>} The templates with the "data-name" attribute as the key.
 */
function getTemplates(parentEl) {
    parentEl ??= document.body;
    let templates = {};
    let elements = Array.from(parentEl.querySelectorAll("template[data-name]:not([data-name=''])"));
    for (const element of elements) {
        templates[element.dataset.name] = element;
    }
    return templates;
}

/**
 * Gets the template element with the specified name as the "data-name" attribute value.
 * @param {string} templateName The name of the template to search for.
 * @param {HTMLElement?} parentEl The parent element to search for the template.
 * @returns {HTMLTemplateElement|null} The template element with the specified name or `null` if not found.
 */
function getTemplateByName(templateName, parentEl) {
    if (!templateName) {
        return null;
    }
    parentEl ??= document.body;
    return parentEl.querySelector(`template[data-name="${templateName}"]`);
}
