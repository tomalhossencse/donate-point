"use client";
import React from "react";
import Container from "../Container";
import DonerCard from "../Issue/DonerCard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const HowItWork = () => {
  const axiosSecure = useAxiosSecure();
  const { data: works = [], refetch } = useQuery({
    queryKey: ["howItworks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/howItworks`);
      return res.data;
    },
  });
  return (
    <Container className="mb-12">
      <div className="text-3xl font-semibold w-[350px] mx-auto text-base-100 py-2 rounded-4xl bg-primary text-center mb-4">
        How it works
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto py-10">
        {works.map((work, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center py-6 px-3 space-y-2 
            rounded-xl border-2 border-gray-100 
            transition transform duration-300 shadow-md ease-in-out 
            hover:border-primary hover:scale-105 hover:shadow-xl"
          >
            <img src={work.img} alt={work.title} className="w-20" />

            <h3 className="text-lg font-semibold text-accent">{work.title}</h3>
            <p className="text-accent text-sm text-center">
              {work.description}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default HowItWork;
