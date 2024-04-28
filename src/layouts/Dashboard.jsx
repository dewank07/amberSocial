"use client";
import React, { useContext, useEffect, useState } from "react";
import { useClickOutside } from "@mantine/hooks";
import Sidebar from "@/components/main/Sidebar";
import Post from "@/components/main/Post";
import { PostForm } from "@/components/PostCreateForm";
import DropdownFilter from "@/components/Filters";
import { PostContext } from "@/context/ApisData";
import { fetchBulkUsers, fetchData, getDataFromLocal } from "@/utils/UserData";
import RequestCard from "@/components/RequestCard";
import AddFriendCard from "@/components/AddFriendCard";

const Dashboard = () => {
  const {
    posts: data,
    setPosts: setData,
    request,
    setRequest,
    userDetail,
    setUserDetail,
    friendSuggestion,
    setFriendSuggestion,
  } = useContext(PostContext);

  const [isFocused, setIsFocused] = useState(false);
  const ref = useClickOutside(() => setIsFocused(false));
  const [suggestionData, setSuggestionData] = useState([]);

  // setFriendSuggestion(uniqueSuggestions);
  useEffect(() => {
    const fetchOne = async () => {
      const res = await fetchBulkUsers(friendSuggestion.join(","));
      setSuggestionData(res);
    };
    friendSuggestion.length > 0 && fetchOne();
  }, [friendSuggestion]);

  useEffect(() => {
    const fun = async () => {
      const userData = getDataFromLocal();
      if (userData) {
        setUserDetail(userData);
        const [posts, request, friends] = await fetchData(userData);
        setData(posts);
        setRequest(request);
        setFriendSuggestion(friends);
      }
    };
    if (userDetail.length == 0) {
      fun();
    }
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
          <div className='requestWidget RequestSection'>
            <h3>Requests</h3>
            {request.length > 0 ? (
              request.map((val, index) => {
                return <RequestCard key={index} val={val} />;
              })
            ) : (
              <div>No Requests</div>
            )}
          </div>
          <div className='requestWidget AddSection'>
            <h3>Add Friends</h3>
            {suggestionData.length > 0 ? (
              suggestionData.map((val, index) => {
                return <AddFriendCard key={index} val={val} />;
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

export default Dashboard;
