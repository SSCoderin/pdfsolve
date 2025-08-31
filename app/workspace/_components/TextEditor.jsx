import React from "react";
import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorExtenstion } from "./EditorExtenstion";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import {  useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export const TextEditor = () => {
  const fileId = window.location.pathname.split("/").pop();
  console.log("this is a file id from text editor ", fileId);

 const getnotes = useQuery(api.notes.getNotes, {
    fileId: fileId,
  });
  console.log("this is a note", getnotes);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Highlight,
      BulletList,
      OrderedList,
      // Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Start Taking Your Notes Here...",
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: "focus:outline-none h-screen p-4",
      },
    },
  });

  useEffect(() => {
    if (getnotes&&editor) {
      editor.commands.setContent(getnotes);
    }
  }, [getnotes&&editor]);

  return (
    <div>
      <EditorExtenstion editor={editor} />
      <div className="overflow-scroll h-[88vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
