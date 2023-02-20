const router = require('express').Router(); 

const userCntrlr = require('../controllers/userCntrlr'); 

const auth = require('../middleware/auth')

router.post('/register', userCntrlr.register);

router.post('/login', userCntrlr.login); 

router.get('/logout', userCntrlr.logout); 

router.get('/refresh_token', userCntrlr.refreshToken); 

router.get('/infor', auth, userCntrlr.getUser); 

router.patch('/addcart', auth, userCntrlr.addCart)

router.get('/history', auth, userCntrlr.history)


module.exports = router