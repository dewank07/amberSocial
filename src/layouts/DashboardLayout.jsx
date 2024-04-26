import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/main/Navbar";
import { Dashboard } from "./dashboard";
import NewDashboard from "./newDashboard";
import { CardElement } from "@/components/CardElement";

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
            <NewDashboard />
          </TabsContent>
          <TabsContent value='password'>
            <CardElement />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default DashboardLayout;
