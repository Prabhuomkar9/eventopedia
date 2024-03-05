import { NextPage } from "next";
import React from "react";
import { toast } from "react-toastify";
import { Button } from "~/components/ui/button";

const Home: NextPage = () => {
  return (
    <div className="h-full w-full flex flex-col gap-5 justify-center items-center">
      <div>Home</div>
      <Button
        onClick={() => {
          toast("Default");
        }}
      >
        Default
      </Button>
      <Button
        onClick={() => {
          toast.success("Success");
        }}
      >
        Success
      </Button>
      <Button
        onClick={() => {
          toast.error("Error");
        }}
      >
        Error
      </Button>
      <Button
        onClick={() => {
          toast.warn("Warn");
        }}
      >
        Warn
      </Button>
      <Button
        onClick={() => {
          toast.info("Info");
        }}
      >
        Info
      </Button>
    </div>
  );
};

export default Home;
