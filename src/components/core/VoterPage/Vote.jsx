import React, { useEffect, useState } from 'react'
import { useWeb3 } from '../../../context'
import Cards from './Cards';

const Vote = () => {

  const { candidates,electionState,fetchElectionState, fetchCandidates, casteVote } = useWeb3();
  const [candidatesList, setCandidatesList] = useState([]);
  const [votingPhaseOver, setVotingPhaseOver] = useState(false);

  useEffect(() => {
    const getCandidates = async () => {
      await fetchCandidates();
      setCandidatesList(candidates);
    }

    const fetchData = async () => {
      await fetchElectionState();
      if (electionState !== null && electionState === 2) {
        setVotingPhaseOver(true);
      }
      else {
        getCandidates();
      }
    };
    fetchData();
  },[electionState]);

  const voteCandidate = async(candidateId) => {
    try {
      await casteVote(candidateId);
    }
    catch (error) {
      console.log('Error Voting : ', error);
    }
  }

  return (

    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Vote Candidate
      </h1>
      <div>
        {
          !votingPhaseOver ? (
            <div>
              <div className='text-white'>
                {candidatesList.length > 0 ?
                  (
                    <Cards candidatesList={candidatesList} voteCandidate={voteCandidate}/>
                  ) :
                  (
                    <p>Loading candidates...</p>
                  )
                }
              </div>
            </div>
          ) :
            (
              <p className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold text-3xl mt-32 flex items-center justify-center'>Voting Phase Is Over ! </p>
            )
        }
      </div>
    </div>

  )
}

export default Vote