import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TestimonialCard() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/review");
  };

  return (
    <div
      className="max-w-[384px] p-4 border rounded-lg shadow-sm bg-white"
      // onClick={handleClick}
    >
      <div className="flex gap-3">
        <Avatar className="max-w-[32px] ">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-[#475467]">Minnie</p>
            <div className="flex gap-1">
              <Star size={16} className="text-yellow-400 fill-current"></Star>
              <Star size={16} className="text-yellow-400 fill-current"></Star>
              <Star size={16} className="text-yellow-400 fill-current"></Star>
              <Star size={16} className="text-yellow-400 fill-current"></Star>
              <Star size={16} className="text-yellow-400 fill-current"></Star>
            </div>
            <p className="text-xs text-[#667085]">15/02/2077</p>
            <p className="text-xs text-[#667085]">
              ข้าวมันไก่ลุงหนวด24ชม. - ถนนอ่อนนุช
            </p>
          </div>
          <p className="text-sm text-[#101828]">
            ชอบที่รวมข้อมูลไว้ทุกอย่างเกี่ยวกับงานแต่ง เข้าไปที เดียวก็ได้
            ครบหมดเลย เป็นประโยชน์มากสำหรับคนที่ไม่ ได้ใช้ออแกไนเซอร์ด้วยค่ะ
          </p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
