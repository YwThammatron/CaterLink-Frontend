import axios from "axios";
import { useState,useEffect } from "react";

import { Button } from "../../components/ui/button";

import FoodStall from "../../components/ui/FoodStall";
import Snackbox from "../../components/ui/SnackBox";
import Catering from "../../components/ui/Catering";

const mainctgs = [
    {label: 'จัดเลี้ยง',id:"dbbadc65-cf21-43f1-9a8d-19a15806e53c",icon:<Catering className="w-[12px] h-[12px] text-[#F78E1E]"/>,detail:"Buffet, ซุ้มอาหาร, Cocktail, Coffee Break"},
    {label: 'snackbox',id:"6f06aedc-cbaa-4f6f-bd9a-7442b8e956a9",icon:<Snackbox className="w-[12px] h-[12px] text-[#F78E1E]"/>,detail:"Mealbox, Bakery SnackBox, Variety SnackBox"},
    {label: 'ซุ้มอาหาร',id:"58b9a2f8-4ebb-4ca9-b2e5-53d72795f47d",icon:<FoodStall className="w-[12px] h-[12px] text-[#F78E1E]"/>,detail:"ตั้งโต๊ะ, รถเข็น, ซุ้มอาหาร, Food Truck"}
]

const eventtypes = [
    {label: "Birthday Party",id:"f934d4fc-8eaa-460d-832b-2b93b24208fc"},
    {label: "งานแต่ง",id:"874b27d1-073e-4eb0-84da-cd5b4a66ed50"},
    {label: "งานเลี้ยงองค์กร",id:"3edc9fd5-973a-4ce1-aa3c-463f7348de32"},
    {label: "งานประชุม/สัมมนา",id:"98c522c8-9b03-410c-9093-f1aa469eee54"},
    {label: "งานปาร์ตี้",id:"5843de35-50f8-4f9c-a065-0798223fe375"},
    {label: "งานบุญ",id:"05f4ccc4-9e30-4fe1-82c0-84b0e74775e9"},
    {label: "งานศพ",id:"19e0e801-ab6b-4a7b-8403-427e0b8df163"}
]

const foodtypes = [
    {label: "อาหารไทย",id:"1b2b2f81-af49-4c8c-ba89-7cb909f65465"},
    {label: "อาหารจีน",id:"ecf2ed77-fb86-4ef0-8977-7ad17f989474"},
    {label: "อาหารคาว",id:"3c666417-5320-4f59-9c13-f2ffba7d9a5b"},
    {label: "ขนมและของหวาน",id:"fa7f9fe9-fd0f-4a68-a292-e4d87605e3ec"},
    {label: "อาหารญี่ปุ่น",id:"c6e5f712-102a-4e57-8921-668bf57ce21d"},
    {label: "อาหารนานาชาติ",id:"e9cb621d-3239-46ba-a47d-8fe156f9173a"}
]


function RestType({ onClick,backClick,sendMains,sendEvents,sendFoods }) {

  const [Mainlist,setMainlist] = useState([])
  const [Eventlist,setEventlist] = useState([])
  const [Foodlist,setFoodlist] = useState([])

  const handleNext = (e) => {
    e.preventDefault()

    //send all lists up to parent file
    sendMains(Mainlist)
    sendEvents(Eventlist)
    sendFoods(Foodlist)

    onClick(e) //trigger method from parent file
  }

  useEffect(() => {
        const btn = document.getElementById('nextbtn')
            if(Mainlist.length != 0 && Eventlist.length != 0 && Foodlist.length != 0){
                btn.disabled = false
                btn.style.backgroundImage = "linear-gradient(to right, #FF8A00, #E9580A)"
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
                <div className="flex"><p className="flex h-[21px] font-[500] text-[16px]">ประเภทการจัดเลี้ยง</p><p className="text-[#D92D20] pl-[3px]">*</p></div>
                <p className="flex h-[21px] font-[400] text-[#6D6E71] text-[12px]">เลือกอย่างน้อย 1 หมวดหมู่</p>
              </label>
              <div className="grid h-[91px] gap-[8px]">
                  {mainctgs.map((content, index) => (
                    <div key={index} className="flex items-center gap-[10px]">
                      <div
                        key={index}
                        onClick={() => {
                          if (!Mainlist.includes(content.id)) {
                            setMainlist(prev => [...prev, content.id])
                          }
                          else {
                            setMainlist(prev => prev.filter(i => i !== content.id))
                          }
                        }}
                        className={`flex w-fit h-[25px] gap-[6px] items-center pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                        ${Mainlist.includes(content.id) ? 'border-[#FF8A00]' : 'text-black'}
                        hover:cursor-pointer `}
                      >
                        {content.icon}<p className="text-[12px] font-[500]">{content.label}</p>
                      </div>
                      <p className="text-[12px] text-[#667085]">{content.detail}</p>
                    </div>
                  ))}
              </div>
          </div>

          <div className="grid gap-[6px]">
            <label className="flex"><p className="flex h-[21px] font-[500] text-[16px]">ประเภทงานอีเวนต์</p><p className="text-[#D92D20] pl-[3px]">*</p></label>
            <div className="flex flex-wrap gap-[6px] text-[12px] font-[500]">
              {eventtypes.map((content, index) => (
                <div
                  key={index}
                  onClick={() => {
                    if (!Eventlist.includes(content.id)) {
                      setEventlist(prev => [...prev, content.id])
                    }
                    else {
                      setEventlist(prev => prev.filter(i => i !== content.id))
                    }    
                  }}
                  className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                    ${Eventlist.includes(content.id) ? 'border-[#FF8A00]' : 'text-black'}
                    hover:cursor-pointer `}
                >
                  {content.label}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-[6px]">
            <label className="flex"><p className="flex h-[21px] font-[500] text-[16px]">ประเภทอาหาร</p><p className="text-[#D92D20] pl-[3px]">*</p></label>
            <div className="flex flex-wrap gap-[6px] text-[12px] font-[500]">
              {foodtypes.map((content, index) => (
              <div
                key={index}
                onClick={() => {
                  if (!Foodlist.includes(content.id)) {
                      setFoodlist(prev => [...prev, content.id])
                  }
                  else {
                    setFoodlist(prev => prev.filter(i => i !== content.id))
                  }
                }}
                className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                ${Foodlist.includes(content.id) ? 'border-[#FF8A00]' : 'text-black'}
                hover:cursor-pointer `}
              >
                {content.label}
              </div>
              ))}
            </div>
          </div>

        </form>

        {/* action */}
        <div className="flex gap-[16px]">
            <Button id="backbtn" onClick={backClick} className="w-[192px] h-[44px] text-[16px] text-black bg-transparent border-[1px] border-[#D0D5DD] rounded-[8px] hover:ฺbg-transparent cursor-pointer transition">ย้อนกลับ</Button>
            <Button id="nextbtn" onClick={handleNext} className="w-[192px] h-[44px] text-[16px] rounded-[8px] hover:ฺbg-black cursor-pointer transition">ต่อไป</Button>
        </div>
      </div>
    </>
  );
}

export default RestType;
