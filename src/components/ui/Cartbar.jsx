import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronDown } from "lucide-react";

function Cartbar({ selectedStatus = "all", onStatusChange }) {
  // Status options with API values and display names
  const statusOptions = [
    { value: "all", label: "ทั้งหมด" },
    { value: "pending", label: "รอร้านตอบรับ" },
    { value: "waiting for payment", label: "ที่ต้องชำระ" },
    { value: "done preparing", label: "จัดเตรียมสำเร็จ" },
    { value: "preparing", label: "กำลังจัดเตรียม" },
    { value: "finished", label: "สำเร็จแล้ว" },
    { value: "cancel", label: "ยกเลิก" },
  ];

  // Get current status display name
  const getCurrentStatusLabel = () => {
    const currentOption = statusOptions.find(
      (option) => option.value === selectedStatus
    );
    return currentOption ? currentOption.label : "ทั้งหมด";
  };

  // Handle status selection
  const handleStatusSelect = (status) => {
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  return (
    <div className="flex max-w-[1184px] w-full rounded-lg border border-[#D0D5DD] justify-between py-3 px-4 mt-8 mb-3">
      <div className="flex gap-20 max-w-[516px] w-full">
        <DropdownMenu className="max-w-[170px] w-full rounded-md border border-[#EAECF0]">
          <DropdownMenuTrigger className="flex items-center justify-between gap-2 px-3 text-sm font-semibold text-[#475467] bg-white hover:bg-gray-50 transition-colors min-w-[170px]">
            <span>{getCurrentStatusLabel()}</span>
            <ChevronDown className="h-4 w-4 text-[#667085]" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className={`font-medium p-[10px] cursor-pointer ${
                  selectedStatus === option.value
                    ? "text-[#FF8A00] bg-orange-50"
                    : "text-[#101828] hover:bg-gray-50"
                }`}
                onClick={() => handleStatusSelect(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex justify-evenly w-[636px]">
        <p className="text-sm text-[#475467]">จำนวนท่าน/ที่</p>
        <p className="text-sm text-[#475467]">ยอดชำระทั้งหมด</p>
        <p className="text-sm text-[#475467]">ยอดชำระมัดจำ</p>
        <p className="text-sm text-[#475467]">แอคชั่น</p>
      </div>
    </div>
  );
}

export default Cartbar;
