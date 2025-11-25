"use client";
import Container from "@/componets/Container";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuthentication from "@/Utility/UseAuthentication";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ManageDoners = () => {
  const { user } = useAuthentication();
  const axiosSecure = useAxiosSecure();
  const { data: doners = [], refetch } = useQuery({
    queryKey: ["mydoners", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/doners?contributerEmail=${user?.email}`
      );
      return res.data;
    },
  });
  return (
    <div className="mt-24 pb-4 px-12 min-h-screen">
      <Container>
        <div className="text-3xl font-semibold w-[400px] mx-auto text-base-100 py-2 rounded-4xl bg-primary text-center mb-4">
          Our Blood Doners
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
                    <div className="flex items-center gap-3 w-[200px]">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10">
                          <img src={user?.photoURL} className="object-cover" />
                        </div>
                      </div>
                      <div>
                        <div className="font-semibold">{doner.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap">
                    <span className="badge badge-ghost badge-sm">
                      {doner.bloodGroup}
                    </span>
                  </td>
                  <td>{doner.age}</td>
                  <td className="whitespace-nowrap">{doner.createAt}</td>
                  <td className="whitespace-nowrap">
                    {doner.district}, {doner.region}
                  </td>

                  <td className="flex gap-4">
                    <button
                      onClick={
                        () => document
                        //   .getElementById(`modal_${issue._id}`)
                        //   .showModal()
                      }
                      className="btn btn-success text-white
                   btn-xs"
                    >
                      Update
                    </button>

                    <button
                      //   onClick={() => handleIssueDelete(issue._id)}
                      className="btn btn-warning text-white
                   btn-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default ManageDoners;
