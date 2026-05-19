const ALLOWED_TAGS = new Set([
  "p", "br", "strong", "em", "ul", "ol", "li",
  "h2", "h3", "h4", "a", "span", "blockquote",
]);

const ALLOWED_ATTRS = new Set(["href", "target", "rel", "class"]);

/**
 * Lightweight HTML sanitizer that strips disallowed tags and attributes.
 * Works in both server and client without jsdom dependency.
 */
export function sanitizeHtml(dirty: string): string {
  // Strip script/style tags and their content entirely
  let html = dirty.replace(/<(script|style|iframe|object|embed|form)\b[^>]*>[\s\S]*?<\/\1>/gi, "");
  // Strip remaining self-closing dangerous tags
  html = html.replace(/<(script|style|iframe|object|embed|form)\b[^>]*\/?>/gi, "");
  // Strip event handlers (on*)
  html = html.replace(/\s+on\w+\s*=\s*"[^"]*"/gi, "");
  html = html.replace(/\s+on\w+\s*=\s*'[^']*'/gi, "");

  // Strip disallowed tags but keep their content
  html = html.replace(/<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g, (match, tag) => {
    const lower = tag.toLowerCase();
    if (!ALLOWED_TAGS.has(lower)) return "";

    // For allowed tags, strip disallowed attributes
    if (match.startsWith("</")) return `</${lower}>`;

    const attrRegex = /\s+([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
    let attrs = "";
    let attrMatch;
    while ((attrMatch = attrRegex.exec(match)) !== null) {
      const attrName = attrMatch[1].toLowerCase();
      const attrValue = attrMatch[2] ?? attrMatch[3] ?? "";
      if (ALLOWED_ATTRS.has(attrName)) {
        // Block javascript: URLs
        if (attrName === "href" && /^\s*javascript:/i.test(attrValue)) continue;
        attrs += ` ${attrName}="${attrValue}"`;
      }
    }

    const selfClosing = lower === "br" ? " /" : "";
    return `<${lower}${attrs}${selfClosing}>`;
  });

  return html;
}
