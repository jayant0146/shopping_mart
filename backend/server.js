import express from "express";
import colors from "colors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js"
// import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import cors from "cors";

// Configuring env file. by default it's the root path, else if in any other path then need to mention that path by dotenv.config({path:''})
dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json()); //Without this, application will not take any json object passed to it in POST
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/category', categoryRoutes);
// app.use('/api/v1/product', productRoutes);

//run listen. process by default comes with node
const port = process.env.PORT || 5000;
const mode = process.env.DEV_MODE;
app.listen(port, () => {
	console.log(`Server runing onn ${mode} on ${port}`.bgCyan.white);
});

