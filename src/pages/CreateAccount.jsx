import axios from "axios";
import { useState,useEffect } from "react";
import Logo from "../components/ui/Logo";
import { HandPlatter,Inbox,UtensilsCrossed,Circle,CircleDot } from "lucide-react";

import RestInfo from "../subpages/CreateAccount/RestInfo"
import RestType from "../subpages/CreateAccount/RestType"
import RestBank from "../subpages/CreateAccount/RestBank"

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
    {label: "เครื่องดื่ม", value:"TEST3"},
    {label: "อาหารไทย", value:"TEST4"},
    {label: "อาหารจีน", value:"TEST5"},
    {label: "อาหารญี่ปุ่น", value:"TEST6"}
]

function CreateAccount() {
    const [Tabindex,setTabindex] = useState(0)

    const handleClickBank = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex + 1)
        const updated = Subpages.map(item => 
            item.label === 'บัญชีธนาคาร' || item.label === 'ประเภทร้านค้า' ? {...item,index:true} : item
        )
        setSubpages(updated)
        console.log(Subpages,Tabindex)
    }

    const handleClickBackBank = (e) => {
        e.preventDefault()
        const updated = Subpages.map(item => {
            if(item.label === 'บัญชีธนาคาร' && item.index == true){
                return {...item,index:false}
            }
            else if(item.label === 'ประเภทร้านค้า' && item.index == false){
                return {...item,index:true}
            }
            else{return item}
        })
        setTabindex(Tabindex => Tabindex - 1)
        setSubpages(updated)
    }

    const handleClickBackType = (e) => {
        e.preventDefault()
        const updated = Subpages.map(item => {
            if(item.label === 'ประเภทร้านค้า' && item.index == true){
                return {...item,index:false}
            }
            else{return item}
        })
        setTabindex(Tabindex => Tabindex - 1)
        setSubpages(updated)
    }

    const handleClickType = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex + 1)
        const updated = Subpages.map(item => 
            item.label === 'ประเภทร้านค้า' && item.index == false ? {...item,index:true} : item
        )
        setSubpages(updated)
    }

    const [Subpages,setSubpages] = useState([
        {label: 'ข้อมูลร้านค้า',content: <RestInfo onClick={handleClickType}/>,index:true},
        {label: 'ประเภทร้านค้า',content: <RestType onClick={handleClickBank} backClick={handleClickBackType} />,index:false},
        {label: 'บัญชีธนาคาร',content: <RestBank backClick={handleClickBackBank} />,index:false}
    ])

    useEffect(() => {
        console.log('subpages changed',Subpages,Tabindex)
    },[Subpages,Tabindex])


return (
    <>
        {/* หน้าสร้าง Account */}
        <div className="flex justify-center">
            {/* Container */}
            <div className="flex flex-col justify-center items-center w-[1280px] h-[988px] mt-[64px] mb-[64px] gap-[32px]">
                {/* Content (header) */}
                <div className="flex flex-col items-center gap-[32px] w-[1216px] h-[214px]">
                    {/* header */}
                    <div className="flex flex-col items-center">
                        <Logo className="w-[48px] h-[48px]" />
                        <h2 className="mt-[24px]">เพิ่มข้อมูลร้านค้า</h2>
                    </div>

                    <div className="relative">
                        {/* Progess Step */}
                        <div className="absolute flex gap-[16px] w-[992px] h-[72px] ">
                            {Subpages.map((tab,index) => (
                            <div key={index} className="flex flex-col items-center justify-center gap-[16px] w-[320px] h-[72px]">
                                {tab.index ? <Circle className="justify-center fill-current text-orange w-[32px] h-[32px]" /> : <CircleDot className="justify-center w-[32px] h-[32px]" />}
                                <p className="text-[#344054] font-[600]">{tab.label}</p>
                            </div>
                            ))}
                        </div>

                        {/* Progress Line */}
                        <div className="relative flex top-[15px] justify-center w-[992px] h-[72px]">
                            <div className="w-[336px] h-[2px] bg-black"></div>
                            <div className="w-[336px] h-[2px] bg-black"></div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                {Subpages[Tabindex].content}
            </div>
        </div>
    </>
  );
}

export default CreateAccount;
