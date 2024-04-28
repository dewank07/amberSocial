import React from "react";

const AddFriendCard = ({ val }) => {
  return (
    <div className='requestProfile'>
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
          onClick={() => console.log("accepted", val.name, " ", val.user_email)}
        >
          Add Friend
        </button>
        <button className='actionBtn'>Reject</button>
      </div>
    </div>
  );
};

export default AddFriendCard;
