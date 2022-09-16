import { read, write } from "../utils/model.js";

const subCategoryController = {
  GET: (req, res) => {
    try {
      const subCategories = read("subCategories");
      const products = read("products");
      subCategories?.map(i => {
        i.products = products.filter(e => e.subCategoryId == i.subCategoryId)
        return true
      })
      return res.status(200).send({
        status: 200,
        message: "ok",
        data: subCategories,
      });
    } catch (error) {
      return new Error(error.message);
    }
  },

  GETONE: (req, res) => {
    try {
      const { subCategoryId } = req.params;
      const subCategories = read("subCategories");
      const products = read("products");
      let filteredData = subCategories.find(i => i.subCategoryId == subCategoryId)
      filteredData.products = products.filter(e => e.subCategoryId == subCategoryId)
      return res.status(200).send({
        status: 200,
        message: "ok",
        data: filteredData,
      });
    } catch (error) {
      return new Error(error.message);
    }
  },

  POST: (req, res) => {
    try {
        const subCategories = read("subCategories");
        const { name, categoryId } = req.body;
        let newSubCategory = {
            subCategoryId: subCategories.at(-1)?.subCategoryId + 1 || 1,
            name,
            categoryId
        }
        subCategories.push(newSubCategory)
        write("subCategories", subCategories)
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: newSubCategory,
        });
      } catch (error) {
        return new Error(error.message);
      }
  },
  PUT: (req, res) => {
    try {
        const subCategories = read("subCategories");
        const { subCategoryId } = req.params;
        const { name, categoryId } = req.body;
        let foundCategory = subCategories.find(i => i.subCategoryId == subCategoryId)
        foundCategory.name = name? name : foundCategory.name
        foundCategory.categoryId = categoryId? categoryId : foundCategory.categoryId
        write("subCategories", subCategories)
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: subCategories,
        });
      } catch (error) {
        return new Error(error.message);
      }
  },
  DELETE: (req, res) => {
    try {
        const subCategories = read("subCategories");
        const { subCategoryId } = req.params;
        subCategories.splice(subCategories.findIndex(i => i.subCategoryId == subCategoryId), 1)
        write("subCategories", subCategories)
        return res.status(200).send({
          status: 200,
          message: "deleted"
        });
      } catch (error) {
        return new Error(error.message);
      }
  }
};

export default subCategoryController;
