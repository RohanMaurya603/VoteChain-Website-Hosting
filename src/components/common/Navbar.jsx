import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai"
import logo from "../../assets/Logo/votechain-high-resolution-logo-transparent.png"
import { NavbarLinks } from "../../data/navbar-links";
import { matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { toast } from "react-hot-toast";
import { setLoading } from '../../slices/authSlice';
import { useWeb3 } from '../../context';

const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const metamask = localStorage.getItem('connect');
  const { connectWeb3Metamask } = useWeb3();

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const connectWallet = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));
    await connectWeb3Metamask();
    dispatch(setLoading(false));
    toast.dismiss(toastId)
    navigate("/dashboard/my-profile");
  }

  return (
    <div className="flex h-14 justify-center items-center border-b-[1px] border-richblack-700">
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        {/* LOGO */}
        <Link to="/">
          <img src={logo} height={42} alt="BlockVote Logo" width={160} loading="lazy" />
        </Link>

        {/* navlinks */}
        <nav>
          <ul className="flex gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Features" ? (
                  <HashLink smooth to="/#features">
                    <p>{link.title}</p>
                  </HashLink>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute(link.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* login/signup/dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {
            token !== null && (
              <button onClick={connectWallet} className="rounded-[8px] text-richblack-25 bg-blue-200 border border-richblack-700 px-[12px] py-[8px] font-semibold">
                {
                  metamask ? "Connected" : "Connect Wallet"
                }
              </button>
            )
          }
          {token !== null && <ProfileDropDown />}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
