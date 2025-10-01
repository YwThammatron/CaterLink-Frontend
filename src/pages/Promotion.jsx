import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import SidebarCustom from "../components/ui/Sidebar-custom";

function Promotion() {

  const [Payload,setPayload] = useState({
    percent:null,
    startdate:"",
    enddate:"",
    starttime:"",
    endtime:"",
    name:"",
    category:""
  })

  const handleChange = (e) => {
    const { id,value } = e.target
    setPayload((data) => ({
      ...data,
      [id]:value
    }))
  }

  return (
    <>
      {/*หน้าสร้าง Promotion*/}
      <div className="flex flex-row">
          <SidebarCustom />
          {/* Container */}
          <div className="w-[84%] h-auto bg-[#F9FAFB]">
            {/* Header Navigation */}
            <div className="flex flex-col w-auto h-[63px] pl-[calc(50%-552px)] justify-center border-b-[1px] border-[#EDEEF0] mb-[32px]">
                <p className="text-[24px] font-[600]">สร้างโปรโมชัน</p>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[24px] w-auto h-[1024px] items-center mb-[32px]">
                {/* Table */}
                <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] h-[540px] bg-white">
                    {/* Content (Promotion Set) */}
                    <div className="flex w-[1056px] h-[62px]">
                        <p className="text-[14px] font-[600] w-[312px]">การตั้งโปรโมชัน</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">จำนวนลด &#40;เปอร์เซ็นต์&#41;<p className="text-[#D50A0A] pl-[3px]">*</p></p></label>
                                <input 
                                type="number"
                                id="percent"
                                value={Payload.percent}
                                onChange={handleChange}
                                placeholder="เพิ่มตัวเลข"
                                className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>
                        </form>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>

                    {/* Content (Promotion Period) */}
                    <div className="flex w-[1056px] h-[152px]">
                        <p className="text-[14px] w-[312px] font-[600]">ช่วงเวลาโปรโมชัน</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[6px]">
                            <div className="flex gap-[16px]">
                                <div className="grid gap-[8px]">
                                    <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">วันที่เริ่ม<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                                    <input 
                                    type="date"
                                    id="startdate"
                                    value={Payload.startdate}
                                    onChange={handleChange}
                                    placeholder="เลือกวัน"
                                    className="w-[247px] h-[40px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md outline-none"
                                    />
                                </div>

                                <div className="grid gap-[8px]">
                                    <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">วันที่จบ<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                                    <input 
                                    type="date"
                                    id="enddate"
                                    value={Payload.enddate}
                                    onChange={handleChange}
                                    placeholder="เลือกวัน"
                                    className="w-[247px] h-[40px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-[16px]">
                                <div className="grid gap-[8px]">
                                    <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">เวลาเริ่ม<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                                    <input 
                                    type="time"
                                    id="starttime"
                                    value={Payload.starttime}
                                    onChange={handleChange}
                                    className="w-[247px] h-[40px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                    />
                                </div>

                                <div className="grid gap-[8px]">
                                    <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">เวลาจบ<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                                    <input 
                                    type="time"
                                    id="endtime"
                                    value={Payload.endtime}
                                    onChange={handleChange}
                                    className="w-[247px] h-[40px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Divider */}
                    <div className="w-[1056px] h-[1px] bg-[#EAECF0]"></div>

                    {/* Content (Package Infomation) */}
                    <div className="flex w-[1056px] h-[148px]">
                        <p className="text-[14px] w-[312px] font-[600]">ข้อมูลแพคเกจ</p>
                        {/* Input Field */}
                        <form className="grid w-[512px]">
                            <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">หมวดหมู่แพคเกจ<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                            <div className="relative">
                                <select id="category" className="appearance-none w-[512px] h-[40px] text-[14px] pl-[12px] pr-[44px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md">
                                    <option value="default" selected hidden>เลือกหมวดหมู่แพคเกจ</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                                </div>
                            </div>

                            <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">แพคเกจ<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                            <div className="relative">
                                <select id="type" className="appearance-none w-[512px] h-[40px] text-[14px] pl-[12px] pr-[44px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md">
                                    <option value="default" selected hidden>เลือกแพคเกจ</option>
                                    <option value="volvo">Volvo</option>
                                    <option value="saab">Saab</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="audi">Audi</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-[642px] w-[1104px] h-[48px]">
                    {/* Right */}
                    <div className="flex gap-[12px] ml-[885px]">
                        <Button
                        className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                        >
                            ยกเลิก
                        </Button>
                        
                        <Button 
                        className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"
                        >
                            สร้างโปรโมชัน
                        </Button>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Promotion
