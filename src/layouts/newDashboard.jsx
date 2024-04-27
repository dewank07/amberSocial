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
  const {
    posts: data,
    setPosts: setData,
    request,
    fetchPosts,
    userDetail,
  } = useContext(PostContext);

  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));
  const [friendSuggestion, setFriendSuggestion] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  const handleAcceptRequest = async (request) => {
    await fetch(
      `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?id=eq.${request?.responder}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
        },
        body: JSON.stringify({
          friends: request?.responder_details?.friends
            ? [request.initiator, ...request.responder_details.friends]
            : [request.initiator],
        }),
      }
    );
    await fetch(
      `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?id=eq.${request?.initiator}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
        },
        body: JSON.stringify({
          friends: request.initiator_details?.friends
            ? [request.responder, ...request.initiator_details.friends]
            : [request.responder],
        }),
      }
    );

    await fetch(
      `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/request?id=eq.${request?.id}`,
      {
        method: "DELETE",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
        },
      }
    );
    fetchPosts();
  };

  const handleRejectRequest = async (request) => {
    await fetch(
      `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/request?id=eq.${request?.id}`,
      {
        method: "DELETE",
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
        },
      }
    );
    fetchPosts();
  };

  const getFriends = async (id) => {
    const res = await fetch(
      `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?id=eq.${id}&select=friends`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
        },
      }
    );
    const finalRes = await res.json();
    return finalRes;
  };

  const getSuggestion = async (id) => {
    const friendsOne = await getFriends(id);
    let friendsTwo = [];
    if (friendsOne[0].friends) {
      friendsOne[0].friends.forEach(async (friend) => {
        const res = await getFriends(friend);
        //console.log(res);
        if (res[0].friends) {
          console.log("array", [...friendsTwo, ...res[0].friends]);
          friendsTwo = [...friendsTwo, ...res[0].friends];
          setFriendSuggestion((state) => [
            ...new Set([...state, ...res[0].friends]),
          ]);
        }
      });
    }
    console.log("final res", friendsTwo);
    //setFriendSuggestion(friendsTwo);
  };

  const fetchBulkUsers = async (string) => {
    //https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?id=in.(4,6,7,8)
    const res = await fetch(
      `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?id=in.(${string})`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
        },
      }
    );
    const data = await res.json();
    setSuggestionData(data);
  };

  useEffect(() => {
    fetchBulkUsers(friendSuggestion.join(","));
  }, [friendSuggestion]);

  useEffect(() => {
    const data = localStorage.getItem("user");
    getSuggestion(JSON.parse(data)?.id);
  }, []);

  return (
    <>
      <div className='mainContainer'>
        <Sidebar />

        <div className='mainSection flex flex-col items-center justify-center w-full'>
          <PostForm userData={userDetail} />
          <div className='w-full flex items-center justify-between px-4 mt-4'>
            <DropdownFilter text={"Filter by Tag"} data={["asec", "desc"]} />
            <DropdownFilter text={"Filter by Date"} data={["asec", "desc"]} />
            <DropdownFilter
              text={"Filter by Friends"}
              data={["1degree", "2degree"]}
            />
          </div>
          {data?.map((val, index) => {
            return <Post key={index} setData={setData} userData={val} />;
          })}
        </div>

        <div className='rightSection'>
          <div className='requestWidget'>
            <h3>Requests</h3>
            {request.length > 0 ? (
              request.map((val, index) => {
                return (
                  <div className='requestProfile' key={index}>
                    <div className='details'>
                      <div className='profileImage'>
                        <img
                          src={val?.initiator_details?.avatar}
                          alt='avatar'
                        />
                      </div>
                      <div className='userDetails'>
                        <div className='name'>
                          {val?.initiator_details?.name}
                        </div>
                        <div className='username'>
                          {val?.initiator_details?.user_email}
                        </div>
                      </div>
                    </div>
                    <div className='actions'>
                      <button
                        className='actionBtn'
                        onClick={() => handleAcceptRequest(val)}
                      >
                        Accept
                      </button>
                      <button
                        className='actionBtn'
                        onClick={() => handleRejectRequest(val)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No Requests</div>
            )}
          </div>
          <div className='requestWidget'>
            <h3>Add Friends</h3>
            {suggestionData.length > 0 ? (
              suggestionData.map((val, index) => {
                return (
                  <div className='requestProfile' key={index}>
                    <div className='details'>
                      <div className='profileImage'>
                        <img src={val?.avatar} alt='avatar' />
                      </div>
                      <div className='userDetails'>
                        <div className='name'>{val.name}</div>
                        <div className='username'>{val.user_email}</div>
                      </div>
                    </div>
                    <div className='actions'>
                      <button
                        className='actionBtn'
                        onClick={() => handleAcceptRequest(val)}
                      >
                        Add Friend
                      </button>
                      <button
                        className='actionBtn'
                        onClick={() => handleRejectRequest(val)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No Requests</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewDashboard;
