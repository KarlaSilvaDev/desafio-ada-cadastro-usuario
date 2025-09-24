
import { Validators, REGEX } from "./validators.js";

export const formRules = {
    registration: {
        name: [
            Validators.required(),
            Validators.noDigits("O nome não pode conter números"),
            Validators.minLen(3, "O campo nome deve ter no mínimo 3 caracteres")
        ],
        phoneNumber: [
            Validators.required(),
            Validators.pattern(REGEX.phoneNumber, "Telefone inválido"),
        ],
        address: [
            Validators.required(),
            Validators.minLen(3, "O campo endereço deve ter no mínimo 3 caracteres")
        ],
        cpf: [
            Validators.required(),
            Validators.pattern(REGEX.cpf, "CPF inválido")
        ],
        email: [
            Validators.required(),
            Validators.pattern(REGEX.email, "Email inválido")
        ],
        password: [
            Validators.required(),
            Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços"),
            Validators.pattern(REGEX.password, "A senha deve ter 8+ caracteres, pelo menos 1 letra maiúscula e 1 número")
        ],
        passwordConfirm: (formData) => [
            Validators.required(),
            Validators.passwordMatch(formData.password),
            Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços"),
            Validators.pattern(REGEX.password, "A senha deve ter 8+ caracteres, pelo menos 1 letra maiúscula e 1 número")
        ],
    },
    update: {
        name: [
            Validators.required(),
            Validators.noDigits("O nome não pode conter números"),
            Validators.minLen(3, "O campo nome deve ter no mínimo 3 caracteres")
        ],
        phoneNumber: [
            Validators.required(),
            Validators.pattern(REGEX.phoneNumber, "Telefone inválido"),
        ],
        address: [
            Validators.required(),
            Validators.minLen(3, "O campo endereço deve ter no mínimo 3 caracteres")
        ],
        cpf: [
            Validators.required(),
            Validators.pattern(REGEX.cpf, "CPF inválido")
        ],
        email: [
            Validators.required(),
            Validators.pattern(REGEX.email, "Email inválido")
        ],
    },
}