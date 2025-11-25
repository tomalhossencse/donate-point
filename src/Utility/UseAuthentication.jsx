import { AuthContext } from "@/context/AuthContext";
import React, { use } from "react";

const useAuthentication = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default useAuthentication;
