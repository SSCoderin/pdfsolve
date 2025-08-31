"use client";
import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
import { Pdfviewer } from "../_components/Pdfviewer";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { TextEditor } from "../_components/TextEditor";

const Workspace = () => {
  const fileId = window.location.pathname.split("/").pop();
  console.log("this is a file id", fileId);
  const GetFileRecord = useQuery(api.fileStorage.GetFileRecord, {
    fileId: fileId,
  });
 
  useEffect(() => {
    console.log("this is a file info", GetFileRecord);
  }, [GetFileRecord]);

  console.log("File URL:", GetFileRecord?.fileUrl);

  return (
    <div>
      <div className="w-full flex flex-row h-screen">
        <div className="w-1/2 border-r">
          <TextEditor />
        </div>{" "}
        <div className="w-1/2">
          <Pdfviewer fileUrl={GetFileRecord?.fileUrl} />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
