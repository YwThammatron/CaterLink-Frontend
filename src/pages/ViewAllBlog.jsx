import { useState, useEffect } from "react";
import axios from "axios";
import NavbarCustom from "../components/ui/Navbar-custom";
import BlogBar from "../components/ui/BlogBar";
import BlogpostCard from "../components/ui/BlogpostCard";
import MiniFooter from "../components/ui/miniFooter";

function ViewAllBlog() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [authorFilter, setAuthorFilter] = useState("all");
  const [cateringFilter, setCateringFilter] = useState("all");

  // Get base URL from environment
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Load all blogs when component mounts
  useEffect(() => {
    const loadAllBlogs = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/blogs`, {
          params: {
            page: 1,
            sortBy: "timestamp",
            sortOrder: "desc",
          },
        });
        setBlogs(response.data.data);
        setFilteredBlogs(response.data.data); // Initialize filtered blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllBlogs();
  }, [baseUrl]); // Only depend on baseUrl to avoid infinite loops

  // Apply filters whenever blogs or filter states change
  useEffect(() => {
    if (blogs.length > 0) {
      applyAllFilters(blogs, searchQuery, authorFilter, cateringFilter);
    }
  }, [blogs, searchQuery, authorFilter, cateringFilter]);

  // Handle search from BlogBar
  const handleSearch = (query) => {
    setSearchQuery(query);
    applyAllFilters(blogs, query, authorFilter, cateringFilter);
  };

  // Handle author filter from BlogBar
  const handleAuthorFilter = (filter) => {
    setAuthorFilter(filter);
    applyAllFilters(blogs, searchQuery, filter, cateringFilter);
  };

  // Handle catering filter from BlogBar
  const handleCateringFilter = (filter) => {
    setCateringFilter(filter);
    applyAllFilters(blogs, searchQuery, authorFilter, filter);
  };

  // Apply all filters together
  const applyAllFilters = (blogList, search, author, catering) => {
    let filtered = [...blogList];

    // Filter by author (from BlogBar)
    if (author !== "all" && author !== "ผู้เขียน") {
      filtered = filtered.filter((blog) => blog.user.role === author);
    }

    // Filter by search query
    if (search && search.trim()) {
      const searchTerm = search.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm) ||
          blog.detail.toLowerCase().includes(searchTerm) ||
          blog.user.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by catering type using restaurant_main_category
    if (catering !== "all" && catering !== "การจัดเลี้ยง") {
      filtered = filtered.filter((blog) => {
        // Check if blog has restaurant_main_category and it matches the selected category ID
        return blog.restaurant_main_category === catering;
      });
    }

    setFilteredBlogs(filtered);
  };

  // Format blog data for BlogpostCard component
  const formatBlogData = (blog) => {
    return {
      id: blog.id,
      title: blog.title,
      detail: blog.detail,
      timestamp: blog.timestamp,
      user: {
        name: blog.user.name,
        profile_picture: blog.user.profile_picture,
      },
      blog_images: blog.blog_images,
    };
  };

  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col gap-16 py-10 max-w-[1184px] mx-auto items-center">
        <h1>บทความ</h1>

        {/* BlogBar with search and filter functionality */}
        <BlogBar
          onSearch={handleSearch}
          onAuthorFilter={handleAuthorFilter}
          onCateringFilter={handleCateringFilter}
        />

        {/* Blog Posts */}
        <div className="flex flex-col gap-4 w-full">
          <h3>
            บทความทั้งหมด
            {filteredBlogs.length > 0 && ` (${filteredBlogs.length} บทความ)`}
          </h3>

          {isLoading ? (
            // Loading state - show skeleton cards
            <div className="flex gap-4 flex-wrap">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-[280px] flex flex-col gap-3">
                  <div className="w-[280px] h-[200px] bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex flex-col gap-2 p-3">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredBlogs.length > 0 ? (
            // Render actual blog data
            <div className="flex gap-4 flex-wrap">
              {filteredBlogs.map((blog) => {
                const formattedData = formatBlogData(blog);
                return <BlogpostCard key={blog.id} blog={formattedData} />;
              })}
            </div>
          ) : (
            // No blogs found
            <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
              <p>ไม่พบบทความในหมวดหมู่นี้</p>
            </div>
          )}
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default ViewAllBlog;
