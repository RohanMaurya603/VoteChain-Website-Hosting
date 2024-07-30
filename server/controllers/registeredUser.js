const User = require("../models/User");
const Profile = require("../models/Profile");
const RegisteredUser = require("../models/RegisteredUser");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createRegisteredUser = async(req,res) => {
    try{
        //data fetch
        const {aadharNumber,accountAddress} = req.body;
        const id = req.user.id;
        //validation
        if(!aadharNumber || !accountAddress){
            return res.status(400).json({
                success : false,
                message : "Aadhar Number and Account Address Required"
            });
        }

        const profileDetailsAadhar = await Profile.findOne({aadharNumber});
        if(!profileDetailsAadhar){
            const user = await User.findById(id);
            const profile = await Profile.findById(user.additionalDetails);
            profile.aadharNumber = aadharNumber;
            await profile.save();
        }

        const profileDetailsAccount = await Profile.findOne({accountAddress});
        if(!profileDetailsAccount){
            const user = await User.findById(id);
            const profile = await Profile.findById(user.additionalDetails);
            profile.accountAddress = accountAddress;
            await profile.save();
        }


        //check if user is already registered or not
        const isRegisteredUser = await RegisteredUser.findOne({user : id});
        
        if(isRegisteredUser){
            return res.status(400).json({
                success : false,
                message : "You are already registered"
            });
        }

        //create entry of new registered user in db
        profileDetailsAadhar.isRegistered = true;
        await profileDetailsAadhar.save();

        const newRegisteredUser = await RegisteredUser.create({
            user : id,
            isVerified : false
        });
        console.log("New RegisteredUser : ",newRegisteredUser);

        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")

        //return response
        return res.status(200).json({
            success : true,
            updatedUserDetails,
            message : "User Registered Successfully"
        });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({
            success : false,
            message : "User Cannot Be Registered",
            error : err.message
        });
    }
}

exports.verifyRegisteredUser = async(req,res) => {
    try{
        //data fetch
        const {accountAddress} = req.body;

        //validation
        if(!accountAddress){
            return res.status(401).json({
                success : false,
                message : "Account Address is Required"
            });
        }

        //check if user is registered or not with that account address
        const profileDetails = await Profile.findOne({accountAddress});
        if(!profileDetails){
            return res.status(500).json({
                success:false,
                message: "User is not registered with that account address"
            })
        }
        const userDetails = await User.findOne({additionalDetails : profileDetails._id});
        const isRegisteredUser = await RegisteredUser.findOne({user : userDetails._id});
        
        if(isRegisteredUser.isVerified){
            return res.status(400).json({
                success : false,
                message : "Voter is already verified"
            });
        }

        //verify that account address
        const verifiedRegisteredUser = await RegisteredUser.findByIdAndUpdate(
            isRegisteredUser._id,
            {
                $set : {
                    isVerified : true
                }
            },
            {new : true}
        )
        .populate(
            {
                path : "user",
                populate : {
                    path : "additionalDetails"
                }
            }
        )
        .exec();
        console.log("Verified Regitered User : ",verifiedRegisteredUser);

        //return response
        return res.status(200).json({
            success : true,
            message : "User is Verified Successfully",
            verifiedRegisteredUser
        });
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "User Cannot be Verified"
        });
    }
}

exports.getAllRegisteredUser = async(req,res) => {
    try{
        const allRegisteredUser = await RegisteredUser.find().populate(
            {
                path: 'user',
                select: ['firstName', 'lastName'],
                populate: {
                    path: 'additionalDetails',
                    select: ['accountAddress', 'isRegistered']
                }
            }
        );

        console.log("All Registered User : ",allRegisteredUser);

        return res.status(200).json({
            success : true,
            allRegisteredUser,
        })
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : "Could Not Fetch Registered User Details"
        });
    }   
}

exports.uploadCandidateImage = async(req,res) => {
    try{
        const displayPicture = req.files.displayPicture;
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);

        const candidateImage = image.secure_url;

        return res.status(200).json({
            success: true,
            candidateImage
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}