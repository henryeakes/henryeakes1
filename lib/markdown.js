import { remark } from "remark";
import remarkHtml from "remark-html";

function promoteSectionHeadings(markdown) {
  const blocks = String(markdown || "")
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/);

  return blocks
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^```/.test(trimmed) || /^#{1,6}\s/.test(trimmed)) return trimmed;
      if (/^[-*]\s/m.test(trimmed)) return trimmed;

      const lines = trimmed.split("\n").map((line) => line.trim()).filter(Boolean);
      if (lines.length !== 1) return trimmed;

      const line = lines[0];
      const words = line.split(/\s+/).length;
      const endsSentence = /[.!?]["']?$/.test(line);
      const looksLikeHeading =
        line.length <= 90 && words <= 12 && !endsSentence && !/^https?:/i.test(line);

      return looksLikeHeading ? `## ${line}` : trimmed;
    })
    .filter(Boolean)
    .join("\n\n");
}

export async function renderMarkdown(markdown) {
  const prepared = promoteSectionHeadings(markdown);
  const file = await remark().use(remarkHtml).process(prepared);
  return String(file).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");
}
