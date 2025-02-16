// src/controllers/authController.js
const { User } = require('../../database/models');
const bcrypt = require('bcrypt');

module.exports = {
    // Renderiza a página de login
    showLogin: (req, res) => {
        res.render('auth/login');
    },

    // Lida com o POST de login
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ where: { email, active: true } });
            if (!user) {
                req.flash('error_msg', 'Usuário não encontrado ou inativo.');
                return res.redirect('/login');
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                req.flash('error_msg', 'Senha incorreta.');
                return res.redirect('/login');
            }

            // Salva dados do usuário na sessão
            req.session.user = {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                active: user.active,
                // profileImage: user.profileImage // cuidado ao colocar buffer na sessão (pode ficar grande!)
            };

            req.flash('success_msg', 'Login realizado com sucesso!');
            return res.redirect('/');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao fazer login.');
            return res.redirect('/login');
        }
    },

    // Renderiza a página de registro
    showRegister: (req, res) => {
        res.render('auth/register');
    },

    // Lida com o POST de registro + Upload
    register: async (req, res) => {
        try {
            const { name, email, password, phone, address, dateOfBirth } = req.body;

            // Verifica se já existe email no banco
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                req.flash('error_msg', 'E-mail já cadastrado.');
                return res.redirect('/register');
            }

            // Forçamos role=0 para todo cadastro público
            // Pega buffer da imagem, se houver
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
                role: 0,
                profileImage: profileBuffer
            });

            req.flash('success_msg', 'Cadastro realizado com sucesso! Faça login.');
            return res.redirect('/login');
        } catch (err) {
            console.error(err);
            req.flash('error_msg', 'Erro ao cadastrar usuário.');
            return res.redirect('/register');
        }
    },

    // Efetua logout
    logout: (req, res) => {
        req.session.destroy((err) => {
            return res.redirect('/login');
        });
    }
};
