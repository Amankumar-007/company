'use client';

import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const MarkdownPreview = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  { ssr: false }
);

export default function MarkdownPreviewClient({ source }: { source: string }) {
  return (
    <MarkdownPreview source={source} style={{ backgroundColor: 'transparent', color: '#111827' }} />
  );
}
