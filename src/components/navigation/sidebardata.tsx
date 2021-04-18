import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <AiIcons.AiFillDashboard />,
    cName: 'nav-text',
  },
  {
    title: 'Property',
    path: '/property',
    icon: <FaIcons.FaRegBuilding />,
    cName: 'nav-text',
  },
  {
    title: 'Units',
    path: '/units',
    icon: <FaIcons.FaBed />,
    cName: 'nav-text',
  },
  {
    title: 'Features',
    path: '/features',
    icon: <IoIcons.IoIosBed />,
    cName: 'nav-text',
  },
  {
    title: 'Photos',
    path: '/photos',
    icon: <IoIcons.IoIosImages />,
    cName: 'nav-text',
  },
];
