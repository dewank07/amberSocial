"use Client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PostContext } from "@/context/ApisData";
import { fetchPosts, getPostDesc } from "@/utils/UserData";
import { API_KEY } from "@/utils/constant";

export function PostForm({ userData }: any) {
  const { userDetail, setPosts } = useContext(PostContext);
  const [open, setOpen] = useState(false);
  const url = "https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/posts";
  const headers = {
    apikey: API_KEY,
  };
  const [formData, setFormData] = useState({
    type: "recommendation",
    media: "",
    user_id: `${userDetail.id}`,
    caption: "",
    tags: "",
  });
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.get(
      `https://flask.staging-amber.com/BotResponse/${formData.caption}`
    );
    const tag = response.data.TAG;

    const data = { ...formData, tags: tag, user_id: `${userDetail.id}` };
    // Add your form submission logic here
    await axios.post(url, data, { headers }).catch((error) => {
      console.error(error);
    });
    setPosts(await getPostDesc());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className='w-[95%] bg-white flex px-4 md:px-8 justify-between items-center py-4 rounded-lg'>
          <div className='flex gap-2 items-center'>
            <img
              src={userData?.avatar}
              alt='image'
              className='w-10 h-10  rounded-full'
            />
            <span className=''>Hey! How are you {userData?.name}?</span>
          </div>
          <Button className='shadow-xl' onClick={() => setOpen(true)}>
            Create Post
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[400px] max-h-[90%] overflow-y-scroll'>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Share what you are feeling with the world.
          </DialogDescription>
        </DialogHeader>
        <div className='grid-cols-2 gap-2 py-1 overflow-y-auto'>
          <form onSubmit={handleSubmit}>
            <label className='block mb-2' htmlFor='type'>
              Type
            </label>
            <select
              name='type'
              onChange={handleChange}
              value={formData.type}
              className='w-full p-2 mb-4 border border-gray-300 rounded-md'
            >
              <option value='recommendation'>Recommendation</option>
              <option value='request'>Request</option>
              <option value='service'>Service</option>
            </select>

            <label className='block mb-2' htmlFor='media'>
              Media
            </label>
            <input
              type='url'
              name='media'
              onChange={handleChange}
              value={formData.media}
              className='w-full p-2 mb-4 border border-gray-300 rounded-md'
            />

            <label className='block mb-2' htmlFor='caption'>
              Caption
            </label>
            <textarea
              name='caption'
              onChange={handleChange}
              value={formData.caption}
              className='w-full p-2 mb-4 h-24 border border-gray-300 rounded-md'
            ></textarea>
            <Button type='submit'>Create Post</Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
