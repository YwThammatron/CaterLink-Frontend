import axios from "axios";
import { useState,useEffect } from "react";

import { Button } from "../../components/ui/button";
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
    {label: "อาหารไทย", value:"TEST4"},
    {label: "อาหารจีน", value:"TEST5"},
    {label: "อาหารญี่ปุ่น", value:"TEST6"},
    {label: "อาหารนานาชาติ", value:"TEST3"}
]


function RestType({ onClick}) {

  const [Mainlist,setMainlist] = useState([])
  const [Eventlist,setEventlist] = useState([])
  const [Foodlist,setFoodlist] = useState([])

  useEffect(() => {
        const btn = document.getElementById('nextbtn')
            if(Mainlist.length != 0 && Eventlist.length != 0 && Foodlist.length != 0){
                btn.disabled = false
                btn.style.backgroundColor = "#FF8A00"
            }
            else{
                btn.disabled = true
                btn.style.backgroundColor = "#D0D5DD"
            }
  },[Mainlist,Eventlist,Foodlist])

return (
    <>
     {/* Content (Restaurant Type) */}
    <div className="grid justify-center w-[400px] h-[526px]">

        {/* header */}
        <div className="flex flex-col items-center">
          <h2 className="text-[20px] font-[700]">ประเภทร้านค้า</h2>
        </div>

        {/* Input Field */}
        <form className="grid w-[400px] h-[356px] mt-[32px] mb-[64px] gap-[24px]">
          <div className="grid gap-[6px]">
              <label>
                <div className="flex"><p className="flex h-[21px] font-[500] text-[16px]">หมวดหมู่หลัก</p><p className="text-[#D92D20]">*</p></div>
                <p className="flex h-[21px] font-[400] text-[#6D6E71] text-[12px]">เลือกอย่างน้อย 1 หมวดหมู่</p>
              </label>
              <div className="grid h-[91px] gap-[8px]">
                  {mainctgs.map((content, index) => (
                    <div key={index} className="flex items-center gap-[10px]">
                      <div
                        key={index}
                        onClick={() => {
                          if (!Mainlist.includes(index)) {
                            setMainlist(prev => [...prev, index])
                          }
                          else {
                            setMainlist(prev => prev.filter(i => i !== index))
                          }
                        }}
                        className={`flex w-fit h-[25px] gap-[6px] items-center pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                        ${Mainlist.includes(index) ? 'border-[#FF8A00]' : 'text-black'}
                        hover:cursor-pointer `}
                      >
                        {content.icon}<p className="text-[14px] font-[500]">{content.label}</p>
                      </div>
                      <p className="text-[14px] text-[#667085]">{content.detail}</p>
                    </div>
                  ))}
              </div>
          </div>

          <div className="grid gap-[6px]">
            <label className="flex"><p className="flex h-[21px] font-[500] text-[16px]">ประเภทงานอีเวนต์</p><p className="text-[#D92D20]">*</p></label>
            <div className="flex flex-wrap gap-[6px] text-[14px] font-[500]">
              {eventtypes.map((content, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!Eventlist.includes(index)) {
                      setEventlist(prev => [...prev, index])
                    }
                    else {
                      setEventlist(prev => prev.filter(i => i !== index))
                    }    
                  }}
                  className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                    ${Eventlist.includes(index) ? 'border-[#FF8A00]' : 'text-black'}
                    hover:cursor-pointer `}
                >
                  {content.label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-[6px]">
            <label className="flex"><p className="flex h-[21px] font-[500] text-[16px]">ประเภทอาหาร</p><p className="text-[#D92D20]">*</p></label>
            <div className="flex flex-wrap gap-[6px] text-[14px] font-[500]">
              {foodtypes.map((content, index) => (
              <div
                key={index}
                onClick={() => {
                  if (!Foodlist.includes(index)) {
                      setFoodlist(prev => [...prev, index])
                  }
                  else {
                    setFoodlist(prev => prev.filter(i => i !== index))
                  }
                }}
                className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                ${Foodlist.includes(index) ? 'border-[#FF8A00]' : 'text-black'}
                hover:cursor-pointer `}
              >
                {content.label}
              </div>
              ))}
            </div>
          </div>

        </form>

        {/* action */}
        <Button id="nextbtn" onClick={onClick} className="w-[100%] h-[44px] text-[16px] rounded-[8px] hover:ฺbg-black cursor-pointer transition">ต่อไป</Button>
      </div>
    </>
  );
}

export default RestType;
