const {Router, response, request} = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validator');
const { adminValidator } = require('../middlewares/validar-rol');
const { crearProducto, 
        productoPorId, 
        productoUpdate, 
        getProductos, 
        productoDelete } = require('../controllers/productos');
const {productoByIdValidator, categoriaValidator, productoValidator, categoriaByIdValidator} = require('../helpers/db_validators')




const router = Router();
/**
 * {{url}}/api/productos
 */


 // Obtener los productos -- public
router.get('/', getProductos)

// Obtener un producto -- public
router.get('/:id', [
    check('id', 'No es un id de mongoId').isMongoId(),
    validarCampos
], productoPorId)

// Crear un producto -- privado, cualquier rol, es decir, vale con un token válido
router.post('/',[ 
   validarJWT,
   check('nombre', 'El nombre es obligatorio').notEmpty(),
   check('nombre', 'El tipo de producto debe de ser único').custom(productoValidator),
   check('categoria', 'Tiene que existir esa categoria').custom(categoriaByIdValidator),
   //validarCampos
 ], crearProducto)

// Actualizar un producto -- privado, cualquier rol, es decir, vale con un token válido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un id de mongoId').isMongoId(),
  check('id', 'El id no está asociado a nungún producto de la bd').custom(productoByIdValidator),
  check('nombre', 'El nombre es obligatorio').notEmpty(),
  check('nombre', 'El tipo de producto debe de ser único').custom(productoValidator),
  check('categoria', 'No es un id de mongo valido').isMongoId(),
  check('categoria', 'Tiene que existir esa categoria').custom(categoriaByIdValidator),
  validarCampos
], productoUpdate)

// Borrar un producto -- privado, solo admins
router.delete('/:id', [
  validarJWT,
  adminValidator,
  check('id', 'No es un id de mongoId').isMongoId(),
  check('id', 'El id no está asociado a nungún producto de la bd').custom(productoByIdValidator),
  validarCampos
], productoDelete);

module.exports = router;