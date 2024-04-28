"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { MdSearch, MdClose, MdSettings } from "react-icons/md";
import { FaAngleDown, FaFaceFrown } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useClickOutside } from "@mantine/hooks";
import Image from "next/image";
import LOGO from "@/assets/logo.png";
import axios from "axios";
import { PostContext } from "@/context/ApisData";
import { API_KEY } from "@/utils/constant";
import { fetchPosts } from "@/utils/UserData";
const Navbar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));
  const [searchValue, setSearchValue] = useState("");
  const [ProfileMenu, setProfileMenu] = useState(false);
  // const [searchedUser, setSearchedUser] = useState(userData);
  const [searchPanel, setSearchPanel] = useState(false);
  const { posts, setPosts } = useContext(PostContext);

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
            apikey: API_KEY,
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
                  onClick={async () => {
                    setSearchValue("");
                    setIsFocused(false);
                    setPosts(await fetchPosts());
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
      </motion.div>
    </>
  );
};

export default Navbar;
