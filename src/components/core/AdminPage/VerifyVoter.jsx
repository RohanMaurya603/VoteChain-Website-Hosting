import React, { useEffect, useState } from 'react';
import { useWeb3 } from '../../../context';
import { getAllRegisteredUser, verifyVoter } from '../../../services/operations/RegistrationAPI';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";

const VerifyVoter = () => {
  const { registerVoterInSmartContract } = useWeb3();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [registeredUsers, setRegisteredUsers] = useState(null);
  const [accountAddress, setAccountAddress] = useState('');
  const [error, setError] = useState(null);

  const handleOnChange = (e) => {
    setAccountAddress(e.target.value);
    console.log(accountAddress);
  }

  useEffect(() => {
  const fetchRegisteredUsers = async () => {
    try {
      const response = await dispatch(getAllRegisteredUser(token));
      console.log("Response from API:", response);
      setRegisteredUsers(response);

      // if (response && response.length > 0) {
      //   setRegisteredUsers(response);
      // } else if (response && response.user) {
      //   setRegisteredUsers([response]);
      // } else {
      //   console.error('Invalid response:', response);
      // }
    } catch (error) {
      console.error('Error fetching registered users:', error);
      setError(error.message || 'Failed To Fetch Registered Users')
    }
  }
  fetchRegisteredUsers();
}, [token, dispatch]);


  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerVoterInSmartContract(accountAddress,dispatch);
      //await dispatch(verifyVoter(token, accountAddress));
      const response = await dispatch(getAllRegisteredUser(token));
      setRegisteredUsers(response);
      console.log("Response from API:", response);
      setAccountAddress('');
    } catch (error) {
      console.log(error);
      setError(error.message || 'Failed to register voter');
    }
  }

  return (
    <div>
      {error && <p>Error : {error}</p>}
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Voter Verification
      </h1>

      <div className='flex justify-between'>
        <div className='text-white'>
          <div className='font-bold text-xl'>
            Sr.No
          </div>
        {
          registeredUsers && registeredUsers.map((userData, index) => {
            const { user } = userData;
            const { additionalDetails } = user;
            const { accountAddress, isRegistered } = additionalDetails;
            return (
              <div key={index} className='mt-2 text-richblack-100 flex justify-center items-center'>{ index+1}</div>
            )
          })
        }
        </div>
        <div className='border-r-[1px] border-richblack-600'></div>
        <div className='text-white'>
          <div className='font-bold text-xl'>
            Account Address
          </div>
          {
            registeredUsers && registeredUsers.map((userData, index) => {
              const { user } = userData;
              const { additionalDetails } = user;
              const { accountAddress, isRegistered } = additionalDetails;
              return (
                <div key={index} className='mt-2 text-richblack-100'>{ accountAddress}</div>
              )
            })
          }
        </div>
        <div className='border-r-[1px] border-richblack-600'></div>
        <div className='text-white'>
          <div className='font-bold text-xl'>
            Is Registered
          </div>
          {
            registeredUsers && registeredUsers.map((userData, index) => {
              const { user } = userData;
              const { additionalDetails } = user;
              const { accountAddress, isRegistered } = additionalDetails;
              return (
                <div key={index} className='mt-2 flex items-center justify-center'>{ isRegistered ? <TiTick  className='h-5 w-5 rounded-full bg-caribbeangreen-500'/> : <MdOutlineCancel className='h-5 w-5 rounded-full bg-pink-500'/>}</div>
              )
            })
          }
        </div>
        <div className='border-r-[1px] border-richblack-600'></div>
        <div className='text-white'>
          <div className='font-bold text-xl'>
            Is Verified
          </div>
          {
            registeredUsers && registeredUsers.map((userData, index) => {
              const { user } = userData;
              const { additionalDetails } = user;
              const { accountAddress, isRegistered } = additionalDetails;
              return (
                <div key={index} className='mt-2 flex items-center justify-center'>{userData.isVerified ? <TiTick  className='h-5 w-5 rounded-full bg-caribbeangreen-500'/> : <MdOutlineCancel className='h-5 w-5 rounded-full bg-pink-500'/>}</div>
              )
            })
          }
        </div>
      </div>

      <div className='mt-[100px] flex items-center justify-center'>
        <form onSubmit={handleOnSubmit} className="w-8/12">
          <div className="flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
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
                placeholder="Enter Account Address of Voter to Verify"
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
      </div>
    </div>
  );
}

export default VerifyVoter;
