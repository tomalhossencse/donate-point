"use client";
import React from "react";
import { AuthContext } from "./AuthContext";
import { GoogleAuthProvider } from "firebase/auth";

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();

  const authInfo = {};
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
