import { getUserProfile, updateUserProfile, deleteUserProfile } from "../../services/usersService.js"
import * as usersService from "../../services/usersService.js"

const $ = (id) => document.getElementById(id);

async function loadProfile() {
    try {
        const user = await usersService.getUserProfile();

        $("profileName").textContent = user.nome || "Não cadastrado";
        $("profileEmail").textContent = user.email || "Não cadastrado";
        $("profileCpf").textContent = user.cpf || "Não cadastrado";
        $("profilePhoneNumber").textContent = user.telefone || "Não cadastrado";
        $("profileAddress").textContent = user.endereco || "Não cadastrado";

        sessionStorage.setItem("userId", user.id);
    } catch (error) {
        alert("Erro ao carregar perfil.");
        sessionStorage.clear();
        window.location.href = "./index.html"
    }
}

$("btnLogout")?.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "./index.html";
});

$("btnDelete")?.addEventListener("click", async () => {
    if (!confirm("Tem certeza que deseja excluir sua conta?")) { return };

    try {
        const userId = sessionStorage.getItem("userId");
        await deleteUserProfile(userId);
        alert("Usuário deletado com sucesso!");
        sessionStorage.clear();
        window.location.href = "./index.html";
    } catch (error) {
        alert(error.message);
    }
});

loadProfile();