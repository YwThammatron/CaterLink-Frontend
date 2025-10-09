import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get base URL from environment
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Load blog data when component mounts
  useEffect(() => {
    const loadBlogDetail = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
        setError("ไม่สามารถโหลดบทความได้");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadBlogDetail();
    }
  }, [id, baseUrl]);

  // Format timestamp to readable date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get user initial for avatar fallback
  const getUserInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  // Get blog category display
  const getBlogCategory = (role) => {
    return role === "restaurant" ? "บทความโดยร้านค้า" : "บทความโดยลูกค้า";
  };

  // Get default image if no blog images
  const getBlogImage = () => {
    if (blog?.blog_images && blog.blog_images.length > 0) {
      return blog.blog_images[0].url;
    }
    return "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1440&h=560&fit=crop&crop=center";
  };

  if (isLoading) {
    return (
      <>
        <NavbarCustom />
        <div className="flex flex-col items-center">
          <div className="flex flex-col max-w-[1440px]">
            <div className="flex flex-col gap-16 pb-16 items-center">
              <div className="max-w-[1280px] flex flex-col items-center px-8 gap-8">
                <div className="flex flex-col gap-3 items-center pt-10">
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded w-96 animate-pulse"></div>
                </div>
                <div className="flex gap-4 max-w-[209px]">
                  <div className="w-[56px] h-[56px] bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-5 bg-gray-200 rounded w-24 animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="w-[1440px] h-[560px] bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
        <MiniFooter />
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <NavbarCustom />
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <p className="text-red-500 text-lg">{error || "ไม่พบบทความ"}</p>
        </div>
        <MiniFooter />
      </>
    );
  }
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-[1440px]">
          <div className="flex flex-col gap-16 pb-16 items-center">
            <div className="max-w-[1280px] flex flex-col items-center px-8 gap-8 ">
              <div className="flex flex-col gap-3 items-center pt-10">
                <p className="font-semibold text-[#D87500]">
                  {getBlogCategory(blog.user.role)}
                </p>
                <p className="text-5xl font-semibold text-[#101828] text-center">
                  {blog.title}
                </p>
              </div>

              <div className="flex gap-4 max-w-[209px]">
                <Avatar className="w-[56px] h-[56px]">
                  <AvatarImage src={blog.user.profile_picture} />
                  <AvatarFallback>
                    {getUserInitial(blog.user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col max-w-[137px]">
                  <p className="text-lg font-semibold text-[#101828]">
                    {blog.user.name}
                  </p>
                  <p className="text-[#475467]">{formatDate(blog.timestamp)}</p>
                </div>
              </div>
            </div>

            <img
              src={getBlogImage()}
              alt={blog.title}
              className="w-[1440px] max-h-[560px] object-cover"
            />
          </div>

          <div className="flex flex-col gap-12 items-center">
            <div className="max-w-[720px] flex flex-col gap-6">
              <div className="text-lg text-[#475467] whitespace-pre-wrap">
                {blog.detail}
              </div>
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default BlogDetail;
