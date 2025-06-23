const express= require("express");
const {addorupdatereview,deleteReview}= require("../controllers/reviewController");

const auth = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/:isbn",auth,addorupdatereview);
router.delete("/:isbn",auth,deleteReview);

module.exports=router;
