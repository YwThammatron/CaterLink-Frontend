import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { data } from "react-router-dom";


function CreatePackage() {
    const [Payload,setPayload] = useState({
        name:"",
        category:"",
        sets:[
            {
                id:1,
                name:"",
                price:"",
                detail:""
            }
        ]
    })

    const [Index,setIndex] = useState(2)
    const [Tableheight, setTableheight] = useState(497)
    const [Contentheight, setContentheight] = useState(207)

    const handleChange = (e) => {
        const {id,value} = e.target
        setPayload((data) => ({
            ...data,
            [id]:value
        }))
    }

    const handleChangeSet = (e,index) => {
        const {name,value} = e.target
        setPayload((data) => ({
            ...data,
            sets: data.sets.map(set => set.id == index ? {...set , [name]:value} : set)
        }))
    }

    const handleClickAdd = () => {
        Payload.sets.push({
            id:Index,
            name:"",
            price:"",
            detail:""
        })

        console.log(Payload.sets)

        setIndex(Index+1)
        setTableheight(497 + (250*(Index-1)))
        setContentheight(207 + (250*(Index-1)))
    }

    const handleClickDelete = () => {
        setIndex(2)
        Payload.sets.length = 0
        Payload.sets.push({
            id:1,
            name:"",
            price:"",
            detail:""
        })

        console.log(Payload.sets)

        setTableheight(497)
        setContentheight(207)
    }

    const handleChangeCancel = () => {
        //When click cancel
    }

    const handleChangeSave = () => {
        //when click save
    }

    return (
        <>
            {/* Content */}
            <div className="flex flex-col gap-[24px] w-auto h-auto items-center mb-[32px]">
                {/* Table */}
                <div style={{ height: Tableheight }} className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] bg-white">
                    {/* Content (Package Infomation) */}
                    <div className="flex w-[1056px] h-[144px]">
                        <p className="text-[14px] font-[600] w-[312px]">ข้อมูลแพคเกจ</p>
                        {/* Input Field */}
                        <form className="grid w-[512px] gap-[16px]">
                            <div className="grid h-fit gap-[6px]">
                                <label className="flex h-[20px]"><p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">ชื่อแพคเกจ</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                <input 
                                type="text"
                                id="name"
                                value={Payload.name}
                                onChange={handleChange}
                                placeholder="เพิ่มชื่อแพคเกจ"
                                className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                />
                            </div>
                
                            <div className="grid h-fit gap-[6px]">
                                <label className="flex h-[20px]"><p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">หมวดหมู่แพคเกจ</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                <div className="relative">
                                    <select 
                                    id="category" 
                                    className="appearance-none w-[512px] h-[40px] pl-[14px] pr-[42px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                    value={Payload.category}
                                    onChange={handleChange}
                                    >
                                        <option value="default" selected hidden>เลือกหมวดหมู่แพคเกจ</option>
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                        <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                                    </div>
                                </div>
                            </div>          
                        </form>
                    </div>
                                    
                    {/* Divider */}
                    <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>
                
                    {/* Content (Package Set Infomation) */}
                    <div style={{ height: Contentheight }} className="flex">
                        <div className="grid w-[312px] h-[40px]">
                            <p className="text-[14px] font-[600]">ชุดอาหาร</p>
                            <p className="text-[14px]">ต้องมีอย่างน้อย 1 ชุดอาหาร</p>
                        </div>
                        {/* Input Field */}
                        <form className="grid gap-[32px] w-[512px]">
                            {Payload.sets.map((content, index) => (
                            <div key={index} className="grid h-[215px] gap-[16px]">
                                <p className="text-[14px] font-[500] text-black">ชุดอาหารที่ {content.id}</p>
                                
                                <div className="flex gap-[16px]">
                                    <div className="grid w-[248px] h-fit gap-[6px]">
                                        <label className="flex"><p className="h-[20px] text-[14px] font-[500] text-[#6D6E71]">ชื่อชุดอาหาร</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                        <input 
                                        type="text"
                                        name="name"
                                        id={"name"+content.id}
                                        value={Payload.sets[index].name}
                                        onChange={(event) => handleChangeSet(event,content.id)}
                                        placeholder="เพิ่มชุดข้อมูลอาหาร"
                                        className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                        />
                                    </div>

                                    <div className="grid w-[248px] h-fit gap-[6px]">
                                        <label className="flex"><p className="h-[20px] text-[14px] font-[500] text-[#6D6E71]">ราคาต่อหน่วย</p><p className="text-[#D50A0A] pl-[3px]">*</p></label>
                                        <input 
                                        type="number"
                                        name="price"
                                        id={"price"+content.id}
                                        value={Payload.sets[index].price}
                                        onChange={(event) => handleChangeSet(event,content.id)}
                                        placeholder="เพิ่มตัวเลข"
                                        className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                        />
                                    </div>
                                </div>

                                <div className="grid h-fit gap-[6px]">
                                    <label><p className="h-[20px] text-[14px] font-[500] text-[#6D6E71]">คำอธิบาย</p></label>
                                    <textarea 
                                    name="detail"
                                    id={"detail"+content.id}
                                    value={Payload.sets[index].detail}
                                    onChange={(event) => handleChangeSet(event,content.id)}
                                    placeholder="เพิ่มคำอธิบาย"
                                    className="resize-none w-[512px] h-[67px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                                    />
                                </div>
                            </div>
                            ))}
                        </form>

                        {/* Package Set Add Button */}
                        <div className="flex pl-[39px] gap-[8px] w-[193px] h-[44px]">
                            <Button 
                            className="w-[68px] h-[44px] rounded-[8px] text-[#475467] text-[16px] bg-transparent hover:bg-transparent cursor-pointer transition"
                            onClick={handleClickDelete}
                            >
                                ลบทั้งหมด
                            </Button>
                            <Button 
                            className="w-[117px] h-[44px] rounded-[8px] text-[#F78E1E] text-[16px] bg-transparent border-[1px] border-[#F78E1E] hover:bg-transparent cursor-pointer transition"
                            onClick={handleClickAdd}
                            >
                                เพิ่มชุดอาหาร
                            </Button>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>
                </div>
                
                {/* Action */}
                <div className="flex items-center gap-[642px] w-[1104px] h-[48px]">
                    {/* Right */}
                    <div className="flex gap-[12px] ml-[885px]">
                        <Button
                        className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                        onClick={handleChangeCancel}
                        >
                            ยกเลิก
                        </Button>
                        
                        <Button 
                        className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-[#F78E1E] hover:cursor-pointer transition"
                        onClick={handleChangeSave}
                        >
                            สร้างแพคเกจ
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreatePackage