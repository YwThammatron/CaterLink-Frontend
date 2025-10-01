import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Logo from "../components/ui/Logo";

function Login() {
  const [Logindata,setLogindata] = useState({
    email:"",
    passwd:""
  })

  const handleChange = (e) => {
    const { id,value } = e.target
    setLogindata((data) => ({
      ...data,
      [id]:value
    }))
  }

  const handleLogin = () => {
    //when click Login
  }

  return (
    <>
      {/*หน้าเข้าสู่ระบบ*/}
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
                <h2 className="mt-[24px]">เข้าสู่ระบบร้านค้า</h2>
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
                    id="passwd"
                    value={Logindata.passwd}
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
                <a href="./signup"><p className="font-bold text-[#FF8A00]">สร้างบัญชีใหม่</p></a>
              </div>
            </div>
          </div>

          {/* Section (Image) */}
          <div className="w-[50%] h-[100vh]">
            <img 
              src="https://plus.unsplash.com/premium_photo-1683707120444-7318975c7ba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="login-img"
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
      </div>
    </>
  );
}

export default Login;
