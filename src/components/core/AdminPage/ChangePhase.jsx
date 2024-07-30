import React, { useEffect, useState } from 'react'
import { useWeb3 } from '../../../context';

const ChangePhase = () => {

  const { electionState, changePhaseofElection } = useWeb3();
  const [currentPhase, setCurrentPhase] = useState('');
  const [nextPhase, setNextPhase] = useState('');

  useEffect(() => {
    if (electionState === 0) {
      setCurrentPhase("Registration");
      setNextPhase("Voting");
    } else if (electionState === 1) {
      setCurrentPhase("Voting");
      setNextPhase("Result");
    } else if (electionState === 2) {
      setCurrentPhase("Result");
      setNextPhase("");
    }
  }, [electionState]);

  const handleOnClick = async (e) => {
    e.preventDefault();
    let phase = null;
    if (currentPhase === "Registration") {
      phase = 1;
    } else if (currentPhase === "Voting") {
      phase = 2;
    }
    try {
      await changePhaseofElection(phase);
    } catch (err) {
      console.log(err);
      // Display error message to the user
    }
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Change Phase
      </h1>

      <div className='text-richblack-25'>
        <div className='text-xl'>3 Phases of Election :</div>
        <div><b className='text-lg'>First Phase</b> : Registration (Voter Will Register Himself To Be Eligible To Vote)</div>
        <div><b className='text-lg'>Second Phase</b> : Voting (Voter Will Now Caste Their Vote)</div>
        <div><b className='text-lg'>Third Phase</b> : Result (Election Result Will Be Declared)</div>
      </div>

      <div className='mt-[50px] text-white flex flex-col items-center justify-center'>
        <div>{`Current Phase : ${currentPhase}`}</div>
        <div>{`Next Phase : ${nextPhase}`}</div>
        <button
          onClick={handleOnClick}
          disabled={nextPhase === ""}
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Change Phase
        </button>
      </div>
    </div>
  )
}

export default ChangePhase