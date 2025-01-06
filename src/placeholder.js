/**
 * Gets the placeholder elements that reference a template via attributes.
 *
 * @param {HTMLElement?} parentEl The parent element to search for the placeholders. Defaults to `document.body` if not provided.
 * @returns {HTMLElement[]} A list of custom elements with a template name as the tag,
 * or a normal element with a data-template="name" attribute.
 */
function getPlaceholders(parentEl) {
    parentEl ??= document.body;
    let placeholders = [];
    for (const templateName in getTemplates()) {
        placeholders.push(...getPlaceholdersByTemplateName(templateName, parentEl));
    }
    return placeholders;
}

/**
 * Gets the placeholder elements (by template name) that reference a template via attributes.
 *
 * @param {string} templateName The name of the template to search for.
 * @param {HTMLElement?} parentEl The parent element to search for the placeholders. Defaults to `document.body` if not provided.
 * @returns {HTMLElement[]} A list of custom elements with a template name as the tag,
 * or a normal element with a data-template="name" attribute.
 */
function getPlaceholdersByTemplateName(templateName, parentEl) {
    parentEl ??= document.body;
    return Array.from(
        parentEl.querySelectorAll(
            `${templateName}, [data-template="${templateName}"], [data-template-name="${templateName}"]`
        )
    );
}

/**
 * Checks if an element is a placeholder for a template.
 *
 * @param {HTMLElement} element
 * @returns {boolean}
 */
function isPlaceholder(element) {
    const templateName = getPlaceholderTemplateName(element);
    let query = `[data-template="${templateName}"], [data-template-name="${templateName}"]`;
    return element.matches(query) || templateName in getTemplates();
}

/**
 * Gets the template name or tag name of the placeholder element.
 *
 * @param {HTMLElement} placeholderEl
 * @returns {string}
 */
function getPlaceholderTemplateName(placeholderEl) {
    return placeholderEl.dataset.templateName ?? placeholderEl.dataset.template ?? placeholderEl.tagName.toLowerCase();
}
