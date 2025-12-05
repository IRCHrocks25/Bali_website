// Auto-import all JSON files in this directory
const articleModules = import.meta.glob("./*.json", { eager: true });

export const staticArticles = Object.values(articleModules)
  .map((module) => module.default)
  .sort((a, b) => {
    // Sort by published_at date (newest first)
    const dateA = new Date(a.published_at);
    const dateB = new Date(b.published_at);
    return dateB - dateA;
  });
