import { executeQuery } from "@/lib/db";
import type { News } from "@/types/news";

export async function getLatestNews(limit = 4): Promise<News[]> {
  try {
    const news = await executeQuery<News[]>({
      query: "SELECT * FROM news ORDER BY created_at DESC LIMIT ?",
      values: [limit],
    });
    return news;
  } catch (error) {
    console.error("Error fetching latest news:", error);
    return [];
  }
}

export async function getNewsBySlug(slug: string): Promise<News | null> {
  try {
    const news = await executeQuery<News[]>({
      query: "SELECT * FROM news WHERE slug = ?",
      values: [slug],
    });
    return news.length > 0 ? news[0] : null;
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    return null;
  }
}

export async function getNewsPaginated(
  page: number,
  limit: number
): Promise<{ news: News[]; total: number }> {
  try {
    const offset = (page - 1) * limit;

    const news = await executeQuery<News[]>({
      query: "SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?",
      values: [limit, offset],
    });

    const totalResult = await executeQuery<[{ total: number }]>({
      query: "SELECT COUNT(*) as total FROM news",
    });

    const total = totalResult[0].total;

    return { news, total };
  } catch (error) {
    console.error("Error fetching paginated news:", error);
    return { news: [], total: 0 };
  }
}

export async function createNews(
  newsData: Omit<News, "id" | "created_at" | "updated_at">
): Promise<number> {
  try {
    const result = await executeQuery<{ insertId: number }>({
      query: `
        INSERT INTO news (title, slug, content, excerpt, imageUrl, author)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      values: [
        newsData.title,
        newsData.slug,
        newsData.content,
        newsData.excerpt,
        newsData.imageUrl,
        newsData.author,
      ],
    });

    return result.insertId;
  } catch (error) {
    console.error("Error creating news:", error);
    throw error;
  }
}

export async function updateNews(
  id: number,
  newsData: Partial<Omit<News, "id" | "created_at" | "updated_at">>
): Promise<boolean> {
  try {
    const fields = Object.keys(newsData);
    const values = Object.values(newsData);

    if (fields.length === 0) return false;

    const setClause = fields.map((field) => `${field} = ?`).join(", ");

    await executeQuery({
      query: `UPDATE news SET ${setClause}, updated_at = NOW() WHERE id = ?`,
      values: [...values, id],
    });

    return true;
  } catch (error) {
    console.error("Error updating news:", error);
    return false;
  }
}

export async function deleteNews(id: number): Promise<boolean> {
  try {
    await executeQuery({
      query: "DELETE FROM news WHERE id = ?",
      values: [id],
    });

    return true;
  } catch (error) {
    console.error("Error deleting news:", error);
    return false;
  }
}
