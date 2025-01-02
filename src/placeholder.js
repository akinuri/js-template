function getPlaceholders(parentEl) {
    parentEl ??= document.body;
    let placeholders = [];
    for (const templateName in getTemplates()) {
        placeholders = placeholders.concat(getPlaceholdersByTemplateName(templateName, parentEl));
    }
    return placeholders;
}

/**
 * Gets the placeholder elements that reference a template via attributes.
 * @param {string} templateName
 * @param {Element?} parentEl
 * @returns {Element[]} A list of custom elements with a template name as the tag,
 * or a normal element with a data-template="name" attribute.
 */
function getPlaceholdersByTemplateName(templateName, parentEl) {
    parentEl ??= document.body;
    return Array.from(
        parentEl.querySelectorAll(
            `${templateName}, [data-template=${templateName}], [data-template-name=${templateName}]`
        )
    );
}

function isPlaceholder(element) {
    let templateName = getPlaceholderTemplateName(element);
    let query = `[data-template=${templateName}], [data-template-name=${templateName}]`;
    if (element.matches(query)) {
        return true;
    }
    let templates = getTemplates();
    return templateName in templates;
}

function getPlaceholderTemplateName(placeholderEl) {
    return placeholderEl.dataset.templateName ?? placeholderEl.dataset.template ?? placeholderEl.tagName.toLowerCase();
}
