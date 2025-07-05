'use client'

import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

import { Bold, Italic, List, ListOrdered } from 'lucide-react'
import { useEffect } from 'react'

type Props = {
  content: JSONContent
  onChange: (content: JSONContent) => void
}

export default function TiptapEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      OrderedList,
      ListItem,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON())
    },
  })

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content)
    }
  }, [editor, content])

  if (!editor) return null

  const buttonStyle = 'p-2 hover:bg-gray-100 rounded transition'

  return (
    <div className="border rounded-md">
      <div className="p-2 border-b flex gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonStyle} ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
          aria-label="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonStyle} ${editor.isActive('italic') ? 'bg-gray-200' : ''}`}
          aria-label="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonStyle} ${editor.isActive('bulletList') ? 'bg-gray-200' : ''}`}
          aria-label="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonStyle} ${editor.isActive('orderedList') ? 'bg-gray-200' : ''}`}
          aria-label="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
      </div>

      <EditorContent editor={editor} className="p-3" />
    </div>
  )
}
