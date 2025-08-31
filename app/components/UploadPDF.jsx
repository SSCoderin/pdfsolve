import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import axios from "axios";

const UploadPDF = () => {
  const {user } = useUser();
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [open , setOpen] = React.useState(false);

  const AddFileEntryToDb = useMutation(api.fileStorage.AddFileEntryToDb);
  const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl);
  const getFileurl = useMutation(api.fileStorage.getFileurl); 

  const embedDocument = useAction(api.myActions.ingest);
  
  const OnFileSelect = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const handleUpload = async () => {
    setLoading(true);
    try {
      
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log("this is a storage id ", storageId || "undefined");
    const fileid = uuid4();
    const url = await getFileurl({
      storageId: storageId,
    });
    const response = await AddFileEntryToDb({
      fileId: fileid,
      storageId: storageId,
      fileName: fileName??"Untitled file",
      fileUrl: url,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });
    console.log("this is a response ", response);

    const api_response = await axios.get("/api/pdfloader?pdf_url=" + url);  
    console.log("this is a response ", api_response.data.data);
    await embedDocument({
      splitTest: api_response.data.data,  
      fileId: fileid,
    }) 



    setLoading(false);
    setOpen(false);

    } catch (error) {
      console.log("this is a error ", error);
      setLoading(false);
      setOpen(false);
    }
    

  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700" onClick ={()=>{setOpen(true)}}>Upload Pdf File</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">
            Upload PDF File
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-4">
              <div className="flex flex-col border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
                <p className="text-lg font-semibold mb-3">Select Your File</p>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(event) => OnFileSelect(event)}
                  className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600 text-sm text-gray-700"
                />
              </div>
              <div className="flex flex-col border-2 border-gray-300 p-4 rounded-lg">
                <label htmlFor="fileName" className="text-xl font-medium mb-2">
                  File Name
                </label>
                <input
                  type="text"
                  id="fileName"
                  placeholder="Enter file name"
                  accept="application/pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </DialogDescription>
          <div className="flex justify-end gap-3 mt-6">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleUpload} disabled={loading}>
              {loading ? <Loader2Icon className="animate-spin" /> : "Upload"}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UploadPDF;
