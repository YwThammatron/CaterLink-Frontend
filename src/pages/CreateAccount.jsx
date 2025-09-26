import axios from "axios";
import { useState,useEffect } from "react";
import Logo from "../components/ui/Logo";

import CurrentStep from "../components/ui/CurrentStep";
import IncomingStep from "../components/ui/IncomingStep";
import PassStep from "../components/ui/PassStep";

import RestInfo from "../subpages/CreateAccount/RestInfo"
import RestType from "../subpages/CreateAccount/RestType"
import RestBank from "../subpages/CreateAccount/RestBank"
import Complete from "../subpages/CreateAccount/Complete"

function CreateAccount() {
    const [Tabindex,setTabindex] = useState(0)

    const handleClickBank = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex + 1)
        const updated = Subpages.map(item => 
            item.label === 'บัญชีธนาคาร' || item.label === 'ประเภทร้านค้า' ? {...item,index:true} : item
        )
        setSubpages(updated)
        const pline2 = document.getElementById('pline2')
        pline2.style.backgroundColor = 'orange'

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleClickType = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex + 1)
        const updated = Subpages.map(item => 
            item.label === 'ประเภทร้านค้า' && item.index == false ? {...item,index:true} : item
        )
        setSubpages(updated)
        const pline1 = document.getElementById('pline1')
        pline1.style.backgroundColor = 'orange'

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSend = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex + 1)

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const [Subpages,setSubpages] = useState([
        {label: 'ข้อมูลร้านค้า' ,height:754 ,content: <RestInfo onClick={handleClickType}/>,index:true},
        {label: 'ประเภทร้านค้า',height:574  ,content: <RestType onClick={handleClickBank} />,index:false},
        {label: 'บัญชีธนาคาร',height:488 ,content: <RestBank onClick={handleSend} />,index:false},
        {label: 'ส่งข้อมูลแล้ว',height:618 ,content: <Complete/>}
    ])

    const [Height,setHeight] = useState(0)

    useEffect(() => {
        setHeight(214 + Subpages[Tabindex].height)
        console.log(Subpages)
    },[Subpages,Tabindex])


return (
    <>
        {/* หน้าสร้าง Account */}
        <div className="flex justify-center">
            {/* Container */}
            <div style={{ height: Height }} className="flex flex-col items-center w-[1280px] mt-[64px] mb-[64px] gap-[32px]">
                {/* Content (header) */}
                <div className="flex flex-col items-center gap-[32px] w-[1216px] h-[214px]">
                    {/* header */}
                    <div className="flex flex-col items-center">
                        <Logo className="w-[48px] h-[48px]" />
                        <h2 className="mt-[24px]">เพิ่มข้อมูลร้านค้า</h2>
                    </div>

                    <div className="relative">
                         {/* Progress Line */}
                        <div className="absolute flex top-[15px] justify-center w-[992px] h-[72px]">
                            <div id="pline1" className="w-[336px] h-[2px] bg-[#EAECF0]"></div>
                            <div id="pline2" className="w-[336px] h-[2px] bg-[#EAECF0]"></div>
                        </div>

                        {/* Progess Step */}
                        <div className="relative flex gap-[16px] w-[992px] h-[72px] ">
                            {Subpages.slice(0,3).map((tab,index) => (
                            <div key={index} className="flex flex-col items-center justify-center gap-[16px] w-[320px] h-[72px]">
                                {(() => {
                                    if(tab.index == true){
                                        if(index == Tabindex){
                                            return <CurrentStep className="justify-center w-[32px] h-[32px]" />
                                        } 
                                        else if(index < Tabindex){
                                            return <PassStep className="justify-center w-[32px] h-[32px]" />
                                        }
                                    }
                                    else if(tab.index == false){ return <IncomingStep className="justify-center w-[32px] h-[32px]" /> } 
                                })()} 
                                {Tabindex === index ? <p className="text-[#FF8A00] font-[600]">{tab.label}</p> : <p className="text-[#344054] font-[600]">{tab.label}</p>} 
                            </div>
                            ))}
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
