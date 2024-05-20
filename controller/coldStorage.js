const Product = require("../models/Products");
const httpResponse = require("../utilities/httpResponse");
const dataScrape = require("../services/dataScrape");
const { update } = require("../models/Products");

module.exports = {
  productEntry: async (req, res) => {
    try {
      const { url, price, email, name } = req.body;

      const coldStorage = ".price_now";
      const imageTag = "#selected-image";
      const data = await dataScrape.getItemPrice(url, coldStorage, imageTag);
      const desiredPrice = data.formatedPrice;
      const img = data.img;
      const updatedRecommended = await dataScrape.searchForProduct(name);
      const newProduct = new Product({
        url,
        price,
        desiredPrice,
        img,
        email,
        name,
        condolidatedPrice: [{ prices: desiredPrice }],
      });
      const savedProduct = await newProduct.save();

      for (let i = 0; i < updatedRecommended.length; i++) {
        let productId = await Product.findByIdAndUpdate(savedProduct._id, {
          $push: {
            recommendedProducts: {
              prodName: updatedRecommended[i].name,
              prodPrice: updatedRecommended[i].price,
            },
          },
        });
      }

      httpResponse(
        res,
        201,
        true,
        "Items has been sucessfully added for price tracking",
        savedProduct
      );
    } catch (err) {
      console.log(err);
      httpResponse(res, 500, false, "Server Error", err);
    }
  },
};
