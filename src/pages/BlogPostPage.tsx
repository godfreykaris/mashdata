import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import NotFound from "./NotFound";

export default function BlogPostPage() {
  const { slug } = useParams();
  const postIndex = blogPosts.findIndex((entry) => entry.slug === slug);
  const post = postIndex >= 0 ? blogPosts[postIndex] : null;
  const previousPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost =
    postIndex >= 0 && postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const relatedPosts = blogPosts
    .filter((entry) => entry.slug !== slug)
    .slice(0, 2);

  useEffect(() => {
    if (!post) {
      return;
    }
    const previousTitle = document.title;
    document.title = `${post.title} – Mashdata`;

    const setMetaTag = (selector: string, attributes: Record<string, string>) => {
      let tag = document.head.querySelector<HTMLMetaElement>(selector);
      if (!tag) {
        tag = document.createElement("meta");
        document.head.appendChild(tag);
      }
      Object.entries(attributes).forEach(([key, value]) => tag?.setAttribute(key, value));
      tag?.setAttribute("data-seo-managed", "true");
    };

    setMetaTag('meta[name="description"]', { name: "description", content: post.excerpt });
    setMetaTag('meta[name="robots"]', { name: "robots", content: "index, follow" });
    setMetaTag('meta[property="og:title"]', { property: "og:title", content: post.title });
    setMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: post.excerpt,
    });
    setMetaTag('meta[property="og:type"]', { property: "og:type", content: "article" });
    setMetaTag('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
    setMetaTag('meta[name="twitter:title"]', { name: "twitter:title", content: post.title });
    setMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: post.excerpt,
    });

    return () => {
      document.title = previousTitle;
    };
  }, [post]);

  if (!post) {
    return <NotFound />;
  }

  return (
    <main className="main-single main-single1 main-singular">
      <section className="container-single">
        <div className="myrow row1">
          <div className="mycol">
            <article className="post type-post status-publish format-standard hentry category-uncategorized">
              <header className="boxes-header">
                <div className="cover">
                  <div className="image">
                    <div className="post-thumbnail">
                      <span aria-hidden="true" className="overlay"></span>
                    </div>
                  </div>
                  <div className="text">
                    <div className="the-title">
                      <h1>{post.title}</h1>
                    </div>
                    <div className="the-category">
                      <p>Posted in :</p>
                      <div>
                        <a href="/blog/">Uncategorized</a>
                      </div>
                    </div>
                    <div className="info-meta">
                      <div className="the-author-image">
                        <div className="avatar avatar-45 photo" aria-hidden="true"></div>
                      </div>
                      <div className="the-author">
                        <span>{post.author}</span>
                      </div>
                      <div className="the-date">
                        <time>{post.date}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </header>
              <div className="boxes-content">
                <div className="the-content">
                  {post.contentHtml ? (
                    <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
                  ) : (
                    <p>{post.excerpt}</p>
                  )}
                  <div className="box-posts-navigation">
                    <div className="left">
                      {previousPost ? (
                        <a href={`/${previousPost.slug}/`} title={previousPost.title}>
                          <div className="thumbnail">
                            <div className="thumbnail-box"></div>
                          </div>
                          <div className="text">
                            <span className="previous">Previous Post:</span>
                            <span className="title">{previousPost.title}</span>
                          </div>
                        </a>
                      ) : null}
                    </div>
                    <div className="right">
                      {nextPost ? (
                        <a href={`/${nextPost.slug}/`} title={nextPost.title}>
                          <div className="thumbnail">
                            <div className="thumbnail-box"></div>
                          </div>
                          <div className="text">
                            <span className="next">Next Post:</span>
                            <span className="title">{nextPost.title}</span>
                          </div>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </article>
            {relatedPosts.length ? (
              <div className="related-posts">
                <h3>Related Posts</h3>
                <ul>
                  {relatedPosts.map((related) => (
                    <li key={related.slug}>
                      <div className="image no-post-thumbnail">
                        <div className="overlay"></div>
                        <div className="thumbnail"></div>
                      </div>
                      <div className="content no-thumbnail">
                        <div className="the-categories">
                          <a href="/blog/">Uncategorized</a>
                        </div>
                        <h4 className="title">
                          <a href={`/${related.slug}/`}>{related.title}</a>
                        </h4>
                        <div className="date">
                          <time className="time-with-icon">
                            <span className="time">{related.date}</span>
                          </time>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
