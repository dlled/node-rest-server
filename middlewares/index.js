
const validarJWT = require('./validar-jwt');
const {adminValidator, hasRol} = require('./validar-rol');
const validarCampos = require('./validator');

module.exports = {
    ...validarJWT,
    ...adminValidator,
    ...hasRol,
    ...validarCampos
}