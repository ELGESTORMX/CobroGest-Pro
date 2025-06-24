const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UsuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // nombre de usuario o email
  passwordHash: { type: String, required: true },            // contraseña hasheada
  email: { type: String, required: true, unique: true },     // para notificaciones y recuperación
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // permisos y accesos
  nombreCompleto: { type: String },                           // nombre real para personalización
  telefono: { type: String },                                 // contacto adicional
  fechaRegistro: { type: Date, default: Date.now },           // para auditoría y estadísticas
  activo: { type: Boolean, default: true },                   // estado de la cuenta
  // Opcional: configuración de notificaciones, preferencias, etc.
});

// Método para comparar password
UsuarioSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('Usuario', UsuarioSchema);
