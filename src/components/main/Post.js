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
import supabase from "@/utils/supabaseClient";

const Post = ({ userData, setData }) => {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const postLiked = async () => {
    const { data, error } = await supabase
      .from("posts")
      .update({ likes: `${Number(userData?.likes || 0) + 1}` })
      .eq("id", userData?.id)
      .select();
    setLiked(true);
    setData((prev) =>
      prev.map((item) =>
        item.id === userData.id ? { ...item, likes: data[0].likes } : item
      )
    );
  };
  useEffect(() => {
    const channels = supabase
      .channel("custom-update-channel")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "posts" },
        (data) => {
          console.log("Change received!", data);
        }
      )
      .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, [liked]);
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
            src={userData?.media}
            alt='img'
            className='postImage'
            onClick={() => setOpen(!open)}
            animate={{ scale: open ? 2 : 1 }}
          />
        </div>
        <div>
          <span>{userData?.caption}</span>
          <span></span>
        </div>

        <div className='postFooter'>
          <div className='postActions'>
            <div className='left'>
              <div
                className='likeBtn flex  items-center justify-center gap-0'
                onClick={() => {
                  liked ? setLiked(false) : postLiked();
                }}
              >
                <span className='text-xs'>{userData?.likes}</span>
                {liked ? <FaHeart color='red' /> : <HiOutlineHeart />}
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
