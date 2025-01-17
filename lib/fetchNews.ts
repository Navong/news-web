import { Article } from "@/type/article";

export async function fetchNews(category: string) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(
        `${baseUrl}/api/news/${category}`
    );

    if (!res.ok) throw new Error("Failed to fetch news.");
    return res.json();
}

export async function fetchArticleById(id: string, category: string) {
    const news = await fetchNews(category);
    const article = news.articles.find((article: Article) => article.url === id);
    return article || null;
}
