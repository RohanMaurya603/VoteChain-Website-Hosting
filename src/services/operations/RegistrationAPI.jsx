import { toast } from "react-hot-toast"
import { setUser } from "../../slices/profileSlice"
import { setLoading } from "../../slices/authSlice"
import { apiConnector } from "../apiconnector"
import { registrationEndpoints } from "../apis"

const {
    GET_REGISTERED_USER_API,
    REGISTER_VOTER_API,
    VERIFY_VOTER_API,
    UPLOAD_CANDIDATE_IMAGE_API
} = registrationEndpoints


export function getAllRegisteredUser(token) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        let result = [];
        try {
            const response = await apiConnector("GET", GET_REGISTERED_USER_API,null, {
                Authorization: `Bearer ${token}`,
            })

            console.log("GETTING ALL VOTER API RESPONSE............", response);

             if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.allRegisteredUser;
            console.log(result);
        }
        catch (error) {
            console.log("Error While Fetching Registered Voter", error)
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId)
        return result;
    }
}

export function registerVoter(token,aadharNumber,accountAddress,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", REGISTER_VOTER_API, {
                aadharNumber,
                accountAddress
            },
            {
                Authorization: `Bearer ${token}`,    
            })

            console.log("REGISTRATION VOTER API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Registration Successful")
            navigate("/voter/registration")
            dispatch(setUser(response.data.updatedUserDetails))
        }
        catch(error) {
            console.log("GETTING ALL REGISTERED USER API ERROR..........", error)
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function verifyVoter(token,accountAddress) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector("PUT", VERIFY_VOTER_API, { accountAddress }, {
                Authorization: `Bearer ${token}`,
            })

            console.log("VERIFICATION VOTER API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Verification Successful")
        }
        catch (error) {
            console.log("VERIFICATION VOTER API ERROR..........", error)
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId)
    }
}

export function uploadCandidateImage(token,formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        let result ="";
        try {
            const response = await apiConnector(
                "POST",
                UPLOAD_CANDIDATE_IMAGE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            )

            console.log(
                "UPLOAD_CANDIDATE_IMAGE API RESPONSE............",
                response
            )
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            result = response.data.candidateImage;
            toast.success("Candidate Image Uploaded Successfully")
        }
        catch (error) {
            console.log("UPLOAD_CANDIDATE_IMAGE API ERROR............", error)
            toast.error("Could Not Upload Candidate Image")
        }
        toast.dismiss(toastId);
        return result;
    }
}