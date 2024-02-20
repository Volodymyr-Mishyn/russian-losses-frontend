import { readFileSync } from 'fs';
import { format } from 'date-fns';

const getSitemap = async (filePath: string): Promise<string> => {
  try {
    const sitemapContent = readFileSync(filePath, 'utf8');
    const today = format(new Date(), 'yyyy-MM-dd');
    const updatedContent = sitemapContent.replace(
      /<lastmod>.*?<\/lastmod>/g,
      `<lastmod>${today}</lastmod>`
    );
    return updatedContent;
  } catch (error) {
    console.error('Error updating the sitemap:', error);
    throw new Error('Failed to update sitemap.');
  }
};

export default getSitemap;
