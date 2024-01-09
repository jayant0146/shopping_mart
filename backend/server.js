import express from "express";
import colors from "colors";
import bodyParser from 'body-parser';
import connectDB from "./config/db.js";
import authRoutes from "./route/authRoutes.js"



const app = express();
connectDB();

app.use(express.json());

app.use('/api/v1/auth', authRoutes);

//run listen
app.listen(8080, () => {
    console.log(`Server runing on ${8080}`.bgCyan.white);
});