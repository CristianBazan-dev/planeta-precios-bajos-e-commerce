const router = require('express').Router() 

const categoryCntrlr = require('../controllers/categoryCntrlr'); 

const auth = require('../middleware/auth'); 
const authAdmin = require('../middleware/authAdmin')

router.route('/category')
            .get(categoryCntrlr.getCategories)
            .post(auth, authAdmin, categoryCntrlr.createCategory)

router.route('/category/:id')
            .delete(auth, authAdmin, categoryCntrlr.deleteCategory)
            .put(auth, authAdmin, categoryCntrlr.updateCategory); 

module.exports = router 