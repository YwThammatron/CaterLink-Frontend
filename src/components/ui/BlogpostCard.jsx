import { useNavigate } from "react-router-dom";

function BlogpostCard({ blog }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${blog.id}`);
  };

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get default image if no blog images
  const getImageSrc = () => {
    if (blog.blog_images && blog.blog_images.length > 0) {
      // Use the url field from blog_images array
      return blog.blog_images[0].url;
    }
    return "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop&crop=center";
  };

  return (
    <div
      className="flex flex-col gap-1 max-w-[224px] cursor-pointer hover:transform hover:scale-105 transition-transform duration-200"
      onClick={handleClick}
    >
      <div className="flex flex-col gap-3">
        <img
          src={getImageSrc()}
          alt={blog.title}
          className="rounded-lg w-[224px] h-[140px] object-cover"
        />
        <p className="text-sm font-bold text-[#101828] line-clamp-2">
          {blog.title}
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-xs text-[#667085]">
          โดย {blog.user?.name || "ไม่ระบุผู้เขียน"}
        </p>
        <p className="text-xs text-[#98A2B3]">{formatDate(blog.timestamp)}</p>
      </div>
    </div>
  );
}

export default BlogpostCard;
