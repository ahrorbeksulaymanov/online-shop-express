import { read, write } from "../utils/model.js";

const categoryController = {
  GET: (req, res) => {
    try {
      const categories = read("categories");
      const subCategories = read("subCategories");
      categories?.map(i => {
        i.subCategories = subCategories.filter(e => e.categoryId == i.categoryId)
        return true
      })
      return res.status(200).send({
        status: 200,
        message: "ok",
        data: categories,
      });
    } catch (error) {
      return new Error(error.message);
    }
  },
  GETONE: (req, res) => {
    try {
      const { categoryId } = req.params;
      const categories = read("categories");
      const subCategories = read("subCategories");
      let filteredData = categories.find(i => i.categoryId == categoryId)
      filteredData.subCategories = subCategories.filter(e => e.categoryId == categoryId)
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
        const categories = read("categories");
        const { name } = req.body;
        let newCategory = {
            categoryId: categories.at(-1)?.categoryId + 1 || 1,
            name
        }
        categories.push(newCategory)
        write("categories", categories)
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: newCategory,
        });
      } catch (error) {
        return new Error(error.message);
      }
  },
  PUT: (req, res) => {
    try {
        const categories = read("categories");
        const { categoryId } = req.params;
        const { name } = req.body;
        let foundCategory = categories.find(i => i.categoryId == categoryId)
        foundCategory.name = name? name : foundCategory.name
        write("categories", categories)
        return res.status(200).send({
          status: 200,
          message: "ok",
          data: categories,
        });
      } catch (error) {
        return new Error(error.message);
      }
  },
  DELETE: (req, res) => {
    try {
        const categories = read("categories");
        const { categoryId } = req.params;
        categories.splice(categories.findIndex(i => i.categoryId == categoryId), 1)
        write("categories", categories)
        return res.status(200).send({
          status: 200,
          message: "deleted"
        });
      } catch (error) {
        return new Error(error.message);
      }
  }
};

export default categoryController;
