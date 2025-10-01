import { useState } from "react";
import { ChevronDown, Heart, Star, HandPlatter } from "lucide-react";
import { Input } from "./input";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Badge } from "./badge";
import FoodTag from "./FoodTag";

function PlanningCard({ id, onRemove }) {
  const [selectedEventType, setSelectedEventType] = useState("รูปแบบงาน");
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const [guestCount, setGuestCount] = useState(1);

  const [isLiked, setIsLiked] = useState(false);

  const toggleHeart = (e) => {
    e.stopPropagation(); // Prevent card click when heart is clicked
    setIsLiked(!isLiked);
  };

  const handleRemove = () => {
    if (onRemove && id) {
      onRemove(id);
    }
  };

  const handleGuestCountChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setGuestCount(Math.max(1, value)); // Ensure minimum value is 1
  };

  return (
    <div className="w-[584px] pb-8 rounded-xl border border-[#D3CFCF]">
      <div className="flex justify-center items-center p-6">
        <div className="flex justify-between items-center w-[536px]">
          <p className="text-lg font-semibold">รายการจัดเลี้ยง {id}</p>
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#98A2B3] cursor-pointer hover:text-red-500 transition-colors duration-200"
            onClick={handleRemove}
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col px-6 gap-5">
        <div className="flex gap-4 max-w-[536px]">
          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">ประเภทงาน*</p>

            <div className="relative">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option disabled>เลือกประเภทงาน</option>
                <option value="งานแต่งงาน">งานแต่งงาน</option>
                <option value="งานเลี้ยงรับรอง">งานเลี้ยงรับรอง</option>
                <option value="งานเลี้ยงสังสรรค์">งานเลี้ยงสังสรรค์</option>
                <option value="งานเลี้ยงปีใหม่">งานเลี้ยงปีใหม่</option>
                <option value="งานสัมมนา">งานสัมมนา</option>
                <option value="งานประชุม">งานประชุม</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">ประเภทอาหาร*</p>

            <div className="relative">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option disabled>เลือกประเภทอาหาร</option>
                <option value="งานแต่งงาน">งานแต่งงาน</option>
                <option value="งานเลี้ยงรับรอง">งานเลี้ยงรับรอง</option>
                <option value="งานเลี้ยงสังสรรค์">งานเลี้ยงสังสรรค์</option>
                <option value="งานเลี้ยงปีใหม่">งานเลี้ยงปีใหม่</option>
                <option value="งานสัมมนา">งานสัมมนา</option>
                <option value="งานประชุม">งานประชุม</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 max-w-[536px]">
          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">ประเภทการจัด*</p>

            <div className="relative">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option disabled>รูปแบบงาน</option>
                <option value="งานแต่งงาน">งานแต่งงาน</option>
                <option value="งานเลี้ยงรับรอง">งานเลี้ยงรับรอง</option>
                <option value="งานเลี้ยงสังสรรค์">งานเลี้ยงสังสรรค์</option>
                <option value="งานเลี้ยงปีใหม่">งานเลี้ยงปีใหม่</option>
                <option value="งานสัมมนา">งานสัมมนา</option>
                <option value="งานประชุม">งานประชุม</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">งบประมาณ*</p>

            <div className="relative">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="w-full appearance-none bg-white border border-[#D0D5DD] rounded-md px-[14px] py-[10px] pr-10 text-[#667085] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
              >
                <option disabled>รูปแบบงาน</option>
                <option value="งานแต่งงาน">งานแต่งงาน</option>
                <option value="งานเลี้ยงรับรอง">งานเลี้ยงรับรอง</option>
                <option value="งานเลี้ยงสังสรรค์">งานเลี้ยงสังสรรค์</option>
                <option value="งานเลี้ยงปีใหม่">งานเลี้ยงปีใหม่</option>
                <option value="งานสัมมนา">งานสัมมนา</option>
                <option value="งานประชุม">งานประชุม</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex gap-4 max-w-[536px]">
          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">จำนวนคน*</p>

            <Input
              type="number"
              placeholder="เพิ่มตัวเลข"
              className="w-full"
              value={guestCount}
              onChange={handleGuestCountChange}
              min="1"
            />
          </div>

          <div className="flex flex-col gap-2 w-[260px]">
            <p className="text-sm font-medium">วันที่ต้องการนัด*</p>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between font-normal border-2 border-gray-200 hover:border-orange-500 focus:ring-2 focus:ring-orange-500"
                >
                  {date
                    ? date.toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "เลือกวันที่"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-full overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex flex-col gap-2 max-w-[536px]">
          <p className="text-sm font-medium text-[#344054]">ระยะเวลานัด</p>

          <div className="flex gap-4 max-w-[536px]">
            <div className="flex flex-col gap-3 w-[260px]">
              <Label
                htmlFor="time-picker"
                className="px-1 text-sm font-medium text-[#7B8493]"
              >
                เวลาเริ่ม
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            <div className="flex flex-col gap-3 w-[260px]">
              <Label
                htmlFor="time-picker"
                className="px-1 text-sm font-medium text-[#7B8493]"
              >
                เวลาจบ
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                defaultValue="10:30:00"
                className="w-full bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 pr-6">
          <div className="relative">
            <img
              src="https://github.com/shadcn.png"
              alt=""
              className="w-[147px] h-[144px] rounded-lg"
            />
            <button
              onClick={toggleHeart}
              className="absolute top-2 right-2 p-2 bg-white backdrop-blur-sm rounded-full hover:bg-white/90 transition-all duration-200 hover:scale-110"
            >
              <Heart
                size={16}
                className={`transition-colors duration-200 ${
                  isLiked
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600 hover:text-red-400"
                }`}
              />
            </button>
          </div>

          <div className="flex flex-col gap-2 w-[353px]">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[#101828] truncate overflow-hidden whitespace-nowrap">
                ข้าวมันไก่ลุงหนวด24ชม. - ถนนอ่อน
              </p>
              <div className="flex gap-5">
                <div className="flex gap-1 justify-center items-center">
                  <Star
                    size={20}
                    className="text-yellow-400 fill-current"
                  ></Star>
                  <p className="text-[#667085]">4.2</p>
                </div>
                <p className="text-[#98A2B3]">(18)</p>
              </div>

              <div className="flex gap-[6px]">
                <FoodTag
                  showFoodStall={true}
                  showSnackBox={true}
                  showCatering={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanningCard;
