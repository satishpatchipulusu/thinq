
import Navbar from "@/components/Navbar";

const Blogs = () => {
  const blogList = [
    {
      title: "Brain Pickings",
      url: "https://www.brainpickings.org/",
      description: "Insights on creativity, books, and life"
    },
    {
      title: "Wait But Why",
      url: "https://waitbutwhy.com/",
      description: "Deep dives into various topics"
    },
    {
      title: "Farnam Street",
      url: "https://fs.blog/",
      description: "Mental models and learning"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-2xl mx-auto p-8">
        <h1 className="font-lora text-3xl font-semibold text-gray-900 mb-8">Recommended Blogs</h1>
        <div className="space-y-6">
          {blogList.map((blog) => (
            <a
              key={blog.title}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h2 className="font-lora text-xl font-semibold text-gray-900">{blog.title}</h2>
              <p className="text-gray-600 mt-2">{blog.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
