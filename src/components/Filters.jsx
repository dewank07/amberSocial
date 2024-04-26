import React, { useState } from "react";

const DropdownFilter = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filterPosts = (tag) => {
    setSelectedTag(tag);
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
          <a
            href='#'
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
            onClick={() => filterPosts("all")}
          >
            All
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
            onClick={() => filterPosts("technology")}
          >
            Technology
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
            onClick={() => filterPosts("entertainment")}
          >
            Entertainment
          </a>
          <a
            href='#'
            className='block px-4 py-2 text-gray-800 hover:bg-gray-200'
            onClick={() => filterPosts("sports")}
          >
            Sports
          </a>
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
