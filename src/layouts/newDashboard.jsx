"use client";
import React, { useContext, useEffect, useState } from "react";
import { MdSettings, MdInsertPhoto, MdEmojiEmotions } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useClickOutside } from "@mantine/hooks";
import userData from "@/utils/UserData";
import Sidebar from "@/components/main/Sidebar";
import Post from "@/components/main/Post";
import Navbar from "@/components/main/Navbar";
import supabase from "@/utils/supabaseClient";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { PostForm } from "@/components/PostCreateForm";
import DropdownFilter from "@/components/Filters";
import { PostContext } from "@/context/postData";

const NewDashboard = () => {
  const { posts: data, setPosts: setData, request } = useContext(PostContext);

  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));
  const { user } = useUser();

  return (
    <>
      <div className='mainContainer'>
        <Sidebar />

        <div className='mainSection flex flex-col items-center justify-center w-full'>
          <PostForm userData={user} />
          <div className='w-full flex items-center justify-between px-4 mt-4'>
            <DropdownFilter text={"Filter by Tag"} />
            <DropdownFilter text={"Filter by Date"} />
            <DropdownFilter text={"Filter by Friends"} />
          </div>
          {data?.map((val, index) => {
            return <Post key={index} setData={setData} userData={val} />;
          })}
        </div>

        <div className='rightSection'>
          <div className='requestWidget'>
            <h3>Requests</h3>
            {request.map((val, index) => {
              return (
                <div className='requestProfile' key={index}>
                  <div className='details'>
                    <div className='profileImage'>
                      <img src={val?.initiator?.avatar} alt='avatar' />
                    </div>
                    <div className='userDetails'>
                      <div className='name'>{val?.initiator?.name}</div>
                      <div className='username'>
                        {val?.initiator?.user_email}
                      </div>
                    </div>
                  </div>
                  <div className='actions'>
                    <button className='actionBtn'>Accept</button>
                    <button className='actionBtn'>Reject</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDashboard;
