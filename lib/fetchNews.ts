import { Article } from "@/type/article";

export async function fetchNews(category: string) {
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const res = await fetch(
        `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`
    );

    if (!res.ok) throw new Error("Failed to fetch news.");
    return res.json();
}

export async function fetchArticleById(id: string, category: string) {
    const news = await fetchNews(category);
    const article = news.articles.find((article: Article) => article.url === id);
    return article || null;
}
