"use client";
import Container from "@/componets/Container";
import DonerCard from "@/componets/Issue/DonerCard";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Animation from "@/Utility/Animation";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";

const SearchDoners = () => {
  const axiosSecure = useAxiosSecure();
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    data: doners = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["doners"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/doners`);
      return res.data;
    },
  });

  const { data: bloodBankData = [] } = useQuery({
    queryKey: ["bloodBanks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bloodBanks`);
      return res.data;
    },
  });

  const regionsDuplicate = bloodBankData.map((center) => center.region);
  const bloodData = [...new Set(regionsDuplicate)];
  const selectedRegion = watch("region");
  const selectedDistrict = watch("district");
  const selectedbloodGroup = watch("bloodGroup");
  const minAge = watch("minAge");
  const maxAge = watch("maxAge");

  const districtByRegion = (district) => {
    const regionDistricts = bloodBankData.filter(
      (service) => service.region === district
    );
    const disricts = regionDistricts.map((r) => r.district);
    return disricts;
  };

  const filterDoners = doners.filter((doner) => {
    if (selectedRegion && doner.region !== selectedRegion) {
      return false;
    }
    if (selectedDistrict && doner.district !== selectedDistrict) {
      return false;
    }
    if (selectedbloodGroup && doner.bloodGroup !== selectedbloodGroup) {
      return false;
    }
    if (minAge && doner.age < Number(minAge)) {
      return false;
    }
    if (maxAge && doner.age > Number(maxAge)) {
      return false;
    }

    return true;
  });

  if (isLoading) return <Animation />;
  return (
    <Container className="mt-24 min-h-screen px-6">
      <div className="text-3xl font-semibold w-[400px] mx-auto text-base-100 py-2 rounded-4xl bg-primary text-center mb-10">
        Our Blood Doners
      </div>

      <div className="flex gap-4 mb-6 flex-2 justify-end">
        <p className="md:text-2xl text-md text-primary font-semibold flex-1">
          Doners found : ({filterDoners.length})
        </p>

        {/* age Search */}

        <label className="input w-[120px]">
          <FaSearch />
          <input type="number" placeholder="Min Age" {...register("minAge")} />
        </label>

        <label className="input w-[120px]">
          <FaSearch />
          <input type="number" placeholder="Max Age" {...register("maxAge")} />
        </label>

        {/* Region Filter */}
        <select
          className="select select-bordered w-[180px]"
          {...register("region")}
          defaultValue={""}
        >
          <option value={""}>All Region</option>
          {bloodData.map((region, index) => (
            <option key={index}>{region}</option>
          ))}
        </select>

        {/* District Filter */}

        <select
          defaultValue={""}
          className="select select-bordered w-[180px]"
          // disabled={!selectedRegion}
          {...register("district")}
        >
          <option value={""}>All District</option>
          {selectedRegion &&
            districtByRegion(selectedRegion).map((district, index) => (
              <option value={district} key={index}>
                {district}
              </option>
            ))}
        </select>

        {/* Blood Group Filter */}
        <select
          className="select select-bordered w-[160px]"
          {...register("bloodGroup")}
          defaultValue=""
        >
          <option value="">All Blood Group</option>
          {bloodGroups.map((bg, index) => (
            <option key={index} value={bg}>
              {bg}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:p-0 p-4 my-12">
        {" "}
        {filterDoners.map((doner) => (
          <DonerCard doner={doner} key={doner._id} />
        ))}
      </div>
    </Container>
  );
};

export default SearchDoners;
