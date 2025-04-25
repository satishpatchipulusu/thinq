
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Article {
  url: string;
  title: string;
  timestamp: number;
}

const Archive = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const now = Date.now();
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
    
    const storedArticles = localStorage.getItem('readArticles');
    if (storedArticles) {
      const parsedArticles: Article[] = JSON.parse(storedArticles);
      const recentArticles = parsedArticles.filter(
        article => article.timestamp > sevenDaysAgo
      );
      setArticles(recentArticles);
    }
  }, []);

  const shareWeek = async () => {
    const summary = `here's what i read this week:\n${articles
      .map(article => `- ${article.title} (${article.url})`)
      .join('\n')}`;

    try {
      await navigator.clipboard.writeText(summary);
      toast({
        title: "copied to clipboard!",
        description: "your reading list has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "failed to copy",
        description: "please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-8">
        <blockquote className="mb-8 text-gray-700 italic border-l-4 pl-4 border-gray-200">
          "if it's wisdom you are after, you are going to spend a lot of time sitting on your ass and reading."
          <footer className="mt-2 text-gray-600">
            — charlie munger
          </footer>
        </blockquote>
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-lora text-3xl font-semibold text-gray-900">this week's reads</h1>
          <Button 
            onClick={shareWeek} 
            variant="outline"
            className="bg-white hover:bg-gray-50 text-gray-900 border-gray-200"
            title="share with a friend"
          >
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-6">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h2 className="font-lora text-xl font-semibold text-gray-900">{article.title}</h2>
                <p className="text-gray-600 mt-2">
                  {new Date(article.timestamp).toLocaleDateString()}
                </p>
              </a>
            ))
          ) : (
            <Link to="/library" className="text-gray-600 hover:text-gray-900 transition-colors">
              get started
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
