import categoryModel from "../models/categoryModel.js";
import slugify from "slug"

export const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: "Name is Required" })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category already exist"
            })
        }

        const category = await new categoryModel({ name, slug: slugify(name) }).save();
        res.status(200).send({
            success: true,
            message: "New Category Created",
            category
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating this Category',
            error
        });
    }
};


export const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModel.findByIdAndUpdate(
            id,
            { name, slug: slugify(name) },
            { new: true }
        );

        res.status(200).send({
            success: true,
            message: "Successfully Updated the Category",
            category
        })
    } catch (error) {

        res.status(500).send({
            success: false,
            message: "Error while updating the category",
            error
        })
    }

}

export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success: true,
            message: "Successfully listing all the categories",
            category,
        })
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: true,
            message: "Error while showing all the categories",
            error
        })
    }
}

export const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({ slug: req.params.slug });
        res.status(200).send({
            success: true,
            message: "Getting the Single Category Successfully",
            category,
        })
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while getting the Single Category",
            error
        })
    }
}

export const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Successfully deleted the category",
        })
    }
    catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while deleting the category",
            error
        })
    }
}