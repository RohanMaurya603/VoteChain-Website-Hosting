import React, { useEffect, useState } from 'react'
import { useWeb3 } from '../../context'

const Result = () => {

  const { winner,fetchElectionState,electionState, fetchWinner } = useWeb3();
  const [winnerCandidate, setWinnerCandidate] = useState(null);
  const [electionOver, setElectionOver] = useState(false);

  useEffect(() => {
    const getWinnerCandidate = async () => {
      await fetchWinner();
      setWinnerCandidate(winner);
    }


    const fetchData = async () => {
      await fetchElectionState();
      if (electionState !== null && electionState === 2) {
        setElectionOver(true);
        getWinnerCandidate();
      }
      else {
        setElectionOver(false);
      }
    }
    fetchData();
  },[electionState])

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
      Election Result
      </h1>
      <div>
        {
          electionOver ? (
            <div className='w-full flex flex-col  items-center justify-center'>
              <div className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-3xl'>WINNER</div>
              <div className='w-[250px] h-max m-4 p-6 flex flex-col border-r-4 border-b-4 border-richblack-700
     rounded-lg items-center bg-richblack-800 text-richblack-50
     hover:bg-richblack-700 transition-all duration-300'>
      <img src={winnerCandidate && winnerCandidate[6]} alt='candidate image' className='rounded-full mt-2 h-[100px] border-2 w-[100px]'/>
      <div className='mt-6 text-[25px]'>
        <div>Candidate Id : { parseInt(winnerCandidate && winnerCandidate['id'])}</div>
        <div>Name : {winnerCandidate && winnerCandidate['name']}</div>
        <div>Party : {winnerCandidate && winnerCandidate['party']}</div>
        <div>Vote : {parseInt(winnerCandidate && winnerCandidate['voteCount'])}</div>
      </div>
    </div>
            </div>
          )
            : (
              <p className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-3xl mt-32 flex items-center justify-center'>Election Is Not Over Yet !</p>
            )
        }
      </div>
    </div>
  )
}

export default Result