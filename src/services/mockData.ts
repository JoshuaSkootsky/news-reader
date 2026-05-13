import { Article, Category } from '../types/article';

const generateContent = (title: string): string => `
<p>${title} represents a significant shift in how we think about contemporary challenges. In recent months, experts have observed remarkable changes in the landscape of public discourse.</p>

<p>The implications of this development extend far beyond immediate concerns. As scholars have noted, the ripple effects could reshape entire sectors of society. "What we're witnessing is nothing short of a paradigm shift," observed one leading researcher at a major think tank.</p>

<h2>The Historical Context</h2>

<p>To understand what's happening now, we must look back at the events that have brought us here. The past decade has seen unprecedented changes in how information flows and how communities organize themselves. Traditional institutions have had to adapt rapidly to new realities.</p>

<p>This adaptation has not been without challenges. Many have struggled to maintain relevance in an era where the old rules no longer apply. Yet those who have successfully navigated these shifts offer valuable lessons for the future.</p>

<h2>What Comes Next</h2>

<p>The trajectory ahead remains uncertain, but several trends are clear. Innovation will continue to accelerate, driven by both necessity and opportunity. The question is not whether change will come, but how we will respond to it.</p>

<p>For readers seeking to understand these dynamics, the key lies in looking beyond the headlines. The most important developments often happen gradually, building momentum before becoming impossible to ignore.</p>

<p>As one commentator put it recently: "We're at an inflection point where the decisions we make in the next few years will shape the future for generations." This sentiment echoes across many sectors, from technology to policy to culture.</p>

<h2>Looking Forward</h2>

<p>The path forward will require both vigilance and imagination. We must be prepared to question our assumptions while remaining grounded in evidence. The challenges are real, but so are the opportunities for those willing to think differently about the problems we face.</p>

<p>In the end, the story of ${title.toLowerCase()} is really the story of how we adapt, grow, and ultimately define what comes next. The ending is still being written—and each of us has a role in shaping it.</p>
`;

const images = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
];

const authors = [
  { name: 'James Fallows', image: 'https://i.pravatar.cc/100?img=1' },
  { name: 'Ta-Nehisi Coates', image: 'https://i.pravatar.cc/100?img=2' },
  { name: 'Adrienne LaFrance', image: 'https://i.pravatar.cc/100?img=3' },
  { name: 'David A. Graham', image: 'https://i.pravatar.cc/100?img=4' },
  { name: 'Ross Andersen', image: 'https://i.pravatar.cc/100?img=5' },
  { name: 'Sophie Gilbert', image: 'https://i.pravatar.cc/100?img=6' },
  { name: 'Adam Gopnik', image: 'https://i.pravatar.cc/100?img=7' },
  { name: 'Megan Garber', image: 'https://i.pravatar.cc/100?img=8' },
];

const articleTitles = [
  { title: 'The Great Reset: How the Pandemic Changed Everything', category: 'ideas' as Category },
  { title: 'The Future of Democracy in the Age of AI', category: 'politics' as Category },
  { title: 'Inside the Silicon Valley Exodus', category: 'technology' as Category },
  { title: 'The Return of the Book', category: 'books' as Category },
  { title: 'The New Culture Wars', category: 'culture' as Category },
  { title: 'The Climate Crisis, Revisited', category: 'science' as Category },
  { title: 'What Happened to the Center?', category: 'politics' as Category },
  { title: 'The Attention Economy Is Collapsing', category: 'technology' as Category },
  { title: 'The Myth of the Great Work', category: 'ideas' as Category },
  { title: 'The Last Bookstore', category: 'books' as Category },
  { title: 'How We Learned to Stop Worrying', category: 'culture' as Category },
  { title: 'The Algorithm Knows What You Want', category: 'technology' as Category },
  { title: 'The Quiet Revolution in Education', category: 'ideas' as Category },
  { title: 'American Gothic: The State of the Nation', category: 'politics' as Category },
  { title: 'The Science of Sleep', category: 'science' as Category },
];

const excerpts = [
  'A deep investigation into the forces reshaping our world, and what they mean for the future.',
  'The implications extend far beyond the immediate—reshaping everything from policy to culture.',
  'In a world of constant change, understanding the forces at work has never been more important.',
  'What does it mean to be human in an age of machines? The answer may surprise you.',
  'The story of our time is not what you think—it is far stranger, and far more interesting.',
];

export const mockArticles: Article[] = articleTitles.map((item, index) => {
  const author = authors[index % authors.length];
  return {
    id: `article-${index + 1}`,
    title: item.title,
    excerpt: excerpts[index % excerpts.length],
    content: generateContent(item.title),
    author: author.name,
    authorImage: author.image,
    publishedAt: new Date(Date.now() - index * 3600000 * 6).toISOString(),
    category: item.category,
    imageUrl: images[index % images.length],
    readingTime: Math.floor(Math.random() * 15) + 5,
    isPremium: index % 4 === 0,
  };
});

export const featuredArticle = mockArticles[0];

export const getArticles = (): Article[] => mockArticles;

export const getArticleById = (id: string): Article | undefined => 
  mockArticles.find(article => article.id === id);

export const getLatestArticles = (): Article[] => 
  [...mockArticles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

export const getArticlesByCategory = (category: Category): Article[] =>
  mockArticles.filter(article => article.category === category);

export const searchArticles = (query: string): Article[] => {
  const lowerQuery = query.toLowerCase();
  return mockArticles.filter(
    article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.author.toLowerCase().includes(lowerQuery)
  );
};