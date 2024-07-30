import React from "react"

import BannerImage1 from "../assets/Images/8801406_953.jpg"
import BannerImage3 from "../assets/Images/3d-internet-secuirty-badge.jpg"
import Footer from "../components/common/Footer"

const About = () => {
  return (
    <div>
      <section className="bg-richblack-700 h-[530px]">
        <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-center text-white">
          <header className="mx-auto mt-[100px] py-20 text-4xl font-semibold lg:w-[70%]">
            Empowering Democracy with Every Click:
            <div className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text">Where Blockchain Meets the Ballot Box.</div>
            <p className="mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]">
              VoteChain is leading the charge in revolutionizing online voting systems.
              We're committed to forging a path toward a more transparent and secure future
              by harnessing the power of blockchain technology. Join us in shaping democracy,
              one block at a time.
            </p>
          </header>
        </div>
      </section>

      <section>
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500">
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] ">
                Our Vision
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With a commitment to democratic integrity,
                we embarked on a journey to pioneer a new era of secure voting.
                Our team, fueled by a passion for transparency and fairness,
                has crafted an innovative online voting platform leveraging blockchain
                technology. Join us as we redefine democracy and empower citizens to
                shape their future.
              </p>
            </div>
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] ">
              Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Beyond revolutionizing the voting experience,
                we aspire to cultivate a dynamic community of voters.
                Our platform transcends mere casting of ballots; it's a space
                for connection, collaboration, and informed dialogue.
                Through forums, live sessions, and networking, we foster a
                culture of engagement, ensuring every voice is heard in the democratic
                process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About