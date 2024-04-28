import { PostContext } from "@/context/ApisData";
import React, { useContext, useState } from "react";
import axios from "axios";
import { API_KEY } from "@/utils/constant";
import { fetchPosts, getPostDesc } from "@/utils/UserData";

const DropdownFilter = ({ text, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");
  const { setPosts } = useContext(PostContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterPosts = async (tag) => {
    setSelectedTag(tag);
    if (tag === "desc") {
      try {
        setPosts(await getPostDesc());
      } catch (error) {
        console.error(error);
      }
    } else if (tag === "asec") {
      setPosts(await fetchPosts());
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
                className='block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer'
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
