import { sanitizeHtml } from "@/lib/sanitize";

interface BlogContentProps {
  content: string;
}

export default function BlogContent({ content }: BlogContentProps) {
  const safeHtml = sanitizeHtml(content);

  return (
    <div
      className="
        prose prose-lg max-w-none
        prose-headings:font-heading prose-headings:text-primary prose-headings:font-bold
        prose-h2:text-[22px] prose-h2:mt-10 prose-h2:mb-4 prose-h2:leading-tight
        prose-h2:border-l-4 prose-h2:border-accent prose-h2:pl-4
        prose-h3:text-[18px] prose-h3:mt-8 prose-h3:mb-3
        prose-p:font-body prose-p:text-[16px] prose-p:leading-[1.8] prose-p:text-muted prose-p:mb-5
        prose-strong:text-foreground prose-strong:font-semibold
        prose-ul:my-5 prose-ul:pl-6 prose-ul:list-disc
        prose-ol:my-5 prose-ol:pl-6 prose-ol:list-decimal
        prose-li:font-body prose-li:text-[15px] prose-li:leading-[1.7] prose-li:text-muted prose-li:mb-2
        prose-li:marker:text-accent prose-li:marker:font-bold
        prose-a:text-accent prose-a:font-medium prose-a:no-underline hover:prose-a:underline
        [&_blockquote]:border-l-4 [&_blockquote]:border-primary/20 [&_blockquote]:bg-cream/50
        [&_blockquote]:rounded-r-lg [&_blockquote]:py-4 [&_blockquote]:px-6 [&_blockquote]:italic
      "
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
