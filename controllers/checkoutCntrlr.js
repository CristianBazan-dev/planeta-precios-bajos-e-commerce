const Checkout = require('../models/checkoutModel'); 

const checkoutCntrlr = {
    createCheckoutInfo:  async (req,res) => {
        try{
            const {
                name,
                
            } = req.body 

            const newCheckout = new Checkout({
                name,
                lastName,
                personalId,
                phone,
                country,
                state,
                city,
                postalCode,
                items,
                total
            })
            
            await newCheckout.save()
            res.json("Información del checkout obtenida")
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = checkoutCntrlr