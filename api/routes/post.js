import express from "express";

const router = express.Router();

router.get("/test", (req, res) => {
    console.log("functional");
});
router.post("/test", (req, res) => {
    console.log("functional");
});
router.put("/test", (req, res) => {
    console.log("functional");
});
router.delete("/test", (req, res) => {
    console.log("functional");
});

export default router;