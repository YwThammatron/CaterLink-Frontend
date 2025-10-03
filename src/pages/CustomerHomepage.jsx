import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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

function CustomerHomepage() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoadingRestaurants, setIsLoadingRestaurants] = useState(false);

  // Get base URL from environment
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // Load blogs and restaurants when component mounts
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
        console.log("Blogs loaded:", blogsResponse.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setIsLoadingBlogs(false);
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
        console.log("Restaurants loaded:", restaurantsResponse.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setIsLoadingRestaurants(false);
      }
    };

    loadData();
  }, [baseUrl]);

  const goToRestaurant = () => {
    navigate("/customerrestaurant");
  };

  const goToCompare = () => {
    navigate("/compare");
  };

  const goToBlog = () => {
    navigate("/allblog");
  };

  const goToPackage = () => {
    navigate("/customerreservation");
  };

  const goToPlanning = () => {
    navigate("/planning");
  };

  return (
    <>
      <NavbarCustom />
      <CarouselCustom />
      <FilterCustom />

      {/* หมวดหมู่ร้านจัดเลี้ยง */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col px-32 py-10 gap-4">
          <h3>หมวดหมู่ร้านจัดเลี้ยง</h3>
          <div className="flex gap-4">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=384&h=140&fit=crop"
              alt="Thai Restaurant"
              className="rounded-md"
              onClick={goToRestaurant}
            />
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=384&h=140&fit=crop"
              alt="Chinese Restaurant"
              className="rounded-md"
              onClick={goToRestaurant}
            />
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=384&h=140&fit=crop"
              alt="Italian Restaurant"
              className="rounded-md"
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
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=336&h=288&fit=crop"
              alt="Italian Restaurant"
              className="rounded-md"
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
            <div className="flex gap-2 items-center">
              <p className="font-bold text-gradient">ดูทั้งหมด</p>
              <ArrowRight className="text-[#EB5B0A]" />
            </div>
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
                    rating: restaurant.avgRating || 0,
                    reviewCount: restaurant.totalReview || 0,
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
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=336&h=288&fit=crop"
              alt="Italian Restaurant"
              className="rounded-md"
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
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
            <RestaurantCard />
          </div>
        </div>
      </div>

      {/* Recommended Package from CaterLink */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 px-32 py-10">
          <div className="flex justify-between items-center">
            <h3>แพคเกจแนะนำจาก CaterLink </h3>
            {/* <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={goToPackage}
            >
              <p className="font-bold text-gradient">ดูทั้งหมด</p>
              <ArrowRight className="text-[#EB5B0A]" />
            </div> */}
          </div>

          <div className="flex gap-4">
            <PackageCard />
            <PackageCard />
            <PackageCard />
            <PackageCard />
          </div>
        </div>
      </div>

      {/* Review from Customers */}
      <div className="flex flex-col gap-3 px-32 py-10 bg-[#F9FAFB]">
        <div className="flex flex-col gap-8 justify-center items-center">
          <h1>รีวิวจากผู้ใช้จริง</h1>
          <div className="flex gap-4">
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
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
            <Button className="bg-gradient py-1 px-4 rounded-sm text-white ">
              ทั้งหมด
            </Button>
            <Button
              variant="outline"
              className="py-1 px-4 rounded-sm border-[#EAECF0] text-[#344054]"
            >
              บทความจากร้าน
            </Button>
            <Button
              variant="outline"
              className="py-1 px-4 rounded-sm border-[#EAECF0] text-[#344054]"
            >
              บทความจากลูกค้า
            </Button>
            <Button
              variant="outline"
              className="py-1 px-4 rounded-sm border-[#EAECF0] text-[#344054]"
            >
              ซุ้มอาหาร
            </Button>
            <Button
              variant="outline"
              className="py-1 px-4 rounded-sm border-[#EAECF0] text-[#344054]"
            >
              จัดเลี้ยง
            </Button>
            <Button
              variant="outline"
              className="py-1 px-4 rounded-sm border-[#EAECF0] text-[#344054]"
            >
              Snack Box
            </Button>
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
            ) : blogs.length > 0 ? (
              // Render actual blog data
              blogs.map((blog) => <BlogpostCard key={blog.id} blog={blog} />)
            ) : (
              // No blogs found
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
