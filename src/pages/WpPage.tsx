import { useEffect } from "react";

type BodyAttributes = Record<string, string>;
type SeoMeta = {
  description: string;
  ogImage: string;
  ogType: string;
};

type WpPageProps = {
  html: string;
  bodyAttributes: BodyAttributes;
  title: string;
  route: string;
  seo: SeoMeta;
};

const LOGO_ALT_TEXT = "Mashdata";
const CONTACT_PHONE = "+254759436196";
const CONTACT_EMAIL = "machariashadie@gmail.com";

export default function WpPage({ html, bodyAttributes, title, route, seo }: WpPageProps) {
  useEffect(() => {
    const body = document.body;
    const previousAttributes: BodyAttributes = {};
    const previousMenuState = body.classList.contains("is-menu-sidebar");

    Object.entries(bodyAttributes).forEach(([key, value]) => {
      previousAttributes[key] = body.getAttribute(key) ?? "";
      if (key === "class") {
        body.className = value;
      } else if (key === "id") {
        body.id = value;
      } else {
        body.setAttribute(key, value);
      }
    });

    const previousTitle = document.title;
    document.title = title;

    const origin = window.location.origin;
    const canonicalUrl = new URL(route, origin).href;
    const ogImageUrl = new URL(seo.ogImage, origin).href;

    const setMetaTag = (selector: string, attributes: Record<string, string>) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        document.head.appendChild(tag);
      }
      Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
      tag?.setAttribute("data-seo-managed", "true");
    };

    const setLinkTag = (selector: string, attributes: Record<string, string>) => {
      let tag = document.head.querySelector<HTMLLinkElement>(selector);
      if (!tag) {
        tag = document.createElement("link");
        document.head.appendChild(tag);
      }
      Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
      tag?.setAttribute("data-seo-managed", "true");
    };

    setMetaTag('meta[name="description"]', { name: "description", content: seo.description });
    setMetaTag('meta[name="robots"]', { name: "robots", content: "index, follow" });
    setMetaTag('meta[property="og:title"]', { property: "og:title", content: title });
    setMetaTag('meta[property="og:description"]', { property: "og:description", content: seo.description });
    setMetaTag('meta[property="og:type"]', { property: "og:type", content: seo.ogType });
    setMetaTag('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    setMetaTag('meta[property="og:image"]', { property: "og:image", content: ogImageUrl });
    setMetaTag('meta[property="og:site_name"]', { property: "og:site_name", content: "Mashdata" });
    setMetaTag('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    setMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    setMetaTag('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    setMetaTag('meta[name="twitter:image"]', { name: "twitter:image", content: ogImageUrl });
    setLinkTag('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });

    const logoImages = Array.from(
      document.querySelectorAll<HTMLImageElement>("img.solace-site-logo")
    );
    logoImages.forEach((img) => {
      if (!img.alt) {
        img.alt = LOGO_ALT_TEXT;
      }
    });

    const images = Array.from(document.querySelectorAll<HTMLImageElement>("img"));
    images.forEach((img) => {
      if (!img.loading && !img.classList.contains("skip-lazy")) {
        img.loading = "lazy";
      }
      if (!img.decoding) {
        img.decoding = "async";
      }
    });

    const h1s = Array.from(document.querySelectorAll<HTMLHeadingElement>("h1"));
    if (h1s.length === 0) {
      const main = document.querySelector("main") ?? document.querySelector("#root");
      if (main) {
        const h1 = document.createElement("h1");
        h1.className = "sr-only";
        h1.textContent = title;
        main.prepend(h1);
      }
    } else if (h1s.length > 1) {
      h1s.slice(1).forEach((heading) => {
        const replacement = document.createElement("h2");
        replacement.className = heading.className;
        replacement.innerHTML = heading.innerHTML;
        Array.from(heading.attributes).forEach((attr) => {
          if (attr.name !== "class") {
            replacement.setAttribute(attr.name, attr.value);
          }
        });
        heading.replaceWith(replacement);
      });
    }

    const menuToggles = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".menu-mobile-toggle .navbar-toggle")
    );
    const menuCloseButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".close-sidebar-panel .navbar-toggle")
    );
    const overlay = document.querySelector<HTMLElement>(".header-menu-sidebar-overlay");
    const sidebar = document.querySelector<HTMLElement>("#header-menu-sidebar");
    const overlayTargets = Array.from(
      document.querySelectorAll<HTMLElement>("#header-menu-sidebar, .hfg-ov")
    );
    const focusTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".solace-skip-link, #content, .scroll-to-top, #site-footer, .header--row"
      )
    );

    const setAriaHidden = (elements: HTMLElement[], hidden: boolean) => {
      elements.forEach((element) => {
        if (hidden) {
          element.setAttribute("aria-hidden", "true");
        } else {
          element.removeAttribute("aria-hidden");
        }
      });
    };

    const toggleMenu = (open: boolean, trigger?: HTMLButtonElement | null) => {
      body.classList.remove("hiding-header-menu-sidebar");
      if (!open || body.classList.contains("is-menu-sidebar")) {
        body.classList.add("hiding-header-menu-sidebar");
        body.classList.remove("is-menu-sidebar");
        menuToggles.forEach((btn) => btn.classList.remove("is-active"));
        menuToggles.forEach((btn) => btn.setAttribute("aria-expanded", "false"));
        setAriaHidden(focusTargets, false);
        setAriaHidden(overlayTargets, true);
        window.setTimeout(() => {
          body.classList.remove("hiding-header-menu-sidebar");
        }, 300);
        return;
      }

      body.classList.add("is-menu-sidebar");
      menuToggles.forEach((btn) => btn.classList.add("is-active"));
      menuToggles.forEach((btn) => btn.setAttribute("aria-expanded", "true"));
      setAriaHidden(overlayTargets, false);
      setAriaHidden(focusTargets, true);

      if (trigger) {
        trigger.focus();
      }
    };

    const onToggleClick = (event: Event) => {
      event.preventDefault();
      toggleMenu(!body.classList.contains("is-menu-sidebar"), event.currentTarget as HTMLButtonElement);
    };

    const onCloseClick = (event: Event) => {
      event.preventDefault();
      toggleMenu(false);
    };

    menuToggles.forEach((btn) => btn.addEventListener("click", onToggleClick));
    menuCloseButtons.forEach((btn) => btn.addEventListener("click", onCloseClick));
    overlay?.addEventListener("click", onCloseClick);

    const getText = (element: Element | null) => element?.textContent?.trim() ?? "";
    const extractBlogPosts = () => {
      if (!route.startsWith("/blog")) {
        return [];
      }
      return Array.from(document.querySelectorAll<HTMLElement>("article.grids")).map((article) => {
        const titleLink = article.querySelector<HTMLAnchorElement>(".the-title a");
        const author = getText(article.querySelector(".the-author span"));
        const dateLabel = getText(article.querySelector(".the-date span"));
        const date = Date.parse(dateLabel);
        const href = titleLink?.getAttribute("href") ?? "";
        const postUrl = href ? new URL(href, origin).href : "";
        const post: Record<string, unknown> = {
          "@type": "BlogPosting",
          headline: getText(titleLink),
          url: postUrl || undefined,
          author: author ? { "@type": "Person", name: author } : undefined,
          datePublished: Number.isNaN(date) ? undefined : new Date(date).toISOString(),
        };
        return post;
      });
    };

    const orgId = `${origin}#organization`;
    const siteId = `${origin}#website`;
    const webpageId = `${canonicalUrl}#webpage`;
    const organization: Record<string, unknown> = {
      "@type": "Organization",
      "@id": orgId,
      name: "Mashdata",
      url: origin,
      logo: ogImageUrl,
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT_PHONE,
          email: CONTACT_EMAIL,
          contactType: "customer support",
        },
      ],
    };
    const website: Record<string, unknown> = {
      "@type": "WebSite",
      "@id": siteId,
      name: "Mashdata",
      url: origin,
      publisher: { "@id": orgId },
    };
    const webpage: Record<string, unknown> = {
      "@type": "WebPage",
      "@id": webpageId,
      name: title,
      url: canonicalUrl,
      description: seo.description,
      isPartOf: { "@id": siteId },
    };

    const schemaGraph: Array<Record<string, unknown>> = [organization, website, webpage];
    if (route.startsWith("/blog")) {
      schemaGraph.push({
        "@type": "Blog",
        "@id": `${canonicalUrl}#blog`,
        name: "Mashdata Blog",
        url: canonicalUrl,
        description: seo.description,
        publisher: { "@id": orgId },
        isPartOf: { "@id": siteId },
      });
      schemaGraph.push(...extractBlogPosts());
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": schemaGraph,
    };

    const scriptId = "structured-data";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      Object.entries(bodyAttributes).forEach(([key]) => {
        const previous = previousAttributes[key];
        if (key === "class") {
          body.className = previous || "";
        } else if (key === "id") {
          body.id = previous || "";
        } else if (previous) {
          body.setAttribute(key, previous);
        } else {
          body.removeAttribute(key);
        }
      });
      if (!previousMenuState) {
        body.classList.remove("is-menu-sidebar");
      }
      menuToggles.forEach((btn) => btn.removeEventListener("click", onToggleClick));
      menuCloseButtons.forEach((btn) => btn.removeEventListener("click", onCloseClick));
      overlay?.removeEventListener("click", onCloseClick);
      document.title = previousTitle;
    };
  }, [bodyAttributes, title, route, seo]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
