import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import Logo from "../components/ui/Logo";

function SignupCustomer() {
  const [Regdata,setRegdata] = useState({
    email:"",
    password:"",
    name:"",
    role:"customer",
    bio:""
  })

  const baseUrl = import.meta.env.VITE_BASE_URL

  const clearInputs = () => {
    const passwdcf = document.getElementById("passwdcf")

    setRegdata({
        email:"",
        password:"",
        name:"",
        role:"customer",
        bio:""  
    })

    passwdcf.value = ""
  }

  const handleChange = (e) => {
    const { id,value } = e.target
    setRegdata((data) => ({
      ...data,
      [id]:value
    }))
  }

  const handleReg = async () => {
    //when click signup
    const passwdcf = document.getElementById("passwdcf")
    //confirm password
    if(Regdata.email == "" || Regdata.password == "" || Regdata.name == ""){
      window.alert("System : Invalid Input.")
    }
    else{
        if(Regdata.password != passwdcf.value){
            window.alert("System : Password confirmation error.")
            clearInputs()
        }
        else{
          try{
              const response = await axios.post(baseUrl + "/api/auth/signup",Regdata)
              console.log(response.data)

              window.alert("System : User created successfully.")

              //go to customer page
              // window.location.href = "./"
          }
          catch(error){
              if(error.response){
                  window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
              }
              else if(error.request){
                  window.alert("System : No Response Received : ",error.request)
              }
              else{
                  console.log(error)
                  window.alert("System : Internal Server Error.")
              }

              clearInputs()
          }
        }

        
    }
  }

  return (
    <>
      {/*หน้าลงทะเบียน*/}
      <div className="flex justify-center">
          {/* Container */}
          <div className="flex justify-center items-center w-[50%] h-[100vh]">
            {/* Content (outer) */}
            <div className="w-[360px] h-[618px]">

              {/* header */}
              <div className="flex flex-col items-center">
                <div className="w-[48px] h-[48px]">
                  <Logo/>
                </div>
                <h2 className="mt-[24px]">สร้างบัญชีใหม่</h2>
              </div>

              {/* form */}
              <form className="grid gap-[20px] mt-[32px] mb-[24px]">
                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>ชื่อผู้ใช้</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="text"
                    id="name"
                    value={Regdata.name}
                    onChange={handleChange}
                    placeholder="เพิ่มชื่อผู้ใช้"
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>อีเมล</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="email"
                    id="email"
                    value={Regdata.email}
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
                    value={Regdata.password}
                    placeholder="เพิ่มรหัสผ่าน"
                    onChange={handleChange}
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>

                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>ยืนยันรหัสผ่าน</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="password"
                    id="passwdcf"
                    placeholder="ยืนยันรหัสผ่าน"
                    className="pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                </div>
              </form>

              {/* action */}
              <Button onClick={handleReg} className="w-[100%] h-[44px] bg-linear-to-r from-[#FF8A00] to-[#E9580A] rounded-[8px] hover:cursor-pointer">สร้างบัญชี</Button>

              {/* row */}
              <div className="flex justify-center gap-[5px] mt-[32px]">
                <p>มีบัญชีแล้ว ?</p>
                <a href="./custlogin"><p className="font-bold text-[#FF8A00]">เข้าสู่ระบบ</p></a>
              </div>
            </div>
          </div>

          {/* Section (Image) */}
          <div className="w-[50%] h-[100vh]">
            <img 
              src="https://images.unsplash.com/photo-1637059395523-d5a35541d544?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="signup-img"
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
      </div>
    </>
  );
}

export default SignupCustomer;
