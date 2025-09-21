import * as usersApi from "../apis/users.js";
import { validateEmail, validatePassword } from "./validationService.js";

export async function getUserProfile() {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    try {
        return await usersApi.getUser(token);
    } catch (error) {
        throw new Error(error.message || "Falha ao carregar perfil do usuário");
    }
}

export async function updateUserProfile(userData) {
    const token = sessionStorage.getItem("token");
    const userId = userData.id;

    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    if (userData.email) {
        const emailError = validateEmail(userData.email);
        if (emailError) { throw new Error(emailError); }
    }

    if (userData.password) {
        const passwordError = validatePassword(userData.password);
        if (passwordError) { throw new Error(passwordError); }
    }

    try {
        return await usersApi.updateUser(userId, token, userData);
    } catch (error) {
        throw new Error(error.message || "Falha ao atualizar usuário")
    }
}

export async function deleteUserProfile(userId) {
    const token = sessionStorage.getItem("token");

    if (!token) {
        throw new Error("Usuário não autenticado");
    }

    try {
        return await usersApi.deleteUser(userId, token);
    } catch (error) {
        throw new Error(error.message || "Falha ao deletar usuário")
    }
}

export async function registerUser(userData, autoLogin = true) {
    const { name, phoneNumber, address, email, cpf, password } = userData;

    const apiPayload = {
        nome: name,
        telefone: phoneNumber,
        endereco: address,
        email,
        cpf,
        senha: password,
    };

    try {
        const created = await usersApi.createUser(apiPayload);

        if (autoLogin) {
            const { token } = await usersApi.login(email, password);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userEmail", email);
            return { created, token };
        }

        sessionStorage.setItem("userEmail", email);
        return { created };
    } catch (error) {
        throw new Error(error.message || "Falha ao criar usuário");
    }

}