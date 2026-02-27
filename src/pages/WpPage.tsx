import { useEffect } from "react";
import { blogPosts } from "../data/blogPosts";

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
  const htmlWithBlogPosts = route.startsWith("/blog")
    ? html.replace("<!-- BLOG_POSTS -->", renderBlogPosts())
    : html;

  useEffect(() => {
    const body = document.body;
    const previousAttributes: BodyAttributes = {};
    const previousMenuState = body.classList.contains("is-menu-sidebar");
    let mainRoleTarget: HTMLElement | null = null;
    let mainRolePrevious: string | null = null;
    let mainIdPrevious: string | null = null;

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

    if (!document.querySelector("main")) {
      const anchor = document.querySelector("#mycontent");
      const candidate =
        (anchor?.nextElementSibling as HTMLElement | null) ??
        document.querySelector<HTMLElement>(".elementor") ??
        document.querySelector<HTMLElement>(".main-all");
      if (candidate) {
        mainRoleTarget = candidate;
        mainRolePrevious = candidate.getAttribute("role");
        mainIdPrevious = candidate.id || null;
        candidate.setAttribute("role", "main");
        if (!candidate.id) {
          candidate.id = "main-content";
        }
      }
    }

    const videoLoadTimeout = window.setTimeout(() => {
      const videos = Array.from(
        document.querySelectorAll<HTMLVideoElement>("video[data-src]")
      );
      videos.forEach((video) => {
        const src = video.getAttribute("data-src");
        if (!src || video.getAttribute("src")) {
          return;
        }
        video.setAttribute("src", src);
        video.load();
        video.play().catch(() => undefined);
      });
    }, 1500);

    const menuToggles = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".menu-mobile-toggle .navbar-toggle")
    );
    const menuCloseButtons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".close-sidebar-panel .navbar-toggle")
    );
    const overlay = document.querySelector<HTMLElement>(".header-menu-sidebar-overlay");
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

    // Contact form handler
    let contactFormCleanup: (() => void) | undefined;
    if (route.startsWith("/contact")) {
      const form = document.querySelector<HTMLFormElement>(".solaceform-form");
      if (form) {
        const showPopup = (success: boolean, message: string) => {
          const overlay = document.createElement("div");
          overlay.style.cssText =
            "position:fixed;inset:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:99999;opacity:0;transition:opacity .3s ease";

          const card = document.createElement("div");
          card.style.cssText =
            "background:#fff;border-radius:16px;padding:40px 32px 32px;max-width:420px;width:90%;text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.3);transform:scale(0.8);transition:transform .3s ease";

          const iconCircle = document.createElement("div");
          const color = success ? "#22c55e" : "#ef4444";
          iconCircle.style.cssText =
            `width:72px;height:72px;border-radius:50%;background:${color};margin:0 auto 20px;display:flex;align-items:center;justify-content:center`;
          iconCircle.innerHTML = success
            ? '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
            : '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

          const heading = document.createElement("h3");
          heading.style.cssText = "margin:0 0 8px;font-size:22px;font-weight:700;color:#1a1a1a";
          heading.textContent = success ? "Message Sent!" : "Something Went Wrong";

          const text = document.createElement("p");
          text.style.cssText = "margin:0 0 24px;font-size:15px;color:#666;line-height:1.5";
          text.textContent = message;

          const btn = document.createElement("button");
          btn.style.cssText =
            `display:inline-block;padding:12px 36px;border:none;border-radius:8px;background:${color};color:#fff;font-size:15px;font-weight:600;cursor:pointer;transition:opacity .2s`;
          btn.textContent = success ? "OK" : "Close";
          btn.onmouseenter = () => { btn.style.opacity = "0.85"; };
          btn.onmouseleave = () => { btn.style.opacity = "1"; };

          const close = () => {
            overlay.style.opacity = "0";
            card.style.transform = "scale(0.8)";
            setTimeout(() => overlay.remove(), 300);
          };
          btn.onclick = close;
          overlay.onclick = (e) => { if (e.target === overlay) close(); };

          card.append(iconCircle, heading, text, btn);
          overlay.appendChild(card);
          document.body.appendChild(overlay);

          requestAnimationFrame(() => {
            overlay.style.opacity = "1";
            card.style.transform = "scale(1)";
          });
        };

        const onSubmit = async (e: Event) => {
          e.preventDefault();
          const submitBtn = form.querySelector<HTMLButtonElement>(".solaceform-form-button");
          if (submitBtn) submitBtn.classList.add("active");

          const get = (name: string) =>
            (form.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[name="${name}"]`)?.value ?? "").trim();

          const name = get("name");
          const email = get("email");
          const phone = get("phone");
          const service = get("service");
          const message = get("msg");

          if (!name || !email || !message) {
            showPopup(false, "Please fill in all required fields (Name, Email, Message).");
            if (submitBtn) submitBtn.classList.remove("active");
            return;
          }

          try {
            const res = await fetch("/api/contact", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name, email, phone, service, message }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
              showPopup(true, "Thank you for reaching out! We'll get back to you shortly.");
              form.reset();
            } else {
              throw new Error(data.error || "Something went wrong");
            }
          } catch (err) {
            showPopup(false, err instanceof Error ? err.message : "Failed to send message. Please try again.");
          } finally {
            if (submitBtn) submitBtn.classList.remove("active");
          }
        };

        form.addEventListener("submit", onSubmit);
        contactFormCleanup = () => form.removeEventListener("submit", onSubmit);
      }
    }

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
      window.clearTimeout(videoLoadTimeout);
      contactFormCleanup?.();
      if (mainRoleTarget) {
        if (mainRolePrevious) {
          mainRoleTarget.setAttribute("role", mainRolePrevious);
        } else {
          mainRoleTarget.removeAttribute("role");
        }
        if (mainIdPrevious !== null) {
          mainRoleTarget.id = mainIdPrevious;
        } else {
          mainRoleTarget.removeAttribute("id");
        }
      }
    };
  }, [bodyAttributes, title, route, seo]);

  return <div dangerouslySetInnerHTML={{ __html: htmlWithBlogPosts }} />;
}

function renderBlogPosts() {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  return blogPosts
    .map((post) => {
      const href = `/${post.slug}/`;
      return `<article class="grids grid1">
\t<div class="boxes">
\t\t<div class="box-content no-thumbnail">
\t\t\t<div class="the-title">
\t\t\t\t<h3>
\t\t\t\t\t<a href="${href}">${escapeHtml(post.title)}</a>
\t\t\t\t</h3>
\t\t\t</div>
\t\t\t<div class="the-excerpt">
\t\t\t\t<p>${escapeHtml(post.excerpt)}</p>
\t\t\t</div>
\t\t\t<div class="the-readmore">
\t\t\t\t<a href="${href}">
\t\t\t\t\tRead More\t\t\t\t</a>
\t\t\t</div>
\t\t</div>
\t\t<div class="box-meta">
\t\t\t<div class="the-author">
\t\t\t\t<span>${escapeHtml(post.author)}</span>
\t\t\t</div>
\t\t\t<div class="the-date">
\t\t\t\t<span>${escapeHtml(post.date)}</span>
\t\t\t</div>
\t\t</div>
\t</div>
</article>`;
    })
    .join("\n");
}
