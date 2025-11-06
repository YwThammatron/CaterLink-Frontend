import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

import Catering from "../../components/ui/Catering";
import Snackbox from "../../components/ui/SnackBox";
import FoodStall from "../../components/ui/FoodStall";

const mainctgs = [
    {label: 'จัดเลี้ยง',id:"dbbadc65-cf21-43f1-9a8d-19a15806e53c",icon:<Catering className="w-[12px] h-[12px] text-[#F78E1E]"/>,detail:"Buffet, ซุ้มอาหาร, Cocktail, Coffee Break"},
    {label: 'snackbox',id:"6f06aedc-cbaa-4f6f-bd9a-7442b8e956a9",icon:<Snackbox className="w-[12px] h-[12px] text-[#F78E1E]"/>,detail:"Mealbox, Bakery SnackBox, Variety SnackBox"},
    {label: 'ซุ้มอาหาร',id:"58b9a2f8-4ebb-4ca9-b2e5-53d72795f47d",icon:<FoodStall className="w-[12px] h-[12px] text-[#F78E1E]"/>,detail:"ตั้งโต๊ะ, รถเข็น, ซุ้มอาหาร, Food Truck"}
]

const eventtypes = [
    {label: "Birthday Party",id:"f934d4fc-8eaa-460d-832b-2b93b24208fc"},
    {label: "งานแต่ง",id:"874b27d1-073e-4eb0-84da-cd5b4a66ed50"},
    {label: "งานเลี้ยงองค์กร",id:"3edc9fd5-973a-4ce1-aa3c-463f7348de32"},
    {label: "งานประชุม/สัมมนา",id:"98c522c8-9b03-410c-9093-f1aa469eee54"},
    {label: "งานปาร์ตี้",id:"5843de35-50f8-4f9c-a065-0798223fe375"},
    {label: "งานบุญ",id:"05f4ccc4-9e30-4fe1-82c0-84b0e74775e9"},
    {label: "งานศพ",id:"19e0e801-ab6b-4a7b-8403-427e0b8df163"}
]

const foodtypes = [
    {label: "อาหารไทย",id:"1b2b2f81-af49-4c8c-ba89-7cb909f65465"},
    {label: "อาหารจีน",id:"ecf2ed77-fb86-4ef0-8977-7ad17f989474"},
    {label: "อาหารคาว",id:"3c666417-5320-4f59-9c13-f2ffba7d9a5b"},
    {label: "ขนมและของหวาน",id:"fa7f9fe9-fd0f-4a68-a292-e4d87605e3ec"},
    {label: "อาหารญี่ปุ่น",id:"c6e5f712-102a-4e57-8921-668bf57ce21d"},
    {label: "อาหารนานาชาติ",id:"e9cb621d-3239-46ba-a47d-8fe156f9173a"}
]

