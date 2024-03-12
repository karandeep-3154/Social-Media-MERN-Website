import express from "express";
import path from "path";
import { verifyEmail } from "../Controllers/userController.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get('/verify/:userId/:token', verifyEmail);
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./Views", "index.html"));
});

export default router;