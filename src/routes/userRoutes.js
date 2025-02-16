// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// Todas as rotas de gerenciamento de usuários requerem login e permissão >= 4
router.get('/manage', authMiddleware, permissionMiddleware(4), userController.manageUsers);

// Upload da imagem no create e update
router.post(
    '/create',
    authMiddleware,
    permissionMiddleware(4),
    upload.single('profileImage'),
    userController.createUser
);

router.put(
    '/update/:id',
    authMiddleware,
    permissionMiddleware(4),
    upload.single('profileImage'),
    userController.updateUser
);

router.delete(
    '/delete/:id',
    authMiddleware,
    permissionMiddleware(4),
    userController.deleteUser
);

module.exports = router;
