import { Navigate, Route, Routes } from "react-router-dom";
import WpPage from "../pages/WpPage";
import { wpPages } from "../data/wpPages";
import { wpHtmlMap } from "../pages/wpHtml";
import NotFound from "../pages/NotFound";
import BlogPostPage from "../pages/BlogPostPage";

export default function AppRoutes() {
  return (
    <Routes>
      {wpPages.map((page) => (
        <Route
          key={page.key}
          path={page.route}
          element={
            <WpPage
              html={wpHtmlMap[page.key]}
              bodyAttributes={page.bodyAttributes}
              title={page.title}
              route={page.route}
              seo={page.seo}
            />
          }
        />
      ))}
      <Route path="/home/" element={<Navigate to="/" replace />} />
      <Route path="/:slug/" element={<BlogPostPage />} />
      <Route path="/:slug" element={<BlogPostPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
