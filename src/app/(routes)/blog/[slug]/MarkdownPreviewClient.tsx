'use client';

/**
 * Renders blog content that may be either HTML (new TipTap posts)
 * or legacy Markdown (old posts written with @uiw/react-md-editor).
 * 
 * Detection: If the content string starts with '<' it's HTML, else Markdown.
 */

import dynamic from 'next/dynamic';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

function isHTML(content: string): boolean {
  if (!content) return false;
  const trimmed = content.trim();
  return trimmed.startsWith('<') && trimmed.includes('>');
}

export default function BlogContentRenderer({ source }: { source: string }) {
  if (!source) return null;

  if (isHTML(source)) {
    return (
      <div
        className="tiptap-prose"
        dangerouslySetInnerHTML={{ __html: source }}
      />
    );
  }

  // Legacy markdown content
  return (
    <MarkdownPreview
      source={source}
      style={{ backgroundColor: 'transparent', color: '#111827' }}
    />
  );
}
