import e from "express";
import { read, write } from "../utils/model.js";

const productController = {
  GETONE: (req, res) => {
    try {
      const { productId } = req.params;
      const products = read("products");
      let filteredData = products.find(i => i.productId == productId)
      return res.status(200).send({
        status: 200,
        message: "ok",
        data: filteredData,
      });
    } catch (error) {
      return new Error(error.message);
    }
  },

  GET: (req, res) => {
    try {
      let products = read("products");
      let subCategories = read("subCategories");
      const {categoryId, subCategoryId, model, color} = req.query

      if(Object.keys(req.query).length === 0){
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: [],
        });
      }
      
      if(categoryId){
        subCategories = subCategories.filter(sc => sc.categoryId == categoryId )
        console.log(subCategories);
        products = products.filter(product => {
          let byCategoryId;
          for (const sc of subCategories) {
            byCategoryId = sc.subCategoryId ? sc.subCategoryId == product.subCategoryId : true
          }
          let bymodel = model ? model == product.model : true
          let bycolor = color ? color == product.color : true
          return byCategoryId && bymodel && bycolor
        })

      } else {   
        products = products.filter(product => {
          let bysubCategoryId = subCategoryId ? subCategoryId == product.subCategoryId : true
          let bymodel = model ? model == product.model : true
          let bycolor = color ? color == product.color : true
          return bysubCategoryId && bymodel && bycolor
        })
      }

      return res.status(200).send({
        status: 200,
        message: "ok",
        data: products,
      });
    } catch (error) {
      return new Error(error.message);
    }
  },
  POST: (req, res) => {
    try {
        const products = read("products");
        const { name, subCategoryId, model, color, price } = req.body;
        let newProduct = {
            productId: products.at(-1)?.productId + 1 || 1,
            name,
            subCategoryId, model, color, price
        }
        products.push(newProduct)
        write("products", products)
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: newProduct,
        });
      } catch (error) {
        return new Error(error.message);
      }
  },
  PUT: (req, res) => {
    try {
        const products = read("products");
        const { productId } = req.params;
        const { name, subCategoryId, model, color, price } = req.body;
        let foundProduct = products.find(i => i.productId == productId)

        foundProduct.name = name? name : foundProduct.name
        foundProduct.subCategoryId = subCategoryId? subCategoryId : foundProduct.subCategoryId
        foundProduct.model = model? model : foundProduct.model
        foundProduct.color = color? color : foundProduct.color
        foundProduct.price = price? price : foundProduct.price

        write("products", products)
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: products,
        });
      } catch (error) {
        return new Error(error.message);
      }
  },
  DELETE: (req, res) => {
    try {
        const products = read("products");
        const { productId } = req.params;
        products.splice(products.findIndex(i => i.productId == productId), 1)
        write("products", products)
        return res.status(200).send({
          status: 200,
          message: "deleted"
        });
      } catch (error) {
        return new Error(error.message);
      }
  }
};

export default productController;
