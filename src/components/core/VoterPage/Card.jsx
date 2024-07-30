import React from 'react'

const Card = ({ id,party, image, name, age, qualification,voteCount, voteCandidate }) => {
    
  return (
    <div className='w-[250px] h-max m-4 p-4 flex flex-col border-r-4 border-b-4 border-richblack-700
     rounded-lg items-center bg-richblack-800 text-richblack-50
     hover:bg-richblack-700 transition-all duration-300'>
      <img src={image} alt='candidate image' className='rounded-full h-[100px] border-2 w-[100px]'/>
      <div className='mt-6 text-[20px]'>
        <div>Candidate Id : { parseInt(id)}</div>
        <div>Name : {name}</div>
        <div>Party : {party}</div>
        <div>Age : {parseInt(age)}</div>
        <div>Qualification : {qualification}</div>
      </div>
      <button className="mt-6  bg-yellow-50 
      hover:shadow-none hover:scale-95 text-lg text-center text-[13px] sm:text-[16px] px-6 py-2 rounded-md font-bold
       transition-all duration-200 text-richblack-900" onClick={() => voteCandidate(parseInt(id))}>
        Vote
      </button>  
    </div>
  )
}

export default Card