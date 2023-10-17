const express = require('express');
const { postregistercontroller } = require('../controller/registercontroller');
const { patchupdatecontroller, patchitemupdatecontroller } = require('../controller/updatecontroller');
const { getuseritemsforyearcontroller, postaddnewitemcontroller, getuseritemsforsingleyearcontroller, getuseritemsforsinglemonthcontroller, getuseritemsdatewisecontroller } = require('../controller/itemcontroller');
const { deleteItemController } = require('../controller/deletecontroller');
const { postLoginData } = require('../controller/logincontroller');
const { postLogout } = require('../controller/logoutcontroller');
const { verifyJWT } = require('../middleware/verifyJWT');
const { refTokenHandler } = require('../controller/refreshTokenHandler');

const router = express.Router();
router.post('/login',postLoginData);
router.post('/logout',postLogout);
router.post('/register',postregistercontroller);
router.get('/refresh',refTokenHandler);

router.use(verifyJWT);
router.get('/year',getuseritemsforyearcontroller);
router.get('/singlemonth',getuseritemsforsinglemonthcontroller);
router.get('/singleyear',getuseritemsforsingleyearcontroller);
router.post('/daywisetracking',getuseritemsdatewisecontroller);
router.post('/additem',postaddnewitemcontroller);
router.patch('/update',patchupdatecontroller);
router.patch('/itemupdate',patchitemupdatecontroller);
router.post('/deleteitem',deleteItemController);

module.exports = router;