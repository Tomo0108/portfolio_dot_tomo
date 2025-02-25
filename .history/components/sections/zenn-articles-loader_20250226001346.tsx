import { fetchZennArticles } from '@/lib/zenn';
import { ZennArticles } from './zenn-articles';

export async function ZennArticlesLoader() {
  try {
    const articles = await fetchZennArticles('tomo0108');
    return <ZennArticles articles={articles} />;
  } catch (error) {
    console.error('Failed to load Zenn articles:', error);
    return <ZennArticles articles={[]} />;
  }
}
