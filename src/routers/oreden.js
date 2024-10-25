const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const verifyToken = require('../middleware/authMiddleware'); 
// Crear una nueva orden
router.post('/', verifyToken, orderController.createOrder); 

// Obtener todas las órdenes del usuario autenticado
router.get('/', verifyToken, orderController.getUserOrders); 
// Obtener una orden específica
router.get('/:id', verifyToken, orderController.getOrderById); 
module.exports = router;
