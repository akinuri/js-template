/**
 * Replaces a placeholder element with an instance created from the placeholder's template.
 * 
 * @param {HTMLElement} placeholder - The placeholder element to be replaced.
 */
function replacePlaceholderWithInstance(placeholderEl) {
    if (!placeholderEl) {
        return;
    }
    let instanceEl = buildInstanceFromPlaceholder(placeholderEl);
    if (instanceEl) {
        replaceElement(placeholderEl, instanceEl);
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
    for (const placeholderEl of placeholders) {
        replacePlaceholderWithInstance(placeholderEl);
    }
}
