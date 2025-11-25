import React from "react";
import { MdBloodtype } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { HiCalendarDateRange } from "react-icons/hi2";

import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoShareSocialSharp, IoTime } from "react-icons/io5";
const DonerCard = ({ doner }) => {
  const { name, bloodGroup, district, age, _id, contributerEmail, createAt } =
    doner;
  return (
    <div
      className="flex flex-col bg-base-200 p-6 rounded-xl space-y-4 shadow-md 
            transform transition duration-300 ease-in-out 
            hover:scale-105 hover:bg-accent-content hover:-translate-y-1"
    >
      <ul className="flex justify-between text-accent">
        <li className="flex items-center justify-center gap-1">
          <span className="text-primary">
            <MdBloodtype size={24} />
          </span>
          <span className="text-primary font-bold text-xl">{bloodGroup}</span>
        </li>
        <li className="flex items-center justify-center gap-1">
          <span>
            <CiLocationOn />
          </span>
          <span>{district}</span>
        </li>
      </ul>
      <div className="p-2">
        <img
          className="rounded-xl w-full h-full object-cover"
          src="https://i.ibb.co.com/CpL3c0dC/Asset-1.png"
        />
      </div>
      <div className="px-2 space-y-4">
        {/* contributer email */}
        <div className="rounded-md bg-primary text-base-100 flex gap-2 py-1 px-2 items-center js">
          <div className="text-base-100">
            <IoShareSocialSharp size={20} />
          </div>
          <p>{contributerEmail}</p>
        </div>

        {/* create time*/}
        <div className="rounded-md text-primary flex gap-2 py-1 px-2 items-center js">
          <div>
            <IoTime size={24} />
          </div>
          <p>{createAt}</p>
        </div>
        <ul className="flex justify-between text-accent">
          <Link
            href={`/search-doners/${_id}`}
            className="flex items-center justify-center gap-4 text-accent text-md rounded-md transition-transform hover:scale-105 hover:text-primary"
          >
            <span>See Details</span>
            <FaArrowRightLong size={15} />
          </Link>
          <li className="flex items-center justify-center gap-1">
            <span>
              <HiCalendarDateRange />
            </span>
            <span>{age} years</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DonerCard;
