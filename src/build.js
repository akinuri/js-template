function buildInstanceFromTemplate(template, data = {}, attrs = {}) {
    if (!template) {
        return null;
    }
    let templateString = template.content.firstElementChild.outerHTML;
    templateString = templateString.replace("&gt;", ">");
    templateString = templateString.replace("&lt;", "<");
    templateString = replaceTemplateExpressions(templateString, data);
    let instance = htmlFromString(templateString);
    if (isPlaceholder(instance)) {
        instance = buildInstanceFromPlaceholder(instance);
    }
    applyAttributes(instance, attrs);
    renderTemplateInstances(instance);
    return instance;
}

function buildInstanceFromPlaceholder(placeholderEl) {
    if (!placeholderEl) {
        return null;
    }
    let data = placeholderEl.dataset.templateData ?? {};
    if (typeof data == "string") {
        data = JSON.parse(data);
    }
    let content = placeholderEl.innerHTML;
    let slot = getPlaceholderSlots(placeholderEl);
    data.content = content;
    data.slot = slot;
    let templateName = getPlaceholderTemplateName(placeholderEl);
    return buildInstanceFromTemplateName(templateName, data, placeholderEl.attributes);
}

function buildInstanceFromTemplateName(templateName, data = {}, attrs = {}) {
    return buildInstanceFromTemplate(getTemplateByName(templateName), data, attrs);
}

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
