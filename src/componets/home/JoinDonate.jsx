"use client";
import React from "react";
import Container from "../Container";
import { useRouter } from "next/navigation";

const JoinDonate = () => {
  const router = useRouter();
  return (
    <div className="pb-12 px-12">
      <Container className="md:flex items-center justify-between gap-10">
        <div className="p-4">
          <img src="https://i.ibb.co.com/9XNGWG9/Asset-1.png" alt="" />
        </div>
        <div className="p-4">
          <h2 className="md:text-3xl text-2xl font-bold text-primary mb-4">
            Join Our Life-Saving Blood Drive
          </h2>
          <p className="text-accent text-sm md:text-md max-w-2xl mb-6">
            Take part in our upcoming Blood Donation Drive. Your generosity can
            provide a crucial lifeline, ensuring that essential blood supplies
            are available for patients in need across Dhaka. Give the gift of
            life today!
          </p>
          <button
            onClick={() => router.push("/be-doners")}
            className="btn-primary"
          >
            Donate Life
          </button>
        </div>
      </Container>
    </div>
  );
};

export default JoinDonate;
