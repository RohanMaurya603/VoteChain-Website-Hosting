import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { registerVoter } from '../../../services/operations/RegistrationAPI'
import { useWeb3 } from '../../../context';
import toast from 'react-hot-toast';


const Registration = () => {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { electionState,fetchElectionState } = useWeb3();
  const [registrationPhaseOver, setRegistrationPhaseOver] = useState(false);

  const [formData, setFormData] = useState({
    aadharNumber: "",
    accountAddress: ""
  })

  const { aadharNumber, accountAddress } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if(aadharNumber.length === 12){
      dispatch(registerVoter(token,aadharNumber,accountAddress,navigate));
    }
    else {
      toast.error("Aadhar Number Must Be 12 Digit", {
        duration: 3000
      });
    }
  }

  // useEffect(() => {
  //   fetchElectionState();
  //   if (electionState !== null && electionState !== 0) {
  //     setRegistrationPhaseOver(true);
  //   }
  // });
  useEffect(() => {
  const fetchData = async () => {
    await fetchElectionState();
    if (electionState !== null && electionState !== 0) {
      setRegistrationPhaseOver(true);
    }
  };
  fetchData();
}, [electionState]); 

  return (
    <div>
       <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Register in Election
      </h1>
      <div className='flex items-center justify-center'>
      {
        registrationPhaseOver ? (
          <p className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-3xl mt-32 flex items-center justify-center'>Registration Phase Is Over ! </p>
        ) :
        (
          <form onSubmit={handleOnSubmit} className="w-8/12">
          <div className="flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <h2 className="text-lg font-semibold text-richblack-5">
              Please Register First To Vote
            </h2>

            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Aadhar Number <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="number"
                name="aadharNumber"
                value={aadharNumber}
                onChange={handleOnChange}
                placeholder="Enter Aadhar Number"
                style={{
                  boxShadow:
                    'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
            </label>
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Account Address <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type="text"
                name="accountAddress"
                value={accountAddress}
                onChange={handleOnChange}
                placeholder="Enter Account Address"
                style={{
                  boxShadow:
                    'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              />
            </label>
            <button
              type="submit"
              className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
            >
              Register
            </button>
          </div>
        </form>
        )
      }
      </div>
    </div>
  )
}

export default Registration