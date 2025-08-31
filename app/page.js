"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PDFsolve from "./images/PDFsolve.svg";
import { FileUp, MessageSquare, Search, Globe, ArrowRight } from "lucide-react";
import { Jaro } from "next/font/google";
import UploadPDF from "./components/UploadPDF";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";
const jaro = Jaro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jaro",
  weight: "400",
});

export default function Home() {
  const { user } = useUser();
  const  createuser =useMutation(api.user.createuser)
 useEffect(() => {
    
    user && CheckUser();
  }, [user]);
  
  const CheckUser = async()=>{
    const result  = await createuser({
      email:user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,  
      username:user?.fullName
    })
    console.log("this is a result", result);

  }
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="relative py-20 px-6 bg-gradient-to-br from-blue-500 to-blue-100 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-500">
              <span className={`text-red-500 ${jaro.className}`}>PDF</span>solve
            </h1>
            <p className="text-xl md:text-2xl font-medium text-white/90">
              Your AI-Powered PDF Companion – Ask, Learn, Solve!
            </p>
            <p className="text-lg text-white/80">
              Transform your PDFs into interactive conversations with our
              cutting-edge AI technology.
            </p>
            <div className="flex gap-4 pt-4">
              <UploadPDF>
                <Button className="bg-white text-blue-600 hover:bg-blue-50 transition text-md px-6 py-6 rounded-lg shadow-lg">
                  Upload your PDF
                </Button>
              </UploadPDF>
            </div>
          </div>
          {/* <div className="hidden md:block relative">
            <div className="w-full h-80 bg-white/20 rounded-xl backdrop-blur-sm shadow-xl"></div>
          </div> */}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </header>

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

      <main className="flex-grow max-w-6xl mx-auto px-6 py-16">
        <section id="features" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-blue-600 font-semibold mb-2">FEATURES</h3>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Why PDFsolve?
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform makes your PDF documents interactive and
              insightful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-blue-100">
              <MessageSquare className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Ask Questions, Get Answers
              </h2>
              <p className="text-gray-600">
                Our AI extracts key insights from your documents and answers
                specific questions instantly.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-blue-100">
              <div className="w-10 h-10 flex items-center justify-center text-blue-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="12" y1="4" x2="12" y2="20"></line>
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Summarize Large PDFs
              </h2>
              <p className="text-gray-600">
                Get concise summaries of lengthy documents, saving you time and
                effort.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-blue-100">
              <Search className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Search Faster
              </h2>
              <p className="text-gray-600">
                Find specific content instantly with our intelligent search
                functionality.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-blue-100">
              <Globe className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="text-xl font-bold text-gray-700 mb-2">
                Multiple Languages
              </h2>
              <p className="text-gray-600">
                Interact with your documents in any language with our
                multilingual support.
              </p>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-blue-600 font-semibold mb-2">PROCESS</h3>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A simple three-step process to unlock the insights in your PDF
              documents.
            </p>
          </div>

          <div className="relative">
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-blue-100 -translate-y-1/2 hidden md:block"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm relative z-10">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">
                  Upload Your PDF
                </h2>
                <p className="text-gray-600 text-center">
                  Simply drag & drop your document or browse your files to
                  upload.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm relative z-10">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">
                  Ask Any Question
                </h2>
                <p className="text-gray-600 text-center">
                  Our AI analyzes your document and finds answers instantly.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm relative z-10">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 mx-auto">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-700 mb-2 text-center">
                  Get Instant Insights
                </h2>
                <p className="text-gray-600 text-center">
                  Receive summarized and accurate responses based on your
                  document.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-10 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your PDFs?
            </h2>
            <p className="text-xl mb-6 max-w-2xl mx-auto">
              Join thousands of professionals who are using PDFsolve to extract
              insights from their documents.
            </p>
            <UploadPDF>
              <Button className="bg-white text-blue-600 hover:bg-blue-50 transition text-md px-6 py-6 rounded-lg shadow-lg">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </UploadPDF>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={PDFsolve}
                alt="PDFsolve logo"
                width={100}
                height={100}
              />
            </div>
            <p className="text-gray-400 pb-4">
              Transform your PDFs into conversations with our AI-powered
              solution.
            </p>
          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-gray-400 mt-auto">
            <p>© 2025 PDFsolve. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
