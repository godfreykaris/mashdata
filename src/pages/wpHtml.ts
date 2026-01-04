import homeHtml from "./html/home.html?raw";
import aboutHtml from "./html/about-us.html?raw";
import workHtml from "./html/our-work.html?raw";
import blogHtml from "./html/blog.html?raw";
import contactHtml from "./html/contact.html?raw";

export const wpHtmlMap = {
  "home": homeHtml,
  "about-us": aboutHtml,
  "our-work": workHtml,
  "blog": blogHtml,
  "contact": contactHtml,
} as const;

export type WpHtmlKey = keyof typeof wpHtmlMap;
