// Import the required modules
const express = require("express");
const router = express.Router();

// Importing Middleware
const { auth, isVoter, isAdmin } = require("../middlewares/auth");


// Import the required controllers and middleware functions
const {
  createRegisteredUser,
  verifyRegisteredUser,
  getAllRegisteredUser,
  uploadCandidateImage,
} = require("../controllers/registeredUser");



// voter is registered
router.post("/registerVoter", auth, isVoter, createRegisteredUser);
//voter can only be verify by admin
router.put("/verifyVoter", auth, isAdmin, verifyRegisteredUser);
//get all the registered user
router.get("/getRegisteredUser", auth, isAdmin, getAllRegisteredUser);
//Upload Candidate Image on Cloudinary
router.post("/uploadCandidateImage",auth,isAdmin,uploadCandidateImage);

module.exports = router