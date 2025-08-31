import {
  Bold,
  HighlighterIcon,
  Italic,
  List,
  ListOrdered,
  
  Sparkles,
  Underline,
} from "lucide-react";
import axios from "axios";
import React from "react";
import { Heading1, Heading2, Heading3 } from "lucide-react";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export const EditorExtenstion = ({ editor }) => {
  const {user} = useUser();
    const fileId = window.location.pathname.split("/").pop();
    // console.log("thi sis my fiel id  at the  edior extenton",fileId)
    const SaveNotes = useMutation(api.notes.AddNotes)  
    const SearchAi =useAction(api.myActions.search)
      const onAIClick = async() => {
          
          const selectedText = editor.state.doc.textBetween(
              editor.state.selection.from,
              editor.state.selection.to,
              ' '
          )
          console.log("selected text", selectedText)
          const result = await SearchAi({
            query: selectedText,
            fileId: fileId
          })

          const formattedAnswer = await axios.post("/api/airesponse", {
            Question: selectedText,            Unformat: result
          }

          )
          console.log("this is a formatted answer form api", formattedAnswer.data.message)
          const Alltext  = editor.getHTML();
          editor.commands.setContent(Alltext+'<p> <strong>Answer: </strong></p>' +formattedAnswer.data.message.replace("```html","").replace("```","") )


          SaveNotes({
            fileId: fileId,
            notes: editor.getHTML(),
            createdBy: user?.primaryEmailAddress?.emailAddress,
          })





      }    
  return (
    <div className="p-4  border-b  border-gray-300  shadow-sm gap-1 flex flex-col">
      <div className="control-group">
        <div className="button-group">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor?.isActive("heading", { level: 1 })
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <Heading1 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor?.isActive("heading", { level: 2 })
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <Heading2 />
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor?.isActive("heading", { level: 3 })
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <Heading3 />{" "}
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={
              editor?.isActive("bold")
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <Bold />{" "}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor?.isActive("italic")
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <Italic />{" "}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor?.isActive("underline")
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <Underline />{" "}
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={
              editor?.isActive("highlight")
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <HighlighterIcon />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor?.isActive("bulletList")
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <List />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor?.isActive("orderedList")
                ? "bg-yellow-300 rounded-sm p-1 m-1"
                : "p-1 m-1"
            }
          >
            <ListOrdered />{" "}
          </button>

          <button
            onClick={() => onAIClick()}
            className={
              "hover:text-blue-600 rounded-sm p-1 m-1 cursor-pointer border-2 bg-blue-100"
            }
          >
            <Sparkles />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};
