"use client";
import Container from "@/componets/Container";
import DonerCard from "@/componets/Doner/DonerCard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const SearchDoners = () => {
  const axiosSecure = useAxiosSecure();
  const { data: doners = [], refetch } = useQuery({
    queryKey: ["doners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/doners`);
      return res.data;
    },
  });
  return (
    <Container className="mt-20 min-h-screen px-6">
      <h1>This search doner page : {doners.length}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:p-0 p-4 mt-6">
        {" "}
        {doners.map((doner) => (
          <DonerCard doner={doner} key={doner._id} />
        ))}
      </div>
    </Container>
  );
};

export default SearchDoners;
