/**
 * Replaces the expressions in a template string with their resolved values.
 *
 * @param {string} templateString Raw HTML string with expressions.
 * @param {object} [data={}] Key-value pairs to be used in the expressions. The keys are the variable names and the values are their corresponding values.
 * @returns {*} The processed HTML string with expressions replaced.
 */
function renderTemplateExpressions(templateString, data = {}) {
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
            console.warn(`Error evaluating the expression: ${expression}`, error);
            return "";
            return match;
        }
    });
}

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
 * Evaluates the expression with the given context.
 *
 * @param {string} expression The expression to evaluate.
 * @param {object} context The context object containing the variables used in the expression.
 * @returns {*} The result of the expression.
 */
function evaluateExpression(expression, context) {
    return new Function(...Object.keys(context), `return ${expression};`)(...Object.values(context));
}
