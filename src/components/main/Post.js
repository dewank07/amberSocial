import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import {
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeftEllipsis,
  HiOutlineBookmark,
} from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { HiOutlineShare } from "react-icons/hi";
import { motion } from "framer-motion";

const Post = ({ userData }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className='postWrapper'>
        <div className='header'>
          <div className='left'>
            <img
              src={`${userData?.user?.avatar}`}
              alt='Image'
              className='profileImg'
            />
            <div className='userDetails'>
              <div className='name'>{userData?.user?.name}</div>
              <div className='feeling'>{userData?.user?.user_email}</div>
            </div>
          </div>
          <div className='right'>
            <div className='option'>
              <FaEllipsisH />
            </div>
          </div>
        </div>
        <div className='mainPostContent'>
          <motion.img
            src={userData.media}
            alt=''
            className='postImage'
            onClick={() => setOpen(!open)}
            animate={{ scale: open ? 2 : 1 }}
          />
        </div>
        <div>
          <span>{userData.caption}</span>
          <span></span>
        </div>

        <div className='postFooter'>
          <div className='postActions'>
            <div className='left'>
              <div className='likeBtn flex items-center justify-center gap-0'>
                {userData?.likes}
                {userData?.likes > "5" && userData?.likes !== null ? (
                  <FaHeart color='red' />
                ) : (
                  <HiOutlineHeart />
                )}
              </div>
              <div className='commentBtn'>
                <HiOutlineChatBubbleOvalLeftEllipsis />
              </div>
              <div className='shareBtn'>
                <HiOutlineShare />
              </div>
            </div>
            <div className='right'>
              <div className='saveBtn'>
                <HiOutlineBookmark />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
