const Category = require("../models/Category");
const Ticket = require("../models/Ticket");
const ResponseAPI = require("../utils/response");

const categoryController = {
  async createCategory(req, res, next) {
    try {
      if (!req.body.name) {
        return ResponseAPI.error(res, "Category name is required", 400);
      }
      if (!req.body.description) {
        return ResponseAPI.error(res, "Category description is required", 400);
      }

      const category = await Category.create(req.body);
      return ResponseAPI.success(
        res,
        category,
        "Category created successfully",
        201
      );
    } catch (error) {
      console.error("Error creating category:", error);
      return next(error);
    }
  },

  // Function to get all categories
  async getCategories(req, res, next) {
    try {
      const categories = await Category.find();
      return ResponseAPI.success(
        res,
        categories,
        "Successfully retrieved categories"
      );
    } catch (error) {
      console.error("Error retrieving categories:", error);
      return next(error);
    }
  },

  // Function to update a category
  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return ResponseAPI.error(res, "ID not provided", 400);
      }

      const category = await Category.findById(id);
      if (!category) {
        return ResponseAPI.notFound(res, "Category not found");
      }

      const { name, description } = req.body;

      if (name) {
        category.name = name;
      }
      if (description) {
        category.description = description;
      }

      await category.save();

      return ResponseAPI.success(
        res,
        category,
        "Category updated successfully"
      );
    } catch (error) {
      console.error("Error updating category:", error);
      return next(error);
    }
  },
  // Function to delete a category
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        return ResponseAPI.error(res, "ID not provided", 400);
      }

      const tickets = await Ticket.find({ categoryId: id });
      if (tickets.length > 0) {
        return ResponseAPI.error(
          res,
          "Category can't be deleted, there are tickets with this category",
          400
        );
      }

      const category = await Category.findByIdAndDelete(id);

      if (!category) {
        return ResponseAPI.notFound(res, "Category not found");
      }

      return ResponseAPI.success(res, null, "Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      return next(error);
    }
  },
};

// Function to validate ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

module.exports = categoryController;
