"use client";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // Initialize posts state
  const [request, setRequest] = useState([]); // Initialize posts state

  // Function to fetch posts data
  const fetchPosts = async () => {
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
      setPosts(response.data);
      const res = await axios.get(
        `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/request?responder=eq.4&select=*,initiator_details:initiator(*),responder_details:responder(*)`,
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
          },
        }
      );
      setRequest(res.data);
      console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the fetchPosts function to get the initial posts data
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostContext.Provider
      value={{ posts, setPosts, fetchPosts, setRequest, request }}
    >
      {children}
    </PostContext.Provider>
  );
};
