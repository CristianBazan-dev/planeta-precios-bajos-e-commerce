const mongoose = require('mongoose'); 

const productSchema = new mongoose.Schema({
    product_id: {
        type: String, 
        unique: true,
        trim: true, 
        required: true 
    }, 
    title: {
        type: String, 
        trim: true, 
        required: true,
    },
    unit_price: {
        type: Number,
        required: true, 
        trim: true 
    }, 
    description: {
        type: String, 
        required: true, 
    },
    content: {
        type: String,
        required: true, 
    }, 
    images:{
        type: Object,
        required: true, 
    },
    category: {
        type: String, 
        required: true, 
    },
    checked: {
        type: String,
        default: false, 
    },
    sold: {
        type: Number,
        default: 0 
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)