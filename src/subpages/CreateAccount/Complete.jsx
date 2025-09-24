import axios from "axios";
import { LaptopMinimalCheck } from "lucide-react";

import { Button } from "../../components/ui/button";

function Complete({ backClick }){
    return (
        <>
        {/* Content */}
        <div className="flex flex-col justify-center items-center gap-[24px] w-[512px] h-[246px]">
            {/* Illustration */}
            <LaptopMinimalCheck className="w-[220px] h-[160px] text-[#FF8A00]" />

            {/* Text and Supporting Text */}
            <div className="flex flex-col items-center gap-[8px]">
                <p className="text-[20px] text-[#101828] font-[600]">ส่งข้อมูลร้านค้าให้ CaterLink แล้ว</p>
                <p className="text-[16px] font-[400]">รอการอนุมัติการใช้งานร้านค้าจาก CaterLink 1-2 วัน</p>
            </div>

            {/* action */}
            <Button id="nextbtn" onClick={backClick} className="w-[80%] h-[44px] text-[16px] rounded-[8px] hover:ฺbg-black cursor-pointer transition">กลับไปหน้าแรก</Button>
        </div>
        </>
    )
}

export default Complete
