import { Badge } from "./badge";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

function CartCard({ status = "รอร้านตอบรับ" }) {
  const navigate = useNavigate();

  const goToPayment = () => {
    navigate("/payment");
  };

  const goToComment = () => {
    navigate("/comment");
  };

  // Define badge
  const badgeConfig = {
    ที่ต้องชำระ: {
      badge: {
        className:
          "rounded-full border border-[#FEDF89] bg-[#FFFAEB] py-1 px-3 text-[#B54708] text-sm font-medium",
        text: "ที่ต้องชำระ",
      },
      button: {
        className:
          "bg-gradient py-2 px-3 rounded-md text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200",
        onClick: goToPayment,
        text: "ชำระมัดจำ",
      },
    },
    จัดเตรียมสำเร็จ: {
      badge: {
        className:
          "rounded-full border border-[#D9D6FE] bg-[#F4F3FF] py-1 px-3 text-[#5925DC] text-sm font-medium",
        text: "จัดเตรียมสำเร็จ",
      },
      button: {
        className:
          "bg-gradient py-2 px-3 rounded-md text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200",
        onClick: goToPayment,
        text: "ชำระมัดจำ",
      },
    },
    รอร้านตอบรับ: {
      badge: {
        className:
          "rounded-full border border-[#D5D9EB] bg-[#F8F9FC] py-1 px-3 text-[#363F72] text-sm font-medium",
        text: "รอร้านตอบรับ",
      },
      button: {
        className:
          "text-[#475467] bg-white border-none hover:text-gray-200 transition-colors duration-200",
        onClick: null,
        text: "ยกเลิกคำขอ",
      },
    },
    กำลังจัดเตรียม: {
      badge: {
        className:
          "rounded-full border border-[#B9E6FE] bg-[#F0F9FF] py-1 px-3 text-[#026AA2] text-sm font-medium",
        text: "กำลังจัดเตรียม",
      },
      button: {
        className:
          "py-2 px-3 rounded-md text-transparent cursor-default select-none bg-white hover:bg-white transition-colors duration-200",
        onClick: null,
        text: "กำลังดำเนินการ",
      },
    },
    สำเร็จแล้ว: {
      badge: {
        className:
          "rounded-full border border-[#ABEFC6] bg-[#ECFDF3] py-1 px-3 text-[#067647] text-sm font-medium",
        text: "สำเร็จแล้ว",
      },
      button: {
        className:
          "bg-white py-2 px-3 rounded-md text-gradient border border-[#FF8A00] font-semibold cursor-pointer hover:bg-orange-50 transition-colors duration-200",
        onClick: goToComment,
        text: "ให้คะแนน",
      },
    },
    ยกเลิก: {
      badge: {
        className:
          "rounded-full border border-[#FECDCA] bg-[#FEF3F2] py-1 px-3 text-[#B42318] text-sm font-medium",
        text: "ยกเลิก",
      },
      button: {
        className:
          "py-2 px-3 rounded-md text-transparent cursor-default select-none bg-white hover:bg-white transition-colors duration-200",
        onClick: null,
        text: "คำสั่งปิด",
      },
    },
  };

  const currentConfig = badgeConfig[status] || badgeConfig["รอร้านตอบรับ"];

  return (
    <div className="flex flex-col gap-3 max-w-[1184px] w-full">
      <div className="flex flex-col border border-[#D0D5DD] rounded-lg gap-4 py-4">
        <div className="flex gap-3 pb-4 px-4 items-center border-b border-[#D0D5DD]">
          <p className="text-sm font-medium">โหระพา เคทเทอริ่ง</p>
          <Badge className={currentConfig.badge.className}>
            {currentConfig.badge.text}
          </Badge>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col gap-4 max-w-[516px] w-full pl-4">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[#101828]">
                บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand
              </p>
              <p className="text-[#475467]">จำนวนแขก 100 ท่าน</p>
              <p className="text-[#475467]">
                รายการอาหาร 6 อย่าง ฟรีน้ำดื่ม, ข้าวหอมมะลิ, ของหวาน/ผลไม้รวม,
                จำนวนอาหารรวมทั้งหมด 8-10 รายการ
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#475467]">
                วันที่ 6/09/2025 เวลา 05:00 PM - 10:00 PM
              </p>
              <p className="text-[#475467]">
                อาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC) เลขที่ 1 ซอยฉลองกรุง 1
                แขวงลาดกระบัง เขตลาดกระบัง
              </p>
            </div>
          </div>

          <div className="flex justify-evenly max-w-[636px] w-full items-center">
            <p>90</p>
            <p className="">26,100</p>
            <p className="text-gradient">13,050</p>
            <Button
              className={currentConfig.button.className}
              onClick={currentConfig.button.onClick}
            >
              {currentConfig.button.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
