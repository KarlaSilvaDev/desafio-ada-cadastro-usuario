import * as usersService from "../../services/usersService.js";
import { Validators, validateField, REGEX } from "../../utils/validators.js";
import { onInputPhoneNumber, onInputCpf } from "../../utils/masks.js"
import { togglePassword, clearAllErrorMessages, showErrorMessage, clearFieldErrorMessage } from "../../utils/formHelpers.js"

const $ = (id) => document.getElementById(id);

const form = $("newUserForm");

const nameInput = $("name");
const phoneNumberInput = $("phoneNumber");
const addressInput = $("address");
const cpfInput = $("cpf");
const emailInput = $("email");
const passwordInput = $("password");
const passwordConfirmInput = $("passwordConfirm");

const emailSessionStorage = sessionStorage.getItem("userEmail");

if (emailSessionStorage) {
    emailInput.value = emailSessionStorage;
    emailInput.disabled = true;
    emailInput.classList.remove("text-gray-700", "hover:border-fuchsia-500")
    emailInput.classList.add("bg-gray-200", "text-gray-600")
}

phoneNumberInput.addEventListener("input", onInputPhoneNumber);
cpfInput.addEventListener("input", onInputCpf);


form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearAllErrorMessages();

    const name = nameInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    const address = addressInput.value.trim();
    const cpf = cpfInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const passwordConfirm = passwordConfirmInput.value;

    const errors = {
        errorName: validateField(
            name,
            [Validators.required(), Validators.noDigits("O nome não pode conter números"), Validators.minLen(3, "O campo nome deve ter no mínimo 3 caracteres")],
        ),
        errorPhoneNumber: validateField(
            phoneNumber,
            [Validators.required(), Validators.pattern(REGEX.phoneNumber, "Telefone inválido")],
        ),
        errorAddress: validateField(
            address,
            [Validators.required(), Validators.minLen(3, "O campo endereço deve ter no mínimo 3 caracteres")],
        ),
        errorCpf: validateField(
            cpf,
            [Validators.required(), Validators.pattern(REGEX.cpf, "CPF inválido")],
        ),
        errorPassword: validateField(
            password,
            [Validators.required(), Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços"), Validators.pattern(REGEX.password, "A senha deve ter 8+ caracteres, pelo menos 1 letra maiúscula e 1 número")],
        ),
        errorPasswordConfirm: validateField(
            passwordConfirm,
            [Validators.required(), Validators.passwordMatch(password), Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços"), Validators.pattern(REGEX.password, "A senha deve ter 8+ caracteres, pelo menos 1 letra maiúscula e 1 número")],
        ),
        errorEmail: validateField(
            email,
            [Validators.required(), Validators.pattern(REGEX.email, "Email inválido")],
        )
    };

    const hasErrors = Object.values(errors).some(message => message);

    if (hasErrors) {
        Object.entries(errors).forEach(([fieldId, message]) => {
            if (message !== null) {showErrorMessage(fieldId, message)};
        });

        return;
    };

    try {
        await usersService.registerUser({ name, phoneNumber, address, email, cpf, password }, true);
        window.location.href = "./profile.html"
    } catch (error) {
        console.error(error);
    }
});


$('btnCadastroVoltar').addEventListener("click", () => { window.location.href = "../index.html" })
$('btnTogglePassword').addEventListener("click", () => { togglePassword('password', 'togglePasswordIcon') });
$('btnTogglePasswordConfirm').addEventListener("click", () => { togglePassword('passwordConfirm', 'togglePasswordConfirmIcon') });

//Limpa erros ao focar nos campos
Array.from(form.elements)
    .filter((element) => element.type !== "submit" && element.type !== "button")
    .forEach((element) => {
        element.addEventListener("focusin", () => {
            console.log("teste")
            clearFieldErrorMessage(`error${capitalize(element.id)}`)
        });
    });

export function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
