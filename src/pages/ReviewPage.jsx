import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import TestimonialCard from "../components/ui/TestimonialCard";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function ReviewPage() {
  const [selectedEventType, setSelectedEventType] = useState("คะแนน");

  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center w-[1920px]">
        <div className="flex flex-col items-center max-w-[1184px] pt-10 gap-6">
          <h1>คะแนนร้านค้า</h1>

          <div className="flex w-full gap-3">
            <Button className="bg-gradient text-white">ทั้งหมด</Button>
            <div className="relative">
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value)}
                className="h-fit appearance-none bg-white border border-[#EAECF0] rounded-md px-4 py-2 pr-10 text-sm font-medium text-[#344054] hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[125px]"
              >
                <option value="คะแนน">คะแนน</option>
                <option value="⭐⭐⭐⭐⭐">⭐⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐⭐">⭐⭐⭐⭐</option>
                <option value="⭐⭐⭐">⭐⭐⭐</option>
                <option value="⭐⭐">⭐⭐</option>
                <option value="⭐">⭐</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 ">
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
            <TestimonialCard />
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default ReviewPage;
