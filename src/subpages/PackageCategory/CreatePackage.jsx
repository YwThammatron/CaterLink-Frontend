import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye,EyeOff,HandPlatter,Inbox,UtensilsCrossed } from "lucide-react";
import { data } from "react-router-dom";


function CreatePackage() {
    const [Payload,setPayload] = useState({
        name:"",
        category:"",
        remark:"",
        set:[
            {
                id:1,
                name:"",
                detail:""
            }
        ]
    })

    const handleChange = (e) => {
        const {id,value} = e.target
        setPayload((data) => ({
            ...data,
            [id]:value
        }))
    }

    const [Index,setIndex] = useState(1)

    return (
        <>
            {/* Table */}
            <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] h-[1073px] bg-white">
                {/* Content (Restaurant Infomation) */}
                <div className="flex w-[1056px] h-[426px]">
                    <p className="text-[14px] font-[600] w-[312px]">ข้อมูลแพตเกจ</p>
                    {/* Input Field */}
                    <form className="grid w-[512px] gap-[16px]">
                        <div className="grid h-fit gap-[6px]">
                            <label className="flex"><p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่อแพคเกจ</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                            <input 
                            type="text"
                            id="name"
                            value={Payload.name}
                            onChange={handleChange}
                            placeholder="เพิ่มชื่อแพคเกจ"
                            className="h-[48px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                            />
                        </div>
            
                        <div className="grid h-fit gap-[6px]">
                            <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">เลขประจำตัวผู้เสียภาษี</p></label>
                            <input 
                            type="text"
                            id="vatid"
                            value={Payload.vatid}
                            onChange={handleChange}
                            placeholder="กรุณาระบุ"
                            className="h-[48px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                            />
                        </div>
            
                        <div className="grid h-fit gap-[6px]">
                            <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">สถานที่ตั้งบริษัทหรือร้านค้า</p></label>
                            <textarea
                            id="address"
                            value={Payload.address}
                            onChange={handleChange}
                            placeholder="กรุณากรอกข้อมูล"
                            className="resize-none h-[126px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                            />
                        </div>
                                        
                    </form>
                </div>
                                
                {/* Divider */}
                <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>
            
                {/* Content (Blog Detail) */}
                <div className="flex w-[1056px] h-[166px]">
                    <p className="text-[14px] w-[312px] font-[600]">ข้อมูลผู้ใช้งาน</p>
                    {/* Input Field */}
                    <form className="grid gap-[20px] w-[512px]">
                        <div className="grid h-fit gap-[6px]">
                            <label><p className="text-[14px] font-[500] text-[#6D6E71]">Username / อีเมล</p></label>
                            <input 
                            type="email"
                            id="email"
                            value={Payload.email}
                            onChange={handleChange}
                            placeholder="เพิ่ม Email"
                            className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                            />
                        </div>
            
                        <div className="grid h-fit gap-[6px]">
                            <label><p className="text-[14px] font-[500] text-[#6D6E71]">Password</p></label>
                            <div className="relative">
                                <input 
                                type={Visible ? "text" : "password"}
                                id="passwd"
                                value={Payload.passwd}
                                onChange={handleChange}
                                placeholder="Input password"
                                className="w-[512px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {Visible ? <Eye className="absolute text-[#F78E1E] w-[16px] h-[16px] right-[14px] top-1/2 -translate-y-1/2 hover:cursor-pointer" onClick={() => setVisible(!Visible)}/> : <EyeOff className="absolute text-[#F78E1E] w-[16px] h-[16px] right-[14px] top-1/2 -translate-y-1/2 hover:cursor-pointer" onClick={() => setVisible(!Visible)}/>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            
            {/* Action */}
            <div className="flex items-center gap-[642px] w-[1104px] h-[48px]">
                {/* Right */}
                <div className="flex gap-[12px] ml-[792px]">
                    <Button className="w-[150px] h-[48px] rounded-[10000px] text-[#F78E1E] text-[16px] bg-transparent border-[1px] border-[#F78E1E] hover:bg-transparent cursor-pointer transition">ยกเลิก</Button>
                    <Button className="w-[150px] h-[48px] rounded-[10000px] text-[16px] bg-[#F78E1E] hover:cursor-pointer transition">บันทึกข้อมูล</Button>
                </div>
            </div>
        </>
    )
}

export default CreatePackage