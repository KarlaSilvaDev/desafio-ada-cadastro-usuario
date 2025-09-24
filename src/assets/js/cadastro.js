import * as usersService from "../../services/usersService.js";
import { clearAllErrorMessages, clearFieldErrorMessage, showErrorMessage, togglePassword } from "../../utils/formHelpers.js";
import { formRules } from "../../utils/formRules.js";
import { onInputCpf, onInputPhoneNumber } from "../../utils/masks.js";
import { validateForm } from "../../utils/validateForm.js";

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

    const formData = {
        name: nameInput.value.trim(),
        phoneNumber: phoneNumberInput.value.trim(),
        address: addressInput.value.trim(),
        cpf: cpfInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
        passwordConfirm: passwordConfirmInput.value.trim(),
    }

    const isValid = validateForm(formData, formRules.registration);

    if (!isValid) {
        return;
    }

    try {
        await usersService.registerUser(formData, true);
        window.location.href = "./profile.html"
    } catch (error) {
        console.error(error);

        if (error.message.toLowerCase().includes("email")) {
            showErrorMessage("errorEmail", error.message);
        }

        if (error.message.toLowerCase().includes("cpf")) {
            showErrorMessage("errorCpf", error.message);
        }

        console.log(error)
    }
}
);


$('btnCadastroVoltar').addEventListener("click", () => { window.location.href = "./index.html" })
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
