"use client";

import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";

type Props = {
  content: string;
  onContentUpdate: (content: string) => void;
};

export function ProductContentEditor({ content, onContentUpdate }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      Typography,
      Youtube.configure({
        controls: false,
        height: 320,
        width: 480,
      }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-full w-full outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onContentUpdate(editor.getHTML());
    },
  });

  return (
    <EditorContent
      editor={editor}
      className="outline-none border min-h-12 rounded-md p-3 border-zinc-300 text-sm focus:outline-none"
    />
  );
}
