import { type NextPage } from "next";
import React from "react";
import DashBoardLayout from "~/components/layout/dashBoardLayout";

const President: NextPage = () => {
  return (
    <DashBoardLayout allowedUserRole="PRESIDENT">
      <div>
        <h1>President Dashboard</h1>
        <p>Welcome to the president dashboard</p>
      </div>
    </DashBoardLayout>
  );
};

export default President;
