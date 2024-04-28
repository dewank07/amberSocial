import axios from "axios";
import { API_KEY } from "./constant";

export const handleAcceptRequest = async (request) => {
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
        apikey: API_KEY,
      },
    }
  );
  fetchPosts();
};

export const handleRejectRequest = async (request) => {
  await fetch(
    `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/request?id=eq.${request?.id}`,
    {
      method: "DELETE",
      headers: {
        apikey: API_KEY,
      },
    }
  );
  fetchPosts();
};

export const getFriends = async (id) => {
  const res = await axios.get(
    `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?id=eq.${id}&select=friends`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
      },
    }
  );
  return res.data;
};

export const fetchBulkUsers = async (userList) => {
  const res = await axios.get(
    `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?id=in.(${userList})`,
    {
      headers: {
        "Content-Type": "application/json",
        apikey: API_KEY,
      },
    }
  );
  return res.data;
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get(
      "https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/posts?select=*%2Cuser%3Auser_id(*)",
      {
        headers: {
          apikey: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchRequests = async (user) => {
  const res = await axios.get(
    `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/request?responder=eq.${user.id}&select=*,initiator_details:initiator(*),responder_details:responder(*)`,
    {
      headers: {
        apikey: API_KEY,
      },
    }
  );
  return res.data;
};

export const getDataFromLocal = () => {
  const data = localStorage.getItem("user");
  if (data.length > 0) {
    return JSON.parse(data);
  }
  return [];
};

export const getSuggestion = async (id) => {
  const friendsOne = await getFriends(id);
  const friendsTwoPromises =
    friendsOne[0].friends?.map(async (friend) => {
      const res = await getFriends(friend);
      return res[0].friends || [];
    }) || [];

  const friendsTwo = (await Promise.all(friendsTwoPromises)).flat();

  const uniqueSuggestions = [
    ...new Set([...friendsTwo, ...friendsOne[0].friends]),
  ];
  return uniqueSuggestions;
};
export const fetchData = async (userDetail) => {
  const [postsResponse, requestsResponse, addFriendsResponse] =
    await Promise.all([
      fetchPosts(),
      fetchRequests(userDetail),
      getSuggestion(userDetail.id),
    ]);
  // setPosts(postsResponse);
  // setRequest(requestsResponse);
  // // setFriendSuggestion(addFriendsResponse);
  return [postsResponse, requestsResponse, addFriendsResponse];
};

export const getPostDesc = async () => {
  const response = await axios.get(
    "https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/posts?order=created_at.desc&select=*%2Cuser%3Auser_id(*)",
    {
      headers: {
        apikey: API_KEY,
      },
    }
  );
  return response.data;
};
