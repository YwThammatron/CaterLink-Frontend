import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function CommentPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col py-10">
        <h1 className="text-center">ให้คะแนนร้านค้า</h1>

        <div className="flex flex-col items-center">
          <div className=" flex flex-col gap-6 py-10">
            <div className="w-[960px] border border-[#D0D5DD] rounded-lg flex flex-col gap-4">
              <div className="flex gap-3 items-center p-4 border-b-1 border-[#D0D5DD]">
                <p>โหระพา เคทเทอริ่ง</p>
                <Badge className="bg-[#ECFDF3] border border-[#ABEFC6] py-1 px-3 rounded-full text-[#067647] text-sm font-medium">
                  สำเร็จแล้ว
                </Badge>
              </div>

              <div className="flex flex-col gap-6 p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-[#344054]">
                      บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand
                    </p>
                    <p className="text-[#667085]">จำนวนแขก 100 ท่าน</p>
                    <p className="text-[#667085]">
                      รายการอาหาร 6 อย่าง ฟรีน้ำดื่ม, ข้าวหอมมะลิ,
                      ของหวาน/ผลไม้รวม,จำนวนอาหารรวมทั้งหมด 8-10 รายการ
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#667085]">
                      วันที่ 6/09/2025 เวลา 05:00 PM - 10:00 PM
                    </p>
                    <p className="text-[#667085]">
                      อาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC) เลขที่ 1
                      ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง
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
                  ></Textarea>
                </div>
              </div>
            </div>

            <div className="flex gap-4 max-w-[960px] justify-end">
              <Button className="cursor-pointer font-semibold bg-white border border-[#D0D5DD] font-semibold text-[#344054] px-4 min-w-[120px] hover:bg-gray-50 hover:border-gray-300 hover:text-gray-600 transition-colors duration-200">
                ยกเลิก
              </Button>
              <Button className="cursor-pointer font-semibold bg-gradient text-white px-4 min-w-[120px] hover:opacity-90 transition-opacity duration-200">
                ยืนยัน
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
