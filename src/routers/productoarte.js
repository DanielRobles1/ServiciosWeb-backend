const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todas las artesanías
router.get('/', productController.getAllProducts);

// Crear una nueva artesanía
router.post('/', productController.createProduct);

// Obtener artesanía por su ID
router.get('/:id', productController.getProductById);

// Actualizar una artesanía por ID
router.put('/:id', productController.updateProductById);

// Eliminar artesanía por ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;
