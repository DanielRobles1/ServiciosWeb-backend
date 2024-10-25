const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const mongoose = require('mongoose');


// Registrar usuario
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El usuario ya está registrado' });
        }

        // Cifrar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear nuevo usuario
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        // Guardar usuario
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario: ' + error.message });
    }
};

// Iniciar sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }

        // Crear y enviar token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión: ' + error.message });
    }
};

// Obtener perfil de usuario
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Excluir el campo de contraseña
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el perfil: ' + error.message });
    }
};
//borrar
exports.deleteus = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('ID recibido:', userId);//para saber si recibe el id

        // Valida si el ID es un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('ID no válido');
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Buscar usuario por ID
        const user = await User.findById(userId);
        console.log('Usuario encontrado:', user); // Imprime el usuario encontrado o null

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }

        // Eliminar usuario si existe
        await User.findByIdAndDelete(userId);
        console.log('Usuario eliminado correctamente');
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error); //imprime error asi vemos como solucionar
        res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
};

//Actualizar
exports.actuauser = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log('ID recibido:', userId); //para saber si recibe el id

        
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('ID no válido');
            return res.status(400).json({ message: 'ID inválido' });
        }

        // Buscar usuario por ID
        const user = await User.findById(userId);
        console.log('Usuario encontrado:', user); // Imprimir el usuario encontrado o null

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Recurso no encontrado' });
        }
//hh
        // Actualizar usuario si existe
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }); 
        console.log('Usuario actualizado correctamente', updatedUser); // Imprimir el usuario actualizado

        res.status(200).json({ message: 'Usuario actualizado correctamente', user: updatedUser });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error); // Imprimir el error
        res.status(500).json({ message: 'Error interno del servidor' }); 
    }
};