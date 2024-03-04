import { NextPage } from "next";
import React from "react";
import DashBoardLayout from "~/components/layout/dashBoardLayout";

const Admin: NextPage = () => {
  return (
    <DashBoardLayout allowedUserRole="ADMIN">
      <div>
        <h1>Admin Dashboard</h1>
        <p>Welcome to the admin dashboard</p>
      </div>
    </DashBoardLayout>
  );
};

export default Admin;
