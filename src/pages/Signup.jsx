import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Signup() {
  return (
    <Template
      title="Join VoteChain: Register to Cast Your Vote Safely"
      description1="Register with VoteChain and Access a Trusted Platform for"
      description2="Transparent and Confidential Voting."
      image={signupImg}
      formType="signup"
    />
  )
}

export default Signup