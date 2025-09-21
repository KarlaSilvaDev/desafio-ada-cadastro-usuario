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
        window.location.href = "../pages/profile.html"
    } catch (error) {
        console.error(error);
    }
});


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


// import { registerUser } from "../../services/usersService.js";
// import { Validators, validateField, REGEX, clearAllErrorMessages, clearFieldErrorMessage } from "../../utils/validators.js";

// const $ = (id) => document.getElementById(id);

// function showErrorMessage(fieldId, message) {
//     $(fieldId).innerHTML = `<span class="material-icons text-xl">error_outline</span> ${message}`;
// }

// function clearField(fieldId) {
//     $(fieldId).value = '';
// }

// function togglePassword(inputId, iconId) {
//     const input = $(inputId);
//     const icon = $(iconId);

//     if (input.type === "password") {
//         input.type = "text";
//         icon.innerHTML = 'visibility';
//     } else {
//         input.type = "password";
//         icon.innerHTML = 'visibility_off';
//     }
// }

// //INDEX.html
// export function clearAllErrorMessages(selector = ".text-red-500") {
//     document.querySelectorAll(selector).forEach(element => element.textContent = "");
// }
// /*******************
//  * MÁSCARAS
//  *******************/
// //TODO: Ver como o professor fez para permitir a edição do input com a máscara. Atualmente, está permitindo apenas editar a última parte.
// function onInputPhoneNumber(event) {
//     let value = event.target.value.replace(/\D/g, "").slice(0, 11);
//     let formattedValue = "";

//     if (value.length >= 7) {
//         formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
//     } else if (value.length >= 3) {
//         formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3)} `;
//     } else if (value.length >= 2) {
//         formattedValue = `(${value.slice(0, 2)}) `;
//     } else if (value.length > 0) {
//         formattedValue = `(${value.slice(0, 2)}`;
//     }

//     event.target.value = formattedValue;
// }
// //TODO: Ver como o professor fez para permitir a edição do input com a máscara. Atualmente, está permitindo apenas editar a última parte.
// function onInputCpf(event) {
//     let value = event.target.value.replace(/\D/g, "").slice(0, 11);
//     let formattedValue = "";

//     if (value.length >= 9) {
//         formattedValue = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
//     } else if (value.length >= 6) {
//         formattedValue = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
//     } else if (value.length >= 3) {
//         formattedValue = `${value.slice(0, 3)}.${value.slice(3)}`;
//     } else if (value.length > 0) {
//         formattedValue = value;
//     }

//     event.target.value = formattedValue;
// }

// /*******************
//  * FORM
//  *******************/

// const nameInput = $("name");
// const phoneNumberInput = $("phoneNumber");
// const addressInput = $("address");
// const cpfInput = $("cpf");
// const passwordInput = $("password");
// const passwordConfirmInput = $("passwordConfirm");
// const emailInput = $("email");

// const emailSessionStorage = sessionStorage.getItem("userEmail");

// if (emailSessionStorage) {
//     emailInput.value = emailSessionStorage;
//     emailInput.disabled = true;
//     emailInput.classList.remove("text-gray-700", "hover:border-fuchsia-500")
//     emailInput.classList.add("bg-gray-200", "text-gray-600")
// } else {
//     emailInput.value = "";
//     emailInput.disabled = false;
// }

// phoneNumberInput.addEventListener("input", (event) => {
//     onInputPhoneNumber(event);
// });

// cpfInput.addEventListener("input", (event) => {
//     onInputCpf(event);
// });

// newUserForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     clearAllErrorMessages();

//     const name = nameInput.value.trim();
//     const phoneNumber = phoneNumberInput.value.trim();
//     const address = addressInput.value.trim();
//     const cpf = cpfInput.value.trim();
//     const password = passwordInput.value.trim();
//     const email = emailInput.value.trim();
//     const passwordConfirm = passwordConfirmInput.value;

//     const valid = [
//         validateField(
//             name,
//             [Validators.required(), Validators.noDigits("O nome não pode conter números"), Validators.minLen(3, "O campo nome deve ter no mínimo 3 caracteres")],
//             "errorName"
//         ),
//         validateField(
//             phoneNumber,
//             [Validators.required(), Validators.pattern(REGEX.phoneNumber, "Telefone inválido")],
//             "errorPhoneNumber"
//         ),
//         validateField(
//             address,
//             [Validators.required(), Validators.minLen(3, "O campo endereço deve ter no mínimo 3 caracteres")],
//             "errorAddress"
//         ),
//         validateField(
//             cpf,
//             [Validators.required(), Validators.pattern(REGEX.cpf, "CPF inválido")],
//             "errorCpf"
//         ),
//         validateField(
//             password,
//             [Validators.required(), Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços"), Validators.pattern(REGEX.password, "A senha deve ter 8+ caracteres, pelo menos 1 letra maiúscula e 1 número")],
//             "errorPassword"
//         ),
//         validateField(
//             passwordConfirm,
//             [Validators.required(), Validators.passwordMatch(password), Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços"), Validators.pattern(REGEX.password, "A senha deve ter 8+ caracteres, pelo menos 1 letra maiúscula e 1 número")],
//             "errorPasswordConfirm"
//         ),
//         validateField(
//             email,
//             [Validators.required(), Validators.pattern(REGEX.email, "Email inválido")],
//             "errorEmail"
//         )
//     ].every(Boolean);

//     if (!valid) { return };

//     try {
//         await registerUser({ name, phoneNumber, address, email, cpf, password }, true);
//         window.location.href = "../pages/profile.html"
//     } catch (error) {
//         console.error(error)
//     }
// })




// //Função para coletar os Ids do form de cadastro de usuário
// const idsInputsForm = Array.from(newUserForm.elements)
//     .filter(element => element.type !== 'submit' && element.type !== 'button')
//     .map(element => element.id)
//     .filter(Boolean);


// function togglePassword(inputId, iconId) {
//     const input = $(inputId);
//     const icon = $(iconId);

//     if (input.type === "password") {
//         input.type = "text";
//         icon.innerHTML = 'visibility';
//     } else {
//         input.type = "password";
//         icon.innerHTML = 'visibility_off';
//     }
// }

// /*******************
//  * EVENT LISTENERS
//  *******************/
// $('btnCadastroVoltar').addEventListener("click", () => { window.location.href = "./index.html" })
// $('btnTogglePassword').addEventListener("click", () => { togglePassword('password', 'togglePasswordIcon') });
// $('btnTogglePasswordConfirm').addEventListener("click", () => { togglePassword('passwordConfirm', 'togglePasswordConfirmIcon') });


// //Event Listener em cada input do Form
// idsInputsForm.forEach((id) => {
//     const element = $(id);
//     if (!element) return;

//     element.addEventListener('focusin', () => { clearFieldErrorMessage(`error${id.charAt(0).toUpperCase() + id.slice(1)}`) })
// })



