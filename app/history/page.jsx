"use client"
import React from "react";
import { Jaro } from "next/font/google";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import UploadPDF from "../components/UploadPDF";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import PDF from "../images/pdfimage.webp"
import Image  from "next/image";
import { WarningProvider } from "@radix-ui/react-dialog";
const jaro = Jaro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jaro",
  weight: "400",
});
export default function History() {
const allFiles = useQuery(api.fileStorage.GetAllFiles)
console.log("these are all pdf files", allFiles)
  return (
    <div className="p-6 bg-white flex flex-col h-screen">
      <div className="flex items-center justify-between ">
        <h1 className="text-gray-500 text-4xl font-bold">
          <span className={`text-red-500 ${jaro.className}`}>PDF</span>solve
        </h1>
        <UploadPDF>
          <Button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6">
            Upload your PDF
          </Button>
        </UploadPDF>
      </div>
      <section className="max-w-4xl mx-auto mt-8 px-6 z-10 w-full">
        <div className="flex flex-col items-center justify-center h-64 border-2 border-blue-200 border-dashed rounded-xl p-8 bg-white shadow-lg">
          <FileUp className="w-12 h-12 text-blue-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">
            Ready to Transform Your PDFs?
          </h2>
          <p className="text-gray-500 mb-4 text-center">
            Drag & Drop Your PDF or Browse Files
          </p>
          <UploadPDF>
            <Button className="bg-blue-600 hover:bg-blue-700 transition text-white px-6">
              Upload your PDF
            </Button>
          </UploadPDF>
        </div>
      </section>
      <div className="pt-10">
        <h1 className="border-b-2 border-blue-500 pb-2 text-3xl text-gray-500 font-bold">
          {" "}
          HISTORY
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
          {
            allFiles?.map((file, index) => (
              <div key={index}>
                <div
                onClick={() => window.location.href=`/workspace/${file.fileId}`}
                className="flex flex-col items-center justify-between border-2 rounded-2xl p-4 hover:shadow-lg transition-shadow cursor-pointer">
                  <Image src={PDF} alt="PDF" width={200} height={200} className="mb-3"/>
                  <h1 className="text-xl font-bold text-gray-700 truncate w-full text-center">{file.fileName}</h1>
                </div>
              </div>
            ))
          }        </div>
      </div>
    </div>
  );
}
