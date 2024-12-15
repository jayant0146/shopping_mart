import express from "express";
import { isAdmin, requiresSignin } from "../middleware/authMiddleware.js";
import formidable from "express-formidable";
import { allProductsController, createProductController, deleteProductController, productCountController, productFiltersController, productListController, productPhotoController, searchProductController, singleProductController, updateProductController } from "../controller/productController.js";

const router = express.Router();

router.post('/create-product',  requiresSignin, isAdmin, formidable(), createProductController);

router.put('/update-product/:pid', requiresSignin, isAdmin, formidable(), updateProductController);

router.get('/get-products', allProductsController);

router.get('/get-single-product/:slug', singleProductController);

router.get('/product-photo/:pid', productPhotoController);

router.delete('/delete-product/:pid', deleteProductController);

router.post("/product-filters", productFiltersController);

//product count
router.get("/product-count", productCountController);

//product per page
router.get("/product-list/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);

export default router;