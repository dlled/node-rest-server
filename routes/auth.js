const {Router} = require('express');
const { check } = require('express-validator');
const { authLogin, googleSignin } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validator');

const router = Router();



router.post('/login', [
    check('correo', 'El correo no es válido').isEmail(),
    check('correo', 'El correo es necesariox').not().isEmpty(),
    check('password', 'La contraseña es necesaria').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6}),
    validarCampos
],authLogin);

router.post('/google', [
    check('id_token', 'El id_token es necesario').not().isEmpty(),
    validarCampos
], googleSignin)

module.exports = router;