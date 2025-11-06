import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

// UI Components
import NavbarCustom from "../components/ui/Navbar-custom";
import CarouselCustom from "../components/ui/Carousel-custom";
import FilterCustom from "../components/ui/Filter-custom";
import RestaurantCard from "../components/ui/RestaurantCard";
import PackageCard from "../components/ui/PackageCard";
import TestimonialCard from "../components/ui/TestimonialCard";
import BlogpostCard from "../components/ui/BlogpostCard";
import Footer from "../components/ui/Footer";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Wrapper component to handle async restaurant name fetching
function PackageCardWithRestaurant({ packageData, getRestaurantName }) {
  const [restaurantName, setRestaurantName] = useState("กำลังโหลด...");

  useEffect(() => {
    const fetchRestaurantName = async () => {
      const name = await getRestaurantName(packageData.restaurant_id);
      setRestaurantName(name);
    };

    fetchRestaurantName();
  }, [packageData.restaurant_id, getRestaurantName]);

  return (
    <PackageCard
      packageData={{
        ...packageData,
        restaurantName: restaurantName,
      }}
    />
  );
}

// Wrapper component for testimonials with async restaurant name fetching
function TestimonialCardWithRestaurant({ reviewData, getRestaurantName }) {
  const [restaurantName, setRestaurantName] = useState("กำลังโหลด...");

  useEffect(() => {
    const fetchRestaurantName = async () => {
      const name = await getRestaurantName(reviewData.restaurant_id);
      setRestaurantName(name);
    };

    fetchRestaurantName();
  }, [reviewData.restaurant_id, getRestaurantName]);

  return (
    <TestimonialCard
      reviewData={{
        ...reviewData,
        restaurantName: restaurantName,
      }}
    />
  );
}

