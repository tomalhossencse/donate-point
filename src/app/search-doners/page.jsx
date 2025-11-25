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
    <Container className="mt-24 min-h-screen px-6">
      <div className="text-3xl font-semibold w-[400px] mx-auto text-base-100 py-2 rounded-4xl bg-primary text-center mb-4">
        Our Blood Doners
      </div>
      <div className="flex  justify-between">
        <p className="md:text-2xl text-md text-primary font-semibold flex-1">
          Doners found : ({doners.length})
        </p>
      </div>

      <div className="flex gap-4 mb-6 flex-2 justify-end">
        {/* Status Filter */}
        <select
          className="select select-bordered"
          //   value={statusFilter}
          //   onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="ongoing">Pending</option>
          <option value="solved">Resolved</option>
        </select>

        {/* Category Filter */}
        <select
          className="select select-bordered"
          //   value={categoryFilter}
          //   onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Garbage">Garbage</option>
          <option value="Illegal Construction">Illegal Construction</option>
          <option value="Broken Public Property">Broken Public Property</option>
          <option value="Road Damage">Road Damage</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-0 p-4 my-12">
        {" "}
        {doners.map((doner) => (
          <DonerCard doner={doner} key={doner._id} />
        ))}
      </div>
    </Container>
  );
};

export default SearchDoners;
