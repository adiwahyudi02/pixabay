import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "expo-router";
import {
  checkAuthentication,
  selectIsAuthenticated,
} from "@/store/slices/auth";
import { AppDispatch } from "@/store";

interface AuthProtectProps {
  children: React.ReactNode;
}

export const AuthProtect = ({ children }: AuthProtectProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check authentication status when the protect mounts
    dispatch(checkAuthentication());
    setIsMounted(true);
  }, [dispatch]);

  useEffect(() => {
    if (isMounted) {
      // Redirect unauthenticated users to the login page
      if (!isAuthenticated && pathname !== "/login") {
        router.push("/login");
      } else if (isAuthenticated && pathname === "/login") {
        // Redirect authenticated users away from the login page
        router.push("/");
      }
    }
  }, [isMounted, isAuthenticated, router, pathname]);

  if (!isMounted) {
    return null; // Wait until authentication is checked
  }

  // Render the children if the authentication status is valid
  return <>{children}</>;
};
