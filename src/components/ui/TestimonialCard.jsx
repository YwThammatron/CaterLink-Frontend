import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TestimonialCard({
  reviewData = {
    id: "default",
    reviewInfo:
      "ชอบที่รวมข้อมูลไว้ทุกอย่างเกี่ยวกับงานแต่ง เข้าไปที เดียวก็ได้ ครบหมดเลย เป็นประโยชน์มากสำหรับคนที่ไม่ ได้ใช้ออแกไนเซอร์ด้วยค่ะ",
    rating: 5,
    restaurantName: "ข้าวมันไก่ลุงหนวด24ชม. - ถนนอ่อนนุช",
    userId: "default-user",
  },
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/review");
  };

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex gap-1">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Star
            key={`full-${index}`}
            size={16}
            className="text-yellow-400 fill-current"
          />
        ))}

        {/* Half star */}
        {hasHalfStar && (
          <div className="relative">
            <Star size={16} className="text-gray-300" />
            <div
              className="absolute top-0 left-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star size={16} className="text-yellow-400 fill-current" />
            </div>
          </div>
        )}

        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Star key={`empty-${index}`} size={16} className="text-gray-300" />
        ))}
      </div>
    );
  };

  // Mock username from userId (last 6 characters for privacy)
  const getUserDisplayName = (userId) => {
    if (!userId) return "ผู้ใช้";
    return `ผู้ใช้ ${userId.slice(-6)}`;
  };

  // Mock user image from userId (first character)
  const getUserInitial = (userId) => {
    return userId ? userId.charAt(0).toUpperCase() : "U";
  };

  return (
    <div
      className="w-[384px] p-4 border rounded-lg shadow-sm bg-white"
      // onClick={handleClick}
    >
      <div className="flex gap-3">
        <Avatar className="w-[32px] h-[32px] flex-shrink-0">
          <AvatarImage src="" /> {/* No image provided in API */}
          <AvatarFallback>{getUserInitial(reviewData.userId)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#475467]">
              {getUserDisplayName(reviewData.userId)}
            </p>
            {renderStars(reviewData.rating)}
            <p className="text-xs text-[#667085]">
              {new Date().toLocaleDateString("th-TH")} {/*Mock date */}
            </p>
            <p className="text-xs text-[#667085]">
              {reviewData.restaurantName}
            </p>
          </div>
          <p className="text-sm text-[#101828]">{reviewData.reviewInfo}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
