# Sistema de Login Avançado em Node.js

Este repositório contém um sistema de login completo, com gerenciamento de usuários, níveis de permissão e upload de imagem de perfil. O projeto faz uso do framework **Express** para o servidor, **Sequelize** para interação com o banco de dados **PostgreSQL**, **EJS** como engine de views, além de outras bibliotecas para lidar com sessões, upload de arquivos e criptografia de senhas.

---

## Recursos Principais

### Cadastro de Usuários com:
- Nome, E-mail, Senha, Telefone, Endereço, Data de Nascimento  
- **Upload de foto de perfil** (até 5MB), salva no banco (BLOB)  
- **Nível de permissão padrão** 0 (usuário comum)

### Login/Logout:
- Senhas criptografadas (bcrypt)  
- Sessões gerenciadas via express-session  

### Níveis de Permissão (role):
- 0: Usuário comum  
- 1, 2, 3: Níveis intermediários (exemplo)  
- 4: Administrador  

### Gerenciamento de Usuários (apenas para admin, role >= 4):
- Listar usuários ativos  
- Criar novo usuário (com upload de imagem)  
- Editar usuário (atualizar dados, redefinir senha, alterar imagem)  
- Excluir usuário (exclusão lógica – active = false)

### Permissões de Rotas:
- Middleware que impede usuários sem permissão de acessar rotas restritas  
- Exibição condicional de links no menu com base no role  

### Upload de Imagens:
- Uso do **multer** com limite de 5MB  
- Salvando imagens diretamente no banco (campo BLOB)

### Layout:
- **EJS** como template engine  
- **Bootstrap 5** para estilização  
- Estrutura de pastas organizada  

---

## Tecnologias Utilizadas
- **Node.js** e **Express**: estrutura principal do servidor e roteamento  
- **EJS**: engine de templates para renderizar páginas do lado do servidor  
- **Sequelize**: ORM para interagir com o banco PostgreSQL  
- **PostgreSQL**: banco de dados relacional  
- **express-session + connect-flash**: gerenciamento de sessão e mensagens de feedback  
- **bcrypt**: criptografia de senhas  
- **multer**: upload de arquivos (imagens)  
- **Bootstrap 5**: estilização e layout responsivo  

---

## Pré-requisitos
Antes de iniciar, certifique-se de ter instalado em sua máquina:
- **Node.js** (versão 14+ recomendada)
- **npm** ou **yarn**
- **PostgreSQL** (executando e acessível)

---

## Instalação

1. **Clonar o repositório** ou baixar o código:
   ```bash
   git clone https://github.com/EdineiMZ/Site-Base-com-Login

2. **Entre no diretório do projeto:
   ```bash
   cd Site-Base-com-Login

3. **Instale as dependências:
   ```bash
   npm install

4. **Configurar variáveis de ambiente:
   Crie um arquivo .env na raiz do projeto com as seguintes chaves (ajuste valores conforme seu ambiente):
   ```env
   DB_HOST=localhost
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   DB_NAME=seu_banco
   DB_DIALECT=postgres
   DB_PORT=5432

   SESSION_SECRET=uma_chave_secreta
   PORT=3000


5. **Configurar o banco de dados:
   - No seu PostgreSQL, crie um banco de dados com o mesmo nome definido em DB_NAME do .env.
   - Você pode usar o sequelize.sync() (padrão do projeto) para criar as tabelas automaticamente ou rodar migrations, caso tenha configurado migrations e seeders.
   

6. **Executar o servidor:
   ```bash
   npm run dev
   ```
   
   Ou
   
   ```bash
   npm start
   ```

8. **Acessar no navegador:
   ```bash
   http://localhost:3000
   ```
   Página inicial: index.ejs
   Registro: /register
   Login: /login
   Gerenciamento de usuários (apenas para role >= 4): /users/manage
   Rotas de exemplo com diferentes permissões:
   /pages/page1 (role >= 1)
   /pages/page2 (role >= 3)

---

### Estrutura de Pastas (Simplificada)
```
.
├── .env
├── package.json
├── server.js
├── src
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── pagesRoutes.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── pagesController.js
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── permissionMiddleware.js
│   │   └── uploadMiddleware.js
│   └── views
│       ├── partials
│       │   ├── header.ejs
│       │   └── footer.ejs
│       ├── auth
│       │   ├── login.ejs
│       │   └── register.ejs
│       ├── users
│       │   └── manageUsers.ejs
│       ├── pages
│       │   ├── page1.ejs
│       │   └── page2.ejs
│       └── index.ejs
├── database
│   ├── models
│   │   ├── index.js
│   │   └── user.js
│   ├── migrations
│   └── seeders
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
└── ...
```
---

### USO

Cadastrar-se com um novo usuário em /register.

Por padrão, terá role = 0.
Se quiser criar um usuário admin (role = 4), use o gerenciamento de usuários ou faça um update manual no banco.
Fazer login em /login.

Se active = true e a senha estiver correta, a sessão será criada.
Gerenciar usuários (se role >= 4):

Acesse /users/manage para criar, editar e inativar usuários.
É possível enviar/alterar a imagem de perfil na criação/edição.
Páginas restritas:

/pages/page1 (role >= 1)
/pages/page2 (role >= 3)

---

Feito por EdineiMZ
Sinta-se livre para contribuir, reportar issues ou sugerir melhorias!


