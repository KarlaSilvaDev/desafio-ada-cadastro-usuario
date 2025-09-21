export const REGEX = {
    phoneNumber: /^\(\d{2}\)\s\d\s\d{4}-\d{4}$/,
    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    password: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    noSpace: /^\S+$/,
}

export const Validators = {
    required: (msg = "Campo obrigatório") => (value) => (value ? "" : msg),
    minLen: (n, msg = `O campo deve ter pelo menos ${n} caracteres`) => (value) => (value.length >= n ? "" : msg),
    noDigits: (msg = "O campo não pode conter números") => (value) => /\d/.test(value) ? msg : "",
    pattern: (regex, msg = "Formato inválido") => (value) => (regex.test(value) ? "" : msg),
    passwordMatch: (password, msg = "A senha não é igual à informada no campo 'senha'") => (value) => (password === value ? "" : msg),
}


export function validateField(value, rules) {
    for (const rule of rules) {
        const error = rule(value);
        if (error) { return error };
    }
    return null;
}

