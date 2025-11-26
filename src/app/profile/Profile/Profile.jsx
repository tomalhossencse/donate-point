"use client";
import React, { use } from "react";
import Swal from "sweetalert2";
import Container from "@/componets/Container";
import { useRouter } from "next/navigation";
import useAuthentication from "@/Utility/UseAuthentication";
import Animation from "@/Utility/Animation";

const Profile = () => {
  const { user, handleLogout, loading } = useAuthentication();
  const router = useRouter();
  if (loading) return <Animation />;
  if (!user) return null;
  const { displayName, email, photoURL } = user;
  const name = displayName?.toUpperCase();

  const logoutUser = () => {
    handleLogout()
      .then(() => {
        localStorage.removeItem("authToken");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logout Successful!",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push("/login");
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

  return (
    <Container className="flex flex-col items-center justify-center min-h-[90vh] px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 hover:shadow-primary/40 hover:scale-[1.02] transition-all duration-300 border border-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-primary/50 ring-offset-2">
              <img
                src={photoURL}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">{name}</h1>
            <p className="text-accent mt-1">{email}</p>
          </div>

          <div className="flex gap-3">
            <button
              className="btn btn-primary btn-sm px-5"
              onClick={() => router.push("/")}
            >
              Back Home
            </button>
            <button
              onClick={logoutUser}
              className="btn btn-outline btn-sm px-5"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
