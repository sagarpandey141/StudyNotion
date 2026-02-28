const express=require("express");
const router=express.Router();

const {
    capturePayment,
    verifySignature,
    sendPaymentSuccessEmail
}=require("../controller/Payment");

const {Auth,Student,isAdmin,isInstructor}=require("../middleware/auth");

router.post("/capturePayment",Auth,Student,capturePayment);
router.post("/verifySignature",Auth,verifySignature);
router.post("/sendPaymentSuccessEmail",Auth,Student,sendPaymentSuccessEmail)
module.exports=router;


