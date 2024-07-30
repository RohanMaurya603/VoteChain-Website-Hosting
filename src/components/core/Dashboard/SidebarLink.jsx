import React from 'react'
import * as IconsVsc from "react-icons/vsc";
import * as IconsMd from "react-icons/md";
import * as IconsLia from "react-icons/lia";
import * as IconsTb from "react-icons/tb";
import * as IconsAi from "react-icons/ai"

import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const getIconComponent = (library, iconName) => {
  switch (library) {
    case 'vsc':
      return IconsVsc[iconName];
    case 'md':
      return IconsMd[iconName];
    case 'lia':
      return IconsLia[iconName];
    case 'tb':
      return IconsTb[iconName];
    case 'ai':
      return IconsAi[iconName];
    // Add more cases for other libraries if needed
    default:
      return null;
  }
};

const SidebarLink = ({link, iconName, iconLibrary}) => {

    const Icon = getIconComponent(iconLibrary, iconName);
    const location  = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
  }

  return (
    <NavLink
    to={link.path}
      className={`relative px-8 py-2 text-sm font-medium 
    ${matchRoute(link.path) ? "bg-yellow-800 text-yellow-50" :
          "bg-opacity-0 text-richblack-300"}`}
    >

        <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>

        <div className='flex item-center gap-x-2'>

        <Icon className="text-lg"/>
            <span>{link.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink
