import React from 'react'
import Card from './Card'

const Cards = ({ candidatesList,voteCandidate}) => {
  return (
    <div className=''>
          <div className='flex justify-center flex-wrap m-auto max-w-[1000px]'>
              {
                  candidatesList.map((candidate) => {
                      return <Card key={candidate.id} {...candidate} voteCandidate={voteCandidate}></Card>
                  })
              }
          </div>
    </div>
  )
}

export default Cards