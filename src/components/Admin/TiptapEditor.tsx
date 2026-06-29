'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CharacterCount from '@tiptap/extension-character-count'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Highlight from '@tiptap/extension-highlight'
import { useEffect, useCallback } from 'react'
import {
  Bold, Italic, UnderlineIcon, Strikethrough, Code2,
  Heading1, Heading2, Heading3,
  List, ListOrdered, Quote, Minus, Undo2, Redo2,
  Link as LinkIcon, AlignLeft, AlignCenter, AlignRight,
  Highlighter, Image as ImageIcon, RemoveFormatting, Code
} from 'lucide-react'

interface TiptapEditorProps {
  value: string
  onChange: (html: string) => void
  placeholder?: string
}

function ToolbarButton({
  onClick,
  isActive = false,
  title,
  disabled = false,
  children,
}: {
  onClick: () => void
  isActive?: boolean
  title: string
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`p-2 rounded-lg transition-all duration-150 text-sm font-medium flex items-center justify-center w-8 h-8 shrink-0 ${isActive
        ? 'bg-[#ea580c] text-white shadow-sm shadow-orange-500/30'
        : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
        } disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}

function Divider() {
  return <div className="w-px h-5 bg-zinc-200 mx-0.5 shrink-0" />
}

export default function TiptapEditor({ value, onChange, placeholder = 'Start writing your article...' }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'tiptap-link' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'tiptap-image' },
      }),
      Placeholder.configure({ placeholder }),
      CharacterCount,
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'tiptap-editor-content focus:outline-none min-h-[420px] px-6 py-5 text-zinc-900 leading-relaxed',
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
  })

  // Sync value from outside (e.g. when editing an existing blog)
  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || '', { emitUpdate: false })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value])

  const setLink = useCallback(() => {
    if (!editor) return
    const prev = editor.getAttributes('link').href
    const url = window.prompt('Enter URL:', prev || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const addImage = useCallback(() => {
    if (!editor) return
    const url = window.prompt('Enter image URL:')
    if (url) editor.chain().focus().setImage({ src: url }).run()
  }, [editor])

  if (!editor) return null

  const wordCount = editor.storage.characterCount?.words() ?? 0
  const charCount = editor.storage.characterCount?.characters() ?? 0

  return (
    <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)] focus-within:border-[#ea580c] focus-within:shadow-[0_0_0_4px_rgba(234,88,12,0.08)] transition-all duration-300">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-3 py-2.5 bg-zinc-50/80 border-b border-zinc-200 sticky top-0 z-10">
        {/* Text style */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold (Ctrl+B)">
          <Bold size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic (Ctrl+I)">
          <Italic size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline (Ctrl+U)">
          <UnderlineIcon size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
          <Strikethrough size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive('highlight')} title="Highlight">
          <Highlighter size={14} />
        </ToolbarButton>

        <Divider />

        {/* Headings */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">
          <Heading1 size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
          <Heading2 size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">
          <Heading3 size={14} />
        </ToolbarButton>

        <Divider />

        {/* Alignment */}
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left">
          <AlignLeft size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center">
          <AlignCenter size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right">
          <AlignRight size={14} />
        </ToolbarButton>

        <Divider />

        {/* Lists */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
          <List size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List">
          <ListOrdered size={14} />
        </ToolbarButton>

        <Divider />

        {/* Block elements */}
        <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Blockquote">
          <Quote size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Inline Code">
          <Code size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code Block">
          <Code2 size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} isActive={false} title="Divider Line">
          <Minus size={14} />
        </ToolbarButton>

        <Divider />

        {/* Link & Image */}
        <ToolbarButton onClick={setLink} isActive={editor.isActive('link')} title="Insert Link">
          <LinkIcon size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={addImage} isActive={false} title="Insert Image by URL">
          <ImageIcon size={14} />
        </ToolbarButton>

        <Divider />

        {/* Clear formatting + Undo/Redo */}
        <ToolbarButton onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} isActive={false} title="Clear Formatting">
          <RemoveFormatting size={14} />
        </ToolbarButton>

        <Divider />

        <ToolbarButton onClick={() => editor.chain().focus().undo().run()} isActive={false} disabled={!editor.can().undo()} title="Undo (Ctrl+Z)">
          <Undo2 size={14} />
        </ToolbarButton>
        <ToolbarButton onClick={() => editor.chain().focus().redo().run()} isActive={false} disabled={!editor.can().redo()} title="Redo (Ctrl+Y)">
          <Redo2 size={14} />
        </ToolbarButton>

        {/* Right-aligned stats */}
        <div className="ml-auto flex items-center gap-3 pl-3">
          <span className="text-[10px] text-zinc-400 font-semibold bg-white border border-zinc-200 px-2 py-0.5 rounded-lg">
            {wordCount} words
          </span>
          <span className="text-[10px] text-zinc-400 font-semibold bg-white border border-zinc-200 px-2 py-0.5 rounded-lg">
            {charCount} chars
          </span>
        </div>
      </div>

      {/* Inline Bubble Menu (appears on text selection) */}
      <BubbleMenu editor={editor} tippyOptions={{ duration: 150 }} className="flex items-center gap-0.5 bg-zinc-900 text-white rounded-xl shadow-xl px-2 py-1.5 border border-zinc-700">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded-lg text-xs font-bold transition-colors ${editor.isActive('bold') ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Bold"><Bold size={12} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded-lg text-xs transition-colors ${editor.isActive('italic') ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Italic"><Italic size={12} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded-lg text-xs transition-colors ${editor.isActive('underline') ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Underline"><UnderlineIcon size={12} /></button>
        <button type="button" onClick={setLink} className={`p-1.5 rounded-lg text-xs transition-colors ${editor.isActive('link') ? 'bg-[#ea580c]/80' : 'hover:bg-white/10'}`} title="Link"><LinkIcon size={12} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-1.5 rounded-lg text-xs transition-colors ${editor.isActive('highlight') ? 'bg-white/20' : 'hover:bg-white/10'}`} title="Highlight"><Highlighter size={12} /></button>
      </BubbleMenu>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />

      {/* Bottom status bar */}
      <div className="flex items-center justify-between px-6 py-2 bg-zinc-50/50 border-t border-zinc-100">
        <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Rich Text Editor · TipTap</span>
        <span className="text-[10px] text-zinc-400">~{Math.ceil(wordCount / 200)} min read</span>
      </div>

      <style>{`
        .tiptap-editor-content h1 { font-size: 1.875rem; font-weight: 800; line-height: 1.2; margin: 1.5rem 0 0.75rem; color: #111827; letter-spacing: -0.02em; }
        .tiptap-editor-content h2 { font-size: 1.5rem; font-weight: 700; line-height: 1.3; margin: 1.25rem 0 0.5rem; color: #1f2937; letter-spacing: -0.01em; }
        .tiptap-editor-content h3 { font-size: 1.25rem; font-weight: 600; line-height: 1.4; margin: 1rem 0 0.5rem; color: #374151; }
        .tiptap-editor-content p { margin: 0.75rem 0; color: #374151; font-size: 0.9375rem; }
        .tiptap-editor-content p:first-child { margin-top: 0; }
        .tiptap-editor-content strong { font-weight: 700; color: #111827; }
        .tiptap-editor-content em { font-style: italic; }
        .tiptap-editor-content u { text-decoration: underline; text-underline-offset: 3px; }
        .tiptap-editor-content s { text-decoration: line-through; opacity: 0.6; }
        .tiptap-editor-content mark { background: #fef08a; color: #713f12; padding: 0 2px; border-radius: 2px; }
        .tiptap-editor-content a.tiptap-link { color: #ea580c; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; font-weight: 500; }
        .tiptap-editor-content a.tiptap-link:hover { color: #c2410c; }
        .tiptap-editor-content ul { list-style: disc; padding-left: 1.5rem; margin: 0.75rem 0; color: #374151; }
        .tiptap-editor-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0.75rem 0; color: #374151; }
        .tiptap-editor-content li { margin: 0.35rem 0; padding-left: 0.25rem; }
        .tiptap-editor-content blockquote { border-left: 4px solid #ea580c; padding: 0.75rem 1rem; margin: 1rem 0; background: #fff7ed; border-radius: 0 0.5rem 0.5rem 0; color: #7c2d12; font-style: italic; }
        .tiptap-editor-content code { background: #f3f4f6; color: #dc2626; padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 0.85em; border: 1px solid #e5e7eb; }
        .tiptap-editor-content pre { background: #1e1e2e; color: #cdd6f4; padding: 1.25rem 1.5rem; border-radius: 0.75rem; overflow-x: auto; margin: 1rem 0; }
        .tiptap-editor-content pre code { background: transparent; color: inherit; padding: 0; border: none; font-size: 0.875rem; }
        .tiptap-editor-content hr { border: none; border-top: 2px solid #f3f4f6; margin: 1.5rem 0; }
        .tiptap-editor-content img.tiptap-image { max-width: 100%; border-radius: 0.75rem; margin: 1rem 0; border: 1px solid #e5e7eb; }
        .tiptap-editor-content p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; height: 0; float: left; }
      `}</style>
    </div>
  )
}
