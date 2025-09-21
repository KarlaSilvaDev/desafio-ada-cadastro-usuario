import * as loginService from '../../services/loginService.js'
import { showErrorMessage, clearField, togglePassword, clearAllErrorMessages } from '../../utils/formHelpers.js'

const $ = (id) => document.getElementById(id);


$('emailLogin')?.addEventListener('focusin', () => { clearAllErrorMessages() });
$('passwordLogin')?.addEventListener('focusin', () => { clearAllErrorMessages() });


$('btnAvancar')?.addEventListener('click', async (event) => {
    event.preventDefault();
    const emailValue = $("emailLogin").value.trim();

    try {
        const nextPage = await loginService.checkEmailAndRedirect(emailValue);
        window.location.href = nextPage;
    } catch (error) {
        showErrorMessage("errorLoginEmail", error.message)
    }
});
$('btnLogin')?.addEventListener('click', async (event) => {
    clearAllErrorMessages();
    event.preventDefault();

    const email = sessionStorage.getItem("userEmail");
    const password = $('passwordLogin').value.trim();

    try {
        await loginService.login(email, password);

        window.location.href = "../pages/profile.html"
    } catch (error) {
        showErrorMessage("errorPasswordLogin", error.message);
        clearField("passwordLogin");
    }
});
$('btnCreateAccount')?.addEventListener("click", () => {
    sessionStorage.removeItem("userEmail")
    window.location.href = "./cadastro.html";
});
$('btnTogglePasswordLogin')?.addEventListener("click", () => { togglePassword('passwordLogin', 'togglePasswordLoginIcon') });
$('btnLoginVoltar')?.addEventListener('click', () => { window.location.href = './index.html' });

