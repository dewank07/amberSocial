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
import { UserButton, useUser } from "@clerk/nextjs";
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
    if (value !== "") {
      const response = await axios.get(
        `https://flask.staging-amber.com/BotResponse/${value}`
      );
      const tag = response.data.TAG;
      const res = await axios.get(
        `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/posts?tags=eq.${tag}&select=*,user: user_id(*)`,
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
          },
        }
      );

      setPosts(res.data);
    }
  };
  return (
    <>
      <div className='inNavbar'>
        <Link href={"/"} className='inLogo'>
          <Image src={LOGO} width={100} height={20} alt='textxs' />
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
              onBlur={() => {
                setIsFocused(false);
              }}
            />
            <div
              className={`inSearchCloseBtn ${
                searchValue.length >= 1 ? "inSearchCloseBtnActive" : ""
              }`}
            >
              <div className='flex items-center'>
                <div onClick={(e) => searchUsers(searchValue)}>Search</div>
                <MdClose
                  className='inIcon'
                  onClick={() => {
                    setSearchValue("");
                    setIsFocused(false);
                    fetchPosts();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='inNavRightOptions'>
          <div className='mobileSearchBtn' onClick={() => setSearchPanel(true)}>
            <MdSearch />
          </div>
          <a
            className='inBtn'
            href='https://amberstudent.com/plus'
            target='_blank'
          >
            Explore Amber+
          </a>
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
            onChange={(e) => setSearchValue(e.target.value)}
            onBlur={(e) => {
              searchUsers(e.target.value);
            }}
          />
          <div className='hahah'>
            <MdSearch className='' />
          </div>
          {searchValue.length >= 1 && (
            <>
              <MdClose
                className='inIcon cursor-pointer'
                onClick={() => {
                  setSearchValue("");
                  setSearchedUser(userData);
                }}
              />
            </>
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
                    <img src={`${user.profilePic}`} alt='heh' />
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
