import { REGEX, Validators, validateField } from "../utils/validators.js";

export function validateEmail(email) {
    return validateField(email, [
        Validators.required(),
        Validators.pattern(REGEX.email, "Email inválido")
    ]);
}

export function validatePassword(password) {
    return validateField(password, [
        Validators.required(),
        Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços")
    ]);
}