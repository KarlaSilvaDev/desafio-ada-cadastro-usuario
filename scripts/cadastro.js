import { Validators, validateField, REGEX, clearAllErrorMessages, clearFieldErrorMessage } from "./utils.js";

const $ = (id) => document.getElementById(id);

/*******************
 * MÁSCARAS
 *******************/
//TODO: Ver como o professor fez para permitir a edição do input com a máscara. Atualmente, está permitindo apenas editar a última parte.
function onInputPhoneNumber(event) {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);
    let formattedValue = "";

    if (value.length >= 7) {
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3, 7)}-${value.slice(7)}`;
    } else if (value.length >= 3) {
        formattedValue = `(${value.slice(0, 2)}) ${value.slice(2, 3)} ${value.slice(3)} `;
    } else if (value.length >= 2) {
        formattedValue = `(${value.slice(0, 2)}) `;
    } else if (value.length > 0) {
        formattedValue = `(${value.slice(0, 2)}`;
    }

    event.target.value = formattedValue;
}
//TODO: Ver como o professor fez para permitir a edição do input com a máscara. Atualmente, está permitindo apenas editar a última parte.
function onInputCpf(event) {
    let value = event.target.value.replace(/\D/g, "").slice(0, 11);
    let formattedValue = "";

    if (value.length >= 9) {
        formattedValue = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length >= 6) {
        formattedValue = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length >= 3) {
        formattedValue = `${value.slice(0, 3)}.${value.slice(3)}`;
    } else if (value.length > 0) {
        formattedValue = value;
    }

    event.target.value = formattedValue;
}

/*******************
 * FORM
 *******************/
const newUserForm = $("newUserForm");

if (newUserForm) {
    const nameInput = $("name");
    const phoneNumberInput = $("phoneNumber");
    const addressInput = $("address");
    const cpfInput = $("cpf");
    const passwordInput = $("password");
    const emailInput = $("email");

    emailInput.value = localStorage.getItem("userEmail");


    phoneNumberInput.addEventListener("input", (event) => {
        onInputPhoneNumber(event);
    });

    cpfInput.addEventListener("input", (event) => {
        onInputCpf(event);
    });

    newUserForm.addEventListener("submit", (event) => {
        event.preventDefault();
        clearAllErrorMessages();

        const name = nameInput.value.trim();
        const phoneNumber = phoneNumberInput.value.trim();
        const address = addressInput.value.trim();
        const cpf = cpfInput.value.trim();
        const password = passwordInput.value.trim();

        const valid = [
            validateField(
                name,
                [Validators.required(), Validators.noDigits("O nome não pode conter números"), Validators.minLen(3, "O campo nome deve ter no mínimo 3 caracteres")],
                "errorName"
            ),
            validateField(
                phoneNumber,
                [Validators.required(), Validators.pattern(REGEX.phoneNumber, "Telefone inválido")],
                "errorPhoneNumber"
            ),
            validateField(
                address,
                [Validators.required(), Validators.minLen(3, "O campo endereço deve ter no mínimo 3 caracteres")],
                "errorAddress"
            ),
            validateField(
                cpf,
                [Validators.required(), Validators.pattern(REGEX.cpf, "CPF inválido")],
                "errorCpf"
            ),
            validateField(
                password,
                [Validators.required(), Validators.pattern(REGEX.password, "A senha deve ter 8+ caracteres, pelo menos 1 letra maiúscula e 1 número")],
                "errorPassword"
            )
        ].every(Boolean);

        if (!valid) return;

        //TODO: implemetar lógica para cadastro na API aqui
    })
}

$('btnCadastroVoltar').addEventListener("click", () => { window.location.href = "./index.html" })

//Função para coletar os Ids do form de cadastro de usuário
const idsInputsForm = Array.from(newUserForm.elements)
    .filter(element => element.type !== 'submit' && element.type !== 'button')
    .map(element => element.id)
    .filter(Boolean);

idsInputsForm.forEach((id) => {
    const element = $(id);
    if (!element) return;

    element.addEventListener('48focusin', () => { clearFieldErrorMessage(`error${id.charAt(0).toUpperCase() + id.slice(1)}`) })
})