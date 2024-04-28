import { handleAcceptRequest, handleRejectRequest } from "@/utils/UserData";
import React from "react";

const RequestCard = ({ val }) => {
  return (
    <div className='requestProfile'>
      <div className='details'>
        <div className='profileImage'>
          <img src={val?.initiator_details?.avatar} alt='avatar' />
        </div>
        <div className='userDetails'>
          <div className='name'>{val?.initiator_details?.name}</div>
          <div className='username'>{val?.initiator_details?.user_email}</div>
        </div>
      </div>
      <div className='actions'>
        <button className='actionBtn' onClick={() => handleAcceptRequest(val)}>
          Accept
        </button>
        <button className='actionBtn' onClick={() => handleRejectRequest(val)}>
          Reject
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
