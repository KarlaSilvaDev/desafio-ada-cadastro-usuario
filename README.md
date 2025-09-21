# CaixaVerso - Desafio Módulo 2 (ADA)

Este projeto foi desenvolvido como parte do **Desafio do Módulo 2 da trilha Full Stack da ADA**.  
O objetivo é implementar o **frontend** de um sistema de autenticação e gerenciamento de usuários consumindo uma **API já fornecida pelo professor**.

---

## 🚀 Tecnologias Utilizadas

- **HTML5**  
- **CSS3** (TailwindCSS + estilos próprios)  
- **JavaScript (ES Modules)**  
- **Fetch API** para consumo do backend  
- **Session Storage** para controle de sessão  

---

## 📂 Estrutura do Projeto

```bash
src/
 ├── apis/                # Camada de comunicação com a API (fetch)
 │    └── users.js
 ├── assets/              # Arquivos estáticos
 │    ├── css/            # Estilos
 │    ├── img/            # Imagens
 │    └── js/             # Controle do DOM (event listeners, interações)
 │         ├── cadastro.js
 │         ├── login.js
 │         └── index.js
 |
 ├── services/            # Regras de negócio
 │    ├── loginService.js
 │    └── usersService.js
 └── utils/               # Funções auxiliares
 |     ├── validators.js
 |     └── domUtils.js
 └── index.html  
 └── login.html  
 └── cadastro.html  
 └── profile.html  

```

## ⚙️ Funcionalidades

- [x] **Cadastro de usuário**  
- [x] **Login com validação de senha**  
- [x] **Validações de campos** (nome, CPF, email, senha, etc)  
- [x] **Exibição de mensagens de erro abaixo dos inputs**  
- [x] **Persistência temporária de sessão via `sessionStorage`**  
- [x] **Página de perfil** com opções para:  
  - Consultar informações do usuário logado  
  - Atualizar dados  
  - Deletar a conta  

---

## 🔑 Fluxo de Autenticação

1. Usuário informa o **email** (index.html).  
   - Se não existir, é redirecionado para **cadastro**.  
   - Se existir, é redirecionado para **login**.  

2. Usuário faz login informando a senha.  
   - API retorna um **token JWT**.  
   - O token é salvo no `sessionStorage`.  

3. Usuário acessa a página **profile.html**, onde pode:  
   - Visualizar seus dados (GET `/users`)  
   - Atualizar informações (PUT `/users/:id`)  
   - Deletar a conta (DELETE `/users/:id`)  

---

## 📦 Como Rodar o Projeto Localmente

1. Clone este repositório:  

```bash
git clone https://github.com/seu-usuario/caixaverso-ada-desafio2.git
```

2. Entre na pasta do projeto:

```bash
cd caixaverso-ada-desafio2 
```

3. Abra o arquivo index.html no navegador (ou utilize uma extensão como Live Server do VS Code para simular um servidor local).

> ⚠️ O backend já está disponível em:  
> [https://api-desafio-modulo-2-ada.onrender.com/api](https://api-desafio-modulo-2-ada.onrender.com/api)  
> Não é necessário rodar nada adicional para a API.

## 🛠️ Melhorias Futuras

- Implementar logout explícito  
- Testes automatizados de validação  
- Melhor experiência de edição de inputs com máscara (telefone e CPF)  
- Estilização aprimorada da página de perfil  
- Permitir a edição dos dados do usuário logado
