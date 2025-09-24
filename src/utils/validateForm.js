import { clearAllErrorMessages, showErrorMessage } from "./formHelpers.js";
import { validateField } from "./validators.js";


export function validateForm(data, rules) {
    clearAllErrorMessages();

    const errors = {};

    Object.entries(rules).forEach(([field, fieldRules]) => {
        const value = data[field]?.trim();
        const validators = typeof fieldRules === "function" ? fieldRules(data) : fieldRules;
        errors[field] = validateField(value, validators);
    });

    const hasErrors = Object.values(errors).some((msg) => msg);

    if (hasErrors) {
        Object.entries(errors).forEach(([field, msg]) => {
            if (msg) { showErrorMessage(`error${capitalize(field)}`, msg); }
        })

        return false;
    }

    return true;
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}