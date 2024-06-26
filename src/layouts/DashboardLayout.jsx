import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/main/Navbar";
import Dashboard from "./Dashboard";
import Marketplace from "./Marketplace";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Tabs defaultValue='account' className='w-screen'>
          <TabsList className='w-screen flex items-center justify-center mt-10 bg-black'>
            <TabsTrigger value='account'>Community</TabsTrigger>
            <TabsTrigger value='password'>Market Place</TabsTrigger>
          </TabsList>
          <TabsContent value='account'>
            <Dashboard />
          </TabsContent>
          <TabsContent value='password'>
            <Marketplace />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DashboardLayout;
