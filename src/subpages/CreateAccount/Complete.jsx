import axios from "axios";

import CompleteDoodle from "../../components/ui/CompleteDoodle";

function Complete(){
    return (
        <>
        {/* Content */}
        <div className="flex flex-col items-center gap-[24px] w-[512px] h-[618px] pt-[32px]">
            {/* Illustration */}
            <CompleteDoodle/>

            {/* Text and Supporting Text */}
            <div className="flex flex-col items-center gap-[8px]">
                <p className="text-[20px] text-[#101828] font-[600]">ส่งข้อมูลร้านค้าให้ CaterLink แล้ว</p>
                <p className="text-[16px] font-[400]">รอการอนุมัติการใช้งานร้านค้าจาก CaterLink 1-2 วัน</p>
            </div>

        </div>
        </>
    )
}

export default Complete
