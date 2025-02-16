// src/controllers/userController.js
const { User } = require('../../database/models');
const bcrypt = require('bcrypt');

module.exports = {
    // Exibe a página de gerenciamento de usuários (apenas usuários ativos)
    manageUsers: async (req, res) => {
        try {
            const users = await User.findAll({
                where: { active: true } // Filtra somente ativos
            });
            res.render('users/manageUsers', { users });
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao listar usuários.');
            return res.redirect('/');
        }
    },

    // Cria um novo usuário (somente um usuário com role=4 pode definir a permissão)
    createUser: async (req, res) => {
        try {
            const { name, email, password, phone, address, dateOfBirth, role } = req.body;
            const currentUser = req.session.user; // Usuário logado (admin)

            // Verificar se já existe email no banco
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                req.flash('error_msg', 'E-mail já cadastrado.');
                return res.redirect('/users/manage');
            }

            // Se quem está criando for admin (role=4), pode definir 'role' do form
            // Caso contrário, força 0
            const newUserRole = currentUser.role === 4 ? role : 0;

            // Se houver arquivo enviado
            let profileBuffer = null;
            if (req.file) {
                profileBuffer = req.file.buffer;
            }

            await User.create({
                name,
                email,
                password,
                phone,
                address,
                dateOfBirth,
                role: newUserRole || 0,
                profileImage: profileBuffer
            });

            req.flash('success_msg', 'Usuário criado com sucesso!');
            return res.redirect('/users/manage');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao criar usuário.');
            return res.redirect('/users/manage');
        }
    },

    // Atualiza um usuário existente
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, email, password, phone, address, dateOfBirth, role, active } = req.body;

            const currentUser = req.session.user; // Usuário logado
            const user = await User.findByPk(id);

            if (!user) {
                req.flash('error_msg', 'Usuário não encontrado.');
                return res.redirect('/users/manage');
            }

            // Campos básicos
            user.name = name;
            user.email = email;
            if (password) {
                user.password = password; // será criptografado via hook
            }
            user.phone = phone;
            user.address = address;
            user.dateOfBirth = dateOfBirth;

            // Se for admin (role=4), pode mudar role e active
            if (currentUser.role === 4) {
                user.role = role;
                user.active = (active === 'true');
            }

            // Se foi enviado um novo arquivo
            if (req.file) {
                user.profileImage = req.file.buffer;
            }

            await user.save();
            req.flash('success_msg', 'Usuário atualizado com sucesso!');
            return res.redirect('/users/manage');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao atualizar usuário.');
            return res.redirect('/users/manage');
        }
    },

    // "Exclui" usuário (marca active = false)
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                req.flash('error_msg', 'Usuário não encontrado.');
                return res.redirect('/users/manage');
            }

            // Exclusão lógica
            user.active = false;
            await user.save();

            req.flash('success_msg', 'Usuário marcado como inativo.');
            return res.redirect('/users/manage');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao excluir usuário.');
            return res.redirect('/users/manage');
        }
    }
};
