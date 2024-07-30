import React from 'react'

const Introduction = () => {
  return (
    <div>
      <h1 className="mb-10 text-3xl font-medium text-richblack-5">
        Introduction
      </h1>
      <h1 className='text-richblack-25 font-medium text-2xl'>Welcome !</h1> 
      <p className='mt-2 text-richblack-25'>These are Few Guidelines for User : </p>
      <p className='mt-2 text-white font-bold'>1. Voter Registration</p>
      <div>
        <ul className='text-richblack-25 ml-10 list-disc'>
          <li>For casting the vote user needs to first register himself. For this registration purpose , the user will be provided a voter registration form on this website.</li>
          <li>The voter can only register in the registration phase. After the registration phase is over the user can not register and thus will not be able to vote.</li>
          <li>For registration , the user will have to enter his Aadhar card number and the account address which the user will be using for voting purpose.</li>
        </ul>
      </div>
      <p className='mt-2 text-white font-bold'>2. Voting Process </p>
      <div>
        <ul className='text-richblack-25 ml-10 list-disc'>
          <li>Overall , voting process is divided into three phases. All of which will be initialized and terminated by the admin. User have to participate in the process according to current phase.</li>
          <ol className='list-decimal'>
            <li><span className='font-semibold text-white'>Registration Phase:</span> During this phase the registration of the users (which are going to cast the vote) will be carried out.</li>
            <li><span className='font-semibold text-white'>Voting Phase:</span> After initialization of voting phase from the admin, user can cast the vote in voting section.The casting of vote can be simply done by clicking on “VOTE” button, after which transaction will be initiated and after confirming transaction the vote will get successfully casted. After voting phase gets over user will not be able to cast vote.</li>
            <li><span className='font-semibold text-white'>Result Phase:</span>This is the final stage of whole voting process during which the results of election will be displayed at “Result” section.</li>
          </ol>
        </ul>
      </div>
    </div>
  )
}

export default Introduction