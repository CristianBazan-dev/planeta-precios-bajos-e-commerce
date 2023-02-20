const router = require('express').Router() 

const productCntrlr = require('../controllers/productCntrlr');
const { getProducts } = require('../controllers/productCntrlr'); 

const productsCntrlr = require('../controllers/productCntrlr'); 

router.route('/products')
            .get(productCntrlr.getProducts)
            .post(productCntrlr.createProduct)


router.route('/products/:id')
             .delete(productsCntrlr.deleteProduct)
             .put(productCntrlr.updateProduct)

module.exports = router; 