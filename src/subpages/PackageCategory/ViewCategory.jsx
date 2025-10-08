import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function ViewCategory({ sendClick }) {
    const [accessToken,setAccessToken] = useState("")
    const [userData,setUserData] =  useState({
        id:"",
        name:"",
        email:"",
        profile_picture:"",
        role:"restaurant",
        bio:"",
    })

    const [Packages,setPackages] = useState([])
    const [Restid,setRestid] = useState("")

    const baseUrl = import.meta.env.VITE_BASE_URL

    const getRest = async () => {
        const response = await axios.get(baseUrl + "/api/restaurants")
        console.log(response.data)
        for(let restaurant of response.data){
            if(userData.id == restaurant.user_id){
                setRestid(restaurant.id)
                break
            }
        }
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

    const getPackages = async () => {
        try{
            const response = await axios.get(baseUrl + "/api/package-categories/restaurant/" + Restid)
            console.log(response.data)
            setPackages(response.data)
        }
        catch(error){
            if(error.response.status != 404){
                window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
            }
        }
        
    }

    useEffect(() => {
        checkCookie()
    },[])
    
    useEffect(() => {
        if(userData){getRest()}
    },[userData])

    useEffect(() => {
        if(Restid){getPackages()}
    },[Restid])

    return (
        <>
                    {/* Content */}
                    <div className="flex flex-col gap-[24px] w-auto h-[1024px] items-center mb-[32px]">
                        {/* Table */}
                        <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] bg-white">
                            {/* Content (Package Category) */}
                            <div className="grid w-[1040px] pt-[8px]">
                                <Accordion className="w-full" type="single" collapsible>
                                {Packages.map((content,i) => {
                                    return (
                                            <AccordionItem key={"accordion"+i} value={content.name}>
                                                    <AccordionTrigger className="no-underline h-[56px] pl-[14px] flex items-center text-[16px] text-[#101828] font-[500] hover:no-underline cursor-pointer">
                                                        <span>{content.name}</span>
                                                        <span className="ml-auto text-[14px] text-[#475467]">{content.packages.length} แพคเกจ</span>
                                                    </AccordionTrigger>
                                                        
                                                    <AccordionContent className="pl-[32px] pb-[16px] flex flex-col gap-[12px]">
                                                        {content.packages.map((data,j) => {
                                                            return (
                                                                <Accordion key={"accordion"+data.name+j} className="w-full" type="single" collapsible>
                                                                    <AccordionItem key={"package"+j} value={data.name}>
                                                                        <AccordionTrigger className="no-underline h-[24px] flex items-center text-[16px] text-[#101828] font-[500] hover:no-underline cursor-pointer">
                                                                            <span>{data.name}</span>
                                                                        </AccordionTrigger>

                                                                        <AccordionContent className="pt-[16px] pl-[32px] pb-[16px] flex flex-col gap-[12px]">
                                                                            {data.package_details.map((subdata,k) => {
                                                                                return (
                                                                                    <div key={"packageDetail"+k} className="relative flex text-[#475467]">
                                                                                        <p className="absolute left-0 text-[16px] font-[500]">{subdata.name}</p>
                                                                                        <p className="relative ml-auto text-[14px] font-[400]">{subdata.price} บาท/ที่</p>
                                                                                    </div>
                                                                                )
                                                                            })}
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                </Accordion>
                                                            )
                                                        })}
                                                    </AccordionContent>
                                            </AccordionItem>
                                    )
                                })}
                                </Accordion>
                            </div>
                        </div>
                        
                        {/* Action */}
                        <div className="flex items-center gap-[642px] w-[1104px] h-[48px]">
                            {/* Right */}
                            <div className="flex gap-[12px] ml-[915px]">
                                <Button 
                                className="w-[185px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"

                                onClick={sendClick}
                                >
                                    สร้างหมวดหมู่แพคเกจ
                                </Button>
                            </div>
                        </div>
                    </div>
        </>
    )
}

export default ViewCategory