import express from "express";
const router = express.Router();

router.get("/usertest", (req, res) => {
    res.send("user Test is successful");
})

router.post("/userposttest", (req, res) => {
    const { username } = req.body;
    res.send("My name is " + username);
})

export default router;