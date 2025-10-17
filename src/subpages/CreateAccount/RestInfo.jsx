import axios from "axios";
import { useState,useEffect } from "react";

import { Button } from "../../components/ui/button";

function RestInfo({ onClick,sendPayload,receiveCopy }) {

  const [Payload,setPayload] = useState({
      name:"",
      description:"",
      tax_id:"",
      sub_location:"",
      location:""
  })

  const handleChange = (e) => {
    const { name,value } = e.target
    setPayload((data) => ({
      ...data,[name]:value
    }))
  }

  const handleNext = (e) => {
    e.preventDefault()
    sendPayload(Payload) //pass Payload up to parent
    onClick(e) //trigger onclick method once from parent
  }

  useEffect(() => {
      const btn = document.getElementById('nextbtn')
          if(Payload.name != "" && Payload.description != "" && Payload.tax_id != "" && Payload.sub_location != "" && Payload.location != ""){
              btn.disabled = false
              btn.style.background =  'linear-gradient(to right, #FF8A00, #E9580A)'
          }
          else{
              btn.disabled = true
              btn.style.backgroundColor = "#D0D5DD"
          }
  },[Payload])

  useEffect(() => {
    if(receiveCopy){
      setPayload(receiveCopy)
    }
  },[receiveCopy])

return (
    <>
          {/* Container */}
          <div className="flex justify-center items-center w-[400px] h-[598px] mb-[96px]">
            {/* Content (outer) */}
            <div className="w-[400px] h-[598px]">

              {/* header */}
              <div className="flex flex-col items-center">
                <h2 className="text-[20px] font-[700]">ข้อมูลร้านค้า</h2>
              </div>

              {/* form */}
              <form className="grid gap-[24px] mt-[32px] mb-[64px]">
                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>ชื่อบริษัทหรือร้านค้า</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="text"
                    name="name"
                    value={Payload.name}
                    onChange={handleChange}
                    placeholder="เพิ่มชื่อร้านที่น่าจดจำ"
                    className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>คำอธิบายร้าน</p><p className="text-[#D92D20]">*</p></label>
                  <textarea
                    name="description"
                    value={Payload.description}
                    onChange={handleChange}
                    placeholder="เพิ่มคำอธิบายสั้น ๆ เกี่ยวกับร้าน"
                    className="resize-none h-[79px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>เลขประจำตัวผู้เสียภาษี</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="text"
                    name="tax_id"
                    value={Payload.tax_id}
                    placeholder="เช่น 1000010000100010"
                    onChange={handleChange}
                    className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>ชื่ออาคาร/ถนน</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="text"
                    name="sub_location"
                    value={Payload.sub_location}
                    placeholder="เช่น ถนนลาดกระบัง"
                    onChange={handleChange}
                    className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>สถานที่ตั้งบริษัทหรือร้านค้า</p><p className="text-[#D92D20]">*</p></label>
                  <textarea
                    name="location"
                    value={Payload.location}
                    onChange={handleChange}
                    placeholder="เพิ่มที่อยู่ของร้านค้า"
                    className="resize-none h-[79px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>
              </form>

              {/* action */}
              <Button id="nextbtn" onClick={handleNext} className="w-[100%] h-[44px]  text-[16px] rounded-[8px] hover:ฺbg-black cursor-pointer transition">ต่อไป</Button>
            </div>
          </div>
    </>
  );
}

export default RestInfo;
