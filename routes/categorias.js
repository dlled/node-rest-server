
const {Router, response, request} = require('express');
const { check } = require('express-validator');
const { crearCategoria, categoriasGet, categoriaPorId, categoriaUpdate, categoriaDelete } = require('../controllers/categorias');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validator');
const { categoriaByIdValidator} = require('../helpers/db_validators');
const { adminValidator } = require('../middlewares/validar-rol');




const router = Router();
/**
 * {{url}}/api/categorias
 */


 // Obtener las categorías -- public
router.get('/', categoriasGet)

// Obtener una categoria -- public
router.get('/:id', [
    check('id', 'No es un id de mongoId').isMongoId(),
    check('id', 'Esa categoría no existe').custom(categoriaByIdValidator),
    validarCampos
],categoriaPorId)

// Crear una categoria -- privado, cualquier rol, es decir, vale con un token válido
router.post('/',[ 
   validarJWT,
   check('nombre', 'El nombre es obligatorio').notEmpty(),
   validarCampos
 ], crearCategoria)

// Actualizar una categoria -- privado, cualquier rol, es decir, vale con un token válido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un id de mongoId').isMongoId(),
  check('id', 'Esa categoría no existe').custom(categoriaByIdValidator),
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  validarCampos
], categoriaUpdate)

// Borrar una categoría -- privado, solo admins
router.delete('/:id', [
  validarJWT,
  adminValidator,
  check('id', 'No es un id de mongoId').isMongoId(),
  check('id', 'Esa categoría no existe').custom(categoriaByIdValidator),
  validarCampos

], categoriaDelete);

module.exports = router;