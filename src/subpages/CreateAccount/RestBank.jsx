import axios from "axios";
import { useState,useEffect } from "react";

import { ChevronDown } from "lucide-react";

import { Button } from "../../components/ui/button";

const banks = [
    {label: "ธนาคารไทยพาณิชย์" , value: "Bank1"},
    {label: "ธนาคารกรุงเทพ" , value: "Bank2"},
    {label: "ธนาคารกสิกรไทย" , value: "Bank3"},
    {label: "ธนาคารกรุงไทย" , value: "Bank4"},
    {label: "ธนาคารทีเอ็มบีธนชาต" , value: "Bank5"},
    {label: "ธนาคารกรุงศรีอยุธยา" , value: "Bank6"}
]

function RestBank({ onClick,backClick }) {

    const [Payload,setPayload] = useState({
        bank:"",
        owner:"",
        number:""
    })

    const handleChange = (e) => {
        const { id,value } = e.target
        setPayload((data) => ({
            ...data,[id]:value
        }))
    }

    useEffect(() => {
        const btn = document.getElementById('sendbtn')
        if(Payload.bank != "" && Payload.owner != "" && Payload.number != ""){
            btn.disabled = false
            btn.style.backgroundColor = "#FF8A00"
        }
        else{
            btn.disabled = true
            btn.style.backgroundColor = "#D0D5DD"
        }
    },[Payload])

    return (
        <>
            {/* Container */}
            <div className="flex justify-center items-center w-[400px] h-[598px] mb-[96px]">
                {/* Content (outer) */}
                <div className="w-[400px] h-[598px]">

                    {/* header */}
                    <div className="flex flex-col items-center">
                        <h2 className="text-[20px] font-[700]">บัญชีธนาคาร</h2>
                    </div>

                    {/* form */}
                    <form className="grid gap-[24px] mt-[32px] mb-[64px]">
                        <div className="grid h-fit gap-[6px]">
                            <label className="flex"><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[16px]">ชื่อธนาคาร</p> <p className="text-[#F78E1E]">*</p></label>
                            <div className="relative">
                                <select 
                                id="bank" 
                                className="appearance-none w-[400px] h-[48px] pl-[14px] pr-[42px] pt-[12px] pb-[12px] border-[1px] border-[#D0D5DD] rounded-md"
                                value={Payload.bank}
                                onChange={handleChange}
                                >
                                    <option value="default" selected hidden>ชื่อธนาคาร</option>
                                    {banks.map((content,index) => (
                                        <option key={index} value={content.value}>{content.label}</option>
                                    )) }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                                </div>
                            </div>
                        </div>

                        <div className="grid h-fit gap-[6px]">
                            <label className="flex"><p>ชื่อเจ้าของบัญชี</p><p className="text-[#D92D20]">*</p></label>
                            <input 
                                type="text"
                                id="owner"
                                value={Payload.owner}
                                placeholder="เช่น นางมานี ดีใจ"
                                onChange={handleChange}
                                className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                            />
                        </div>

                        <div className="grid h-fit gap-[6px]">
                            <label className="flex"><p>หมายเลขบัญชี</p><p className="text-[#D92D20]">*</p></label>
                            <input 
                                type="text"
                                id="number"
                                value={Payload.number}
                                onChange={handleChange}
                                placeholder="00x-x-xxxxx-x"
                                className="h-[44px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                            />
                        </div>
                    </form>

                    {/* action */}
                    <div className="flex gap-[16px]">
                        <Button id="backbtn" onClick={backClick} enable className="w-[192px] h-[44px] text-[16px] text-black bg-transparent border-[1px] border-[#D0D5DD] rounded-[8px] hover:ฺbg-transparent cursor-pointer transition">ย้อนกลับ</Button>
                        <Button id="sendbtn" onClick={onClick} className="w-[192px] h-[44px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] text-[16px] rounded-[8px] hover:ฺbg-black cursor-pointer transition">ส่งคำขอพิจารณาร้าน</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestBank;

