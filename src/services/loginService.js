
import * as usersApi from '../apis/users.js';
import { validateEmail, validatePassword } from './validationService.js';

export async function checkEmailAndRedirect(email) {
    const emailError = validateEmail(email);

    if (emailError) { throw new Error(emailError); }

    const { userExists } = await usersApi.getUserByEmail(email);
    sessionStorage.setItem("userEmail", email); //salvo no sessionStorage para acessarmos na tela seguinte. Não usei localStorage porque não precisamos manter esse dado caso o navegador seja fechado

    return userExists ? "./login.html" : "./cadastro.html";
}

export async function login(email, password) {
    const passwordError = validatePassword(password);

    if (passwordError) { throw new Error(passwordError); }

    try {
        const { token } = await usersApi.login(email, password);

        sessionStorage.setItem("token", token);
        sessionStorage.removeItem("userEmail");

        return token;
    } catch (error) {
        throw new Error(error.message || "Erro inesperado. Tente novamente.")
    }

}