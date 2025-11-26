"use client";
import Container from "@/componets/Container";
import { AuthContext } from "@/context/AuthContext";
import SocialLogin from "@/Utility/SocialLogin";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const LoginForm = () => {
  const { handleLoginUser } = useContext(AuthContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const handleOnsubmit = (data) => {
    // console.log(data);
    const email = data.email;
    const password = data.password;
    handleLoginUser(email, password)
      .then((result) => {
        const authToken = result.user.accessToken;
        if (authToken) {
          localStorage.setItem("authToken", authToken);
          // console.log("Token successfully set!");
        }
        // console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Signin Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        router.push(redirectPath || "/");
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
          Welcome Back
        </h1>
        <p className="text-center text-accent mb-6">
          Login to continue to your account
        </p>

        <div className="card-body">
          <form onSubmit={handleSubmit(handleOnsubmit)} className="space-y-4">
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

            <div className="flex justify-end">
              <a className="link link-hover text-sm text-primary">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="btn w-full bg-primary text-white font-bold text-md rounded-md shadow-md hover:bg-black transition-transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <div className="divider text-gray-400">OR</div>

          {/* Google Login */}
          <SocialLogin />

          {/* Register Link */}
          <div className="text-center text-sm mt-6">
            <p>
              New to our website?{" "}
              <Link
                className="text-primary font-medium hover:underline"
                href={"/register"}
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default LoginForm;
