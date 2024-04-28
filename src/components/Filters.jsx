import { PostContext } from "@/context/ApisData";
import React, { useContext, useState } from "react";
import axios from "axios";

const DropdownFilter = ({ text, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const { posts, setPosts, fetchPosts } = useContext(PostContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterPosts = async (tag) => {
    setSelectedTag(tag);
    if (tag === "desc") {
      try {
        console.log("hello");
        const response = await axios.get(
          "https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/posts?order=created_at.desc&select=*%2Cuser%3Auser_id(*)",
          {
            headers: {
              apikey:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
            },
          }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    } else if (tag === "asec") {
      fetchPosts();
    } else if (tag === "1degree") {
    } else if (tag === "2degree") {
    }

    setIsOpen(false);
    // Call your filtering logic here
  };

  return (
    <div className='relative'>
      <button
        className='bg-white hover:bg-gray-700 text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-800'
        onClick={toggleDropdown}
      >
        {text}
      </button>
      {isOpen && (
        <div className='absolute mt-2 w-48 rounded shadow-lg bg-white border border-gray-800'>
          {data?.map((val, index) => {
            return (
              <span
                key={index}
                className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
                onClick={() => filterPosts(val)}
              >
                {val}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
