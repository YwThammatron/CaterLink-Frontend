import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Logo from "../components/ui/Logo";

function LoginCustomer() {
  const [Logindata,setLogindata] = useState({
    email:"",
    password:""
  })

  const baseUrl = import.meta.env.VITE_BASE_URL

  const handleChange = (e) => {
    const { id,value } = e.target
    setLogindata((data) => ({
      ...data,
      [id]:value
    }))
  }

  const clearInputs = () => {
    setLogindata({
        email:"",
        password:""
    })
  }

  const handleLogin = async () => {
    //when click Login
    try{
        const response = await axios.post(baseUrl + "/api/auth/signin",Logindata)

        if(response.data.userData.role == "customer"){
          //delete old cookie
          document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          //build cookie to keep token alive (1 hour)
          document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=3600; secure; samesite=strict`
          document.cookie = `userData=${JSON.stringify(response.data.userData)}; path=/; max-age=3600; secure; samesite=strict`
          
          //go to customer homepage
          // window.location.href = "./"
        }
        else if(response.data.userData.role == "restaurant"){
          window.alert("System : Wrong login portal for restaurant. System will redirect you to restaurant portal.")
          window.location.href = "./restlogin"
        }

        
    }
    catch(error){
        if(error.response){
            window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
        }
        else if(error.request){
            window.alert("System : No Response Received : ",error.request)
        }
        else{
            window.alert("System : Internal Server Error.")
        }

        clearInputs()
    }
  }


  return (
    <>
      {/*หน้าเข้าสู่ระบบ (สำหรับร้านค้าและลูกค้า)*/}
      <div className="flex justify-center">
          {/* Container */}
          <div className="flex justify-center items-center w-[50%] h-[100vh]">
            {/* Content (outer) */}
            <div className="w-[360px] h-[430px]">

              {/* header */}
              <div className="flex flex-col items-center">
                <div className="w-[48px] h-[48px]">
                  <Logo/>
                </div>
                <h2 className="mt-[24px]">เข้าสู่ระบบ</h2>
              </div>

              {/* form */}
              <form className="grid gap-[20px] mt-[32px] mb-[24px]">
                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>อีเมล</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="email"
                    id="email"
                    value={Logindata.email}
                    onChange={handleChange}
                    placeholder="เพิ่มอีเมล"
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>รหัสผ่าน</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="password"
                    id="password"
                    value={Logindata.password}
                    placeholder="เพิ่มรหัสผ่าน"
                    onChange={handleChange}
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>
              </form>

              {/* action */}
              <Button onClick={handleLogin} className="w-[100%] h-[44px] bg-linear-to-r from-[#FF8A00] to-[#E9580A] rounded-[8px] hover:cursor-pointer">เข้าสู่ระบบ</Button>

              {/* row */}
              <div className="flex justify-center gap-[5px] mt-[32px]">
                <p>ยังไม่มีบัญชี ?</p>
                <a href="./custsignup"><p className="font-bold text-[#FF8A00]">สร้างบัญชีใหม่</p></a>
              </div>
            </div>
          </div>

          {/* Section (Image) */}
          <div className="w-[50%] h-[100vh]">
            <img 
              src="https://plus.unsplash.com/premium_photo-1723867267202-169dfe3b197a?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="login-img"
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
      </div>
    </>
  );
}

export default LoginCustomer;
