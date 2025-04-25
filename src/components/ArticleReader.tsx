
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ArticleReader = () => {
  const [url, setUrl] = useState('');
  const [article, setArticle] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchArticle = async () => {
    if (!url) {
      toast({
        title: "Please enter a URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // For now, we'll use a mock response
      // In a real app, this would call an API endpoint
      setTimeout(() => {
        setArticle({
          title: "Sample Article",
          content: "This is a sample article content. In a real implementation, this would be the actual content from the provided URL. The content would be cleaned and formatted for optimal reading experience."
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Error fetching article",
        description: "Please check the URL and try again",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-2xl mx-auto space-y-12">
        <div className="space-y-6">
          <h1 className="font-lora text-3xl font-semibold text-gray-900">Let's read</h1>
          <p className="text-gray-600 text-lg">Simply paste a link for the article you'd like to read and you're set!</p>
          <div className="flex gap-2">
            <Input
              type="url"
              placeholder="Paste article URL here..."
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
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Read"}
            </Button>
          </div>
        </div>

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
  );
};

export default ArticleReader;
