import express from "express";
import { isAdmin, requiresSignin } from "../middleware/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controller/categoryController.js";

const router = express.Router();

router.post("/create-category", requiresSignin, isAdmin, createCategoryController);

router.put("/update-category/:id", requiresSignin, isAdmin, updateCategoryController);

router.get("/get-category", categoryController);

router.get("/single-category/:slug", singleCategoryController);

router.delete("/delete-category/:id", requiresSignin, isAdmin, deleteCategoryController);

export default router;