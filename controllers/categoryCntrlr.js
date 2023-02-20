const Category = require('../models/categoryModel'); 
const Products = require('../models/productModel')

const categoryCntrlr = {
    getCategories: async (req,res) =>{
        try{
            const categories = await Category.find() 

            res.json(categories)
        } catch (err) {
           return res.status(500).json({msg: err.message}) 
        }
    },
    createCategory: async (req, res) =>{
        try{
            const { name } = req.body; 
            const category = await Category.findOne({name}); 

            if(category)
                return res.status(400).json({msg: "La categoría ya existe."})

            const newCategory = new Category({name}); 

            await newCategory.save() 
            res.json({msg: "Categoría creada."})
        } catch (err) {
           return res.status(500).json({msg: err.message}) 
        }
    },
    deleteCategory: async (req,res) =>{
        try{
            const products = await Products.findOne({category: req.params.id})

            if(products) 
                return res.status(400).json({
                    msg: "Por favor, elimina todos los productos relacionados."
                })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Categoría eliminada"})
        } catch (err) {
           return res.status(500).json({msg: err.message}) 
        }
    }, 
    updateCategory: async (req,res) =>{
        try{
            const {name} = req.body; 
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Categoría actualizada"})
        } catch (err) {
           return res.status(500).json({msg: err.message}) 
        }
    },
}

module.exports = categoryCntrlr