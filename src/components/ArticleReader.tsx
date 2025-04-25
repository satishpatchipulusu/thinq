
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar";

const ArticleReader = () => {
  const [url, setUrl] = useState('');
  const [article, setArticle] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const location = useLocation();
  const showInput = location.pathname === '/' && !article;

  const saveToReadHistory = (article: { title: string; url: string }) => {
    const storedArticles = localStorage.getItem('readArticles');
    const articles = storedArticles ? JSON.parse(storedArticles) : [];
    
    articles.push({
      ...article,
      timestamp: Date.now()
    });
    
    localStorage.setItem('readArticles', JSON.stringify(articles));
  };

  const fetchArticle = async () => {
    if (!url) {
      toast({
        title: "please enter a url",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll use a mock response
      setTimeout(() => {
        const mockArticle = {
          title: "sample article",
          content: "this is a sample article content. in a real implementation, this would be the actual content from the provided url."
        };
        setArticle(mockArticle);
        saveToReadHistory({ title: mockArticle.title, url: url });
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "error fetching article",
        description: "please check the url and try again",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="p-4 md:p-8">
        <div className="max-w-2xl mx-auto space-y-12">
          {showInput && (
            <div className="space-y-6">
              <h1 className="font-lora text-3xl font-semibold text-gray-900">let's read</h1>
              <p className="text-gray-600 text-lg">simply paste a link for the article you'd like to read and you're set!</p>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="paste article url here..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  onClick={fetchArticle}
                  disabled={loading}
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-900 border-gray-200"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "read"}
                </Button>
              </div>
            </div>
          )}

          {article && (
            <Card className="p-12 bg-white shadow-none border-0">
              <article className="prose font-lora">
                <h1 className="text-3xl font-semibold mb-8 text-gray-900">
                  {article.title}
                </h1>
                <div className="text-gray-800 leading-relaxed">
                  {article.content}
                </div>
              </article>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleReader;
