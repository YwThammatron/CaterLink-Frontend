import axios from "axios";
import { useState,useEffect } from "react";
import { Button } from "@/components/ui/button";

import Logo from "../components/ui/Logo";

function SignupRestaurant() {
  const [Regdata,setRegdata] = useState({
    email:"",
    password:"",
    name:"",
    role:"restaurant",
    bio:""
  })

  const [Logindata,setLogindata] = useState({
    email:"",
    password:""
  })

  const baseUrl = import.meta.env.VITE_BASE_URL

  const handleChange = (e) => {
    const { id,value } = e.target
    setRegdata((data) => ({
      ...data,
      [id]:value
    }))
  }

  const clearInputs = () => {
    setRegdata({
        email:"",
        password:"",
        name:"",
        role:"restaurant",
        bio:""
    })
  }

  const handleReg = async () => {
    //when click signup

    //confirm password
    const passwdcf = document.getElementById("passwdcf").value
    console.log(passwdcf,Regdata.password)
    if(Regdata.email == "" || Regdata.password == "" || Regdata.name == ""){ 
      window.alert("System : Invalid input.")
      clearInputs()
    }
    else{
      if(Regdata.password != passwdcf){
        window.alert("System : Password confirm error.")
        clearInputs()
      }
      else{
        try{
          const response = await axios.post(baseUrl + "/api/auth/signup",Regdata)
          console.log(response.data)

          //set login payload to login to get accesstoken 
          setLogindata({
            email:Regdata.email,
            password:Regdata.password
          })
        }
        catch(error){
          if(error.response){
            window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
          }
        }
        
      }
    }
  }

  const handleLogin = async () => {
    try{
      const response = await axios.post(baseUrl + "/api/auth/signin",Logindata)

      //build cookie to keep token alive (3 hours)
      document.cookie = `accessToken=${response.data.accessToken}; path=/; max-age=10800; secure; samesite=strict`
      document.cookie = `userData=${JSON.stringify(response.data.userData)}; path=/; max-age=10800; secure; samesite=strict`

      //go to create account page
      window.location.href = "./createaccount"
    }
    catch(error){
      if(error.response){
        window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
      }
    }
  }

  useEffect(() => {
    if(Logindata.email != "" && Logindata.password != ""){ handleLogin() }
  },[Logindata])

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
                <h2 className="mt-[24px]">สร้างบัญชีร้านค้า</h2>
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
                <a href="./restlogin"><p className="font-bold text-[#FF8A00]">เข้าสู่ระบบ</p></a>
              </div>
            </div>
          </div>

          {/* Section (Image) */}
          <div className="w-[50%] h-[100vh]">
            <img 
              src="https://images.unsplash.com/photo-1592868859049-dfdcd6c07c29?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="signup-img"
              className="object-cover w-[100%] h-[100%]"
            />
          </div>
      </div>
    </>
  );
}

export default SignupRestaurant;
