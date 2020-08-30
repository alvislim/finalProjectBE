const cron = require('node-cron');
const dataScrape = require('./dataScrape');
const Products = require('../models/Products')

const job = cron.schedule("0 4 * * *", async () => {
    try {
        const allProducts = await Products.find({});
        for (let i = 0; i < allProducts.length; i++) {
            const url = allProducts[i].url
            const price = allProducts[i].price
            const name = allProducts[i].name
            const coldStorage = '.price_now'
            const email = allProducts[i].email
            const id = allProducts[i].id
            const itemPrice = await dataScrape.getItemPrice(url, '.price_now', '#selected-image')
            const productPrice = itemPrice.formatedPrice
            const resetReccomendedArr = await Products.findByIdAndUpdate(id, {
                $set: {
                    recommendedProducts: [{}]
                }
            })
  
            const updatedReccomend = await dataScrape.searchForProduct(name)
            const updateProductPrice = await Products.findByIdAndUpdate(id,
                {
                    desiredPrice: productPrice,
                    $push: {
                        condolidatedPrice: { prices: productPrice }
                    }
                })
            if (updatedReccomend.length > 0) {
                for (let i = 0; i < updatedReccomend.length; i++) {
                    let productId = await Products.findByIdAndUpdate(id,
                        {
                            $push: {
                                recommendedProducts: { prodName: updatedReccomend[i].name, prodPrice: updatedReccomend[i].price }
                            }
                        })
                }
            }
 
            await dataScrape.emailCondition(price, productPrice, name, email, url)

        }
    } catch (err) {
        console.log(err)
    }
})

module.export = job;


