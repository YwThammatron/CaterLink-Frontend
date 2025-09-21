import { Button } from "./button";
import { Star } from "lucide-react";
import { Badge } from "./badge";
import { HandPlatter } from "lucide-react";

function CompareCard() {
  return (
    <div className="flex flex-col max-w-[284px] border border-[#D0D5DD] pb-4 gap-8 rounded-tl-lg rounded-tr-lg rounded-br-2xl rounded-bl-2xl">
      <div className="flex flex-col gap-4">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=284&h=226&fit=crop"
          alt=""
          className="border rounded-lg max-w-[284px] max-h-[226px]"
        />

        <div className="flex flex-col gap-1 px-4">
          <p className="text-[#344054]">นิวเยียร์เคทเทอริ่ง</p>
          <div className="flex gap-5">
            <div className="flex gap-1 justify-center items-center">
              <Star size={20} className="text-yellow-400 fill-current"></Star>
              <p className="text-[#667085]">4.2</p>
            </div>
            <p className="text-[#98A2B3]">(18)</p>
          </div>
          <div className="flex gap-[6px]">
            <Badge
              variant="secondary"
              className="border py-[3px] px-2 border-[#EAECF0] bg-white text-xs font-medium flex gap-2"
            >
              <HandPlatter size={12} />
              จัดเลี้ยง
            </Badge>
            <Badge
              variant="secondary"
              className="border py-[3px] px-2 border-[#EAECF0] bg-white text-xs font-medium flex gap-2"
            >
              <HandPlatter size={12} />
              ซุ้มอาหาร
            </Badge>
          </div>
        </div>

        <div className="px-4">
          <p>เริ่มต้น 290 บาท/ท่าน</p>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <p>โปรโมชันที่มีตอนนี้</p>

          <div className="flex gap-2 max-w-[252px]">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=284&h=226&fit=crop"
              alt=""
              className="max-w-[88px] h-[88px] rounded-lg object-cover"
            />

            <div className="flex flex-col gap-1 max-w-[156px]">
              <p className="text-[#101828] truncate overflow-hidden whitespace-nowrap">
                บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand
              </p>
              <p className="line-through text-xs">เริ่ม 295 บาท/ท่าน </p>
              <p className="text-gradient font-bold">เริ่ม 290 บาท/ท่าน</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 px-4 w-full">
        <Button className="bg-white w-1/2 text-black border border-[#D0D5DD] py-[10px] px-4 rounded-lg font-semibold">
          นำออก
        </Button>
        <Button className="bg-gradient w-1/2 text-white py-[10px] px-4 rounded-lg font-semibold">
          ดูร้าน
        </Button>
      </div>
    </div>
  );
}

export default CompareCard;
