/**
 * Replaces a placeholder element with an instance created from the placeholder's template.
 * 
 * @param {HTMLElement} placeholder - The placeholder element to be replaced.
 */
function replacePlaceholderWithInstance(placeholder) {
    if (!placeholder) {
        return;
    }
    let instance = buildInstanceFromPlaceholder(placeholder);
    if (instance) {
        replaceElement(placeholder, instance);
    }
}

/**
 * Renders template instances within a given parent element.
 * If no parent element is provided, defaults to the document body.
 *
 * @param {HTMLElement?} parentEl - The parent element to search for placeholders.
 */
function renderTemplateInstances(parentEl) {
    parentEl ??= document.body;
    let placeholders = getPlaceholders(parentEl);
    for (const placeholder of placeholders) {
        replacePlaceholderWithInstance(placeholder);
    }
}
