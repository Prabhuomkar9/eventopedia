import { Branch } from "@prisma/client";
import { NextPage } from "next";
import React, { useState } from "react";

const ClubLead: NextPage<{}> = ({}) => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    branch: "ISE",
    password: "",
    usn: "",
  });

  const createUser = async () => {
    const user = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        name: userData.name,
        branch: userData.branch,
        password: userData.password,
        usn: userData.usn,
      }),
    });
    const data = await user.json();
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-3 w-full h-full justify-center items-center">
      <label htmlFor="name">Name :</label>
      <input
        className="text-black"
        type="text"
        id="name"
        value={userData.name}
        onChange={(e) => {
          setUserData((prev) => {
            return { ...prev, name: e.target.value };
          });
        }}
      />
      <label htmlFor="password">Password :</label>
      <input
        className="text-black"
        type="text"
        id="password"
        value={userData.password}
        onChange={(e) => {
          setUserData((prev) => {
            return { ...prev, password: e.target.value };
          });
        }}
      />
      <label htmlFor="branch">Branch :</label>
      <input
        className="text-black"
        type="text"
        id="branch"
        value={userData.branch}
        onChange={(e) => {
          setUserData((prev) => {
            return { ...prev };
          });
        }}
      />
      <label htmlFor="email">Email :</label>
      <input
        className="text-black"
        type="text"
        id="email"
        value={userData.email}
        onChange={(e) => {
          setUserData((prev) => {
            return { ...prev, email: e.target.value };
          });
        }}
      />
      <label htmlFor="usn">USN :</label>
      <input
        className="text-black"
        type="text"
        id="usn"
        value={userData.usn}
        onChange={(e) => {
          setUserData((prev) => {
            return { ...prev, usn: e.target.value };
          });
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          createUser();
        }}
      >
        Create
      </button>
    </form>
  );
};

export default ClubLead;
