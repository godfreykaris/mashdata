export type RawPostFile = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  contentHtml: string;
};

const postFiles = import.meta.glob("../posts/*.md", {
  as: "raw",
  eager: true,
});

const fallbackExcerpt = (text: string) => text.slice(0, 220).trim();

const slugFromPath = (sourcePath: string) => {
  const filename = sourcePath.split("/").pop() ?? "post";
  return filename.replace(/\.[^.]+$/, "").toLowerCase().replace(/\s+/g, "-");
};

const stripMarkdown = (value: string) =>
  value
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_~>#-]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const parseFrontMatter = (raw: string) => {
  if (!raw.startsWith("---")) {
    return { data: {}, body: raw };
  }
  const endIndex = raw.indexOf("\n---", 3);
  if (endIndex === -1) {
    return { data: {}, body: raw };
  }
  const header = raw.slice(3, endIndex).trim();
  const body = raw.slice(endIndex + 4).trim();
  const data: Record<string, string> = {};
  header.split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) {
      return;
    }
    data[key.trim()] = rest.join(":").trim();
  });
  return { data, body };
};

const markdownToHtml = (raw: string) => {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const renderInline = (value: string) => {
    let text = escapeHtml(value);
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return text;
  };

  const lines = raw.replace(/\r/g, "").split("\n");
  let html = "";
  let paragraph: string[] = [];
  let listType: "ul" | "ol" | null = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      html += `<p>${renderInline(paragraph.join(" "))}</p>`;
      paragraph = [];
    }
  };

  const closeList = () => {
    if (listType) {
      html += `</${listType}>`;
      listType = null;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph();
      closeList();
      return;
    }

    if (trimmed === "---") {
      flushParagraph();
      closeList();
      html += "<hr />";
      return;
    }

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      html += `<h${level}>${renderInline(headingMatch[2])}</h${level}>`;
      return;
    }

    const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType && listType !== "ol") {
        closeList();
      }
      if (!listType) {
        listType = "ol";
        html += "<ol>";
      }
      html += `<li>${renderInline(orderedMatch[1])}</li>`;
      return;
    }

    const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType && listType !== "ul") {
        closeList();
      }
      if (!listType) {
        listType = "ul";
        html += "<ul>";
      }
      html += `<li>${renderInline(unorderedMatch[1])}</li>`;
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  closeList();
  return html;
};

export const postsFromFiles: RawPostFile[] = Object.entries(postFiles)
  .map(([sourcePath, raw]) => {
    const { data, body } = parseFrontMatter(raw);
    const slug = data.slug || slugFromPath(sourcePath);
    const title = data.title || slug;
    const author = data.author || "Mashdata";
    const date = data.date || "Unknown date";
    const excerpt = data.excerpt || fallbackExcerpt(stripMarkdown(body));
    const contentHtml = markdownToHtml(body);

    return {
      slug,
      title,
      author,
      date,
      excerpt,
      contentHtml,
    };
  })
  .sort((a, b) => {
    const aTime = Date.parse(a.date);
    const bTime = Date.parse(b.date);
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) {
      return 0;
    }
    return bTime - aTime;
  });
