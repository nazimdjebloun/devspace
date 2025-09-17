import express from "express";
import { createPost, getPost } from "../controllers/postController.js";
// import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/createpost", createPost);
router.get("/getposts", getPost);
export default router;
