import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


function CreateCategory({ cancelClick }) {
    const [Payload,setPayload] = useState({
        name:"",
    })

    const handleChange = (e) => {
        const {id,value} = e.target
        setPayload((data) => ({
            ...data,
            [id]:value
        }))
    }

    const handleChangeSave = () => {
        //when click save
    }

    return (
        <>
            {/* Content */}
            <div className="flex flex-col gap-[32px] w-auto h-auto mb-[32px]">
                {/* Breadcrumbs */}
                <Breadcrumb className="pl-[48px]">
                    <BreadcrumbList className="text-[14px]">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="./packagectg">จัดการแพคเกจ</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-[#D87500] font-[600] hover:cursor-default">สร้างหมวดหมู่แพคเกจ</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>


                {/* Table */}
                <div className="grid self-center justify-center items-center h-[110px] border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] bg-white">
                    {/* Content (Package Infomation) */}
                    <div className="flex w-[1056px] h-[62px]">
                        <p className="text-[14px] font-[600] w-[312px]">ข้อมูลหมวดหมู่แพคเกจ</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label className="flex h-[20px]"><p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่อหมวดหมู่แพคเกจ</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                <input 
                                type="text"
                                id="name"
                                value={Payload.name}
                                onChange={handleChange}
                                placeholder="เพิ่มชื่อแพคเกจ"
                                className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                
                {/* Action */}
                <div className="flex items-center ml-[933px] mb-[691px] w-[1104px] h-[48px]">
                    {/* Right */}
                    <div className="flex gap-[12px]">
                        <Button
                        className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                        onClick={cancelClick}
                        >
                            ยกเลิก
                        </Button>
                        
                        <Button 
                        className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-[#F78E1E] hover:cursor-pointer transition"
                        onClick={handleChangeSave}
                        >
                            สร้างหมวดหมู่
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory