const express = require('express');
const router = express.Router();
const userCreation = require('../controller/userCreation');
const loginAuthentication = require('../controller/loginAuthentication');
const userAuthentication = require('../controller/userAuthentication');
const coldStorage = require('../controller/coldStorage');
const productQuery = require('../controller/productQuery');

router.post('/register', userCreation.registerHandler);
router.post('/login', loginAuthentication.loginAuthentication);
router.get('/verifyuser', userAuthentication.verifyUser);
router.get('/logout', userAuthentication.logout);
router.post('/getbyid', productQuery.findById);
router.post('/coldstorage', coldStorage.productEntry);
router.post('/getitem', productQuery.getItem);
router.post('/deleteitem', productQuery.deleteItem);

module.exports = router;