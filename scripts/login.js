import { REGEX, Validators, validateField, clearAllErrorMessages } from './utils.js';

const $ = (id) => document.getElementById(id);

function checkEmail() {
    const email = $("emailLogin").value.trim();

    const valid = [
        validateField(email, [Validators.required(), Validators.pattern(REGEX.email, "Email inválido")], "errorLoginEmail")
    ].every(Boolean);


    if (!valid) {
        return;
    }

    localStorage.setItem("userEmail", email); //salvo no localStorage para acessarmos nas tela seguintes

    //TODO: implementar abaixo a lógica para checar se o email existe na base de dados

    const registeredEmail = false;

    if (!registeredEmail) {
        window.location.href = "./cadastro.html"
    } else {
        window.location.href = "./login.html"
    }
}

function login() {
    clearAllErrorMessages();
    const password = $('passwordLogin').value.trim();

    const valid = validateField(password, [Validators.required(), Validators.pattern(REGEX.noSpace, "A senha não deve conter espaços")], "errorPasswordLogin");

    if (!valid) {
        console.log("teste")
    }
    //TODO: Implementar lógica de login. Verificar via API se a senha inserida é igual a senha cadastrada no banco de dados para o email informado
}

function goToRegistrationPage(event) {
    event.preventDefault;
    console.log("teste")
    localStorage.removeItem("userEmail")
    window.location.href = "./cadastro.html";
}

function togglePassword(inputId, iconId) {
    const input = $(inputId);
    const icon = $(iconId);

    if (input.type === "password") {
        input.type = "text";
        icon.innerHTML = 'visibility';
    } else {
        input.type = "password";
        icon.innerHTML = 'visibility_off';
    }
}

$('btnAvancar')?.addEventListener('click', checkEmail);
$('btnLogin')?.addEventListener('click', () => { login() });
$('btnLoginVoltar')?.addEventListener('click', () => { window.location.href = './index.html' });
$('emailLogin')?.addEventListener('focusin', () => { clearAllErrorMessages() });
$('passwordLogin')?.addEventListener('focusin', () => { clearAllErrorMessages() });
$('btnCreateAccount')?.addEventListener("click", goToRegistrationPage);
$('btnTogglePasswordLogin')?.addEventListener("click", () => { togglePassword('passwordLogin', 'togglePasswordLoginIcon') })


//TODO: Falta inserir o erro em que a senha é inválida