import axios from "axios";
import { useState,useEffect } from "react";

import OrderCard from "../../components/ui/OrderCard";

import { Inbox } from "lucide-react";

const allstatus = [
  "pending",
  "waiting for payment",
  "preparing",
  "done preparing",
  "finished",
  "cancel"
]

function Purchase() {
    const [accessToken,setAccessToken] = useState("")
    const [userData,setUserData] =  useState({
        id:"",
        name:"",
        email:"",
        profile_picture:"",
        role:"restaurant",
        bio:"",
    })

    const [Restid,setRestid] = useState("")

    const [AllOrders,setAllOrders] = useState([])
    const [Orders,setOrders] = useState([])
    const [Names,setNames] = useState([])
    const [Package,setPackage] = useState([])
    const [Packagedtname,setPackagedtname] = useState([])
    const [Packagedtdes,setPackagedtdes] = useState([])

    const [Purpage,setPurpage] = useState(1)

    const numorder = 3 

    const baseUrl = import.meta.env.VITE_BASE_URL

    const checkCookie = () => {
        if(document.cookie){
            const parts = document.cookie.split(';').map(part => part.trim());
            // Extract values
            const tempdata = JSON.parse(parts.find(p => p.startsWith('userData=')).slice('userData='.length))
            const temptoken = parts.find(p => p.startsWith('accessToken=')).slice('accessToken='.length)
            setAccessToken(temptoken)
            setUserData(tempdata)
        }
    }

     const getRest = async () => {
        const response = await axios.get(baseUrl + "/api/restaurants")
        for(let restaurant of response.data){
            if(userData.id == restaurant.user_id){
                setRestid(restaurant.id)
                break
            }
        }
    }

    const getOrders = async () => {
      const response = await axios.get(baseUrl+"/api/orders/restaurant/" + Restid,{
        headers:{
          Authorization: `Bearer ${accessToken}`,
        }
      })
      setAllOrders(response.data)
    }

    const filterOrders = () => {
      let temporders = []
      for(let object of AllOrders){
        if(object.status == "waiting for payment" || object.status == "pending" || object.status == "preparing" || object.status == "done preparing"){
          temporders.push(object)
        }
      }

      setOrders(temporders)
    }

    const getDetails = async () => {
      var response
      let tempname = []
      let temppackage = []
      let temppackagedtdes = []
      let temppackagedtname = []

      for(let object of Orders){
        response = await axios.get(baseUrl + "/api/users/" + object.user_id,{
          headers:{
            Authorization: `Bearer ${accessToken}`
          }
        })

        tempname.push(response.data.name)

        response = await axios.get(baseUrl + "/api/packages/" + object.package_id)

        temppackage.push(response.data.name)

        response = await axios.get(baseUrl + "/api/package-details/" + object.package_detail_id)

        temppackagedtname.push(response.data.name)
        temppackagedtdes.push(response.data.description)
      }

      setNames(tempname)
      setPackage(temppackage)
      setPackagedtdes(temppackagedtdes)
      setPackagedtname(temppackagedtname)
    }

    const handleCancel = async (orderid) => {
        let isconfirm = window.confirm("System : Are you sure to cancel this order?")
        if(isconfirm){
          try{
            const response = await axios.put(baseUrl + "/api/orders/" + orderid + "/status",{
              status:"cancel"
            },
            {
              headers:{
                Authorization: `Bearer ${accessToken}`
              }
            })

            window.alert(`System : Order id ${orderid} status updated to \"cancel\"`)
            window.location.reload()
          }
          catch(error){
            if(error.response){
              window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
            }
          }
        }
    }

    const handleAccept = async (orderid,orderstatus) => {
        let isconfirm = window.confirm("System : Are you sure to update order status?")
        if(isconfirm){
          try{
            const response = await axios.put(baseUrl + "/api/orders/" + orderid + "/status",{
              status:allstatus[allstatus.indexOf(orderstatus) + 1]
            },
            {
              headers:{
                Authorization: `Bearer ${accessToken}`
              }
            })

            window.alert(`System : Order id ${orderid} status updated to \"${allstatus[allstatus.indexOf(orderstatus) + 1]}\"`)
            window.location.reload()
          }
          catch(error){
            if(error.response){
              window.alert(`Code ${error.response.status} : ${error.response.data.error}`)
            }
          }
          
        }
    }

    useEffect(() => {
        checkCookie()
    },[])

    useEffect(() => {
        getRest()
    },[userData])

    useEffect(() => {
        getOrders()
    },[Restid])

    useEffect(() => {
      filterOrders()
    },[AllOrders])

    useEffect(() => {
        getDetails()
    },[Orders])

  return (
    <>
      {/* หน้ารายการสั่งซื้อ */}
      <div className="flex flex-col h-[1210px]">
        {Orders.length == 0 ? 
        <div className="grid justify-center items-center h-[120px]">
            <Inbox className="grid justify-self-center w-[50px] h-[50px] text-[#667085]"/>
            <p className="grid justify-self-center pb-[20px] text-[#667085]">ไม่มีคำสั่งซื้อในขณะนี้</p>
        </div> 
        :
        <div className="flex flex-col gap-[39px]">
        {Orders.map((content,index) => {
          if(index >= (Purpage-1)*numorder && index < (Purpage)*numorder){
            return (
              <div key={index}>
                <OrderCard
                  key={content.id}
                  name={Names.at(index)}
                  dtname={Packagedtname.at(index)}
                  message={content.message}
                  status={content.status}
                  food={Package.at(index)}
                  description={Packagedtdes.at(index)}
                  price={content.total_price}
                  deposit={content.deposit}
                  date={content.event_date}
                  start={content.start_time}
                  end={content.end_time}
                  address={content.location}
                  cancelClick={() => handleCancel(content.id)}
                  acceptClick={() => handleAccept(content.id,content.status)}
                  finishClick={() => handleAccept(content.id,content.status)}
                  doneClick={() => handleAccept(content.id,content.status)}
                  isHistory={false}
                />
            </div>
            )
          }
        })}
        </div>
        }
      </div>

      {/* Page Navigator */}
      {Math.ceil(Orders.length/numorder) == 1 || Orders.length == 0?
        <div></div>
        :
        <div className="flex gap-[10px]">
          <p>หน้า</p>
          {Array.from({length : Math.ceil(Orders.length/numorder)},(content,index) => (
            <div onClick={() => setPurpage(index+1)} className={`text-[16px] ${index+1 == Purpage ? 'text-[#FF8A00]' : 'text-black'} hover:text-[#FF8A00] cursor-pointer`}>{index+1}</div>
          ))

          }
        </div>
      }
    </>
  );
}

export default Purchase;
