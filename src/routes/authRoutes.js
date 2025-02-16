// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');

// Página inicial
router.get('/', (req, res) => {
    res.render('index');
});

// Exibir formulário de login
router.get('/login', authController.showLogin);
router.post('/login', authController.login);

// Exibir formulário de registro
router.get('/register', authController.showRegister);

// Aqui: aplicar upload.single('profileImage') para tratar a imagem
router.post('/register', upload.single('profileImage'), authController.register);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
