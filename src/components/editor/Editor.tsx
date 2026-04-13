"use client";

import {
  List,
  ListOrdered,
  Link as LinkIcon,
  Heading1,
  Heading2,
  Underline as UnderlineIcon,
  Italic,
  Bold,
  MessageSquareQuote,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import ImageUploadButton from "./ImageUploadButton";
import "@/app/globals.css";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function RichEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Underline,
      Image,
      Link.configure({
        openOnClick: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Retorna null se o editor não estiver inicializado
  if (!editor) return null;

  const buttonClass = (isActive: boolean) =>
    `blog-formatting-button hover:bg-gray-300 ${
      isActive ? "bg-gray-300" : "bg-gray-200"
    }`;

  // Função para inserir link
  const setLink = () => {
    const url = prompt("Insira a URL:");
    if (!url) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleImageInsert = (url: string) => {
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="w-full text-[1rem]">
      {/* Editor */}
      <div className="border-gray-500 border-1 rounded-t-[8px] h-auto bg-white md:min-h-[50vh] min-h-[48vh] p-3">
        <EditorContent
          editor={editor}
          className="
          max-h-[46vh] overflow-y-auto
          outline-none
          focus:border-black
          [&_.ProseMirror]:min-h-[240px]
          [&_.ProseMirror]:outline-none
         "
        />
      </div>
      {/* Toolbar */}
      <div className="flex flex-wrap px-4 bg-gray-200 rounded-b-[8px]">
        {/* Bold */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={buttonClass(editor.isActive("bold"))}
        >
          <b>
            <Bold size={16} />
          </b>
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={buttonClass(editor.isActive("italic"))}
        >
          <i>
            <Italic size={16} />
          </i>
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={buttonClass(editor.isActive("underline"))}
        >
          <UnderlineIcon size={16} />
        </button>

        {/* Heading 1 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 1 }))}
        >
          <Heading1 size={16} />
        </button>

        {/* Heading 2 */}
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
        >
          <Heading2 size={16} />
        </button>

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={buttonClass(editor.isActive("bulletList"))}
        >
          <List size={16} />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={buttonClass(editor.isActive("orderedList"))}
        >
          <ListOrdered size={16} />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={buttonClass(editor.isActive("blockquote"))}
        >
          <MessageSquareQuote size={16} />
        </button>

        {/* Link */}
        <button
          type="button"
          onClick={() => setLink()}
          className="blog-formatting-button hover:bg-gray-300"
        >
          <LinkIcon size={16} />
        </button>

        {/* Upload de imagem */}
        <ImageUploadButton onUpload={handleImageInsert} />
      </div>
    </div>
  );
}
