import React, { Suspense } from "react";
import Register from "./Register/Register";

const page = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Register />
    </Suspense>
  );
};

export default page;
