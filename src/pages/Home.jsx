import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../components/core/HomePage/Button";
//import HomePageVideo from "../assets/Images/HomePageVideo.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import Footer from "../components/common/Footer";

const Home = () => {
  return (
        <div>
      {/* section 1 */}
      <div
        className="relative mx-auto flex gap-8 max-w-maxContent flex-col w-11/12 items-center text-white
        justify-between"
      >
        {/* become a voter button */}
        <Link to={"/signup"}>
          <div
            className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
                hover:drop-shadow-none"
          >
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900"
            >
              <p>Become a Voter</p>
              <FaArrowRight></FaArrowRight>
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Vote,
          <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
            {" "}
            Secure Your Future
          </span>
        </div>

        {/* Sub-Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          Revolutionize your vote with our blockchain-based online system.
          Secure, transparent, and accessible from anywhere. Redefine democratic
          participation confidently, leveraging cutting-edge blockchain
          technology.
        </div>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-row gap-7 ">
          <CTAButton active={true} linkto={"/signup"}>
            Vote Now
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Learn More
          </CTAButton>
        </div>

        {/* Video */}
        <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            {/* <source src={HomePageVideo} type="video/mp4" /> */}
          </video>
        </div>

        {/* Code Section 1  */}
        <div id="features">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Empower your
                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                  {" "}
                  Voice{" "}
                </span>
                ! Join our blockchain-based voting.
              </div>
            }
            subheading={
              "Participate in elections, cast your secure vote, and be part of reshaping democracy through cutting-edge technology. Your voice matters, and so does your vote!"
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-25"}
            codeblock={`Key Features of Blockchain Technology : \nSecure Transactions\n Transparent Record-keeping\n Tamper-Resistant\n Decentralized Consensus\nEnhanced Security\nImmutable Ledger\n Smart Contract Capabilities\n Trustworthy Digital Voting\n`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* Code Section 2 */}
        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[80%]">
                Discover the power of
                <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                  {" "}
                  Smart Contract{" "}
                </span>
                .
              </div>
            }
            subheading={
              " Seamlessly execute secure, automated agreements, ensuring trust and transparency in every electoral process."
            }
            ctabtn1={{
              btnText: "Vote Now",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/login",
              active: false,
            }}
            codeColor={"text-wite"}
            codeblock={`pragma solidity >=0.4.16 <0.9.0;\n\ncontract SimpleStorage {\nuint storedData;\nfunction set(uint x) public {\nstoredData = x;\n}\nfunction get() public view returns (uint) {\nreturn storedData;\n\t}\n}`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>
      </div>
      <Footer/>
    </div>
    );
};

export default Home;
