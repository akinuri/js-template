/**
 * Creates an instance from the template and replaces the placeholder with the instance.
 * @param {Element} placeholder
 * @param {HTMLTemplateElement} template
 */
function replacePlaceholderWithInstance(placeholder) {
    let instance = buildInstanceFromPlaceholder(placeholder);
    if (placeholder && instance) {
        placeholder.replaceWith(instance);
    }
}

function renderTemplateInstances(parentEl) {
    parentEl ??= document.body;
    let placeholders = getPlaceholders(parentEl);
    for (const placeholder of placeholders) {
        replacePlaceholderWithInstance(placeholder);
    }
}
