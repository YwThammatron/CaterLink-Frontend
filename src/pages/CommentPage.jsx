import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function CommentPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
  const location = useLocation();
  const navigate = useNavigate();

  // Get order data from navigation state
  const { orderData, restaurantName, packageName, packageDescription } =
    location.state || {};

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect back if no order data
  useEffect(() => {
    if (!orderData) {
      toast.error("ไม่พบข้อมูลคำสั่งซื้อ");
      navigate("/cart");
    }
  }, [orderData, navigate]);

  // Authentication helpers
  const getAuthToken = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("accessToken="));
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      if (token && token !== "undefined" && token !== "null") {
        return token;
      }
    }
    const localToken = localStorage.getItem("accessToken");
    if (localToken && localToken !== "undefined" && localToken !== "null") {
      return localToken;
    }
    return null;
  };

  const isUserAuthenticated = () => {
    return !!getAuthToken();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time for display
  const formatTime = (timeString) => {
    if (!timeString) return "";
    const time = timeString.replace("Z", "");
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  // Submit review function
  const submitReview = async () => {
    if (!isUserAuthenticated()) {
      toast.error("กรุณาเข้าสู่ระบบเพื่อดำเนินการ");
      return;
    }

    if (rating === 0) {
      toast.error("กรุณาให้คะแนนก่อนส่งรีวิว");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("กรุณาเขียนรีวิวก่อนส่ง");
      return;
    }

    if (!orderData?.restaurant_id) {
      toast.error("ไม่พบข้อมูลร้านค้า");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getAuthToken();
      await axios.post(
        `${baseUrl}/api/reviews`,
        {
          restaurant_id: orderData.restaurant_id,
          review_info: reviewText.trim(),
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("ส่งรีวิวเรียบร้อยแล้ว ขอบคุณสำหรับความคิดเห็น");
      navigate("/cart");
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.response?.status === 401) {
        toast.error("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
      } else if (error.response?.status === 400) {
        toast.error("ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบใหม่");
      } else {
        toast.error("เกิดข้อผิดพลาดในการส่งรีวิว");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/cart");
  };

  // Show loading if no order data yet
  if (!orderData) {
    return (
      <>
        <NavbarCustom />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500">กำลังโหลด...</div>
        </div>
        <MiniFooter />
      </>
    );
  }

  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col py-10">
        <h1 className="text-center">ให้คะแนนร้านค้า</h1>

        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-6 py-10">
            <div className="w-[960px] border border-[#D0D5DD] rounded-lg flex flex-col gap-4">
              <div className="flex gap-3 items-center p-4 border-b border-[#D0D5DD]">
                <p className="text-sm font-medium">
                  {restaurantName || "ไม่ทราบชื่อร้าน"}
                </p>
                <Badge className="bg-[#ECFDF3] border border-[#ABEFC6] py-1 px-3 rounded-full text-[#067647] text-sm font-medium">
                  สำเร็จแล้ว
                </Badge>
              </div>

              <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-[#344054]">
                      {packageName || "ไม่ทราบชื่อแพคเกจ"}
                    </p>
                    <p className="text-[#667085]">
                      จำนวนแขก {orderData?.participants || 0} ท่าน
                    </p>
                    <p className="text-[#667085]">
                      {packageDescription || "ไม่มีรายละเอียดแพคเกจ"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#667085]">
                      วันที่ {formatDate(orderData?.event_date)}
                      {orderData?.start_time && orderData?.end_time && (
                        <span>
                          {" "}
                          เวลา {formatTime(orderData.start_time)} -{" "}
                          {formatTime(orderData.end_time)}
                        </span>
                      )}
                    </p>
                    <p className="text-[#667085]">
                      {orderData?.location || "ไม่ระบุสถานที่"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <p className="font-bold text-[#344054]">คุณภาพการบริการ</p>

                    <div className="flex gap-1" onMouseLeave={handleMouseLeave}>
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-5 w-5 cursor-pointer transition-colors duration-200 ${
                            starIndex <= (hoverRating || rating)
                              ? "text-[#FBBF24] fill-[#FBBF24]"
                              : "text-[#D1D5DB] hover:text-[#FBBF24]"
                          }`}
                          onClick={() => handleStarClick(starIndex)}
                          onMouseEnter={() => handleStarHover(starIndex)}
                        />
                      ))}
                    </div>
                  </div>

                  <Textarea
                    placeholder="เขียนรีวิว"
                    className="w-full h-24 border border-[#D0D5DD] rounded-md resize-none"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 max-w-[960px] justify-end">
              <Button
                className="cursor-pointer font-semibold bg-white border border-[#D0D5DD] text-[#344054] px-4 min-w-[120px] hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition-colors duration-200"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                ยกเลิก
              </Button>
              <Button
                className="cursor-pointer font-semibold bg-gradient text-white px-4 min-w-[120px] hover:opacity-90 transition-opacity duration-200"
                onClick={submitReview}
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? "กำลังส่ง..." : "ยืนยัน"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default CommentPage;
