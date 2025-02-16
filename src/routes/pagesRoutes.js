// src/routes/pagesRoutes.js
const express = require('express');
const router = express.Router();

const pagesController = require('../controllers/pagesController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');

// Página 1 requer permissão >= 1
router.get('/page1', authMiddleware, permissionMiddleware(1), pagesController.showPage1);

// Página 2 requer permissão >= 3
router.get('/page2', authMiddleware, permissionMiddleware(3), pagesController.showPage2);

module.exports = router;
