"use client";
import Container from "@/componets/Container";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "@/context/AuthContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useRouter } from "next/navigation";
import PrivateRoute from "@/Utility/PrivateRoute";
import Swal from "sweetalert2";
import { DateFormat } from "@/Utility/FormetDate";
import { useQuery } from "@tanstack/react-query";
import Animation from "@/Utility/Animation";

const Doner = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

  const {
    data: bloodBankData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["bloodBanks"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bloodBanks`);
      return res.data;
    },
  });
  const regionsDuplicate = bloodBankData.map((center) => center.region);
  const bloodData = [...new Set(regionsDuplicate)];
  const region = watch("region");

  const districtByRegion = (district) => {
    const regionDistricts = bloodBankData.filter(
      (service) => service.region === district
    );
    const disricts = regionDistricts.map((r) => r.district);
    return disricts;
  };

  const handleBeDoner = async (data) => {
    data.contributerEmail = user.email;
    data.createAt = DateFormat(new Date());
    // console.log(data);
    await axiosSecure
      .post("/doners", data)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Blood Doners Registration Successfully",
            showConfirmButton: false,
            timer: 1000,
          });
          router.push("/search-doners");
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error,
          showConfirmButton: false,
          timer: 1000,
        });
      });
  };
  if (isLoading) return <Animation />;
  return (
    <PrivateRoute>
      <Container className="my-26 px-6 min-h-screen">
        <form
          onSubmit={handleSubmit(handleBeDoner)}
          className="bg-base-300 md:py-12 py-6 md:px-16 px-6 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transform transition duration-1000 ease-in-out hover:bg-base-200 hover:-translate-y-1"
        >
          <fieldset className="fieldset">
            <h1 className="font-black text-2xl md:text-4xl text-primary">
              Be a Doner
            </h1>
            <p className="md:w-1/2 py-4">
              Register as a blood donor on this website, and update the date of
              your last blood donation after donating blood, this will make it
              easier for other patients to find blood donors.
            </p>

            {/* divider */}
            <div className="divider"></div>

            <h3 className="font-bold md:text-2xl text-xl mb-2">
              Please fill the following information to register donor.
            </h3>
            {/* radio */}

            <div className="md:flex gap-10 items-center justify-between">
              <div className="flex-3">
                {/* name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <legend className="fieldset-legend">Your Name</legend>
                    <input
                      type="text"
                      className="input w-full md:input-md input-sm"
                      placeholder="Your Name"
                      defaultValue={user?.displayName?.toUpperCase()}
                      {...register("name", { required: true })}
                    />
                  </div>
                  {/* age */}
                  <div className="">
                    <legend className="fieldset-legend">Your Age</legend>
                    <input
                      type="number"
                      className="input w-full md:input-md input-sm"
                      placeholder="Your Age"
                      {...register("age", { required: true })}
                    />
                    {errors.age?.type === "required" && (
                      <p className="text-red-500 py-2">Age Required!</p>
                    )}
                  </div>

                  {/* email */}

                  <div>
                    <legend className="fieldset-legend">Email</legend>
                    <input
                      type="email"
                      className="input w-full md:input-md input-sm"
                      placeholder="Email"
                      defaultValue={user?.email}
                      // readOnly
                      {...register("email", { required: true })}
                    />
                  </div>

                  {/* blood group */}

                  <div>
                    <legend className="fieldset-legend">Blood Group</legend>
                    <select
                      defaultValue={""}
                      className="select w-full md:select-md select-sm"
                      {...register("bloodGroup", { required: true })}
                    >
                      <option value={""} disabled>
                        Select Your BG
                      </option>
                      {bloodGroups.map((group, index) => (
                        <option value={group} key={index}>
                          {group}
                        </option>
                      ))}
                    </select>
                    {errors.bloodGroup?.type === "required" && (
                      <p className="text-red-500 py-2">Blood Group Required!</p>
                    )}
                  </div>
                  {/* contact */}

                  <div>
                    <legend className="fieldset-legend">Contact No</legend>
                    <input
                      type="text"
                      className="input w-full md:input-md input-sm"
                      placeholder="Contact No."
                      {...register("number", { required: true })}
                    />
                    {errors.number?.type === "required" && (
                      <p className="text-red-500 py-2">Contact No. Required!</p>
                    )}
                  </div>

                  {/* Nid */}

                  <div>
                    <legend className="fieldset-legend">NID No</legend>
                    <input
                      type="text"
                      className="input w-full md:input-md input-sm"
                      placeholder="NID"
                      {...register("nid", { required: true })}
                    />
                    {errors.nid?.type === "required" && (
                      <p className="text-red-500 py-2">NID No. Required!</p>
                    )}
                  </div>

                  {/* region */}
                  <div>
                    <legend className="fieldset-legend">Your Region</legend>
                    <select
                      defaultValue={""}
                      className="select w-full md:select-md select-sm"
                      {...register("region", { required: true })}
                    >
                      <option value={""} disabled>
                        Select Your Region
                      </option>
                      {bloodData.map((region, index) => (
                        <option key={index}>{region}</option>
                      ))}
                    </select>
                    {errors.region?.type === "required" && (
                      <p className="text-red-500 py-2">Region Required!</p>
                    )}
                  </div>
                  {/* district */}
                  <div>
                    <legend className="fieldset-legend">District</legend>
                    <select
                      defaultValue={""}
                      className="select w-full md:select-md select-sm"
                      {...register("district", { required: true })}
                    >
                      <option value={""} disabled>
                        Select District
                      </option>
                      {region &&
                        districtByRegion(region).map((district, index) => (
                          <option value={district} key={index}>
                            {district}
                          </option>
                        ))}
                    </select>
                    {errors.district?.type === "required" && (
                      <p className="text-red-500 py-2">District Required!</p>
                    )}
                  </div>

                  {/* area */}

                  <div className="col-span-2">
                    <legend className="fieldset-legend">Area</legend>
                    <input
                      type="text"
                      className="input w-full md:input-md input-sm"
                      placeholder="Your Area"
                      {...register("area", { required: true })}
                    />
                  </div>
                  {errors.area?.type === "required" && (
                    <p className="text-red-500 py-2">Area Required!</p>
                  )}

                  {/* addional information */}

                  <div className="col-span-2">
                    <legend className="fieldset-legend">
                      Additional Information
                    </legend>
                    <textarea
                      type="text"
                      className="input w-full md:input-md input-sm h-30 p-2"
                      placeholder="Your Additional Information"
                      {...register("information", { required: true })}
                    />

                    {errors.information?.type === "required" && (
                      <p className="text-red-500 py-2">
                        Additional Information Required!
                      </p>
                    )}
                  </div>
                </div>

                {/* button */}

                <div className="py-6 w-full">
                  <button type="submit" className="btn-full">
                    Submit
                  </button>
                </div>
              </div>

              <div className="flex-2 md:block hidden">
                <img src="https://i.ibb.co.com/CpL3c0dC/Asset-1.png" />
              </div>
            </div>
          </fieldset>
        </form>
      </Container>
    </PrivateRoute>
  );
};

export default Doner;
