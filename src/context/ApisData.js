"use client";
import React, { createContext, useEffect, useState } from "react";
import {
  fetchPosts,
  fetchRequests,
  getDataFromLocal,
  getSuggestion,
} from "@/utils/UserData";
export const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // Initialize posts state
  const [request, setRequest] = useState([]); // Initialize posts state
  const [userDetail, setUserDetail] = useState([]);
  const [friendSuggestion, setFriendSuggestion] = useState([]);

  useEffect(() => {}, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        request,
        setRequest,
        userDetail,
        setUserDetail,
        friendSuggestion,
        setFriendSuggestion,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
