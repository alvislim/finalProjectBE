const Products = require('../models/Products');
const httpResponse = require('../utilities/httpResponse');

module.exports = {
    getItem: async (req,res) => {
        try {
            const { email } = req.body
            console.log(email)
            const items = await Products.find({email:email})
            httpResponse(res, 200, true, 'Items has been sucessfully added for price tracking', items)
        } catch (err) {
            console.log(err)
            httpResponse(res, 500, false, 'Server Error', err)
        }
    },
    deleteItem: async (req,res) => {
        try {
            const { id } = req.body
            const deleteItems = await Products.findByIdAndRemove(id)
            httpResponse(res, 200, true, 'Items has been sucessfully deleted', deleteItems)
        } catch (err) {
            console.log(err)
            httpResponse(res, 500, false, 'Server Error', err)
        }
    }
}