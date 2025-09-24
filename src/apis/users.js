const API_BASE_LOCAL = "http://localhost:3000/api";
const API_BASE_DEPLOY = "https://api-desafio-modulo-2-ada.onrender.com/api";


async function getApiBase() {
    try {
        const response = await fetch(`${API_BASE_LOCAL}/health`, { method: "GET" });
        if (response.ok) { return API_BASE_LOCAL };
    } catch (error) {
        console.error("A aplicação não está rodando localmente.")
    }
    return API_BASE_DEPLOY;
}
export async function getUserByEmail(email) {
    try {
        const base = await getApiBase();
        const response = await fetch(`${base}/users/validate-email?email=${encodeURIComponent(email)}`);

        if (response.status === 204) { return { userExists: false } };
        if (response.status === 409) { return { userExists: true } };

        const error = await response.json();
        throw new Error(error.error || "Erro inesperado")
    } catch (error) {
        throw new Error(error.message || "Falha na conexão com servidor");
    }
}

export async function createUser(userData) {
    try {
        const base = await getApiBase();
        const response = await fetch(`${base}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Falha ao criar usuário");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Falha na conexão com o servidor");
    }
}



export async function login(email, senha) {
    try {
        const base = await getApiBase();
        const response = await fetch(`${base}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            const error = await response.json();

            if (response.status === 401) { throw new Error("A senha informada está incorreta"); }
            if (response.status === 500) { throw new Error("Erro inesperado. Tente novamente."); }

            throw new Error(error.error || "Falha no login");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Falha na conexão com o servidor.")
    }
}

export async function getUser(token) {
    try {
        const base = await getApiBase();
        const response = await fetch(`${base}/users`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Falha ao buscar usuário");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Falha na conexão com o servidor.")
    }
}

export async function updateUser(id, token, userData) {
    try {
        const base = await getApiBase();
        const response = await fetch(`${base}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Falha ao atualizar usuário");
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Falha na conexão com o servidor.")
    }
}

export async function deleteUser(id, token) {
    try {
        const base = await getApiBase();
        const response = await fetch(`${base}/users/${id}`, {
            method: "DELETE",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || "Falha ao deletar usuário");
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message || "Falha na conexão com o servidor.")
    }
}
