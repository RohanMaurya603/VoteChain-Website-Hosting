const Profile = require("../models/Profile");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const mongoose = require("mongoose")

exports.updateProfile = async (req, res) => {
  try {
    //fetch data
    const {
      gender,
      dateOfBirth = "",
      age,
      contactNumber,
      aadharNumber,
      accountAddress,
    } = req.body;

    // getuserid
    const id = req.user.id;

    //find profile by id
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //update profile fields
    profileDetails.gender = gender;
    profileDetails.age = age;
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.contactNumber = contactNumber;
    profileDetails.accountAddress = accountAddress;
    profileDetails.aadharNumber = aadharNumber;

    //save the updated profile
    await profileDetails.save();

    const updatedUserDetails = await User.findById(id)
    .populate("additionalDetails")

    // return response
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUserDetails,
      profileDetails,
      
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    // const job = schedule.scheduleJob("10 * * * * *", function () {
    // 	console.log("The answer to life, the universe, and everything!");
    // });
    // console.log(job);
    //get id
    const id = req.user.id;

    //validation
    const userDetails = await User.findById({ _id: id });
    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    //delete user
    await User.findByIdAndDelete({ _id: id });

    //return response
    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "User cannot be deleted,please try again",
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    console.log(userDetails);
    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    console.log("HIIIIIIIIIIIIIIIII");
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
