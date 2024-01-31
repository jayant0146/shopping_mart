import express from "express";
import colors from "colors";
import bodyParser from 'body-parser';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);


//run listen
const port = process.env.PORT || 8080;
const mode = process.env.DEV_MODE;
app.listen(port, () => {
    console.log(`Server runing on ${mode} on ${port}`.bgCyan.white);
});