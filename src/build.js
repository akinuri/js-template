/**
 * Builds an instance from a template element.
 *
 * @param {HTMLElement} templateEl - The template element to build from.
 * @param {object} [data={}] - Key-value pairs to be used in the expressions. The keys are the variable names and the values are their corresponding values.
 * @param {NamedNodeMap} attributes - `attributes` object of an element.
 * @returns {HTMLElement|null} The built instance or null if templateEl is not provided.
 */
function buildInstanceFromTemplate(templateEl, data = {}, attributes = {}) {
    if (!templateEl) {
        return null;
    }
    let templateString = templateEl.content.firstElementChild.outerHTML;
    templateString = templateString.replaceAll("&gt;", ">");
    templateString = templateString.replaceAll("&lt;", "<");
    templateString = renderTemplateExpressions(templateString, data);
    let instance = htmlFromString(templateString, true)[0];
    if (isPlaceholder(instance)) {
        instance = buildInstanceFromPlaceholder(instance);
    }
    applyAttributes(instance, attributes);
    renderTemplateInstances(instance);
    return instance;
}

/**
 * Builds an instance from a placeholder element.
 *
 * @param {HTMLElement} placeholderEl - The placeholder element to build from.
 * @returns {HTMLElement|null} The built instance or null if placeholderEl is not provided.
 */
function buildInstanceFromPlaceholder(placeholderEl) {
    if (!placeholderEl) {
        return null;
    }
    let data = {};
    if (placeholderEl.dataset.templateData) {
        try {
            data = JSON.parse(placeholderEl.dataset.templateData);
        } catch (e) {
            console.error("Error parsing JSON data:", e);
        }
    }
    let content = placeholderEl.innerHTML;
    let slot = getPlaceholderSlots(placeholderEl);
    data.content = content;
    data.slot = slot;
    let templateName = getPlaceholderTemplateName(placeholderEl);
    let instance = buildInstanceFromTemplateName(templateName, data, placeholderEl.attributes);
    return instance;
}

/**
 * Creates an instance from a template name.
 *
 * @param {string} templateName - The name of the template to use.
 * @param {object} [data={}] - Key-value pairs to be used in the expressions. The keys are the variable names and the values are their corresponding values.
 * @param {NamedNodeMap} attributes - `attributes` object of an element.
 * @returns {object} The instance created from the template.
 */
function buildInstanceFromTemplateName(templateName, data = {}, attributes = {}) {
    return buildInstanceFromTemplate(getTemplateByName(templateName), data, attributes);
}

/**
 * Extracts and returns the content of named slots from a given placeholder element.
 *
 * @param {HTMLElement} placeholderEl - The placeholder element containing the slots.
 * @returns {object} An object where the keys are the slot names and the values are the slot contents.
 */
function getPlaceholderSlots(placeholderEl) {
    let slots = {};
    let slotEls = placeholderEl.querySelectorAll(":scope > slot[data-name]:not([data-name=''])");
    for (const slotEl of slotEls) {
        let slot = {
            name: slotEl.dataset.name,
            content: slotEl.innerHTML.trim(),
        };
        slots[slot.name] = slot.content;
    }
    return slots;
}
