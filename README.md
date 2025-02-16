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
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

1. **Clonar o repositório** ou baixar o código:
   ```bash
   git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
