import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Logo from "../components/ui/Logo";

function Signup() {
  const regData = useState({
    fname:"",
    lname:"",
    email:"",
    passwd:""
  })

  const handleReg = () => {
    //when click register
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
                <h2 className="mt-[24px]">สร้างบัญชีร้านค้า</h2>
              </div>

              {/* form */}
              <form className="grid gap-[20px] mt-[32px] mb-[24px]">
                <div className="grid h-fit gap-[6px]">
                  <label><p>อีเมล*</p></label>
                  <input 
                    type="email"
                    id="email"
                    value={regData.email}
                    placeholder="เพิ่ม Email"
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label><p>Password*</p></label>
                  <input 
                    type="password"
                    id="passwd"
                    value={regData.passwd}
                    placeholder="Create a password"
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>
              </form>

              {/* action */}
              <Button onClick={handleReg} className="w-[100%] bg-[#FF8A00] rounded-full">สร้างบัญชี</Button>

              {/* row */}
              <div className="flex justify-center gap-[5px] mt-[32px]">
                <p>มีบัญชีแล้ว ?</p>
                <a href="./login"><p className="font-bold text-[#FF8A00]">เข้าสู่ระบบ</p></a>
              </div>
            </div>
          </div>

          {/* Section (Image) */}
          <div className="w-[720px] h-[960px]">
            <img 
              src="https://images.unsplash.com/photo-1592868859049-dfdcd6c07c29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="signup-img"
              className="object-cover w-[720px] h-[960px]"
            />
          </div>
      </div>
    </>
  );
}

export default Signup;
