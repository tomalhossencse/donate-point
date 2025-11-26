"use client";
import React from "react";
import Container from "../Container";
import DonerCard from "../Issue/DonerCard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Animation from "@/Utility/Animation";

const RecentDoners = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: doners = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["doners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/latest-doners`);
      return res.data;
    },
  });
  if (isLoading) return <Animation />;
  return (
    <Container className="my-16 px-6">
      <div className="text-3xl font-semibold w-[350px] mx-auto text-base-100 py-2 rounded-4xl bg-primary text-center mb-4">
        Latest Doners
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-0 p-4 mt-12">
        {" "}
        {doners.map((doner) => (
          <DonerCard doner={doner} key={doner._id} />
        ))}
      </div>
    </Container>
  );
};

export default RecentDoners;
