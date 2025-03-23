import express from "express";
import { createPost } from "../controllers/postController.js";
// import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/createpost", createPost);

export default router;
