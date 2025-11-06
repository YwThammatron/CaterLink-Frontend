import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import TestimonialCard from "../components/ui/TestimonialCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

function ReviewPage() {
  const [selectedEventType, setSelectedEventType] = useState("ทั้งหมด");
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const { restaurantId, restaurantName } = location.state || {};

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  // Fetch reviews from API
  useEffect(() => {
    const fetchReviews = async () => {
      if (!restaurantId) {
        setError("Restaurant ID not provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/reviews/restaurant/${restaurantId}`
        );
        setReviews(response.data || []);
        setFilteredReviews(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [restaurantId, baseUrl]);

  // Filter reviews based on selected rating
  useEffect(() => {
    if (selectedEventType === "ทั้งหมด") {
      setFilteredReviews(reviews);
    } else {
      const starCount = selectedEventType.length; // Count ⭐ characters
      const filtered = reviews.filter(
        (review) => Math.floor(review.rating) === starCount
      );
      setFilteredReviews(filtered);
    }
  }, [selectedEventType, reviews]);

  // Convert API review data to TestimonialCard format
  const convertReviewData = (review) => ({
    id: review.id,
    reviewInfo: review.review_info,
    rating: review.rating,
    restaurantName: restaurantName || "ร้านค้า",
    userId: review.user_id,
    userName: review.user?.name || "ผู้ใช้",
    userProfilePicture: review.user?.profile_picture || "",
    timestamp: review.timestamp,
  });

  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center w-[1920px]">
        <div className="flex flex-col items-center max-w-[1184px] pt-10 gap-6">
          <h1>คะแนนร้านค้า</h1>
          {restaurantName && (
            <h2 className="text-xl text-[#667085]">{restaurantName}</h2>
          )}

          <div className="flex w-full gap-3">
            <Button
              className={`${
                selectedEventType === "ทั้งหมด"
                  ? "bg-gradient text-white"
                  : "bg-white border border-[#EAECF0] text-[#344054]"
              }`}
              onClick={() => setSelectedEventType("ทั้งหมด")}
            >
              ทั้งหมด
            </Button>
            <div className="relative">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="h-fit appearance-none bg-white border border-[#EAECF0] rounded-md px-4 py-2 pr-10 text-sm font-medium text-[#344054] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[125px]"
              >
                <option value="ทั้งหมด">คะแนน</option>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐">⭐⭐⭐</option>
                <option value="⭐⭐">⭐⭐</option>
                <option value="⭐">⭐</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <p className="ml-4 text-[#667085]">กำลังโหลดรีวิว...</p>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-[#667085]">ยังไม่มีรีวิว</p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {filteredReviews.map((review) => (
                <TestimonialCard
                  key={review.id}
                  reviewData={convertReviewData(review)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default ReviewPage;
