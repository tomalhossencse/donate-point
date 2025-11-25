"use client";
import Container from "@/componets/Container";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaPhoneVolume, FaRegCircleUser } from "react-icons/fa6";
import { HiCalendarDateRange } from "react-icons/hi2";
import { MdBloodtype, MdMarkEmailRead } from "react-icons/md";

const DonerDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {
    data: doner,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["doners", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/doners/${id}`);
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading donor details</p>;
  return (
    <Container className="min-h-screen mt-30 p-6">
      <div
        className="flex justify-between gap-12 items-center bg-base-200 p-6 rounded-xl space-y-4 shadow-md 
            transform transition duration-300 ease-in-out 
            hover:scale-105 hover:bg-accent-content hover:-translate-y-1"
      >
        <div className="flex-2 p-2 w-[300px]">
          <img
            className="rounded-xl w-full h-full object-cover"
            src="https://i.ibb.co.com/CpL3c0dC/Asset-1.png"
          />
        </div>
        <div className="flex-3 flex flex-col justify-center items-start px-2 space-y-4">
          <div className="flex gap-2 text-3xl font-bold text-primary">
            <FaRegCircleUser />
            <span className="">{doner.name.toUpperCase()}</span>
          </div>
          {/* contact */}
          <div className="flex gap-4">
            <div className="bg-primary text-base-100 px-4 py-2 rounded-md my-2 flex gap-2 items-center js">
              <div>
                <FaPhoneVolume />
              </div>
              <span>{doner.number}</span>
            </div>
            <div className="bg-secondary-content px-4 py-2 rounded-md my-2 flex gap-2 items-center js">
              <div className="text-secondary">
                <MdMarkEmailRead size={20} />
              </div>
              <span>{doner.email}</span>
            </div>
          </div>
          {/* area */}
          <div className="flex items-center gap-4 text-lg text-secondary w-3/4 px-4 py-4 rounded-md ">
            <FaMapMarkedAlt className="text-primary" size={24} />
            <span>{doner.area}</span>
          </div>
          {/* information */}
          <div className="bg-base-300 w-3/4 px-4 py-4 rounded-m">
            {doner.information}
          </div>
          <div className=" flex gap-10 items-center justify-center text-accent">
            <div className="flex items-center justify-center gap-1">
              <span className="text-primary">
                <MdBloodtype size={24} />
              </span>
              <span className="text-primary font-bold text-xl">
                {doner.bloodGroup}
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>
                <CiLocationOn />
              </span>
              <span>
                {doner.district}, {doner.region}
              </span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>
                <HiCalendarDateRange />
              </span>
              <span>{doner.age} years</span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default DonerDetails;
