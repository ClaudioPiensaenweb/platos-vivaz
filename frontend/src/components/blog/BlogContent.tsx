import { sanitizeHtml } from "@/lib/sanitize";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const safeHtml = sanitizeHtml(content);

  return (
    <div
      className="prose prose-lg max-w-none"
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
