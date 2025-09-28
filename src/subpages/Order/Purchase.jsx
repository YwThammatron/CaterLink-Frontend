import axios from "axios";
import { useState } from "react";

import OrderCard from "../../components/ui/OrderCard";

const orders = [
    {
        name:"มิ่งบุญ ร้อยเรียง",
        status:"รอร้านตอบรับ",
        food:"บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand",
        number:100,
        detail:"รายการอาหาร 6 อย่าง ฟรีน้ำดื่ม, ข้าวหอมมะลิ, ของหวาน/ผลไม้รวม, จำนวนอาหารรวมทั้งหมด 8-10 รายการ",
        price:26100,
        deposit:13500,
        date:"6/09/2025",
        start:"05:00",
        end:"10:00",
        address:"อาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC) เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง",
    },

    {
        name:"มิ่งบุญ ร้อยเรียง",
        status:"กำลังจัดเตรียม",
        food:"บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand",
        number:100,
        detail:"รายการอาหาร 6 อย่าง ฟรีน้ำดื่ม, ข้าวหอมมะลิ, ของหวาน/ผลไม้รวม, จำนวนอาหารรวมทั้งหมด 8-10 รายการ",
        price:26100,
        deposit:13500,
        date:"6/09/2025",
        start:"05:00",
        end:"10:00",
        address:"อาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC) เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง",
    },

    {
        name:"มิ่งบุญ ร้อยเรียง",
        status:"จัดเตรียมสำเร็จ",
        food:"บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand",
        number:100,
        detail:"รายการอาหาร 6 อย่าง ฟรีน้ำดื่ม, ข้าวหอมมะลิ, ของหวาน/ผลไม้รวม, จำนวนอาหารรวมทั้งหมด 8-10 รายการ",
        price:26100,
        deposit:13500,
        date:"6/09/2025",
        start:"05.00",
        end:"10.00",
        address:"อาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC) เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง",
    },
]

function Purchase() {

    const handleCancel = (food) => {
        window.alert(`Order ${food} canceled`)
    }

    const handleAccept = (food) => {
        window.alert(`Order ${food} go to booking`)
    }

  return (
    <>
      {/* หน้ารายการสั่งซื้อ */}
      <div className="flex flex-col gap-[39px]">
        {orders.map((content,index) => (
            <div key={index}>
                <OrderCard
                key={index}
                name={content.name}
                status={content.status}
                food={content.food}
                number={content.number}
                detail={content.detail}
                price={content.price}
                deposit={content.deposit}
                date={content.date}
                start={content.start}
                end={content.end}
                address={content.address}
                cancelClick={() => handleCancel(content.food)}
                acceptClick={() => handleAccept(content.food)}
                isHistory={false}
                />
            </div>
        ))}
      </div>
    </>
  );
}

export default Purchase;
