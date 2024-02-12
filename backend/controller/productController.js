import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slug"

export const createProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !category:
                return res.status(201).send({ error: "Category is Required" });
            case !photo && photo.size > 100000:
                return res.status(201).send({ error: "Image is Required and should be less than 1Mb" });
            case !name:
                return res.status(201).send({ error: "Name is Required" });
            case !description:
                return res.status(201).send({ error: "Description is Required" });
            case !price:
                return res.status(201).send({ error: "Price is Required" });
            case !quantity:
                return res.status(201).send({ error: "Quantity is Required" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) })
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path)
            products.contentType = photo.type
        }
        await products.save();
        res.status(200).send({
            success: true,
            message: "Product Created Successfully",
            products,
        })
    } catch (error) {
        console.log(error);
        res.status(201).send({
            success: true,
            message: "Error while creating the product",
            error
        })
    }
}

export const updateProductController = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        switch (true) {
            case !name:
                return res.status(201).send({ error: "Name is Required" });
            case !description:
                return res.status(201).send({ error: "Description is Required" });
            case !price:
                return res.status(201).send({ error: "Price is Required" });
            case !category:
                return res.status(201).send({ error: "Category is Required" });
            case !quantity:
                return res.status(201).send({ error: "Quantity is Required" });
            case !photo && photo.size > 100000:
                return res.status(201).send({ error: "Image is Required and should be less than 1Mb" });
        }

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
        res.status(201).send({
            success: true,
            message: "Error while updating the product",
            error
        })
    }
}

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
        res.status(201).send({
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
        res.status(201).send({
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
        res.status(201).send({
            success: false,
            message: "Error while deleting the product",
            error
        })
    }
}