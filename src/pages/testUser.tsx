import React, { useState } from "react";
import { NextPage } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";

const Test: NextPage<{}> = ({}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [password, setPassword] = useState("");
  const [usn, setUsn] = useState("");

  const getUser = async () => {
    const user = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "get",
        email: email,
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
        email: email,
        name: name,
        branch: branch,
        password: password,
        usn: usn,
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
        email: email,
        name: name,
        branch: branch,
        password: password,
        usn: usn,
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
        email: email,
      }),
    });
    const data = await user.json();
    console.log(data);
  };

  const { data: session } = useSession();

  if (!session) return <div>Please sign in</div>;

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-10">
      <div className="flex flex-col justify-center items-center gap-5">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
        <Input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => {
            setBranch(e.target.value);
          }}
        />
        <Input
          type="text"
          placeholder="USN"
          value={usn}
          onChange={(e) => {
            setUsn(e.target.value);
          }}
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
