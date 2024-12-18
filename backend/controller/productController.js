import productModel from "../models/productModel.js";
import mongoose from "mongoose";
import fs from "fs";
import slugify from "slug"

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files; 

        switch (true) {
            case !category:
                return res.status(400).send({ error: "Category is Required" });
            case !mongoose.Types.ObjectId.isValid(category):
                return res.status(400).send({ success: false, message: "Invalid category ID" });
            case !photo:
                return res.status(400).send({ error: "Image is Required" });
            case photo.size > 1000000:
                return res.status(400).send({ error: "Image should be less than 1MB" });    
            case !name:
                return res.status(400).send({ error: "Name is Required" });
            case !description:
                return res.status(400).send({ error: "Description is Required" });
            case !price:
                return res.status(400).send({ error: "Price is Required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is Required" });
        }        
        
        const products = new productModel({
            ...req.fields, slug: slugify(name),
        })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.photo.contentType = photo.type
        }
        await products.save();

        res.status(200).send({
            success: true,
            message: "Product Created Successfully",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while creating the product",
            error
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        console.log(category);
        

        switch (true) {
            case !name:
                return res.status(400).send({ error: "Name is Required" });
            case !description:
                return res.status(400).send({ error: "Description is Required" });
            case !price:
                return res.status(400).send({ error: "Price is Required" });
            case !category:
                return res.status(400).send({ error: "Category is Required" });
            case !quantity:
                return res.status(400).send({ error: "Quantity is Required" }); 
        }

        if  (photo && photo.size > 1000000)
            return res.status(400).send({ error: "Image should be less than 1MB" });  

        const products = await productModel.findByIdAndUpdate(req.params.pid, { ...req.fields, slug: slugify(name) }, { new: true })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.contentType = photo.type
        }
        await products.save();
        res.status(200).send({
            success: true,
            message: "Product Updated Successfully",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: true,
            message: "Error while updating the product",
            error
        })
    }
}


// const products = await productModel
//     .find({})                 // 1. Fetch all documents (empty filter means no conditions).
//     .select("-photo")         // 2. Exclude the 'photo' field from the response.
//     .limit(12)                // 3. Limit the result to 12 documents.
//     .sort({ createdAt: -1 }); // 4. Sort the documents by 'createdAt' in descending order.
export const allProductsController = async (req, res) => {
    try {
        const products = await productModel.find({}).select("-photo").limit(12).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "Successfully displayed all the products",
            total_count: products.length,
            products,
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while displaying the products",
            error
        })
    }
}

export const singleProductController = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo");
        res.status(200).send({
            success: true,
            message: "Single Product fetched",
            product,
        })
    }
    catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: " Error while displaying this product",
            error
        })
    }
}

export const productPhotoController = async (req, res) => {   
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Error while displaying the product photo",
            error
        })
    }
}

export const deleteProductController = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success: true,
            message: "Succesfully deleted the product",
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while deleting the product",
            error
        })
    }
}

// filters
export const productFiltersController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Filtering Products",
            error,
        });
    }
};

// product count
export const productCountController = async (req, res) => {
    try {
        const total = await productModel.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error in product count",
            error,
            success: false,
        });
    }
};

// product list base on page
export const productListController = async (req, res) => {
    try {
        const perPage = 2;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel
            .find({})
            .select("-photo")
            .skip((page - 1) * perPage)
            .limit(perPage)
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "error in per page ctrl",
            error,
        });
    }
};

// search product
export const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel
            .find({
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } },
                ],
            })
            .select("-photo");
        res.json(results);
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error In Search Product API",
            error,
        });
    }
};