import { NextPage } from "next";
import React from "react";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";

const Home: NextPage = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
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
          toast.warning("Warn");
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
