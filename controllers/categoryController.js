import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";

const createCategory = asyncHandler(async (req, res) => {

    const { userData = null, categoryName } = req.body;

    try {
        const category = new Category({
            name: categoryName,
            user: userData ? userData._id : null,
        });
        const newCategory = await category.save();

        return res.status(200).json({ message: `New category with name ${newCategory.name} created.` });
    } catch (error) {
        return res.status(400).json({ message: 'Error creating category:', error });
    }
})

const getCategories = asyncHandler(async (req, res) => {

    const { userId } = req.query;

    try {
        const categories = await Category.find({
            $or: [{ user: userId }, { user: null },],
        });

        return res.status(200).json(categories);
    } catch (error) {
        return res.status(400).json({ message: `Error trying to retrieve categories ${error}` });
    }

});

export default {
    createCategory,
    getCategories
}