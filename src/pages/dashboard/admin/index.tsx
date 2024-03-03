import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Admin: NextPage<{}> = ({}) => {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  return <div></div>;
};

export default Admin;
