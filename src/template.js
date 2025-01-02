/**
 * Gets the template elements that has non-empty "data-name" attribute.
 * @param {Element?} parentEl
 * @returns {HTMLTemplateElement[]}
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
 * @param {Element?} parentEl
 * @returns {HTMLTemplateElement}
 */
function getTemplateByName(templateName, parentEl) {
    if (!templateName) {
        return null;
    }
    return (parentEl ?? document.body).querySelector(`template[data-name=${templateName}]`);
}
