export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "predictive-analytics-how-businesses-can-see-the-future-with-data",
    title: "Predictive Analytics: How Businesses Can See the Future with Data",
    excerpt:
      "What is Predictive Analytics? Predictive analytics is the use of statistical techniques and machine learning to forecast future outcomes based on past data. Rather than just looking back at what happened, it helps businesses anticipate what is likely to happen next. How It Works At its core, predictive analytics follows three simple steps: For example,",
    author: "Shadrack Macharia",
    date: "September 4, 2025",
  },
  {
    slug: "how-data-visualization-helps-businesses-make-smarter-decisions",
    title: "How Data Visualization Helps Businesses Make Smarter Decisions",
    excerpt:
      "What is Data Visualization? Data visualization is the practice of turning raw data into visual formats such as charts, graphs, and dashboards. Instead of scanning through rows and columns of numbers, decision-makers see information presented in a way that's quick to understand. In essence, visualization bridges the gap between complex data and clear business insights.",
    author: "Shadrack Macharia",
    date: "September 4, 2025",
  },
  {
    slug: "why-every-business-needs-data-analytics-in-2025",
    title: "Why Every Business Needs Data Analytics in 2025",
    excerpt:
      "In today’s digital world, businesses are producing more data than ever before. From customer purchases to website clicks, every interaction tells a story. But without proper analysis, this data remains just numbers. Data analytics transforms raw data into meaningful insights that help businesses reduce costs, improve customer experiences, and increase profits. Different industries apply data",
    author: "Shadrack Macharia",
    date: "September 4, 2025",
  },
];
