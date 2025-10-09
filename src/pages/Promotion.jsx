import axios from "axios";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

import SidebarCustom from "../components/ui/Sidebar-custom";

function Promotion() {
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
    const [Restctgs,setRestctgs] = useState([])
    const [Restpackages,setRestpackages] = useState([])
    const [Package,setPackage] = useState({
        name:"",
        category_id:"",
        discount:0,
        start_discount_date:"",
        end_discount_date:""
    })

  const [Payload,setPayload] = useState({
    packagectgid:"",
    packageid:"",
    discount:0,
    startdate:"",
    enddate:""
  }) 

  const baseUrl = import.meta.env.VITE_BASE_URL

  const handleChange = (e) => {
    const { id,value } = e.target
    setPayload((data) => ({
      ...data,
      [id]:value
    }))
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    let isconfirm = window.confirm("System : Are you sure to add promotion to this package?")
    if(isconfirm){
        if(Payload.discount == 0 || Payload.startdate == "" || Payload.enddate == "" || Payload.packageid == "" || Payload.packagectgid == ""){
            window.alert("System : Invalid input.")
            clearInputs()
        }
        else{
            if(Payload.discount < 10){
                window.alert("System : Discount has to be at least 10.")
                setPayload((data) => ({...data,discount:0}))
            }
            else{
                const response = await axios.get(baseUrl + "/api/packages/" + Payload.packageid)
                setPackage({
                    name:response.data.name,
                    category_id:response.data.category_id,
                    discount:response.data.discount,
                    start_discount_date:response.data.start_discount_date,
                    end_discount_date:response.data.end_discount_date
                })
            }
        }
    }
  }


  const getPackageCtg = async () => {
    const response = await axios.get(baseUrl + "/api/package-categories/restaurant/" + Restid)
    setRestctgs(response.data)
  }

  const getPackage = async () => {
    const response = await axios.get(baseUrl + "/api/packages/category/" + Payload.packagectgid + "/" + Restid)
    setRestpackages(response.data)
  }

  const clearInputs = () => {
    setPayload((data) => ({
        ...data,
        discount:0,
        startdate:"",
        enddate:""
    }))
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

  const getRest = async () => {
        const response = await axios.get(baseUrl + "/api/restaurants")
        for(let restaurant of response.data){
            if(userData.id == restaurant.user_id){
                setRestid(restaurant.id)
                break
            }
        }
    }

    const changePayload = () => {
        setPackage((data) => ({
            ...data,
            discount:parseInt(Payload.discount),
            start_discount_date:Payload.startdate,
            end_discount_date:Payload.enddate
        }))
    }

    const sendPayload = async () => {
        console.log(Package)
        try{
            const response = await axios.put(baseUrl + "/api/packages/" + Payload.packageid,Package,{
                headers:{
                    Authorization: `Bearer ${accessToken}`
                }
            })

            window.alert("System : Promotion added successfully.")
            window.location.reload()
        }
        catch(error){
            if(error.response){
                window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
            }
        }
        
    }

  useEffect(() => {
    checkCookie()
  },[])

  useEffect(() => {
    if(userData){ getRest() }
  },[userData])

  useEffect(() => {
    if(Restid){ getPackageCtg() }
  },[Restid])

  useEffect(() => {
    if(Payload.packagectgid != ""){ getPackage() }
    const packageselect = document.getElementById("package")
    if(packageselect){
        if(Payload.packagectgid == ""){
            packageselect.disabled = true
        }
        else{
            packageselect.disabled = false
        }
    }

    
  },[Payload.packagectgid])

  useEffect(() => {
    if(Package){ changePayload() }
  },[Package.name])

  useEffect(() => {
    if(Package.discount != 0){ sendPayload() }
  },[Package.discount])


  return (
    <>
      {/*หน้าสร้าง Promotion*/}
      <div className="flex flex-row">
          <SidebarCustom />
          {/* Container */}
          <div className="w-[84%] h-auto bg-[#F9FAFB]">
            {/* Header Navigation */}
            <div className="flex flex-col w-auto h-[63px] pl-[calc(50%-552px)] justify-center border-b-[1px] border-[#EDEEF0] mb-[32px]">
                <p className="text-[24px] font-[600]">สร้างโปรโมชัน</p>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-[24px] w-auto h-[1024px] items-center mb-[32px]">
                {/* Table */}
                <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] h-[540px] bg-white">
                    {/* Content (Promotion Set) */}
                    <div className="flex gap-[32px] w-[1056px] h-[62px]">
                        <div className="grid w-[280px]">
                            <p className="text-[14px] font-[600]">การตั้งโปรโมชัน</p>
                            <p className="text-[14px] font-[400]">ราคาของแพคเกจที่เลือกจะถูกลดตามเปอร์เซ็นต์ กำหนดขั้นต่ำ 10%</p>
                        </div>
                        
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label className="flex"><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">จำนวนลด &#40;เปอร์เซ็นต์&#41;</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                <input 
                                type="number"
                                id="discount"
                                value={Payload.discount}
                                onChange={handleChange}
                                placeholder="เพิ่มตัวเลข"
                                className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>
                        </form>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>

                    {/* Content (Promotion Period) */}
                    <div className="flex gap-[32px] w-[1056px] h-[68px]">
                        <div className="grid w-[280px]">
                            <p className="text-[14px] font-[600]">ช่วงเวลาโปรโมชัน</p>
                            <p className="text-[14px] font-[400]">โปรโมชันจะเริ่มเวลา 00.01 น. และจบ 23.59 น. ของวันที่กำหนด</p>
                        </div>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[6px]">
                            <div className="flex gap-[16px]">
                                <div className="grid gap-[8px]">
                                    <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">วันที่เริ่ม<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                                    <input 
                                    type="date"
                                    id="startdate"
                                    value={Payload.startdate}
                                    onChange={handleChange}
                                    placeholder="เลือกวัน"
                                    className="w-[247px] h-[40px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md outline-none"
                                    />
                                </div>

                                <div className="grid gap-[8px]">
                                    <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">วันที่จบ<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                                    <input 
                                    type="date"
                                    id="enddate"
                                    value={Payload.enddate}
                                    onChange={handleChange}
                                    placeholder="เลือกวัน"
                                    className="w-[247px] h-[40px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Divider */}
                    <div className="w-[1056px] h-[1px] bg-[#EAECF0]"></div>

                    {/* Content (Package Infomation) */}
                    <div className="flex w-[1056px] h-[148px]">
                        <p className="text-[14px] w-[312px] font-[600]">ข้อมูลแพคเกจ</p>
                        {/* Input Field */}
                        <form className="grid w-[512px]">
                            <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">หมวดหมู่แพคเกจ<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                            <div className="relative">
                                <select id="packagectgid" value={Payload.packagectgid} onChange={handleChange} className="appearance-none w-[512px] h-[40px] text-[14px] pl-[12px] pr-[44px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md">
                                    <option value="default" selected hidden>เลือกหมวดหมู่แพคเกจ</option>
                                    {Restctgs.map((content,index) => (
                                        <option key={"ctg"+index} value={content.id}>{content.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                                </div>
                            </div>

                            <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">แพคเกจ<p className="text-[#D50A0A] pl-[4px]">*</p></p></label>
                            <div className="relative">
                                <select id="packageid" value={Payload.packageid} onChange={handleChange} className="appearance-none w-[512px] h-[40px] text-[14px] pl-[12px] pr-[44px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md">
                                    <option id="packagedefault" value="default" selected hidden>เลือกแพคเกจ</option>
                                    {Restpackages.map((content,index) => (
                                        <option key={"package"+index} value={content.id}>{content.name}</option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-[642px] w-[1104px] h-[48px]">
                    {/* Right */}
                    <div className="flex gap-[12px] ml-[885px]">
                        <Button
                        className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                        onClick={() => window.location.reload()}
                        >
                            ยกเลิก
                        </Button>
                        
                        <Button 
                        className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"
                        onClick={handleCreate}
                        >
                            สร้างโปรโมชัน
                        </Button>
                    </div>
                </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Promotion
