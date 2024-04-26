import { Dashboard } from "@/layouts/dashboard";
import DashboardLayout from "@/layouts/DashboardLayout";
import NewDashboard from "@/layouts/newDashboard";
import { UserButton } from "@clerk/nextjs";
import React from "react";

const page = () => {
  // return <NewDashboard />;
  return <DashboardLayout />;
};

export default page;
