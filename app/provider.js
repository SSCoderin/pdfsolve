"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

import { ConvexProvider, ConvexReactClient, useMutation } from "convex/react";
// import { createuser } from "@/convex/user";

const Provider = ({ children }) => {
  const convex = new ConvexReactClient(window.location.origin);

  const { user } = useUser();
  // const  createuser =useMutation(api.user.creatuser)
  useEffect(() => {
    user && CheckIsNewUser();
    // user && CheckUser();
  }, [user]);

  const CheckIsNewUser = async () => {
    console.log("this is a user", user.id , user?.fullName , user?.emailAddresses[0]?.emailAddress);
    const resp = await axios.post('/api/create-user', { id : user?.id , username : user?.fullName , email : user?.emailAddresses[0]?.emailAddress });
    console.log("this is a resp", resp.data);
  };

  // const CheckUser = async()=>{
  //   const result  = await createuser({
  //     email:user?.primaryEmailAddress?.emailAddress,
  //     imageUrl:user?.imageUrl,  
  //     username:user?.fullName
  //   })
  //   console.log("this is a result", result);

  // }

  return <div>
<ConvexProvider client={convex}>{children}</ConvexProvider>
    </div>;
};

export default Provider;
