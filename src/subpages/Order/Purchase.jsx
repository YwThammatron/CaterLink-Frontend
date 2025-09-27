import axios from "axios";
import { useState } from "react";

import OrderCard from "../../components/ui/OrderCard";

const orders = [
    {
        name:"มิ่งบุญ ร้อยเรียง",
        orderid:"080-000-0000",
        food:"ซุ้มอาหารอีสาน",
        number:100,
        detail:"ลาบ น้ำตก และส้มตำ",
        date:"4/09/2025",
        start:"17.00",
        end:"21.00",
        address:"เลขที่ 1 ECC Building ลาดกระบัง กรุงเทพมหานคร 10520",
        price:95
    },

    {
        name:"เต่าบิน สุดอร่อย",
        orderid:"080-000-0500",
        food:"ซุ้มอาหารญี่ปุ่น",
        number:50,
        detail:"ข้าวหมูทงคัตสี กิมจิ และซุปมิโสะ",
        date:"6/09/2025",
        start:"15.00",
        end:"19.00",
        address:"เลขที่ 1 ECC Building ลาดกระบัง กรุงเทพมหานคร 10520",
        price:200
    },

    {
        name:"ยิ่งยอด บุญช่วย",
        orderid:"080-000-1000",
        food:"ซุ้มอาหารไทย",
        number:350,
        detail:"ข้าวขาหมู และแกงจืดหมูสับ",
        date:"7/09/2025",
        start:"8.00",
        end:"12.00",
        address:"เลขที่ 1 ECC Building ลาดกระบัง กรุงเทพมหานคร 10520",
        price:140
    }
]

function Purchase() {

    const handleCancel = (orderid) => {
        window.alert(`Order ${orderid} canceled`)
    }

    const handleAccept = (orderid) => {
        window.alert(`Order ${orderid} go to booking`)
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
                orderid={content.orderid}
                food={content.food}
                number={content.number}
                detail={content.detail}
                date={content.date}
                start={content.start}
                end={content.end}
                address={content.address}
                price={content.price}
                cancelClick={() => handleCancel(content.orderid)}
                acceptClick={() => handleAccept(content.orderid)}
                isHistory={false}
                />
            </div>
        ))}
      </div>
    </>
  );
}

export default Purchase;
