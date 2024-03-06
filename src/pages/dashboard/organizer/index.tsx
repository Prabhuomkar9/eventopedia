import { NextPage } from "next";
import React from "react";
import DashBoardLayout from "~/components/layout/dashBoardLayout";

const Organiser: NextPage = () => {
  return (
    <DashBoardLayout allowedUserRole="ORGANISER">
      <div>
        <h1>Organiser Dashboard</h1>
        <p>Welcome to the organiser dashboard</p>
      </div>
    </DashBoardLayout>
  );
};

export default Organiser;
