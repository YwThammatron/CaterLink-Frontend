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
    }
]

function History() {

    const handleCancel = (orderid) => {
        window.alert(`Order ${orderid} canceled`)
    }

    const handleAccept = (orderid) => {
        window.alert(`Order ${orderid} go to booking`)
    }

  return (
    <>
      {/* หน้าประวัติ */}
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
                isHistory={true}
                />
            </div>
        ))}
      </div>
    </>
  );
}

export default History;
