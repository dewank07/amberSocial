"use client";
import React, { useEffect, useState } from "react";
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

const NewDashboard = () => {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));
  const { user } = useUser();
  const [data, setData] = useState([]);
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const response = await axios.get(
        "https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/posts?select=*%2Cuser%3Auser_id(*)",
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
          },
        }
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className='mainContainer'>
        <Sidebar />

        <div className='mainSection'>
          <PostForm userData={user} />
          {data?.map((val, index) => {
            return <Post key={index} setData={setData} userData={val} />;
          })}
        </div>

        <div className='rightSection'>
          <div className='requestWidget'>
            <h3>Requests</h3>
            <div className='requestProfile'>
              <div className='details'>
                <div className='profileImage'>
                  <img src={"/assets/image/avatar_default.jpg"} alt='' />
                </div>
                <div className='userDetails'>
                  <div className='name'>Sophie Alexander</div>
                  <div className='username'>@johndoe</div>
                </div>
              </div>
              <div className='actions'>
                <button className='actionBtn'>Accept</button>
                <button className='actionBtn'>Reject</button>
              </div>
            </div>
            <div className='requestProfile'>
              <div className='details'>
                <div className='profileImage'>
                  <img
                    src={
                      "https://images.unsplash.com/photo-1505695716405-61e75ecc5bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Z2lybCxib3l8fHx8fHwxNjg5NzcxMTE5&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080"
                    }
                    alt=''
                  />
                </div>
                <div className='userDetails'>
                  <div className='name'>Phillip Tønder</div>
                  <div className='username'>@philipTonder</div>
                </div>
              </div>
              <div className='actions'>
                <button className='actionBtn'>Accept</button>
                <button className='actionBtn'>Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDashboard;
