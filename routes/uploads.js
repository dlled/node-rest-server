const {Router} = require('express');
const { check } = require('express-validator');
const { loadFile, updateFileCloud, getFileCloud } = require('../controllers/uploads');
const { validarCampos } = require('../middlewares/validator');
const { updateFile, getFile } = require('../controllers/uploads');
const { existeColeccion } = require('../helpers');
const { validarArchivo } = require('../middlewares/validar-archivo');

const router = Router();

router.post('/', validarArchivo, loadFile);

router.put('/:coleccion/:id', [
    check('id', 'Debe ser un id de MongoDB').isMongoId(),
    check('coleccion').custom( c => existeColeccion(c, ['users', 'productos', 'categorias'])),
    validarArchivo,
    validarCampos
], updateFileCloud );

router.get('/:coleccion/:id', [
    check('id', 'Debe ser un id de MongoDB').isMongoId(),
    check('coleccion').custom( c => existeColeccion(c, ['users', 'productos', 'categorias'])),
    validarCampos
], getFileCloud )

module.exports = router;