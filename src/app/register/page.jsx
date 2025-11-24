"use client";
import Container from "@/componets/Container";
import { AuthContext } from "@/context/AuthContext";
import SocialLogin from "@/Utility/SocialLogin";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Register = () => {
  const { handleSignInuser, updateUserProfile } = use(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const handleOnsubmit = (data) => {
    // console.log(data);
    const email = data.email;
    const password = data.password;
    const photoURL = data.photoURL;
    const displayName = data.displayName;
    const profile = { displayName, photoURL };
    handleSignInuser(email, password)
      .then((result) => {
        // console.log(result.user);

        updateUserProfile(profile)
          .then((result) => {
            // console.log(result);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Signin Successfully",
              showConfirmButton: false,
              timer: 1000,
            });
            router.push("/");
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
    <Container className="my-24 flex justify-center items-center">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-accent-content rounded-2xl p-6 hover:shadow-xl transition duration-300">
        <h1 className="text-center text-4xl font-bold text-primary mb-6">
          Have a Nice Day!
        </h1>
        <p className="text-center text-accent mb-6">
          Register to join our Community
        </p>
        <div className="card-body">
          <form onSubmit={handleSubmit(handleOnsubmit)} className="fieldset">
            {/* name */}
            <div>
              <label className="label">Name</label>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Name"
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name Required!</p>
              )}
            </div>
            {/* email */}
            <div>
              <label className="label font-semibold">Email</label>
              <input
                type="email"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your email"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email Required!</p>
              )}
            </div>
            {/* photourl */}
            <div>
              <label className="label">PhotoURL</label>
              <input
                type="text"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="PhotoURL"
                {...register("photoURL", { required: true })}
              />
              {errors.photoURL?.type === "required" && (
                <p className="text-red-500">PhotoURl Required!</p>
              )}
            </div>
            {/* password */}
            <div>
              <label className="label font-semibold">Password</label>
              <input
                type="password"
                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password Required!</p>
              )}
            </div>

            <button className="btn w-full bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105">
              Register
            </button>
          </form>
          <div className="divider text-gray-400">OR</div>
          {/* google */}
          <SocialLogin />
          <div className="text-center ">
            <p className="">
              Already have an account? Please{" "}
              <Link
                className="text-primary font-medium hover:underline"
                href={"/login"}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Register;
