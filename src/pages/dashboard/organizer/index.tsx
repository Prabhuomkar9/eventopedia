import { NextPage } from "next";
import React from "react";
import DashBoardLayout from "~/components/layout/dashBoardLayout";

const Organiser: NextPage = () => {
  return (
    <DashBoardLayout allowedUserRole="ORGANIZER">
      <div>
        <h1>Organizer Dashboard</h1>
        <p>Welcome to the organizer dashboard</p>
      </div>
    </DashBoardLayout>
  );
};

export default Organiser;
