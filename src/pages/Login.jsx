import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"

function Login() {
  return (
    <Template
      title="Secure Access to Your Vote"
      description1="Protecting Your Voice: Log in to VoteChain's Secure Platform and"
      description2="Cast Your Vote with Confidence."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login