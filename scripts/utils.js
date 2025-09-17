const $ = (id) => document.getElementById(id);

function showErrorMessage(fieldId, message) {
    $(fieldId).textContent = message;
}

export function clearAllErrorMessages(selector = ".text-red-500") {
    document.querySelectorAll(selector).forEach(element => element.textContent = "");
}

export function clearFieldErrorMessage(errorMessageId) {
    $(errorMessageId).textContent = "";
}

/*******************
 * VALIDAÇÕES
 *******************/

export const REGEX = {
    phoneNumber: /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
}

export const Validators = {
    required: (msg = "Campo obrigatório") => (value) => (value ? "" : msg),
    minLen: (n, msg = `O campo deve ter pelo menos ${n} caracteres`) => (value) => (value.length >= n ? "" : msg),
    noDigits: (msg = "O campo não pode conter números") => (value) => /\d/.test(value) ? msg : "",
    pattern: (regex, msg = "Formato inválido") => (value) => (regex.test(value) ? "" : msg),
}


export function validateField(value, rules, errorFieldId) {
    for (const rule of rules) {
        const error = rule(value);
        if (error) {
            showErrorMessage(errorFieldId, error);
            return false;
        }
    }
    return true;
}

