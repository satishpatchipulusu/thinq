
import { useState, useEffect } from 'react';
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
    const summary = `Here's what I read this week:\n${articles
      .map(article => `- ${article.title} (${article.url})`)
      .join('\n')}`;

    try {
      await navigator.clipboard.writeText(summary);
      toast({
        title: "Copied to clipboard!",
        description: "Your reading list has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-lora text-3xl font-semibold text-gray-900">This Week's Reads</h1>
          <Button 
            onClick={shareWeek} 
            variant="outline"
            className="bg-white hover:bg-gray-50 text-gray-900 border-gray-200"
          >
            <Share2 className="mr-2" />
            Share my week
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
            <p className="text-gray-600">No articles read in the past week.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archive;
