const Order = require('../models/oreden');

// Crear una nueva orden
exports.createOrder = async (req, res) => {
    const nuevaOrden = new Order(req.body);
    try {
        const savedOrden = await nuevaOrden.save();
        res.status(201).json(savedOrden);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener todas las órdenes del usuario autenticado
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }); // ID del usuario autenticado
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una orden específica
exports.getOrderById = async (req, res) => {
    try {
        const orden = await Order.findById(req.params.id);
        if (!orden) return res.status(404).json({ message: 'Orden no encontrada' });
        res.json(orden);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