function UserAccount() {
    const [Mainlist,setMainlist] = useState([])
    const [Eventlist,setEventlist] = useState([])
    const [Foodlist,setFoodlist] = useState([])

    const [MainLeft,setMainLeft] = useState({
        add:[],//keep payloads for post
        delete:[]//keep mapid parameter for delete
    })
    const [EventLeft,setEventLeft] = useState({
        add:[],
        delete:[]
    })
    const [FoodLeft,setFoodLeft] = useState({
        add:[],
        delete:[]
    })

    const [Restinfo,setRestinfo] = useState({
        id:"",
        name: "",
        description: "",
        user_id: "",
        tax_id: "",
        sub_location: "",
        location: "",
    })

    const [Restctgs,setRestctgs] = useState({
        mainCategories: [],
        foodCategories: [],
        eventCategories: [],
    })

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

    const getRest = async () => {
        let response = await axios.get(baseUrl + "/api/users")
        console.log(response.data)
        response = await axios.get(baseUrl + "/api/restaurants")
        console.log(response.data)
        for(let restaurant of response.data){
            if(userData.id == restaurant.user_id){
                console.log(restaurant.name,userData.id,restaurant.user_id)
                //clone object bc if delete property of Restinfo then Restctgs that property will be deleted too
                setRestinfo(restaurant)
                setRestctgs(structuredClone(restaurant))
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

    const setCategories = async () => {
        let mains = []
        let events = []
        let foods = []

        //delete unwant fields from payload
        delete Restinfo.mainCategories
        delete Restinfo.eventCategories
        delete Restinfo.foodCategories
        delete Restinfo.user_id
        delete Restinfo.totalReview
        delete Restinfo.reviews
        delete Restinfo.images
        delete Restinfo.avgRating

        for(let object of Restctgs.mainCategories){
            mains.push(object.id)
        }
        for(let object of Restctgs.eventCategories){
            events.push(object.id)
        }
        for(let object of Restctgs.foodCategories){
            foods.push(object.id)
        }

        setMainlist(mains)
        setEventlist(events)
        setFoodlist(foods)
    }

    const handleChange = (e) => {
        const { id,value } = e.target
        setRestinfo((data) => ({
            ...data,
            [id]:value
        }))
    }

    const Searchmapid = async (ctgid,type) => {
        var response
        var output
        if(type == "main"){
            response = await axios.get(baseUrl + "/api/restaurant-main-category-maps")
            for(let object of response.data){
                if(object.restaurant_id == Restinfo.id && object.main_category_id == ctgid){
                    output = object.id
                    break
                }
            }
        }
        else if(type == "event"){
            response = await axios.get(baseUrl + "/api/restaurant-event-category-maps")
            for(let object of response.data){
                if(object.restaurant_id == Restinfo.id && object.event_category_id == ctgid){
                    output = object.id
                    break
                }
            }
        }
        else if(type == "food"){
            response = await axios.get(baseUrl + "/api/restaurant-food-category-maps")
            for(let object of response.data){
                if(object.restaurant_id == Restinfo.id && object.food_category_id == ctgid){
                    output = object.id
                    break
                }
            }
        }

        return output
    }
    
    const CompareList = async () => {
        let maincount = false
        let eventcount = false
        let foodcount = false

        let mains = {
            add:[],//keep payloads for post
            delete:[]//keep mapid parameter for delete
        }
        let events = {
            add:[],
            delete:[]
        }
        let foods = {
            add:[],
            delete:[]
        }

        for(let newid of Mainlist){
            //if new id not in old list -> add
            for(let object of Restctgs.mainCategories){
                if(object.id == newid){
                    maincount = true
                }
            }
            if(!maincount){
                mains.add.push({
                    restaurant_id:Restinfo.id,
                    main_category_id:newid
                })
            }

            maincount = false
        }
        //if new id in old list -> neutral
        for(let object of Restctgs.mainCategories){
            //if old id not in new list -> delete
            if(!Mainlist.includes(object.id)){
                mains.delete.push(await Searchmapid(object.id,"main"))
            }
        }

        for(let newid of Eventlist){
            //if new id not in old list -> add
            for(let object of Restctgs.eventCategories){
                if(object.id == newid){
                    eventcount = true
                }
            }
            if(!eventcount){
                events.add.push({
                    restaurant_id:Restinfo.id,
                    event_category_id:newid
                })
            }

            eventcount = false
        }
        //if new id in old list -> neutral
        for(let object of Restctgs.eventCategories){
            //if old id not in new list -> delete
            if(!Eventlist.includes(object.id)){
                events.delete.push(await Searchmapid(object.id,"event"))
            }
        }

        for(let newid of Foodlist){
            //if new id not in old list -> add
            for(let object of Restctgs.foodCategories){
                if(object.id == newid){
                    foodcount = true
                }
            }
            if(!foodcount){
                foods.add.push({
                    restaurant_id:Restinfo.id,
                    food_category_id:newid
                })
            }

            foodcount = false
        }
        //if new id in old list -> neutral
        for(let object of Restctgs.foodCategories){
            //if old id not in new list -> delete
            if(!Foodlist.includes(object.id)){
                foods.delete.push(await Searchmapid(object.id,"food"))
            }
        }

        setMainLeft(mains)
        setEventLeft(events)
        setFoodLeft(foods)
    }
    
    const handleSave = async () => {
        var response
        let isconfirm = window.confirm("System : Are you sure to save your changes?")
        if(Restinfo.id != "" && Restinfo.id != undefined && isconfirm){
            //Update Restaurant Infomation by put method
            try{
                response = await axios.put(baseUrl + "/api/restaurants/" + Restinfo.id,Restinfo,{
                    headers: 
                    {
                        Authorization: `Bearer ${accessToken}`,
                    }
                })
            }
            catch(error){
                if(error.response){
                    window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
                }
            }

            //Update Main/Event/Food Categories by post and delete method

            for(let object of MainLeft.add){
                response = await axios.post(baseUrl + "/api/restaurant-main-category-maps",object)
            }
            for(let id of MainLeft.delete){
                response = await axios.delete(baseUrl + "/api/restaurant-main-category-maps/" + id)
            }


            for(let object of EventLeft.add){
                response = await axios.post(baseUrl + "/api/restaurant-event-category-maps",object)
            }
            for(let id of EventLeft.delete){
                response = await axios.delete(baseUrl + "/api/restaurant-event-category-maps/" + id)
            }


            for(let object of FoodLeft.add){
                response = await axios.post(baseUrl + "/api/restaurant-food-category-maps",object)
            }
            for(let id of FoodLeft.delete){
                response = await axios.delete(baseUrl + "/api/restaurant-food-category-maps/" + id)
            }

            window.location.reload()

        } 
    }
    
    useEffect(() => {
        checkCookie()
    },[])

    useEffect(() => {
        if(userData){getRest()}
    },[userData])

    useEffect(() => {
        if(Restctgs){setCategories()}
    },[Restinfo,Restctgs])

    useEffect(() => {
        CompareList()
    },[Mainlist,Eventlist,Foodlist])

    return (
        <>
            {/* Table */}
                <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] h-[995px] bg-white">
                    {/* Content (Restaurant Infomation) */}
                    <div className="flex w-[1056px] h-[549px]">
                        <p className="text-[14px] font-[600] w-[312px]">ข้อมูลร้านค้า</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่อบริษัทหรือร้านค้า</p></label>
                                <input 
                                type="text"
                                id="name"
                                value={Restinfo.name}
                                onChange={handleChange}
                                placeholder="กรุณาระบุ"
                                className="h-[48px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>

                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">คำอธิบายร้าน</p></label>
                                <textarea
                                id="description"
                                value={Restinfo.description}
                                onChange={handleChange}
                                placeholder="กรุณากรอกข้อมูล"
                                className="resize-none h-[126px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>

                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">เลขประจำตัวผู้เสียภาษี</p></label>
                                <input 
                                type="text"
                                id="tax_id"
                                value={Restinfo.tax_id}
                                onChange={handleChange}
                                placeholder="กรุณาระบุ"
                                className="h-[48px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>

                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่ออาคาร/ถนน</p></label>
                                <input 
                                type="text"
                                id="sub_location"
                                value={Restinfo.sub_location}
                                onChange={handleChange}
                                placeholder="กรุณาระบุ"
                                className="h-[48px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>

                            <div className="grid h-fit gap-[6px]">
                                <label><p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">สถานที่ตั้งบริษัทหรือร้านค้า</p></label>
                                <textarea
                                id="location"
                                value={Restinfo.location}
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
                    <form className="grid w-[512px] h-[300px] mb-[64px] gap-[24px]">
                        <div className="grid gap-[6px]">
                            <label><p className="flex h-[21px] font-[500] text-[14px] text-[#6D6E71]">ประเภทการจัดเลี้ยง</p></label>
                            <div className="grid h-[91px] gap-[8px]">
                                {mainctgs.map((content, index) => (
                                    <div key={index} className="flex items-center gap-[10px]">
                                        <div
                                            key={index}
                                            onClick={() => {
                                            if (!Mainlist.includes(content.id)) {
                                                setMainlist(prev => [...prev, content.id])
                                            }
                                            else {
                                                setMainlist(prev => prev.filter(i => i !== content.id))
                                            }
                                            }}
                                            className={`flex w-fit h-[25px] gap-[6px] items-center pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                                            ${Mainlist.includes(content.id) ? 'border-[#FF8A00]' : 'text-black'}
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
                                        if (!Eventlist.includes(content.id)) {
                                        setEventlist(prev => [...prev, content.id])
                                        }
                                        else {
                                        setEventlist(prev => prev.filter(i => i !== content.id))
                                        }    
                                    }}
                                    className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                                        ${Eventlist.includes(content.id) ? 'border-[#FF8A00]' : 'text-black'}
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
                                    if (!Foodlist.includes(content.id)) {
                                        setFoodlist(prev => [...prev, content.id])
                                    }
                                    else {
                                        setFoodlist(prev => prev.filter(i => i !== content.id))
                                    }
                                    }}
                                    className={`h-[25px] pt-[3.3px] pl-[8px] pr-[8px] border-[1px] border-[#F2F4F7] rounded-[8px] 
                                    ${Foodlist.includes(content.id) ? 'border-[#FF8A00]' : 'text-black'}
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
                    <div className="flex gap-[12px] ml-[885px]">
                        <Button
                        className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                        onClick={() => window.location.reload()}
                        >
                            ยกเลิก
                        </Button>
                        
                        <Button 
                        className="w-[114px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"
                        onClick={handleSave}
                        >
                            บันทึกข้อมูล
                        </Button>
                    </div>
                </div>
        </>
    )
}

export default UserAccount;
