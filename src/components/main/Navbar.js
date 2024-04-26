"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MdSearch, MdClose, MdSettings } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown, FaFaceFrown } from "react-icons/fa6";
import { RiQuestionFill } from "react-icons/ri";
import userData from "@/utils/UserData";
import { motion } from "framer-motion";
import { useClickOutside } from "@mantine/hooks";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import LOGO from "@/assets/logo.png";
import axios from "axios";
import { PostContext } from "@/context/postData";
const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));
  const [searchValue, setSearchValue] = useState("");
  const [ProfileMenu, setProfileMenu] = useState(false);
  const [searchedUser, setSearchedUser] = useState(userData);
  const [searchPanel, setSearchPanel] = useState(false);
  const { posts, setPosts, fetchPosts } = useContext(PostContext);

  const searchUsers = async (value) => {
    const response = await axios.get(
      `http://34.42.91.185:5000/BotResponse/${value}`
    );
    // search tags
  };
  return (
    <>
      <div className='inNavbar'>
        <Link href={"/"} className='inLogo'>
          <Image src={LOGO} width={100} height={20} />
        </Link>
        <div
          ref={ref}
          className={`inSearch ${isFocused ? "inSearchFocused" : ""}`}
        >
          <div className='inSearchWrapper'>
            <div className='inSearchIcon'>
              <MdSearch className='inIcon' />
            </div>
            <input
              type='text'
              onClick={() => setIsFocused(true)}
              placeholder='Search'
              value={searchValue}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyUp={(e) => searchUsers(e.target.value)}
              onBlur={() => {
                setIsFocused(false);
              }}
            />
            <div
              className={`inSearchCloseBtn ${
                searchValue.length >= 1 ? "inSearchCloseBtnActive" : ""
              }`}
            >
              <MdClose
                className='inIcon'
                onClick={() => {
                  setSearchValue("");
                  setIsFocused(false);
                  setTimeout(() => {
                    setSearchedUser(userData);
                  }, 300);
                }}
              />
            </div>
          </div>
        </div>
        <div className='inNavRightOptions'>
          <div className='mobileSearchBtn' onClick={() => setSearchPanel(true)}>
            <MdSearch />
          </div>
          <label className='inBtn' htmlFor='createNewPost'>
            Create
          </label>
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>

      <motion.div
        className='mobileSearchPanel'
        initial={{ y: "100vh", pointerEvents: "none", display: "none" }}
        animate={{
          display: searchPanel ? "block" : "none",
          y: searchPanel ? 0 : "100vh",
          pointerEvents: searchPanel ? "auto" : "none",
          transition: {
            bounce: 0.23,
            type: "spring",
          },
        }}
      >
        <div className='closeBtn' onClick={() => setSearchPanel(false)}>
          <FaAngleDown />
        </div>

        <div className='inMobileSearch'>
          <div className='mobileSearchIcon'>
            <MdSearch className='inIcon' />
          </div>
          <input
            type='text'
            placeholder='Search'
            value={searchValue}
            onKeyUp={(e) => searchUsers(e.target.value)}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue.length >= 1 && (
            <MdClose
              className='inIcon cursor-pointer'
              onClick={() => {
                setSearchValue("");
                setSearchedUser(userData);
              }}
            />
          )}
        </div>

        <div className='mobileSearchResult'>
          {searchedUser.map((user, index) => {
            if (user.error) {
              return (
                <div className='noUserFound' key={index}>
                  <FaFaceFrown />
                  <h3>Sorry {user.error}</h3>
                </div>
              );
            } else {
              return (
                <div
                  className='mobileSearchItem'
                  key={index}
                  onClick={() => {
                    setSearchValue(user.name);
                    setSearchPanel(false);
                  }}
                >
                  <div className='profileImage'>
                    <img src={`${user.profilePic}`} alt='' />
                  </div>
                  <h3>{user.name}</h3>
                </div>
              );
            }
          })}
        </div>
      </motion.div>
    </>
  );
};

export default Navbar;
