import React, { useState } from "react";
import { NextPage } from "next";
import { Branch } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Test: NextPage<{}> = ({}) => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    branch: "" as Branch,
    password: "",
    usn: "",
  });

  const getUser = async () => {
    const user = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "get",
        email: userData.email,
      }),
    });
    const data = await user.json();
    console.log(data);
  };

  const createUser = async () => {
    const user = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "create",
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

  const updateUser = async () => {
    const user = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "update",
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

  const deleteUser = async () => {
    const user = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "delete",
        email: userData.email,
      }),
    });
    const data = await user.json();
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-10">
      <div className="flex flex-col justify-center items-center gap-5">
        <Input
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          required
        />
        <Input
          type="text"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Branch"
          value={userData.branch}
          onChange={(e) =>
            setUserData({ ...userData, branch: e.target.value as Branch })
          }
        />
        <Input
          type="text"
          placeholder="USN"
          value={userData.usn}
          onChange={(e) => setUserData({ ...userData, usn: e.target.value })}
        />
      </div>
      <Button onClick={getUser}>Get User</Button>
      <Button onClick={createUser}>Create User</Button>
      <Button onClick={updateUser}>Update User</Button>
      <Button onClick={deleteUser}>Delete User</Button>
    </div>
  );
};

export default Test;
