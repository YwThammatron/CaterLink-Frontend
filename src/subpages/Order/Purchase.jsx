import axios from "axios";
import { useState,useEffect } from "react";

import OrderCard from "../../components/ui/OrderCard";

function Purchase() {
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
      const response = await axios.get(baseUrl+"/api/orders/me?status=all",{
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

    const handleCancel = (orderid) => {
        let isconfirm = window.confirm("System : Are you sure to cancel this order?")
        if(isconfirm){
          
        }
    }

    const handleAccept = (orderid) => {
        window.alert(`Order ${food} go to booking`)
    }

    const handleFinish = (orderid) => {

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
      {/* หน้ารายการสั่งซื้อ */}
      <div className="flex flex-col gap-[39px]">
        {Orders.map((content,index) => {
          if(content.status == "waiting for payment" || content.status == "pending" || content.status == "preparing"){
            return (
              <div key={index}>
                <OrderCard
                  key={content.id}
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
                  cancelClick={() => handleCancel(content.id)}
                  acceptClick={() => handleAccept(content.id)}
                  finishClick={() => handleFinish(content.id)}
                  isHistory={false}
                />
            </div>
            )
          }
        })}
      </div>
    </>
  );
}

export default Purchase;
