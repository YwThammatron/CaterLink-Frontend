import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Logo from "../components/ui/Logo";

function Login() {
  const loginData = useState({
    email:"",
    passwd:""
  })

  const handleLogin = () => {
    //when click Login
  }

  return (
    <>
      {/*หน้าลงทะเบียน*/}
      <div className="flex justify-center">
          {/* Container */}
          <div className="flex justify-center items-center w-[720px] h-[864px] mb-[96px]">
            {/* Content (outer) */}
            <div className="w-[360px] h-[602px]">

              {/* header */}
              <div className="flex flex-col items-center">
                <Logo className="w-[48px] h-[48px]" />
                <h2 className="mt-[24px]">เข้าสู่ระบบร้านค้า</h2>
              </div>

              {/* form */}
              <form className="grid gap-[20px] mt-[32px] mb-[24px]">
                <div className="grid h-fit gap-[6px]">
                  <label><p>Email</p></label>
                  <input 
                    type="email"
                    id="email"
                    value={loginData.email}
                    placeholder="เพิ่ม Email"
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label><p>Password</p></label>
                  <input 
                    type="password"
                    id="passwd"
                    value={loginData.passwd}
                    placeholder="Input password"
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>
              </form>

              {/* action */}
              <Button onClick={handleLogin} className="w-[100%] bg-[#FF8A00] rounded-full">เข้าสู่ระบบ</Button>

              {/* row */}
              <div className="flex justify-center gap-[5px] mt-[32px]">
                <p>ยังไม่มีบัญชี ?</p>
                <a href="./signup"><p className="font-bold text-[#FF8A00]">สร้างบัญชีใหม่</p></a>
              </div>
            </div>
          </div>

          {/* Section (Image) */}
          <div className="w-[720px] h-[960px]">
            <img 
              src="https://plus.unsplash.com/premium_photo-1683707120444-7318975c7ba6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="login-img"
              className="object-cover w-[720px] h-[960px]"
            />
          </div>
      </div>
    </>
  );
}

export default Login;
