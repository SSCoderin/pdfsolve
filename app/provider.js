"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ConvexProvider, ConvexReactClient } from "convex/react";

const Provider = ({ children }) => {
  const [convex, setConvex] = useState(null);
  const { user } = useUser();

  // Initialize Convex client only on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setConvex(new ConvexReactClient(window.location.origin));
    }
  }, []);

  useEffect(() => {
    if (user) {
      CheckIsNewUser();
    }
  }, [user]);

  const CheckIsNewUser = async () => {
    console.log(
      "this is a user",
      user.id,
      user?.fullName,
      user?.emailAddresses[0]?.emailAddress
    );

    const resp = await axios.post("/api/create-user", {
      id: user?.id,
      username: user?.fullName,
      email: user?.emailAddresses[0]?.emailAddress,
    });

    console.log("this is a resp", resp.data);
  };

  // Avoid rendering ConvexProvider until convex is initialized
  if (!convex) return null;

  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
};

export default Provider;
