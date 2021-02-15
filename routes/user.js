
const {Router} = require('express');
const { userGet, userPut, userDelete, userPost } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.put('/', userPut);

router.post('/', userPost);

router.delete('/', userDelete);

module.exports = router;