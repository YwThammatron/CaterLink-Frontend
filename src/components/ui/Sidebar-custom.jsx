import { useState,useEffect } from "react"
import Logo from "./Logo";
import { ChevronUp,ChevronDown } from "lucide-react";

function SidebarCustom(){
    const [accessToken,setAccessToken] = useState("")
    const [userData,setUserData] =  useState({
        id:"",
        name:"",
        email:"",
        profile_picture:"",
        role:"restaurant",
        bio:"",
    })

    const [Isshow,setIsshow] = useState(false)

    const checkCookie = () => {
        if(document.cookie){
            const parts = document.cookie.split(';').map(part => part.trim());
            // Extract values
            const tempdata = JSON.parse(parts.find(p => p.startsWith('userData=')).slice('userData='.length))
            const temptoken = parts.find(p => p.startsWith('accessToken=')).slice('accessToken='.length)
            setAccessToken(temptoken)
            setUserData(tempdata)
        }
        else{
            window.alert("System : Please Login First.")
            window.location.href = "./restlogin"
        }
    }

    const checkUrl = () => {
        const currentpage = window.location.pathname.slice(1,window.location.pathname.length)
        const link = document.getElementById(currentpage)
        link.style.color = "#F78E1E"
    }

    const handleLogout = (e) => {
        e.preventDefault()
        let islogout = window.confirm("System : Are you sure to Logout from CaterLink?")
        if(islogout){
            setAccessToken("")
            setUserData({
                id:"",
                name:"",
                email:"",
                profile_picture:"",
                role:"restaurant",
                bio:"",
            })
            
            //delete cookie
            document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

            window.location.href = "./restlogin"
        }
        else{ setIsshow(false) }
           
    }

    const handleMenu = () => {
        const logoutdiv = document.getElementById("logoutdiv")
        Isshow == true ? logoutdiv.style.display = "flex" : logoutdiv.style.display = "none"
        setIsshow(!Isshow)
    }

    useEffect(() => {
        checkCookie()
        checkUrl()
    },[])

    return (
        <div className="w-[16%] h-auto bg-[#F9FAFB] shadow-[inset_-24px_0_60px_rgba(0,0,0,0.03)]">
            {/* Logo wrap */}
            <div className="flex justify-center items-center pt-[19px] pb-[19px]">
                <div className="w-[32px] h-[32px]">
                    <Logo/>
                </div>
                
                <h1 className="logo font-[700] pl-[16px] tracking-tight">CaterLink</h1>
            </div>

            {/* Content */}
            <div className="pl-[36px] text-[14px]">
                <a href="./order"><p id="order" className="pt-[13.5px] pb-[13.5px]">คำสั่งซื้อ</p></a>
                <a href="./packagectg"><p id="packagectg" className="pt-[13.5px] pb-[13.5px]">จัดการแพคเกจ</p></a>
                <a href="./promotion"><p id="promotion" className="pt-[13.5px] pb-[13.5px]">จัดการโปรโมชัน</p></a>
                <a href="./writeblog"><p id="writeblog" className="pt-[13.5px] pb-[13.5px]">บทความ</p></a>
                <a href="./setting"><p id="setting" className="pt-[13.5px] pb-[13.5px]">จัดการร้านค้า</p></a>
            </div>

            {/* Profile (Frame 154) */}
            <div className="flex flex-col fixed bottom-[32px] w-[212px] h-auto">
                <div id="logoutdiv" className="flex hidden justify-center w-[100px] h-[50px] ml-[120px] bg-white">
                    <button onClick={handleLogout} className="hover:text-[#F78E1E] cursor-pointer">Logout</button>
                </div>
                <div className="flex w-[212px] h-[48px] ml-[14px] mr-[14px] pl-[8px] pr-[8px] gap-[8px] justify-between items-center bottom-[32px] bg-white rounded-[12px] border-[#F2F4F7] border-[1px]">
                    <img
                        src={userData.profile_picture == "" ? "https://plus.unsplash.com/premium_photo-1714589991638-235c15633f59?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : userData.profile_picture}
                        alt=""
                        className="w-[32px] h-[32px] rounded-[50%]"
                    />
                    <p className="font-[14px]">{userData.name}</p>
                    {Isshow == true ? <ChevronDown onClick={handleMenu} className="text-[#F78E1E] w-[24px] h-[24px] hover:cursor-pointer" /> : <ChevronUp onClick={handleMenu} className="text-[#F78E1E] w-[24px] h-[24px] hover:cursor-pointer" />}
                </div>
            </div>
            
        </div>
    );
}

export default SidebarCustom;