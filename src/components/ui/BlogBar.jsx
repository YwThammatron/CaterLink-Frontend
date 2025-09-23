import { Search } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

function BlogBar() {
  const [selectedEventType, setSelectedEventType] = useState("ผู้เขียน");
  const [selectedCateringType, setSelectedCateringType] =
    useState("การจัดเลี้ยง");

  return (
    <div className="flex gap-4 items-center max-w-[1184px]">
      <div className="flex rounded-md border relative">
        <input
          type="text"
          placeholder="ค้นหาร้านจัดเลี้ยง"
          className="h-auto min-w-[630px] px-4 py-[10px] rounded-l-md gap-[10px] font-semibold"
        />
        <button className="bg-gradient rounded-md p-[10px] gap-[10px]">
          <Search className="text-white" />
        </button>
      </div>

      <div className="relative">
        <select
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value)}
          className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-auto text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
        >
          <option disabled>ผู้เขียน</option>
          <option value="งานแต่งงาน">งานแต่งงาน</option>
          <option value="งานเลี้ยงรับรอง">งานเลี้ยงรับรอง</option>
          <option value="งานเลี้ยงสังสรรค์">งานเลี้ยงสังสรรค์</option>
          <option value="งานเลี้ยงปีใหม่">งานเลี้ยงปีใหม่</option>
          <option value="งานสัมมนา">งานสัมมนา</option>
          <option value="งานประชุม">งานประชุม</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
      </div>

      <div className="relative">
        <select
          value={selectedCateringType}
          onChange={(e) => setSelectedCateringType(e.target.value)}
          className="appearance-none bg-white border-2 border-gray-200 rounded-lg px-4 py-3 pr-auto text-[#7D7B7B] font-medium hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
        >
          <option disabled>การจัดเลี้ยง</option>
          <option value="จัดเลี้ยงนอกสถานที่">จัดเลี้ยงนอกสถานที่</option>
          <option value="จัดเลี้ยงในร้าน">จัดเลี้ยงในร้าน</option>
          <option value="บุฟเฟ่ต์">บุฟเฟ่ต์</option>
          <option value="เซ็ตเมนู">เซ็ตเมนู</option>
          <option value="อาหารกล่อง">อาหารกล่อง</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#7D7B7B] font-medium pointer-events-none" />
      </div>

      <Button className="bg-gradient text-white py-4 px-auto rounded-lg font-semibold h-fit">
        เพิ่มบทความของฉัน
      </Button>
    </div>
  );
}

export default BlogBar;
