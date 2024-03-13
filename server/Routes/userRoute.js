import express from "express";
import path from "path";
import { changePassword, requestPasswordReset, resetPassword, verifyEmail } from "../Controllers/userController.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get('/verify/:userId/:token', verifyEmail);
router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "./Views", "index.html"));
});

router.get('/request-passwordreset', requestPasswordReset)
//User Requests for Password Reset and User gets Email for Reset Password

router.get('/reset-password/:userId/:token', resetPassword);
//User Clicks for Password Reset Link and Reaches this Endpoint

router.get('/resetpassword', (req, res) => {
  res.sendFile(path.join(__dirname, "./Views", "index.html"));
})
//Backend reset password controller sends it to above endpoint to display message to user for password reset form or invalid url or any other verification failure

router.post("/reset-password", changePassword);
//If everything was okay, the User is finally able to change the password

export default router;