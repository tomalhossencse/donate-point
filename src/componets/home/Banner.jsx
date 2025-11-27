"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

const Banner = () => {
  return (
    <div className="mt-4 mb-10 bg-accent-content rounded-2xl overflow-hidden">
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        effect={"fade"}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="bg-accent-content max-w-7xl mx-auto"
      >
        <SwiperSlide>
          <div className="flex flex-col gap-6 md:flex-row items-center justify-between bg-accent-content px-6 md:px-10 py-6 bg-[url('https://i.ibb.co.com/nMTVz0r8/oleksii-makarov-rc-LK2wbgq-NE-unsplash.jpg')]">
            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h1 className="text-2xl md:text-3xl lg:4xl font-bold text-primary">
                Donate Your Blood to Us, Save More Life Together
              </h1>
              <p className="text-sm md:text-md lg:text-lg text-black">
                We ensure safe, secure, and efficient blood donation for all
                donors. Together, your support helps hospitals and patients
                receive life-saving blood when it’s needed most.
              </p>
              <button className="btn-primary">Help Man Now</button>
            </div>

            <div className="md:w-1/2 flex justify-center py-8">
              <img
                src="https://i.ibb.co.com/G4w1gwyw/Asset-1.png"
                className="md:h-[400px] h-[200px]"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col md:flex-row items-center justify-between bg-accent-content px-6 md:px-10 py-6 gap-6 bg-[url('https://i.ibb.co.com/nMTVz0r8/oleksii-makarov-rc-LK2wbgq-NE-unsplash.jpg')]">
            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h1 className="text-2xl md:text-3xl lg:4xl font-bold text-primary">
                Become a Hero — Your Blood Can Save Lives
              </h1>
              <p className="text-sm md:text-md lg:text-lg  text-black">
                A single donation can save up to three lives. Join our
                life-saving community and make a real impact with every drop you
                give.
              </p>
              <button className="btn-primary">Donate Blood Today</button>
            </div>

            <div className="md:w-1/2 flex justify-center py-8">
              <img
                src="https://i.ibb.co.com/3mfjXDY1/Asset-1.png"
                className="md:h-[400px] h-[200px]"
              />
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-accent-content px-6 md:px-10 py-6 bg-[url('https://i.ibb.co.com/nMTVz0r8/oleksii-makarov-rc-LK2wbgq-NE-unsplash.jpg')]">
            <div className="md:w-1/2 text-center md:text-left space-y-4">
              <h1 className="text-2xl md:text-3xl lg:4xl font-bold text-primary">
                Your Blood Donation Brings Hope to Families
              </h1>
              <p className="text-sm md:text-md lg:text-lg  text-black">
                Every donation helps emergency patients, children, and
                individuals fighting for life. Your kindness can bring hope
                where it’s needed most.
              </p>
              <button className="btn-primary">Save a Life Now</button>
            </div>

            <div className="md:w-1/2 flex justify-center py-8">
              <img
                src="https://i.ibb.co.com/wHyYMmm/Asset-1.png"
                className="md:h-[400px] h-[200px]"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
