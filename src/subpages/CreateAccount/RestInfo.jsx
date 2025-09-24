import axios from "axios";
import { useState } from "react";

function RestInfo({ onClick }) {

  const [Payload,setPayload] = useState({
    name:"",
    detail:"",
    vatid:"",
    location:"",
    address:""
  })

  const handleChange = (e) => {
    const { id,name } = e.target
    setPayload((data) => (
      ...data,[id]:name
    ))
  }

return (
    <>
          {/* Container */}
          <div className="flex justify-center items-center w-[720px] h-[864px] mb-[96px]">
            {/* Content (outer) */}
            <div className="w-[360px] h-[602px]">

              {/* header */}
              <div className="flex flex-col items-center">
                <h2 className="mt-[24px]">สร้างบัญชีร้านค้า</h2>
              </div>

              {/* form */}
              <form className="grid gap-[20px] mt-[32px] mb-[24px]">
                <div className="grid h-fit gap-[6px]">
                  <label className="flex"><p>อีเมล</p><p className="text-[#D92D20]">*</p></label>
                  <input 
                    type="email"
                    id="email"
                    value={Payload.name}
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
                    value={Payload.detail}
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
              <Button onClick={onClick} className="w-[100%] bg-[#FF8A00] rounded-full">ต่อไป</Button>
            </div>
          </div>
    </>
  );
}

export default RestInfo;
