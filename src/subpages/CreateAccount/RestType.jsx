import axios from "axios";
import { useState } from "react";

import { HandPlatter,Inbox,UtensilsCrossed } from "lucide-react";

const mainctgs = [
    {label: 'จัดเลี้ยง',icon:<HandPlatter className="w-[12px] h-[12px] text-[#F78E1E]"/>,value: "TEST1",detail:"Buffet, ซุ้มอาหาร, Cocktail, Coffee Break"},
    {label: 'snackbox',icon:<Inbox className="w-[12px] h-[12px] text-[#F78E1E]"/>,value: "TEST2",detail:"Mealbox, Bakery SnackBox, Variety SnackBox"},
    {label: 'ซุ้มอาหาร',icon:<UtensilsCrossed className="w-[12px] h-[12px] text-[#F78E1E]"/>,value: "TEST3",detail:"ตั้งโต๊ะ, รถเข็น, ซุ้มอาหาร, Food Truck"}
]

const eventtypes = [
    {label: "งานเลี้ยงองค์กร", value:"TEST1"},
    {label: "งานประชุม/สัมมนา", value:"TEST2"},
    {label: "งานปาร์ตี้", value:"TEST3"}
]

const foodtypes = [
    {label: "อาหารคาว", value:"TEST1"},
    {label: "ขนมและของหวาน", value:"TEST2"},
    {label: "เครื่องดื่ม", value:"TEST3"},
    {label: "อาหารไทย", value:"TEST4"},
    {label: "อาหารจีน", value:"TEST5"},
    {label: "อาหารญี่ปุ่น", value:"TEST6"}
]


function RestType({ onClick,backClick }) {

return (
    <>
     {/* Content (Restaurant Type) */}
                    <div className="flex w-[1056px] h-[270px]">
                        <div className="grid w-[312px] h-fit">
                            <p className="font-[600] text-[14px]">ประเภทร้านค้า</p>
                            <p className="text-[14px]">เลือกได้มากกว่า 1 ข้อ</p>
                        </div>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[24px]">
                            <div className="grid gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">หมวดหมู่หลัก</p></label>
                                <div className="grid gap-[8px]">
                                    {mainctgs.map((content, index) => (
                                <div className="flex items-center gap-[10px]">
                                    <div
                                        key={index}
                                        onClick={() => setMainindex(index)}
                                        className={`flex w-fit h-[25px] gap-[6px] items-center pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] ${
                                        Mainindex === index
                                            ? 'border-black border-[2px]'
                                            : 'text-black'
                                        } hover:cursor-pointer `}
                                        >
                                            {content.icon}<p className="text-[12px] font-[500]">{content.label}</p>
                                        </div>
                                        <p className="text-[12px]">{content.detail}</p>
                                    </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">ประเภทงานอีเวนต์</p></label>
                                <div className="flex gap-[6px] text-[12px] font-[500]">
                                    {eventtypes.map((content, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setEventindex(index)}
                                        className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] ${
                                        Eventindex === index
                                            ? 'border-black border-[2px]'
                                            : 'text-black'
                                        } hover:cursor-pointer `}
                                    >
                                        {content.label}
                                    </div>
                                    ))}
                                </div>
                            </div>

                            <div className="grid gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">ประเภทอาหาร</p></label>
                                <div className="flex gap-[6px] text-[12px] font-[500]">
                                    {foodtypes.map((content, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setFoodindex(index)}
                                        className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] ${
                                        Foodindex === index
                                            ? 'border-black border-[2px]'
                                            : 'text-black'
                                        } hover:cursor-pointer `}
                                    >
                                        {content.label}
                                    </div>
                                    ))}
                                </div>
                            </div>

                        </form>
                    </div>
    </>
  );
}

export default RestType;
