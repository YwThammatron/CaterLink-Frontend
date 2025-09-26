import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye,EyeOff,HandPlatter,Inbox,UtensilsCrossed } from "lucide-react";

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
    {label: "อาหารไทย", value:"TEST3"},
    {label: "อาหารจีน", value:"TEST4"},
    {label: "อาหารญี่ปุ่น", value:"TEST5"},
    {label: "อาหารนานาชาติ", value:"TEST6"}
]

function UserAccount() {
    const [Mainlist,setMainlist] = useState([])
    const [Eventlist,setEventlist] = useState([])
    const [Foodlist,setFoodlist] = useState([])

    const [Visible,setVisible] = useState(0)

    const [Payload,setPayload] = useState({
        restaurant:"อร่อยดีมีชัย",
        detail:" โหระพาแคทเทอริ่ง ประสบการณ์จัดเลี้ยงมากกว่า 30 ปี พร้อมให้บริการรับจัดเลี้ยงนอกสถานที่ทุกรูปแบบด้วยทีมงานมืออาชีพ ทั้งการจัดเลี้ยง รับจัดเลี้ยง รับจัดเลี้ยงงานทำบุญบ้าน รับจัดเลี้ยงบริษัท รับบุฟเฟ่ต์ ข้าวกล่อง Box set และชุดปิ่นโตถวายพระสงฆ์ ",
        vatid:"1000010000100010",
        location:"กรุงเทพ",
        address:"ซอย วิภาวดีรังสิต 3 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900",
        mainctg:"",
        eventtype:"",
        foodtype:"",
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
            {/* Table */}
                <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] h-[965px] bg-white">
                    {/* Content (Restaurant Infomation) */}
                    <div className="flex w-[1056px] h-[549px]">
                        <p className="text-[14px] font-[600] w-[312px]">ข้อมูลร้านค้า</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่อบริษัทหรือร้านค้า</p></label>
                                <input 
                                type="text"
                                id="restaurant"
                                value={Payload.restaurant}
                                onChange={handleChange}
                                placeholder="กรุณาระบุ"
                                className="h-[48px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>

                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">คำอธิบายร้าน</p></label>
                                <textarea
                                id="address"
                                value={Payload.detail}
                                onChange={handleChange}
                                placeholder="กรุณากรอกข้อมูล"
                                className="resize-none h-[126px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
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
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่ออาคาร/ถนน</p></label>
                                <input 
                                type="text"
                                id="zone"
                                value={Payload.location}
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
                                className="resize-none h-[73px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>

                            
                        </form>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>

                    {/* Content (Restaurant Type) */}
                    <div className="flex w-[1056px] h-[270px]">
                        <div className="grid w-[312px] h-fit">
                            <p className="font-[600] text-[14px]">ประเภทร้านค้า</p>
                            <p className="text-[14px]">เลือกได้มากกว่า 1 ข้อ</p>
                        </div>

                    {/* Input Field */}
                    <form className="grid w-[512px] h-[270px] mb-[64px] gap-[24px]">
                    <div className="grid gap-[6px]">
                        <label><p className="flex h-[21px] font-[500] text-[14px] text-[#6D6E71]">ประเภทการจัดเลี้ยง</p></label>
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
                                    {content.icon}<p className="text-[12px] font-[500]">{content.label}</p>
                                </div>
                                <p className="text-[12px] text-[#667085]">{content.detail}</p>
                                </div>
                            ))}
                            </div>
                        </div>

                        <div className="grid gap-[6px]">
                            <label><p className="flex h-[21px] font-[500] text-[14px] text-[#6D6E71]">ประเภทงานอีเวนต์</p></label>
                            <div className="flex flex-wrap gap-[6px] text-[12px] font-[500]">
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
                            <label><p className="flex h-[21px] font-[500] text-[14px] text-[#6D6E71]">ประเภทอาหาร</p></label>
                            <div className="flex flex-wrap gap-[6px] text-[12px] font-[500]">
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
                    </div>

                    {/* Divider */}
                    <div className="w-[1056px] h-[1px] bg-[#EAECF0]"></div>
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

export default UserAccount;
