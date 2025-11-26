import React from "react";
import { RiseLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <RiseLoader size={20} color="blue" />
    </div>
  );
};

export default Loading;
