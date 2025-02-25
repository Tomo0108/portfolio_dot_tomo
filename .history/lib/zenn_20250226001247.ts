interface ZennArticle {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  liked_count: number;
  article_type: string;
  emoji: string;
  path: string;
}

interface ZennResponse {
  articles: ZennArticle[];
}

export async function fetchZennArticles(username: string) {
  const response = await fetch(`https://zenn.dev/api/articles?username=${username}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 3600 }, // 1時間ごとに再検証
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Zenn articles');
  }

  const data: ZennResponse = await response.json();
  return data.articles.map(article => ({
    id: article.id,
    title: article.title,
    url: `https://zenn.dev${article.path}`,
    date: new Date(article.published_at).toISOString(),
    likes: article.liked_count,
    emoji: article.emoji,
  }));
}
