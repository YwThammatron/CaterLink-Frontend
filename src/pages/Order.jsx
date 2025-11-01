import axios from "axios";
import { useState,useEffect } from "react";

import SidebarCustom from "../components/ui/Sidebar-custom";
import Purchase from "../subpages/Order/Purchase";
import History from "../subpages/Order/History";

const subpages = [
    {label: 'รายการสั่งซื้อ',Content: <Purchase />},
    {label: 'ประวัติ',Content: <History /> }
]

function Order() {
    const [Tabindex,setTabindex] = useState(0)

    const [accessToken,setAccessToken] = useState("")
    const [userData,setUserData] =  useState({
        id:"",
        name:"",
        email:"",
        profile_picture:"",
        role:"restaurant",
        bio:"",
    })

    const baseUrl = import.meta.env.VITE_BASE_URL

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

    const getOrders = async () => {
      let response = await axios.get(baseUrl+"/api/orders/me?status=all",{
        headers:{
          Authorization: `Bearer ${accessToken}`,
        }
      })
      console.log(response.data)
      response = await axios.get(baseUrl+"/api/orders")
      console.log(response.data)
      response = await axios.get(baseUrl+"/api/users")
      console.log(response.data)
    }

    useEffect(() => {
        checkCookie()
    },[])

    useEffect(() => {
        if(accessToken){getOrders()}
    },[accessToken])

  return (
    <>
      {/*หน้าคำสั่งซื้อ*/}
      <div className="flex flex-row w-[100%]">
          <SidebarCustom />
          {/* Container */}
          <div className="w-[84%] bg-[#F9FAFB]">
            {/* Header Navigation */}
            <div className="flex flex-col w-auto h-[63px] pl-[calc(50%-536px-32px)] border-b-[1px] border-[#EDEEF0] justify-center mb-[32px]">
                <p className="text-[24px] font-[600]">คำสั่งซื้อ</p>
            </div>

            {/* Tab */}
            <div className="flex justify-self-center w-[1072px] gap-[16px] mb-[39px] border-b">
                    {subpages.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setTabindex(index)}
                        className={`pt-[8.5px] pb-[8.5px] ${
                        Tabindex === index
                            ? 'border-b-[2px] border-black font-semibold'
                            : 'text-black'
                        } hover:cursor-pointer `}
                    >
                        {tab.label}
                    </button>
                    ))}
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-[24px] w-auto h-[1300px] mb-[64px]">
                {subpages[Tabindex].Content}
            </div>
          </div>
      </div>
    </>
  );
}

export default Order;
