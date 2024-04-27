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
import { PostContext } from "@/context/postData";

export function PostForm({ userData }: any) {
  const url = "https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/posts";
  const headers = {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
  };
  const { userDetail, fetchPosts } = useContext(PostContext);
  const [formData, setFormData] = useState({
    type: "",
    media: "",
    user_id: userDetail.id,
    caption: "",
    tags: "",
  });
  const [open, setOpen] = useState(false);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await axios.get(
      `https://34.42.91.185:5000/BotResponse/${e.target.value}`
    );
    const tag = response.data.TAG;

    setFormData((prev) => ({
      ...prev,
      tags: tag,
    }));
    // Add your form submission logic here
    await axios
      .post(url, formData, { headers })
      .then((response) => {
        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setOpen(false);
    fetchPosts();
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
