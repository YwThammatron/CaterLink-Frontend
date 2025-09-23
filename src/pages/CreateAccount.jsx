import axios from "axios";
import { useState } from "react";
import Logo from "../components/ui/Logo";
import { Circle,CircleDot } from "lucide-react";

import RestInfo from "../subpages/CreateAccount/RestInfo"
import RestType from "../subpages/CreateAccount/RestType"
import RestBank from "../subpages/CreateAccount/RestBank"


function CreateAccount() {
    const [Tabindex,setTabindex] = useState(1)

    const handleClickBank = (e) => {
        e.preventDefault()
        setSubpages(Subpages.map(item => 
            item.label === 'บัญชีธนาคาร' ? {...item,index:true} : item
        ))

        console.log(Subpages)
    }

    const handleClickType = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex + 1)
        setSubpages(Subpages.map(item => 
            item.label === 'ประเภทร้านค้า' ? {...item,index:true} : item
        ))
        console.log(Subpages,Tabindex)
    }

    const [Subpages,setSubpages] = useState([
        {label: 'ข้อมูลร้านค้า',content: <RestInfo/>,index:true},
        {label: 'ประเภทร้านค้า',content: <RestType handleClick={handleClickType} />,index:false},
        {label: 'บัญชีธนาคาร',content: <RestBank handleClick={handleClickBank} />,index:false}
    ])


return (
    <>
        {/*หน้าลงทะเบียน*/}
        <div className="flex justify-center">
            {/* Container */}
            <div className="flex flex-col justify-center items-center w-[1280px] h-[988px] mb-[64px] gap-[32px]">
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
