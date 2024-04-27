import React, { useContext } from "react";
import { MdSettings } from "react-icons/md";
import {
  FaBell,
  FaBookmark,
  FaBrush,
  FaCompass,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { PostContext } from "@/context/postData";

const links = [
  {
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Explore",
    icon: <FaCompass />,
  },
  {
    name: "Notifications",
    icon: <FaBell />,
  },
  {
    name: "Messages",
    icon: <FaEnvelope />,
  },
  {
    name: "Bookmarks",
    icon: <FaBookmark />,
  },
  {
    name: "Theme",
    icon: <FaBrush />,
  },
  {
    name: "Settings",
    icon: <MdSettings />,
  },
];

const Sidebar = () => {
  const { userDetail: user } = useContext(PostContext);
  return (
    <div className='leftSection'>
      <div className='userProfileWidget'>
        <div className='profileImage'>
          <img src={user?.avatar} alt='' />
        </div>
        <div className='userDetails'>
          <Link href={"/Profile"} className='name'>
            {user?.name}
          </Link>
          <div className='username'>{user?.user_email}</div>
        </div>
      </div>

      <div className='inSidebar'>
        {links.map((link, index) => {
          return (
            <div className='link' key={index}>
              <div className='icon'>{link.icon}</div>
              <h3>{link.name}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
