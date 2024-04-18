import { ArrowRight } from "lucide-react";
import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";

const Home: NextPage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((currentImage) => (currentImage + 1) % 3);
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="my-32 flex h-full w-full flex-col items-center justify-center gap-52 py-10">
      <div className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-3">
        <div className="relative size-[80vw] rounded-xl md:size-[40rem]">
          <Image
            className={`transform transition-all duration-500 ease-in-out ${currentImage === 0 ? "opacity-100" : "opacity-0"}`}
            src={"/assets/svg/event1.svg"}
            fill
            alt="Event Image"
          />
          <Image
            className={`transform transition-all duration-500 ease-in-out ${currentImage === 1 ? "opacity-100" : "opacity-0"}`}
            src={"/assets/svg/event2.svg"}
            fill
            alt="Event Image"
          />
          <Image
            className={`transform transition-all duration-500 ease-in-out ${currentImage === 2 ? "opacity-100" : "opacity-0"}`}
            src={"/assets/svg/event3.svg"}
            fill
            alt="Event Image"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="max-w-96 text-center text-5xl font-bold">
            Find all intresting events happening in our college.
          </p>
          <Link href={"/events"}>
            <Button
              size={"lg"}
              className="text-2xl font-semibold text-gray-700"
            >
              Explore <ArrowRight className="ml-3" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col-reverse items-center justify-center gap-10 md:flex-row md:gap-3">
        <div className="flex flex-col items-center justify-center gap-10">
          <p className="max-w-96 text-center text-5xl font-bold">
            Find all intresting events happening in our college.
          </p>
          <Link href={"/events"}>
            <Button
              size={"lg"}
              className="text-2xl font-semibold text-gray-700"
            >
              Explore <ArrowRight className="ml-3" />
            </Button>
          </Link>
        </div>
        <div className="relative size-[80vw] rounded-xl md:size-[40rem]">
          <Image
            className={`transform transition-all duration-500 ease-in-out ${currentImage === 0 ? "opacity-100" : "opacity-0"}`}
            src={"/assets/svg/event1.svg"}
            fill
            alt="Event Image"
          />
          <Image
            className={`transform transition-all duration-500 ease-in-out ${currentImage === 1 ? "opacity-100" : "opacity-0"}`}
            src={"/assets/svg/event2.svg"}
            fill
            alt="Event Image"
          />
          <Image
            className={`transform transition-all duration-500 ease-in-out ${currentImage === 2 ? "opacity-100" : "opacity-0"}`}
            src={"/assets/svg/event3.svg"}
            fill
            alt="Event Image"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
