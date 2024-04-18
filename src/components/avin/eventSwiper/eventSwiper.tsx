import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import {
  RxAccessibility,
  RxArrowTopRight,
  RxCrop,
  RxDesktop,
  RxPencil2,
  RxReader,
  RxRocket,
} from "react-icons/rx";

import { type IconType } from "react-icons/lib";

const ServiceData: {
  icon: IconType;
  title: string;
  content: string;
  backgroundImage: string;
}[] = [
  {
    icon: RxCrop,
    title: "Development",
    content: "Event 1",
    backgroundImage: "/assets/avin/SpaceCity1.jpg",
  },
  {
    icon: RxPencil2,
    title: "Branding",
    content: "Event 2",
    backgroundImage: "/assets/avin/SpaceCity2.jpeg",
  },
  {
    icon: RxDesktop,
    title: "Design",
    content: "Event 3",
    backgroundImage: "/assets/avin/SpaceCity2.jpeg",
  },
  {
    icon: RxReader,
    title: "Seo",
    content: "Event 4",
    backgroundImage: "/assets/avin/SpaceCity2.jpeg",
  },
  {
    icon: RxAccessibility,
    title: "Management",
    content: "Event 5",
    backgroundImage: "/assets/avin/SpaceCity2.jpeg",
  },
  {
    icon: RxRocket,
    title: "Production",
    content: "Event 6",
    backgroundImage: "/assets/avin/SpaceCity2.jpeg",
  },
];

const EventSwiper = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // When component mounts, set loaded to true after a short delay
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 500);

    // Clear the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="z-[9999] flex h-[900px] flex-col items-center justify-center bg-[#1f2937]">
      <div className="relative px-10 py-10">
        <h1 className="rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 px-10 py-6 text-center text-5xl font-bold text-gray-100 shadow-lg">
          Upcoming Events
        </h1>
        <hr className="absolute left-0 mt-2 w-full border-t border-gray-600" />
      </div>

      <Swiper
        breakpoints={{
          340: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: true,
        }}
        speed={5000}
        modules={[FreeMode, Pagination, Autoplay]}
        className="max-w-[100%] lg:max-w-[80%]"
      >
        {ServiceData.map((item) => (
          <SwiperSlide key={item.title}>
            <div
              className={`group relative mb-20 flex h-[250px] w-[215px] cursor-pointer flex-col gap-6 overflow-hidden rounded-xl px-6 py-8 text-white shadow-lg lg:h-[400px] lg:w-[350px] ${
                loaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transition: "transform 0.5s ease, opacity 0.5s ease" }}
            >
              {/* <div className="absolute h-full w-full">
                <div className="relative h-full w-full">
                  <Image fill src="/assets/avin/SpaceCity1.jpg" alt="image" />
                </div>
              </div> */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${item.backgroundImage})` }}
              />
              <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
              <div className="relative flex flex-col gap-3">
                <item.icon className="h-[32px] w-[32px] text-blue-600 group-hover:text-blue-400" />
                <h1 className="text-xl lg:text-2xl">{item.title} </h1>
                <p className="lg:text-[18px]">{item.content} </p>
              </div>
              <RxArrowTopRight className="absolute bottom-5 left-5 h-[35px] w-[35px] text-white duration-100 group-hover:rotate-45 group-hover:text-blue-500" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventSwiper;
