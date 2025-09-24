import axios from "axios";
import { useState } from "react";

import { Button } from "../../components/ui/button";

function RestInfo({ onClick }) {

  const [Payload,setPayload] = useState({
    name:"",
    detail:"",
    vatid:"",
    location:"",
    address:""
  })

  const handleChange = (e) => {
    const { id,value } = e.target
    setPayload((data) => ({
      ...data,[id]:value
    }))
  }

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
                    id="name"
                    value={Payload.name}
                    onChange={handleChange}
                    placeholder="เพิ่มชื่อร้านที่น่าจดจำ"
                    className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>คำอธิบายร้าน</p><p className="text-[#D92D20]">*</p></label>
                  <textarea
                    id="detail"
                    value={Payload.detail}
                    onChange={handleChange}
                    placeholder="เพิ่มคำอธิบายสั้น ๆ เกี่ยวกับร้าน"
                    className="resize-none h-[79px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>เลขประจำตัวผู้เสียภาษี</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="text"
                    id="vatid"
                    value={Payload.vatid}
                    placeholder="เช่น 1000010000100010"
                    onChange={handleChange}
                    className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>ชื่ออาคาร/ถนน</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="text"
                    id="location"
                    value={Payload.location}
                    placeholder="เช่น ถนนลาดกระบัง"
                    className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>สถานที่ตั้งบริษัทหรือร้านค้า</p><p className="text-[#D92D20]">*</p></label>
                  <textarea
                    id="address"
                    value={Payload.address}
                    onChange={handleChange}
                    placeholder="เพิ่มที่อยู่ของร้านค้า"
                    className="resize-none h-[79px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>
              </form>

              {/* action */}
              <Button onClick={onClick} className="w-[100%] h-[44px] text-[16px] bg-[#FF8A00] rounded-[8px] hover:cursor-pointer">ต่อไป</Button>
            </div>
          </div>
    </>
  );
}

export default RestInfo;
