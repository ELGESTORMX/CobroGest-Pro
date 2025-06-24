const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password, nombreCompleto, telefono } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Faltan datos obligatorios' });
    }

    // Verificar si usuario o email ya existe
    const existingUser = await Usuario.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ msg: 'Usuario o email ya existe' });
    }

    // Hashear la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const newUser = new Usuario({
      username,
      email,
      passwordHash, // Asegúrate que el campo en el esquema es passwordHash
      nombreCompleto,
      telefono,
      role: 'user',
      activo: true, // Si usas este campo, inicialízalo aquí
    });

    await newUser.save();

    res.status(201).json({ msg: 'Usuario creado correctamente' });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ msg: 'Error en registro', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'Faltan datos' });
    }

    const user = await Usuario.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    // Verificar si la cuenta está activa (opcional)
    if (user.activo === false) {
      return res.status(403).json({ msg: 'Cuenta inactiva, contacte al administrador' });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, username: user.username, role: user.role });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ msg: 'Error en login', error: error.message });
  }
};

module.exports = { register, login };
