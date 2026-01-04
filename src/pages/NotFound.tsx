import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Page Not Found – Mashdata";

    const setMetaTag = (selector: string, attributes: Record<string, string>) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        document.head.appendChild(tag);
      }
      Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
      tag?.setAttribute("data-seo-managed", "true");
    };

    setMetaTag('meta[name="robots"]', { name: "robots", content: "noindex, follow" });
    setMetaTag('meta[name="description"]', {
      name: "description",
      content: "The page you are looking for could not be found.",
    });
    const structuredData = document.getElementById("structured-data");
    if (structuredData) {
      structuredData.remove();
    }

    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <main className="container" style={{ padding: "96px 16px", textAlign: "center" }}>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Back to home</a>
    </main>
  );
}
