
const {Router} = require('express');
const { check } = require('express-validator');
const { userGet, userPut, userDelete, userPost } = require('../controllers/user');
const { roleValidator, emailValidator, userByIdValidator } = require('../helpers/db_validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { adminValidator, hasRol } = require('../middlewares/validar-rol');
const { validarCampos } = require('../middlewares/validator');

const router = Router();

router.get('/', userGet);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(userByIdValidator),
    check('rol').custom(roleValidator),
    validarCampos
], userPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailValidator),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6}),
    //check('rol', 'El correo no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // El custom asigna el primer argumento de la función al argumento del callback, no hace falta poner
    check('rol').custom(roleValidator),
    validarCampos
], userPost);

router.delete('/:id',[
    validarJWT,
    adminValidator,
    hasRol('ADMIN_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(userByIdValidator),
    validarCampos
], userDelete);

module.exports = router;