import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
    library : "vsc"
  },
  {
    id: 2,
    name: "Introduction",
    path: "/voter/introduction",
    type: ACCOUNT_TYPE.VOTER,
    icon: "TbNotes",
    library : "tb"
  },
  {
    id: 3,
    name: "Registration",
    path: "/voter/registration",
    type: ACCOUNT_TYPE.VOTER,
    icon: "MdAppRegistration",
    library : "md"
  },
  {
    id: 4,
    name: "Vote",
    path: "/voter/vote",
    type: ACCOUNT_TYPE.VOTER,
    icon: "MdHowToVote",
    library : "md"
  },
  {
    id: 5,
    name: "Add Candidate",
    path: "/admin/add-candidate",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "AiOutlineUserAdd",
    library : "ai"
  },
  {
    id: 6,
    name: "Verify Voter",
    path: "/admin/verify-voter",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "MdOutlineVerified",
    library : "md"
  },
  {
    id: 7,
    name: "Change Phase",
    path: "/admin/change-phase",
    type: ACCOUNT_TYPE.ADMIN,
    icon: "TbStatusChange",
    library : "tb"
  },
  {
    id: 8,
    name: "Result",
    path: "/election/result",
    // type: ACCOUNT_TYPE.VOTER,
    icon: "LiaVoteYeaSolid",
    library : "lia"
  },

];
