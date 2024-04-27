"use client";
import { Button } from "@/components/ui/button";
import { PostContext } from "@/context/postData";
import axios from "axios";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { setUserDetail } = useContext(PostContext);
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://mfypntbsrdymcnbjtdcm.supabase.co/rest/v1/user?user_email=eq.${formData.email}&password=eq.${formData.password}`,
        {
          headers: {
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1meXBudGJzcmR5bWNuYmp0ZGNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxMjM4ODksImV4cCI6MjAyOTY5OTg4OX0.UehQ_jBquTXgZd6XcDZJU_esJcOd-Ux1erkqLX9Go40",
          },
        }
      );
      if (res.data[0].length !== 0) {
        localStorage.setItem("user", JSON.stringify(res.data[0]));
        setUserDetail(res.data[0]);
        router.push("/dashboard");
      }
      // window.location.href = `${window.location.origin}/dashboard`;
    } catch (error) {
      alert("Invalid email or password");
    }
  };
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='relative isolate px-6 pt-14 lg:px-8'>
        {/* gradient blob */}
        <div
          className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className='flex items-center justify-center'>
          <form onSubmit={handleSubmit}>
            <label className='block mb-2' htmlFor='user_id'>
              Email
            </label>
            <input
              type='email'
              name='email'
              onChange={handleChange}
              value={formData.email}
              className='w-full p-2 mb-4 border border-gray-300 rounded-md'
            />

            <label className='block mb-2' htmlFor='caption'>
              password
            </label>
            <input
              type='password'
              name='password'
              onChange={handleChange}
              value={formData.password}
              className='w-full p-2 mb-4 border border-gray-300 rounded-md'
            />

            <Button type='submit'>signup</Button>
          </form>
        </div>
        {/* gradient blob */}
        <div
          className='absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]'
          aria-hidden='true'
        >
          <div
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]'
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
