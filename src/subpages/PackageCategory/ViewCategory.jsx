import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const packagectg = [
    {
        name:"Buffet",
        package:[
            {name: "บุฟเฟ่ต์อาหารไทยดั้งเดิม",price:60},
            {name: "บุฟเฟ่ต์อาหารไทยประยุกต์",price:40},
            {name: "บุฟเฟ่ต์อาหารยุโรป",price:70},
            {name: "บุฟเฟ่ต์อาหารจีน",price:100},
        ]
    },

    {
        name:"ซุ้มอาหาร",
        package:[
            {name: "ไข่ครก",price:30},
            {name: "ลูกชิ้นปิ้ง",price:25},
            {name: "ทอดมันปลากราย",price:70},
            {name: "ขนมเบื้องญวนแบบไทย ทานคู่อาจาด",price:120},
            {name: "ก๋วยเตี๋ยวหลอดทรงเครื่อง",price:100},
            {name: "ขนมผักกาดเสวย กุ้งสด",price:85},
            {name: "สาคูไส้หมู หรือข้าวเกรียบปากหม้อ",price:50},
        ]
    },

    {
        name:"Coffee Break",
        package:[
            {name: "ขนมปังแผ่น",price:30},
            {name: "แซนต์วิชไส้หมูหยองมายองเนส",price:45},
            {name: "แซนต์วิซไส้ทูน่าบด",price:45},
            {name: "แดนิชโรลไส้ลูกเกด",price:60},
        ]
    },

    {
        name:"ข้าวกล่อง",
        package:[
            {name: "ข้าวหมูกระเทียมไข่ดาว",price:50},
            {name: "ข้าวไข่เจียวหมูสับ",price:40},
        ]
    },

    {
        name:"ขนมเบรค",
        package:[
            {name: "ครัวซองต์ไส้ช็อคโกแลต",price:30},
            {name: "ซาลาเปาไส้ครีม",price:45},
        ]
    },

    {
        name:"ปิ่นโตอิ่มบุญ",
        package:[
            {name: "ไข่ลูกเขย + แกงเขียวหวาน",price:120},
            {name: "ข้าวสวย + แกงส้มชะอมไข่",price:100},
        ]
    }
]

function ViewCategory({ sendClick }) {
    return (
        <>
                    {/* Content */}
                    <div className="flex flex-col gap-[24px] w-auto h-[1024px] items-center mb-[32px]">
                        {/* Table */}
                        <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] bg-white">
                            {/* Content (Package Category) */}
                            <div className="grid w-[1040px] pt-[8px]">
                                <Accordion className="w-full" type="single" collapsible>
                                {packagectg.map((content,index) => {
                                    return (
                                        <AccordionItem key={index} value={content.name}>
                                            <AccordionTrigger className="h-[56px] pl-[14px] flex items-center text-[16px] text-[#101828] font-[500] hover:cursor-pointer">{content.name}</AccordionTrigger>
                                            <AccordionContent className="pl-[32px] pb-[16px] flex flex-col gap-[12px]">
                                                {content.package.map((data,i) => {
                                                    return (
                                                        <div key={i} className="relative flex text-[#475467]">
                                                            <p className="absolute left-0 text-[16px] font-[500]">{data.name}</p>
                                                            <p className="relative ml-auto text-[14px] font-[400]">{data.price} บาท/ที่</p>
                                                        </div>
                                                    )
                                                })}
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                                </Accordion>
                            </div>
                        </div>
                        
                        {/* Action */}
                        <div className="flex items-center gap-[642px] w-[1104px] h-[48px]">
                            {/* Right */}
                            <div className="flex gap-[12px] ml-[915px]">
                                <Button 
                                className="w-[185px] h-[44px] rounded-[8px] text-[16px] bg-[#F78E1E] hover:cursor-pointer transition"
                                onClick={sendClick}
                                >
                                    สร้างหมวดหมู่แพคเกจ
                                </Button>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default ViewCategory