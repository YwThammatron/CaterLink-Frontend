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
    const [accessToken,setAccessToken] = useState("")
    const [userData,setUserData] =  useState({
        id:"",
        name:"",
        email:"",
        profile_picture:"",
        role:"restaurant",
        bio:"",
    })

    const [Restid,setRestid] = useState("")

    const [Tabindex,setTabindex] = useState(0)

    const [Restpayload,setRestpayload] = useState({
        name:"",
        description:"",
        tax_id:"",
        sub_location:"",
        location:""
    })
    
    const [Mainspayload,setMainspayload] = useState([])
    const [Eventspayload,setEventspayload] = useState([])
    const [Foodspayload,setFoodspayload] = useState([])
    
    const baseUrl = import.meta.env.VITE_BASE_URL

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

    const handleBackBank = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex - 1)
        const updated = Subpages.map(item => 
            item.label === 'ประเภทร้านค้า' ? {...item,index:true} : item
        )
        console.log(Subpages)
        setSubpages(updated)
        const pline2 = document.getElementById('pline2')
        pline2.style.backgroundColor = '#EAECF0'

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleBackType = (e) => {
        e.preventDefault()
        setTabindex(Tabindex => Tabindex - 1)
        const updated = Subpages.map(item => 
            item.label === 'ประเภทร้านค้า' && item.index == false ? {...item,index:false} : item
        )
        setSubpages(updated)
        const pline1 = document.getElementById('pline1')
        pline1.style.backgroundColor = '#EAECF0'

        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSend = async (e) => {
        e.preventDefault()
        //Create Restaurant
        const response = await axios.post(baseUrl + "/api/restaurants",Restpayload,{
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        })

        setRestid(response.data.id)
    }

    const handleSendCtgs = async () => {
        //Send Category Payloads
        for(let id of Mainspayload){
            response = await axios.post(baseUrl + "/api/restaurant-main-category-maps",{
                restaurant_id:Restid,
                main_category_id:id
            })
        }
        for(let id of Eventspayload){
            response = await axios.post(baseUrl + "/api/restaurant-event-category-maps",{
                restaurant_id:Restid,
                event_category_id:id
            })
        }
        for(let id of Foodspayload){
            response = await axios.post(baseUrl + "/api/restaurant-food-category-maps",{
                restaurant_id:Restid,
                food_category_id:id
            })
        }

        setTabindex(Tabindex => Tabindex + 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const checkCookie = () => {
        if(document.cookie){
            const parts = document.cookie.split(';').map(part => part.trim());
            // Extract values
            const tempdata = JSON.parse(parts.find(p => p.startsWith('userData=')).slice('userData='.length))
            const temptoken = parts.find(p => p.startsWith('accessToken=')).slice('accessToken='.length)
            setAccessToken(temptoken)
            setUserData(tempdata)
        }
    }

    const [Subpages,setSubpages] = useState([
        //use key instead of content to prevent one time render which Restcopy has to be updated
        {label: 'ข้อมูลร้านค้า',key: 'RestInfo',index:true},
        {label: 'ประเภทร้านค้า',key: 'RestType' ,index:false},
        {label: 'บัญชีธนาคาร',key: 'RestBank' ,index:false},
        {label: 'ส่งข้อมูลแล้ว',key: 'Complete'}
    ])

    const RenderContent = (key) => {
        switch(key){
            case 'RestInfo':
                return <RestInfo onClick={handleClickType} sendPayload={setRestpayload} receiveCopy={Restpayload} />
            case 'RestType':
                return <RestType 
                onClick={handleClickBank} 
                backClick={handleBackType} 
                sendMains={setMainspayload} 
                sendEvents={setEventspayload} 
                sendFoods={setFoodspayload}
                receiveCopymain={Mainspayload}
                receiveCopyevent={Eventspayload}
                receiveCopyfood={Foodspayload}
                />
            case 'RestBank':
                return <RestBank onClick={handleSend} backClick={handleBackBank} />
            case 'Complete':
                return <Complete/>
            default:
                return null
        }
    }

    useEffect(() => {
        checkCookie()
    },[])

    useEffect(() => {
        if(Restid){ handleSendCtgs() }
    },[Restid])

return (
    <>
        {/* หน้าสร้าง Account */}
        <div className="flex justify-center h-[155vh]">
            {/* Container */}
            <div className="flex flex-col items-center w-[1280px] h-[968px] pt-[64px] gap-[32px]">
                {/* Content (header) */}
                <div className="flex flex-col items-center gap-[32px] w-[1216px] h-[214px]">
                    {/* header */}
                    <div className="flex flex-col items-center">
                        <div className="w-[48px] h-[48px]">
                            <Logo />
                        </div>
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
                {RenderContent(Subpages[Tabindex].key)}
            </div>
        </div>
    </>
  );
}

export default CreateAccount;