function CustomerHomepage() {
  const navigate = useNavigate();

  // State management
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [packages, setPackages] = useState([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [blogFilter, setBlogFilter] = useState("all"); // 'all', 'restaurant', 'customer', or category ID
  const [mainCategories, setMainCategories] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Get base URL from environment
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Load blogs, restaurants, reviews, and packages when component mounts
  useEffect(() => {
    const loadData = async () => {
      // Load blogs
      setIsLoadingBlogs(true);
      try {
        const blogsResponse = await axios.get(`${baseUrl}/api/blogs`, {
          params: {
            page: 1,
            limit: 5,
            sortBy: "timestamp",
            sortOrder: "desc",
          },
        });
        setBlogs(blogsResponse.data.data);
        setFilteredBlogs(blogsResponse.data.data); // Initialize filtered blogs
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoadingBlogs(false);
      }

      // Load main categories for blog filtering
      try {
        const categoriesResponse = await axios.get(
          `${baseUrl}/api/main-categories`
        );
        setMainCategories(categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching main categories:", error);
      }

      // Load top 5 restaurants
      setIsLoadingRestaurants(true);
      try {
        const restaurantsResponse = await axios.get(
          `${baseUrl}/api/restaurants/top`,
          {
            params: {
              limit: 5,
            },
          }
        );
        setRestaurants(restaurantsResponse.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoadingRestaurants(false);
      }

      // Load all restaurants for mapping restaurant names
      try {
        const allRestaurantsResponse = await axios.get(
          `${baseUrl}/api/restaurants`
        );
        setAllRestaurants(allRestaurantsResponse.data);
      } catch (error) {
        console.error("Error fetching all restaurants:", error);
      }

      // Load reviews (top 3)
      setIsLoadingReviews(true);
      try {
        const reviewsResponse = await axios.get(`${baseUrl}/api/reviews`);
        // Take only first 3 reviews
        setReviews(reviewsResponse.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoadingReviews(false);
      }

      // Load packages (top 4)
      setIsLoadingPackages(true);
      try {
        const packagesResponse = await axios.get(`${baseUrl}/api/packages`);
        // Take only first 4 packages
        const packagesData = packagesResponse.data.slice(0, 4);
        setPackages(packagesData);
      } catch (error) {
        console.error("Error fetching packages:", error);
        // Set empty array on error to show "no packages" message
        setPackages([]);
      } finally {
        setIsLoadingPackages(false);
      }

      // Load recommended restaurants (top favorite restaurants)
      setIsLoadingRecommended(true);
      try {
        const recommendedResponse = await axios.get(
          `${baseUrl}/api/restaurants/top/favorite`,
          {
            params: {
              limit: 5,
            },
          }
        );
        setRecommendedRestaurants(recommendedResponse.data);
      } catch (error) {
        console.error("Error fetching recommended restaurants:", error);
        setRecommendedRestaurants([]);
      } finally {
        setIsLoadingRecommended(false);
      }
    };

    loadData();
  }, [baseUrl]);

  // Navigation functions
  const goToRestaurant = () => {
    navigate("/customerrestaurant");
  };

  const goToCompare = () => {
    navigate("/compare");
  };

  const goToBlog = () => {
    navigate("/allblog");
  };

  const goToPlanning = () => {
    navigate("/planning");
  };

  // Helper functions

  // Helper function to get restaurant name by ID
  const getRestaurantName = async (restaurantId) => {
    // First try to find in loaded restaurants
    const restaurant = allRestaurants.find((r) => r.id === restaurantId);
    if (restaurant) {
      return restaurant.name;
    }

    // If not found, fetch individual restaurant data
    try {
      const response = await axios.get(
        `${baseUrl}/api/restaurants/${restaurantId}`
      );
      return response.data.name;
    } catch (error) {
      console.error(`Error fetching restaurant ${restaurantId}:`, error);
      return "ร้านไม่ทราบชื่อ";
    }
  };

  // Fetch all blog pages from the API (same strategy as ViewAllBlog.jsx)
  // Returns an array of blog objects. This helper centralizes pagination
  // logic and makes handleBlogFilter much simpler.
  const fetchAllBlogs = async () => {
    setIsLoadingBlogs(true);
    try {
      const first = await axios.get(`${baseUrl}/api/blogs`, {
        params: { page: 1, sortBy: "timestamp", sortOrder: "desc" },
      });

      const firstData = first.data.data || [];
      const pagination = first.data.pagination;

      if (pagination && pagination.totalPages > 1) {
        const pages = [];
        for (let p = 2; p <= pagination.totalPages; p++) pages.push(p);

        const remainingResponses = await Promise.all(
          pages.map((p) =>
            axios.get(`${baseUrl}/api/blogs`, {
              params: { page: p, sortBy: "timestamp", sortOrder: "desc" },
            })
          )
        );

        const remainingData = remainingResponses.flatMap(
          (r) => r.data.data || []
        );
        return [...firstData, ...remainingData];
      }

      return firstData;
    } catch (err) {
      console.error("Error fetching all blog pages:", err);
      return [];
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  // Apply a simple filter to a list of blogs. Returns filtered array (not sliced).
  const applyFilter = (blogList, filterType, categoryId = null) => {
    if (!Array.isArray(blogList)) return [];

    if (filterType === "all") return blogList;

    if (filterType === "restaurant")
      return blogList.filter((b) => b.user?.role === "restaurant");

    if (filterType === "customer")
      return blogList.filter((b) => b.user?.role === "customer");

    if (categoryId)
      return blogList.filter((b) => b.restaurant_main_category === categoryId);

    return blogList;
  };

  // Blog filtering handler (async to allow server fetch). Uses the small
  // helpers fetchAllBlogs and applyFilter to keep this function readable.
  const handleBlogFilter = async (filterType, categoryId = null) => {
    setBlogFilter(filterType);

    // Quick path for 'all' to keep homepage light: use the already-loaded small batch
    if (filterType === "all") {
      setFilteredBlogs(blogs.slice(0, 5));
      return;
    }

    try {
      // Fetch every page (like ViewAllBlog.jsx), then apply the requested filter
      const all = await fetchAllBlogs();
      const filtered = applyFilter(all, filterType, categoryId);

      // Homepage only shows up to 5 items per filter
      setFilteredBlogs(filtered.slice(0, 5));
    } catch (err) {
      console.error("Error applying homepage blog filter:", err);
      // Fallback to filtering the small set already loaded
      const fallback = applyFilter(blogs, filterType, categoryId);
      setFilteredBlogs(fallback.slice(0, 5));
    }
  };

  // Update filtered blogs when blogs change
  useEffect(() => {
    if (blogs.length > 0) {
      handleBlogFilter(blogFilter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs]);

  // Search results handler
  const handleSearchResults = (searchResults, filterStates) => {
    // Navigate to CustomerRestaurant page with search results and filter states
    navigate("/customerrestaurant", {
      state: {
        searchResults: searchResults,
        filterStates: filterStates,
        isSearchActive: true,
      },
    });
  };

  return (
    <>
      <NavbarCustom />
      <CarouselCustom />
      <FilterCustom onSearchResults={handleSearchResults} />

      {/* หมวดหมู่ร้านจัดเลี้ยง */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col px-32 py-10 gap-4">
          <h3>หมวดหมู่ร้านจัดเลี้ยง</h3>
          <div className="flex gap-4">
            <img
              src="https://www.laoteng.co.th/wp-content/uploads/blog3.jpg"
              alt="Thai Restaurant"
              className="rounded-md cursor-pointer w-[384px] h-[140px] object-cover"
              onClick={goToRestaurant}
            />
            <img
              src="https://image.makewebeasy.net/makeweb/0/9TUKlNE0T/Blog/boxacatering_foodstall%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3_%E0%B9%80%E0%B8%A1%E0%B8%99%E0%B8%B9%E0%B8%A2%E0%B8%AD%E0%B8%94%E0%B8%99%E0%B8%B4%E0%B8%A2%E0%B8%A1.jpg"
              alt="Chinese Restaurant"
              className="rounded-md cursor-pointer w-[384px] h-[140px] object-cover"
              onClick={goToRestaurant}
            />
            <img
              src="https://delibites.com/wp-content/uploads/2023/04/featured_picture_delibites_socialmedia.jpg"
              alt="Italian Restaurant"
              className="rounded-md cursor-pointer w-[384px] h-[140px] object-cover"
              onClick={goToRestaurant}
            />
          </div>
        </div>
      </div>

      {/* วางแผนงานจัดเลี้ยง */}
      <div className="flex justify-center bg-[#F9FAFB]">
        <div className="flex gap-4 py-10 max-w-[1184px]">
          <div className="flex gap-10">
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiD60tZ3P-4bagJY-vL-1we8JiXfh6NQCUf2lDRTx81ou1gdkDZgbM5xin0089Pfemdy47q3eKr5xq3beTrNJJqpDbuJ1sLpp1kkh5fPoNzOiJumqyBz3YdzGJj7iYg58Q2VEIvfCcC-lk/s1600/201508281922.jpg"
              alt="Italian Restaurant"
              className="rounded-md w-[336px] h-[288px] object-cover"
            />
            <div className="flex flex-col gap-16 items-stretch justify-center">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#101828]">วางแผนงานจัดเลี้ยง</h1>
                <p className="text-lg text-[#344054]">
                  ให้ทุกงานสำคัญของคุณสมบูรณ์แบบด้วยการวางแพลนจัดเลี้ยงที่ครอบคลุมทั้งวัน
                  คุณสามารถเลือก แพ็กเกจที่หลากหลายจากหลายร้าน
                  และรวมไว้ในแผนงานเดียว
                  เพื่อสร้างประสบการณ์ที่ราบรื่นทั้งสำหรับ ผู้จัดและผู้ร่วมงาน
                </p>
              </div>
              <Button
                className="bg-gradient px-8 py-3 text-lg font-bold w-fit h-fit cursor-pointer"
                onClick={goToPlanning}
              >
                วางแพลนเลย
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* โปรโมชั่นเด็ดจากร้านดัง */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col px-32 py-10 gap-4">
          <div className="flex justify-between items-center">
            <h3>โปรโมชั่นเด็ดจากร้านดัง</h3>
          </div>
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=224&h=248&fit=crop"
              alt="Thai Restaurant"
              className="rounded-md"
            />
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=224&h=248&fit=crop"
              alt="Chinese Restaurant"
              className="rounded-md"
            />
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=224&h=248&fit=crop"
              alt="Italian Restaurant"
              className="rounded-md"
            />
            <img
              src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=224&h=248&fit=crop"
              alt="Seafood Restaurant"
              className="rounded-md"
            />
            <img
              src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=224&h=248&fit=crop"
              alt="BBQ Restaurant"
              className="rounded-md"
            />
          </div>
        </div>
      </div>

      {/*  Top 5 Restaurants */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 py-10 ">
          <div className="flex justify-between">
            <h3>Top 5 ร้านขายดี</h3>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={goToRestaurant}
            >
              <p className="font-bold text-gradient">ดูทั้งหมด</p>
              <ArrowRight className="text-[#EB5B0A]" />
            </div>
          </div>

          <div className="flex gap-4">
            {isLoadingRestaurants ? (
              // Loading state - show 5 skeleton cards
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2 max-w-[224px]">
                  <div className="w-[224px] h-[220px] bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))
            ) : restaurants.length > 0 ? (
              // Render actual restaurant data
              restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurantData={{
                    id: restaurant.id,
                    name: restaurant.name,
                    image:
                      restaurant.images && restaurant.images.length > 0
                        ? restaurant.images[0].url
                        : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop&crop=center",
                    rating: restaurant.avgRating
                      ? Number(restaurant.avgRating.toFixed(2))
                      : 0,
                    reviewCount: Math.floor(restaurant.totalReview || 0),
                    pricePerPerson: 290, // Default price since not in API response
                    description: restaurant.description,
                    foodCategories: restaurant.food_categories,
                    eventCategories: restaurant.event_categories,
                    mainCategories: restaurant.main_categories,
                  }}
                />
              ))
            ) : (
              // No restaurants found
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ไม่พบร้านค้าในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* เปรียบเทียบแพคเกจ */}
      <div className="flex justify-center bg-[#F9FAFB]">
        <div className="flex gap-4 py-10 max-w-[1184px]">
          <div className="flex flex-row-reverse gap-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3526/3526556.png"
              alt="Italian Restaurant"
              className="rounded-md w-[336px] h-[288px] object-cover"
            />
            <div className="flex flex-col gap-16 items-stretch justify-center">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#101828]">เปรียบเทียบแพคเกจ</h1>
                <p className="text-lg text-[#344054]">
                  เพราะการจัดเลี้ยงไม่ควรเป็นเรื่องซับซ้อน ฟีเจอร์
                  “เปรียบเทียบแพ็กเกจ” จะช่วยให้เห็นทุกข้อมูลที่ต้องการ
                  แบบชัดเจนในครั้งเดียว ทั้งราคา เมนู และความคุ้มค่าของแต่ละร้าน
                  ทำให้วางใจได้ว่าตัดสินใจเลือกสิ่งที่ตรงใจที่สุด
                </p>
              </div>
              <Button
                className="bg-gradient px-8 py-3 text-lg font-bold w-fit h-fit cursor-pointer"
                onClick={goToCompare}
              >
                เปรียบเทียบแพคเกจ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Restaurants */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 px-32 py-10">
          <div className="flex justify-between items-center">
            <h3>ร้านแนะนำจาก CaterLink </h3>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={goToRestaurant}
            >
              <p className="font-bold text-gradient">ดูทั้งหมด</p>
              <ArrowRight className="text-[#EB5B0A]" />
            </div>
          </div>

          <div className="flex gap-4">
            {isLoadingRecommended ? (
              // Loading state - show 5 skeleton cards
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-2 max-w-[224px]">
                  <div className="w-[224px] h-[220px] bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
              ))
            ) : recommendedRestaurants.length > 0 ? (
              // Render actual recommended restaurant data
              recommendedRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurantData={{
                    id: restaurant.id,
                    name: restaurant.name,
                    image:
                      restaurant.images && restaurant.images.length > 0
                        ? restaurant.images[0].url
                        : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&h=300&fit=crop&crop=center",
                    rating: restaurant.avgRating
                      ? Number(restaurant.avgRating.toFixed(2))
                      : 0,
                    reviewCount: restaurant.totalReview || 0,
                    pricePerPerson: 290, // Default price since not in API response
                    description: restaurant.description,
                    foodCategories: restaurant.food_categories,
                    eventCategories: restaurant.event_categories,
                    mainCategories: restaurant.main_categories,
                    favoriteCount: restaurant.favoriteCount,
                  }}
                />
              ))
            ) : (
              // No recommended restaurants found
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ไม่พบร้านแนะนำในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Package from CaterLink */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 px-32 py-10">
          <div className="flex justify-between items-center">
            <h3>แพคเกจแนะนำจาก CaterLink </h3>
          </div>

          <div className="flex gap-4">
            {isLoadingPackages ? (
              // Loading state - show 4 skeleton cards
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 max-w-[282px] p-4 border rounded-lg shadow-sm bg-white"
                >
                  <div className="w-[250px] h-[140px] bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : packages.length > 0 ? (
              // Render actual package data
              packages.map((pkg) => {
                const imageUrl =
                  pkg.package_images && pkg.package_images.length > 0
                    ? pkg.package_images[0].url
                    : "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=88&h=88&fit=crop";

                return (
                  <PackageCardWithRestaurant
                    key={pkg.id}
                    packageData={{
                      id: pkg.id,
                      name: pkg.name,
                      description: pkg.description,
                      restaurant_id: pkg.restaurant_id,
                      packageDetails: pkg.package_details || [],
                      categoryName:
                        pkg.package_categories?.name || "ไม่ระบุหมวดหมู่",
                      discount: pkg.discount,
                      image: imageUrl,
                    }}
                    getRestaurantName={getRestaurantName}
                  />
                );
              })
            ) : packages.length > 0 && allRestaurants.length === 0 ? (
              // Packages loaded but restaurants still loading - show loading state
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 max-w-[282px] p-4 border rounded-lg shadow-sm bg-white"
                >
                  <div className="w-[250px] h-[140px] bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex flex-col gap-2">
                    <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // No packages found
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ไม่มีแพคเกจในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Review from Customers */}
      <div className="flex flex-col gap-3 px-32 py-10 bg-[#F9FAFB]">
        <div className="flex flex-col gap-8 justify-center items-center">
          <h1>รีวิวจากผู้ใช้จริง</h1>
          <div className="flex gap-4">
            {isLoadingReviews ? (
              // Loading state - show 3 skeleton cards
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="max-w-[384px] p-4 border rounded-lg shadow-sm bg-white"
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="flex flex-col gap-3 flex-1">
                      <div className="flex flex-col gap-1">
                        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-4 h-4 bg-gray-200 rounded animate-pulse"
                            ></div>
                          ))}
                        </div>
                        <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                        <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
                      </div>
                      <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : reviews.length > 0 ? (
              // Render actual review data
              reviews.map((review) => (
                <TestimonialCardWithRestaurant
                  key={review.id}
                  reviewData={{
                    id: review.id,
                    reviewInfo: review.review_info,
                    rating: review.rating,
                    restaurant_id: review.restaurant_id,
                    userId: review.user_id,
                    userName: review.user?.name || "ผู้ใช้",
                    userProfilePicture: review.user?.profile_picture || "",
                    timestamp: review.timestamp,
                  }}
                  getRestaurantName={getRestaurantName}
                />
              ))
            ) : (
              // No reviews found
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ยังไม่มีรีวิวในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blog Post */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 py-10">
          <div className="flex justify-between items-center">
            <h3>บทความล่าสุด</h3>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={goToBlog}
            >
              <p className="font-bold text-gradient">ดูทั้งหมด</p>
              <ArrowRight className="text-[#EB5B0A]" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              className={`py-1 px-4 rounded-sm cursor-pointer transition-all duration-200 ${
                blogFilter === "all"
                  ? "bg-gradient text-white shadow-md"
                  : "bg-white border border-[#EAECF0] text-[#344054] hover:bg-[#FF8A00]/10 hover:border-[#FF8A00] hover:text-[#FF8A00] hover:shadow-sm"
              }`}
              onClick={() => handleBlogFilter("all")}
            >
              ทั้งหมด
            </Button>
            <Button
              className={`py-1 px-4 rounded-sm cursor-pointer transition-all duration-200 ${
                blogFilter === "restaurant"
                  ? "bg-gradient text-white shadow-md"
                  : "bg-white border border-[#EAECF0] text-[#344054] hover:bg-[#FF8A00]/10 hover:border-[#FF8A00] hover:text-[#FF8A00] hover:shadow-sm"
              }`}
              onClick={() => handleBlogFilter("restaurant")}
            >
              บทความจากร้าน
            </Button>
            <Button
              className={`py-1 px-4 rounded-sm cursor-pointer transition-all duration-200 ${
                blogFilter === "customer"
                  ? "bg-gradient text-white shadow-md"
                  : "bg-white border border-[#EAECF0] text-[#344054] hover:bg-[#FF8A00]/10 hover:border-[#FF8A00] hover:text-[#FF8A00] hover:shadow-sm"
              }`}
              onClick={() => handleBlogFilter("customer")}
            >
              บทความจากลูกค้า
            </Button>
            {mainCategories.slice(0, 3).map((category) => (
              <Button
                key={category.id}
                className={`py-1 px-4 rounded-sm cursor-pointer transition-all duration-200 ${
                  blogFilter === category.id
                    ? "bg-gradient text-white shadow-md"
                    : "bg-white border border-[#EAECF0] text-[#344054] hover:bg-[#FF8A00]/10 hover:border-[#FF8A00] hover:text-[#FF8A00] hover:shadow-sm"
                }`}
                onClick={() => handleBlogFilter(category.id, category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="flex gap-4">
            {isLoadingBlogs ? (
              // Loading state - show 5 skeleton cards
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col gap-1 max-w-[224px]">
                  <div className="flex flex-col gap-3">
                    <div className="rounded-lg w-[224px] h-[140px] bg-gray-200 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : filteredBlogs.length > 0 ? (
              // Render filtered blog data
              filteredBlogs.map((blog) => (
                <BlogpostCard key={blog.id} blog={blog} />
              ))
            ) : blogs.length > 0 ? (
              // No blogs match the current filter
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ไม่พบบทความที่ตรงกับตัวกรองที่เลือก</p>
              </div>
            ) : (
              // No blogs found at all
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ไม่พบบทความในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CustomerHomepage;
