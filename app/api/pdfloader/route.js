import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// const pdfurl = "https://sensible-bandicoot-22.convex.cloud/api/storage/c78b3913-e2be-47d4-af3a-c54ffd6916bf";
export async function GET(req){

    const {searchParams} = new URL(req.url);
    const pdfurl = searchParams.get("pdf_url");
    console.log("thisis my pdf url ",pdfurl);

    const response = await fetch(pdfurl)
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();   

    let pdfTextContent = "";
    docs.forEach((doc)=>{
        pdfTextContent += doc.pageContent;
    })

    // split the text in smaller chunks 
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
    });
    const output = await textSplitter.createDocuments([pdfTextContent]);
    let finalOutput = [];
    output.forEach((doc)=>{
        finalOutput.push(doc.pageContent);
    })  
//  text embiddding model 

    return NextResponse.json({message: "success", data:finalOutput})
}