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
    let templateString = getTemplateString(templateEl);
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
 * Extracts the outer HTML of the first element child of a template element's content.
 * Also does some processing.
 *
 * @param {HTMLTemplateElement} templateEl - The template element from which to extract the string.
 * @returns {string} The processed template string.
 */
function getTemplateString(templateEl) {
    let templateString = templateEl.content.firstElementChild.outerHTML;
    // < and > in the JS context (i.e. {{ block }}) are espcated to &lt; and &gt;
    // we need to convert them back to < and >
    templateString = templateString.replaceAll("&gt;", ">");
    templateString = templateString.replaceAll("&lt;", "<");
    return templateString;
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
    data.content = placeholderEl.innerHTML;
    let props = getPlaceholderContentProps(placeholderEl);
    data = { ...data, ...props };
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
 * Extracts and returns the content of named props from a given placeholder element.
 *
 * @param {HTMLElement} placeholderEl - The placeholder element containing the props.
 * @returns {object} An object where the keys are the prop names and the values are the prop contents.
 */
function getPlaceholderContentProps(placeholderEl) {
    let props = {};
    let propEls = placeholderEl.querySelectorAll(":scope > prop[data-name]:not([data-name=''])");
    for (const propEl of propEls) {
        let prop = {
            name: propEl.dataset.name,
            content: propEl.innerHTML.trim(),
        };
        props[prop.name] = prop.content;
    }
    return props;
}
