import React from 'react'
import { useState,useRef,useEffect } from "react"
import { FiUpload } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../common/IconBtn"
import {useWeb3} from "../../../context"
import { uploadCandidateImage } from '../../../services/operations/RegistrationAPI'
import toast from 'react-hot-toast'

const AddCandidate = () => {
    const { token } = useSelector((state) => state.auth);
    const { addCandidate,electionState } = useWeb3();

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);
    const [candidateImage, setCandidateImage] = useState(null);
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file)
        if (file) {
        setImageFile(file)
        previewFile(file)
        }
    }

    const [candidateData, setCandidateData] = useState({
        candidateName: "",
        partyName: "",
        age: "",
        qualification: "",
    })

    const { candidateName, partyName, age, qualification } = candidateData;

    const handleOnChange = (e) => {
        setCandidateData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
        console.log(candidateData);
    }

    const handleOnSubmit = async(e) => {
        e.preventDefault();
        if (electionState !== null && electionState === 0) {
            try {
                if (candidateImage) {
                    await addCandidate(
                        candidateName,
                        partyName,
                        age,
                        qualification,
                        candidateImage
                    );
                    toast.success("Candidate Added Successfully")
                    resetFormFields();
                }
                else {
                    toast.error('Please Upload Candidate Image !')
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            toast.error("Cannot add candidate at the current phase.");
        }
    }

    const resetFormFields = () => {
        setCandidateData({
            candidateName: '',
            partyName: '',
            age: '',
            qualification: '',
        });
        setPreviewSource(null);
        setImageFile(null);
        setCandidateImage(null);
    };

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
        setPreviewSource(reader.result)
        }
    }

    const handleFileUpload = async() => {
    try {
      console.log("uploading...")
      setLoading(true)
      const formData = new FormData()
      formData.append("displayPicture", imageFile)
      console.log("formdata", formData)
        const response = await dispatch(uploadCandidateImage(token, formData));
        console.log(response);
        setCandidateImage(response);
        setLoading(false);
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
    }

    useEffect(() => {
    if (imageFile) {
      previewFile(imageFile)
    }
    }, [imageFile])

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Add Candidate
            </h1>
            <div className='w-9/12 flex justify-center mx-auto items-center flex-col'>
                <div className="flex flex-col items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 px-4 text-richblack-5">
                    <div className="flex items-center gap-x-4">
                        <img
                            src={previewSource}
                            className="aspect-square w-[78px] bg-white rounded-full object-cover"
                        />
                        <div className="space-y-2">
                            <div className="flex flex-row gap-3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/png, image/gif, image/jpeg"
                                />
                                <button
                                    onClick={handleClick}
                                    disabled={loading}
                                    className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                                >
                                    Select
                                </button>
                                <IconBtn
                                    text={loading ? "Uploading..." : "Upload"}
                                    onclick={handleFileUpload}
                                >
                                    {!loading && (
                                    <FiUpload className="text-lg text-richblack-900" />
                                    )}
                                </IconBtn>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleOnSubmit} className='flex flex-col items-center justify-between rounded-md bg-richblack-800 mt-2 px-12'>
                        <div className='flex gap-x-4'>
                        <label>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Candidate Name <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type='text'
                                name='candidateName'
                                value={candidateName}
                                onChange={handleOnChange}
                                placeholder='Enter name'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                        </label>
                        <label>
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Party Name <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type="text"
                                name="partyName"
                                value={partyName}
                                onChange={handleOnChange}
                                placeholder="Enter party name"
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                        </label>
                        </div>
                        <div className='flex gap-x-4 mt-8'>
                            <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Age <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    required
                                    type='number'
                                    name='age'
                                    value={age}
                                    onChange={handleOnChange}
                                    placeholder='Enter age'
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                            <label>
                                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                    Qualifiaction <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    required
                                    type="text"
                                    name="qualification"
                                    value={qualification}
                                    onChange={handleOnChange}
                                    placeholder="Enter qualification"
                                    style={{
                                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </label>
                        </div>
                        <div className='flex gap-x-4 mt-8'>
                            <button
                                type="submit"
                                className="mt-4 rounded-[8px] font-semibold bg-yellow-50 py-[8px] px-[12px] text-richblack-900"
                            >
                                Add Candidate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCandidate