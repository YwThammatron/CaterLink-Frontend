import axios from "axios";
import { useState,useEffect } from "react";

import OrderCard from "../../components/ui/OrderCard"

import { Inbox } from "lucide-react";

function History() {
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

    const [Hispage,setHispage] = useState(1)

    const numorder = 3

    const [Names,setNames] = useState([])
    const [Package,setPackage] = useState([])
    const [Packagedtdes,setPackagedtdes] = useState([])
    const [Packagedtname,setPackagedtname] = useState([])

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
        if(object.status == "finished" || object.status == "cancel"){
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


    useEffect(() => {
        checkCookie()
    },[])

    useEffect(() => {
        getRest()
    },[userData])

    useEffect(() => {
      filterOrders()
    },[AllOrders])

    useEffect(() => {
        getOrders()
    },[Restid])

    useEffect(() => {
      getDetails()
    },[Orders])

  return (
    <>
      {/* หน้าประวัติ */}
      <div className="flex flex-col h-[1210px]">
        {Orders.length == 0 ? 
        <div className="grid justify-center items-center h-[120px]">
            <Inbox className="grid justify-self-center w-[50px] h-[50px] text-[#667085]"/>
            <p className="grid justify-self-center pb-[20px] text-[#667085]">ยังไม่มีประวัติคำสั่งซื้อ</p>
        </div> 
        :
        <div className="flex flex-col gap-[39px]">
        {Orders.map((content,index) => {
            if(index >= (Hispage-1)*numorder && index < Hispage*numorder){
              return (
                <div key={index}>
                  <OrderCard
                    key={index}
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
                    isHistory={true}
                  />
              </div>
              )
            }
        })}
        </div>
        }
      </div>

      {/* Page Navigator */}
      {Math.ceil(Orders.length/numorder) == 1 || Orders.length == 0 ?
        <div></div>
        :
        <div className="flex gap-[10px]">
          <p>หน้า</p>
          {Array.from({length : Math.ceil(Orders.length/numorder)},(content,index) => (
            <div onClick={() => setHispage(index+1)} className={`text-[16px] ${index+1 == Hispage ? 'text-[#FF8A00]' : 'text-black'} hover:text-[#FF8A00] cursor-pointer`}>{index+1}</div>
          ))

          }
        </div>
      }
      
    </>
  );
}

export default History;
