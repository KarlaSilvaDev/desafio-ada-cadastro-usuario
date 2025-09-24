import { deleteUserProfile } from "../../services/usersService.js"
import { validateForm } from "../../utils/validateForm.js";
import { formRules } from "../../utils/formRules.js";
import { clearAllErrorMessages, clearFieldErrorMessage } from "../../utils/formHelpers.js";
import { onInputCpf, onInputPhoneNumber } from "../../utils/masks.js";
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

        $('btnEdit')?.addEventListener('click', () => abrirFormEdicao(user));
    } catch (error) {
        alert("Erro ao carregar perfil.");
        sessionStorage.clear();
        window.location.href = "./index.html"
    }
}

function abrirFormEdicao(user) {
    const container = $("profileData");

    container.innerHTML = `
       <form id="formEdit" class="flex flex-col gap-5">
            <div>
              <label for="name" class="block text-gray-700">Nome *</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">person</span>
                <input 
                  type="text" 
                  id="name" 
                  class="w-full p-3 pl-10 border rounded hover:border-fuchsia-500 focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 text-gray-700" 
                  aria-errormessage="errorName">
              </div>
              <span id="errorName" role="alert" class="flex items-center gap-1 text-red-500 text-base mt-1 font-medium"></span>       
            </div>

            <div>
              <label for="email" class="block text-gray-700">Email *</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">mail</span>
                <input 
                  type="text" 
                  id="email" 
                  class="w-full p-3 pl-10 border rounded text-gray-700 hover:border-fuchsia-500 focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600"
                  aria-errormessage="errorEmail">
              </div>
              <span id="errorEmail" role="alert" class="flex items-center gap-1 text-red-500 text-base mt-1 font-medium"></span>
            </div>
            
            <div>
              <label for="cpf" class="block text-gray-700">CPF *</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">badge</span>
                <input 
                    type="text" 
                    id="cpf" 
                    placeholder="000.000.000-00" 
                    maxlength="14"
                    class="w-full p-3 pl-10 border rounded hover:border-fuchsia-500 focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 text-gray-700" 
                    aria-errormessage="errorCpf">
              </div>
              <span id="errorCpf" role="alert" class="flex items-center gap-1 text-red-500 text-base mt-1 font-medium"></span>
            </div>

            <div>
              <label for="phoneNumber" class="block text-gray-700">Telefone *</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">phone</span>
                <input 
                  type="text" 
                  id="phoneNumber" 
                  placeholder="(00) 9 9999-9999" 
                  class="w-full pl-10 p-3 border rounded hover:border-fuchsia-500 focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 text-gray-700" 
                  aria-errormessage="errorPhoneNumber">
              </div>
              <span id="errorPhoneNumber" role="alert" class="flex items-center gap-1 text-red-500 text-base mt-1 font-medium"></span>
            </div>

            <div>
              <label for="address" class="block text-gray-700">Endereço *</label>
              <div class="relative">
                <span class="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-300">home</span>
                <input 
                  type="text" 
                  id="address" 
                  class="w-full p-3 pl-10 border rounded hover:border-fuchsia-500 focus:outline-none focus:border-fuchsia-600 focus:ring-1 focus:ring-fuchsia-600 text-gray-700" 
                  aria-errormessage="errorAddress">
              </div>
              <span id="errorAddress" role="alert" class="flex items-center gap-1 text-red-500 text-base mt-1 font-medium"></span>
            </div>
   
            <div class="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-3">
              <button 
                  type="button" 
                  class=" w-full border border-purple-600 text-purple-600 py-2 rounded hover:bg-purple-200 hover:font-bold mt-5" 
                  id="btnCancelUpdate">
                  Cancelar
              </button>
              <button 
                  type="submit" 
                  class="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 hover:font-bold mt-5" 
                  id="btnUpdateUser">
                  Salvar
              </button>
            </div>
          </form>`;


    $('phoneNumber').addEventListener("input", onInputPhoneNumber);
    $("cpf").addEventListener("input", onInputCpf);

    $("formEdit")?.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearAllErrorMessages();

        const formData = {
            name: $("name").value.trim(),
            phoneNumber: $("phoneNumber").value.trim(),
            address: $("address").value.trim(),
            email: $("email").value.trim(),
            cpf: $("cpf").value.trim(),
        };

        const isValid = validateForm(formData, formRules.update);
        if (!isValid) { return; }

        try {
            const userId = sessionStorage.getItem("userId");
            await usersService.updateUserProfile(userId, {
                nome: formData.name,
                telefone: formData.phoneNumber,
                endereco: formData.address,
                email: formData.email,
                cpf: formData.cpf
            });

            alert("Dados atualizados com sucesso!")
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    });

    Array.from($("formEdit").elements)
        .filter((element) => element.type !== "submit" && element.type !== "button")
        .forEach((element) => {
            element.addEventListener("focusin", () => {
                console.log("teste")
                clearFieldErrorMessage(`error${capitalize(element.id)}`)
            });
        });

    $("btnCancelUpdate")?.addEventListener("click", () => window.location.reload());
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