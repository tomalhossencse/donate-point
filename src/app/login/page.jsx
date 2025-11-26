import React, { Suspense } from "react";
import LoginForm from "./Login/LoginForm";

const page = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
};

export default page;
