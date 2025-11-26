"use client";
import Container from "@/componets/Container";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Animation from "@/Utility/Animation";
import PrivateRoute from "@/Utility/PrivateRoute";
import useAuthentication from "@/Utility/UseAuthentication";
import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageDoners = () => {
  const { user } = useAuthentication();
  const axiosSecure = useAxiosSecure();
  const {
    data: doners = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["mydoners", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/doners?contributerEmail=${user?.email}`
      );
      return res.data;
    },
  });

  // delete
  const deleteDonerMutation = useMutation({
    mutationFn: async (_id) => {
      const res = await axiosSecure.delete(`/doners/${_id}`);
      return res.data;
    },
    onSuccess: () => {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Donor deleted successfully",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });
  if (isLoading) return <Animation />;
  return (
    <PrivateRoute>
      <Container className={"mt-24 mb-12 pb-4 md:px-12 px-6 md:min-h-screen"}>
        <div className="md:text-2xl text-xl font-semibold md:w-[450px] w-[320px] mx-auto text-base-100 py-2 rounded-4xl bg-primary text-center mb-4">
          Added by {user?.displayName}
        </div>
        <div className="overflow-x-auto w-full pt-6">
          <table className="table w-full table-zebra">
            {/* head */}
            <thead className="bg-base-200">
              <tr>
                <th>No.</th>
                <th>Name</th>
                <th>Blood Group</th>
                <th>Age</th>
                <th>Date</th>
                <th>Location</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {doners.map((doner, index) => (
                <tr key={doner._id}>
                  <td className="whitespace-nowrap">{index + 1}</td>
                  <td>
                    <div className="w-[180px]">
                      <div className="font-semibold">{doner.name}</div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="badge badge-ghost badge-sm">
                      {doner.bloodGroup}
                    </span>
                  </td>
                  <td>{doner.age} Years</td>
                  <td className="whitespace-nowrap">{doner.createAt}</td>
                  <td className="whitespace-nowrap">
                    {doner.district}, {doner.region}
                  </td>

                  <td className="flex gap-4">
                    <Link
                      href={`/search-doners/${doner._id}`}
                      className="btn-small-2"
                    >
                      <FaEye size={14} />
                      <span>View</span>
                    </Link>

                    <button
                      onClick={() => deleteDonerMutation.mutate(doner._id)}
                      className="btn-small"
                    >
                      <RiDeleteBin5Fill size={16} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </PrivateRoute>
  );
};

export default ManageDoners;
