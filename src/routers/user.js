const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware'); 
// Ruta para registrar usuario
router.post('/register', userController.register);

// Ruta para iniciar sesión
router.post('/login', userController.login);

// Ruta para obtener perfil de usuario
router.get('/profile', authMiddleware, userController.getProfile);
// Ruta para eliminar usuario
router.delete('/:id', authMiddleware, userController.deleteus);
//Ruta para actualizar info de usuaripo
router.patch('/:id', authMiddleware,userController.actuauser);

module.exports = router;
