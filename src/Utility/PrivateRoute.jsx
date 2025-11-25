"use client";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const loginUrl = `/login?redirect=${pathname}`;
      router.push(loginUrl);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) {
    return <div>Loading.........</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
