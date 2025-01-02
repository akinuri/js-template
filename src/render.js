class OutputBuffer {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    toString() {
        return this.items.join("");
    }
}

/**
 * Renders the expressions in the template string.
 * @param {string} templateString Raw HTML string with expressions.
 * @param {object} [data={}] Key-value pairs to be used in the expressions.
 * @returns {*} The processed HTML string with expressions replaced.
 */
function replaceTemplateExpressions(templateString, data = {}) {
    let expressionPattern = /{{\s*(.*?)\s*}}/gs;
    return templateString.replace(expressionPattern, (match, expression) => {
        let ob = new OutputBuffer();
        data.write = (item) => ob.add(item);
        try {
            let text = evaluateExpression(expression, data);
            if (text == undefined) {
                text = "";
            }
            text += ob;
            return text;
        } catch (error) {
            console.warn(`Error evaluating expression: ${expression}`, error);
            return "";
            return match;
        }
    });
}

/**
 * @param {string} expression A JS expression.
 * @param {object} context Key-value pairs.
 * @returns {*} The expression result.
 */
function evaluateExpression(expression, context) {
    return new Function(...Object.keys(context), `return ${expression};`)(...Object.values(context));
}
