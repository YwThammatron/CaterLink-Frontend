import axios from "axios";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


function CreateCategory({ cancelClick }) {
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
    const [Packagectgid,setPackagectgid] = useState("")

    const [PackageCtgs,setPackageCtgs] = useState([])

    const [Payload,setPayload] = useState({
        name:"",
        restaurant_id:""
    })

    const baseUrl = import.meta.env.VITE_BASE_URL

    const handleChange = (e) => {
        const {id,value} = e.target
        setPayload((data) => ({
            ...data,
            [id]:value
        }))
    }

    const handleChangeSave = async () => {
        //when click save
        let isconfirm = window.confirm("System : Are you sure to add this package category?")
        for(let object of PackageCtgs){
            if(Payload.name == object.name){
                window.alert("System : Package category duplicated name.")
                setPayload((data) => ({ ...data,name:"" }))
                return
            }
        }
        if(Payload.name != "" && isconfirm){
            try{
                const response = await axios.post(baseUrl + "/api/package-categories",Payload)
                window.location.reload()
            }
            catch(error){
                if(error.response){
                    window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
                }
            }
            
        }
    }

    const handleDelete = async () => {
        //when click delete
        let isconfirm = window.confirm("System : Are you sure to delete this package category?")
        console.log(Packagectgid)
        if(Packagectgid != "" && isconfirm){
            try{
                const response = await axios.delete(baseUrl + "/api/package-categories/" + Packagectgid)
                window.alert(`System : Package category id ${Packagectgid} deleted.`)
                window.location.reload()
            }
            catch(error){
                if(error.response){
                    window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
                }
            }
            
        }
    }

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

    const getPackageCtgs = async () => {
        const response = await axios.get(baseUrl + "/api/package-categories/restaurant/" + Restid)
        setPackageCtgs(response.data)
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

    useEffect(() => {
            checkCookie()
        },[])
        
    useEffect(() => {
        if(userData){getRest()}
    },[userData])

    useEffect(() => {
        if(Restid){
            setPayload((data) => ({
                ...data,
                restaurant_id:Restid
            }))

            getPackageCtgs()
        }
    },[Restid])

    return (
        <>
            {/* Content */}
            <div className="flex flex-col gap-[32px] w-auto h-auto mb-[32px]">
                {/* Breadcrumbs */}
                <Breadcrumb className="pl-[calc(50%-552px)]">
                    <BreadcrumbList className="text-[14px]">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="./packagectg">จัดการแพคเกจ</BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />

                        <BreadcrumbItem>
                            <BreadcrumbLink className="text-[#D87500] font-[600] hover:cursor-default">จัดการหมวดหมู่แพคเกจ</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>


                {/* Table */}
                <div className="grid self-center justify-center items-center h-[110px] border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] bg-white">
                    {/* Content (Create Package Category) */}
                    <div className="flex w-[1056px] h-[62px]">
                        <p className="text-[14px] font-[600] w-[312px]">เพิ่มหมวดหมู่แพคเกจ</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label className="flex h-[20px]"><p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่อหมวดหมู่แพคเกจ</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                <input 
                                type="text"
                                id="name"
                                value={Payload.name}
                                onChange={handleChange}
                                placeholder="เพิ่มชื่อแพคเกจ"
                                className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>
                        </form>
                    </div>
                </div>
                
                {/* Action */}
                <div className="flex items-center ml-[933px] mb-[20px] w-[1104px] h-[48px]">
                    {/* Right */}
                    <div className="flex gap-[12px]">
                        <Button
                        className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                        onClick={cancelClick}
                        >
                            ยกเลิก
                        </Button>
                        
                        <Button 
                        className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"

                        onClick={handleChangeSave}
                        >
                            สร้างหมวดหมู่
                        </Button>
                    </div>
                </div>

                {/* Table */}
                <div className="grid self-center justify-center items-center h-[110px] border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] bg-white">
                    {/* Content (Create Package Category) */}
                    <div className="flex w-[1056px] h-[62px]">
                        <p className="text-[14px] font-[600] w-[312px]">ลบหมวดหมู่แพคเกจ</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label className="flex h-[20px]"><p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">หมวดหมู่แพคเกจ</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                <div className="relative">
                                    <select 
                                    id="category_id" 
                                    className="appearance-none w-[512px] h-[40px] pl-[14px] pr-[42px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                    value={Packagectgid}
                                    onChange={(event) => setPackagectgid(event.target.value)}
                                    >
                                        <option value="default" selected hidden>เลือกหมวดหมู่แพคเกจ</option>
                                        {PackageCtgs.map((content,index) => {
                                            return (
                                                <option key={index} value={content.id}>{content.name}</option>
                                            )
                                        })}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                                    </div>
                                </div>
                            </div> 

                        </form>
                    </div>
                </div>
                
                {/* Action */}
                <div className="flex items-center ml-[933px] mb-[691px] w-[1104px] h-[48px]">
                    {/* Right */}
                    <div className="flex gap-[12px]">
                        <Button
                        className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                        onClick={cancelClick}
                        >
                            ยกเลิก
                        </Button>
                        
                        <Button 
                        className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"

                        onClick={handleDelete}
                        >
                            ลบหมวดหมู่
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCategory