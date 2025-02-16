require('dotenv').config();
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');
const path = require('path');

const { sequelize } = require('./database/models');
const { User } = require('./database/models'); // Para buscar o usuário do DB

// Rotas
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const pagesRoutes = require('./src/routes/pagesRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'segredo';

// Middlewares básicos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Configurar sessão
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Flash messages
app.use(flash());

// Middleware que injeta variáveis locais para a view
// (mensagens flash, erros, etc.)
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    // Aqui estamos setando user como null inicialmente
    // Ele será atualizado no próximo middleware se estiver logado
    res.locals.user = null;
    next();
});

// AQUI vem o middleware para buscar o usuário do DB e incluir 'profileImage'
app.use(async (req, res, next) => {
    if (req.session.user) {
        try {
            const dbUser = await User.findByPk(req.session.user.id);
            if (dbUser) {
                res.locals.user = {
                    id: dbUser.id,
                    name: dbUser.name,
                    role: dbUser.role,
                    profileImage: dbUser.profileImage,
                    active: dbUser.active,
                };
            }
        } catch (error) {
            console.error('Erro ao buscar usuário no middleware:', error);
        }
    }
    next();
});

// View engine e diretório de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Rotas
app.use('/', authRoutes);
app.use('/users', userRoutes);
app.use('/pages', pagesRoutes);

// Sincroniza com o banco e inicia o servidor
sequelize
    .sync()
    .then(() => {
        console.log('Banco de dados sincronizado com sucesso!');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Erro ao sincronizar o banco de dados:', error);
    });
