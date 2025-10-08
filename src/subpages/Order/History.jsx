import axios from "axios";
import { useState,useEffect } from "react";

import OrderCard from "../../components/ui/OrderCard";

const orders = [
    {
        name:"มิ่งบุญ ร้อยเรียง",
        status:"สำเร็จแล้ว",
        food:"บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand",
        number:100,
        detail:"รายการอาหาร 6 อย่าง ฟรีน้ำดื่ม, ข้าวหอมมะลิ, ของหวาน/ผลไม้รวม, จำนวนอาหารรวมทั้งหมด 8-10 รายการ",
        price:26100,
        deposit:13500,
        date:"6/09/2025",
        start:"05:00",
        end:"10:00",
        address:"อาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC) เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง",
    },

    {
        name:"มิ่งบุญ ร้อยเรียง",
        status:"ยกเลิก",
        food:"บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand",
        number:100,
        detail:"รายการอาหาร 6 อย่าง ฟรีน้ำดื่ม, ข้าวหอมมะลิ, ของหวาน/ผลไม้รวม, จำนวนอาหารรวมทั้งหมด 8-10 รายการ",
        price:26100,
        deposit:13500,
        date:"6/09/2025",
        start:"05:00",
        end:"10:00",
        address:"อาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC) เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง",
    },
]

function History() {
    const [accessToken,setAccessToken] = useState("")
    const [Orders,setOrders] = useState([])

    const [Names,setNames] = useState([])

    const baseUrl = import.meta.env.VITE_BASE_URL

    const checkCookie = () => {
        if(document.cookie){
            const parts = document.cookie.split(';').map(part => part.trim());
            // Extract values
            const tempdata = JSON.parse(parts.find(p => p.startsWith('userData=')).slice('userData='.length))
            const temptoken = parts.find(p => p.startsWith('accessToken=')).slice('accessToken='.length)
            setAccessToken(temptoken)
        }
    }

    const getOrders = async () => {
      let response = await axios.get(baseUrl+"/api/orders/me?status=all",{
        headers:{
          Authorization: `Bearer ${accessToken}`,
        }
      })
      console.log(response.data)
      setOrders(response.data)
    }

    const getNames = async () => {
      var response
      let tempname = []
      for(let object of Orders){
        response = await axios.get(baseUrl + "/api/users/" + object.user_id,{
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        })

        tempname.push(response.data.name)
      }

      setNames(tempname)
    }

    useEffect(() => {
        checkCookie()
    },[])

    useEffect(() => {
        if(accessToken){ getOrders() }
    },[accessToken])

    useEffect(() => {
      getNames()
    },[Orders])

  return (
    <>
      {/* หน้าประวัติ */}
      <div className="flex flex-col gap-[39px]">
        {Orders.map((content,index) => {
            if(content.status == "finished" || content.status == "cancel"){
              return (
                <div key={index}>
                  <OrderCard
                    key={index}
                    name={Names.at(index)}
                    status={content.status}
                    food={content.food}
                    number={content.participants}
                    detail={content.message}
                    price={content.total_price}
                    deposit={content.deposit}
                    date={content.event_date}
                    start={content.start_time}
                    end={content.end_time}
                    address={content.location}
                    isHistory={true}
                  />
              </div>
              )
            }
        })}
      </div>
    </>
  );
}

export default History;
