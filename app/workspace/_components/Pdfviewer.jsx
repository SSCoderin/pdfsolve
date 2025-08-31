  "use client"
  import React from 'react'

  export const Pdfviewer = ({fileUrl}) => {
      console.log("this is a file url i get ", fileUrl);
    return (
      <div className="w-full h-full">
        <iframe
          src={`${fileUrl}#toolbar=1&zoom=page-fit&view=FitH`}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          allow="fullscreen"
        />
      </div>
    )
  }
