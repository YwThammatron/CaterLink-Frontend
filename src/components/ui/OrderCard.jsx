import { Button } from "./button";
import { Badge } from "./badge";

import PropTypes from "prop-types";

function OrderCard(props) {

  const FormatDate = (date) => {
    let startcut = date.indexOf('-')
    let lastcut = date.lastIndexOf('-')

    let year = date.slice(0,startcut)
    let month = date.slice(startcut+1,lastcut)
    let day = date.slice(lastcut+1,date.length)

    return day + "/" + month + "/" + year
  }

  return (
    <div className="relative w-[1072px] h-[377px]">
        <div className="absolute flex flex-col w-[1072px] h-[377px] border-[1px] border-[#D0D5DD] bg-white rounded-[8px]">
            {/* Content Upside */}
            <div className="flex h-[49px] items-center">
                <p className="pl-[32px] pr-[16px] text-[14px] text-[#344054] font-[500]">{props.name}</p>
                {(() => {
                    if(props.status == "waiting for payment"){return <Badge className="w-auto h-[28px] pl-[12px] pr-[12px] text-[14px] text-[#B54708] font-[500] border-[1px] border-[#FEDF89] bg-[#FFFAEB] rounded-[1000px]">รอการชำระ</Badge>}
                    else if(props.status == "pending"){return <Badge className="w-auto h-[28px] pl-[12px] pr-[12px] text-[14px] text-[#363F72] font-[500] border-[1px] border-[#D5D9EB] bg-[#F8F9FC] rounded-[1000px]">รอร้านตอบรับ</Badge>}
                    else if(props.status == "preparing"){return <Badge className="w-auto h-[28px] pl-[12px] pr-[12px] text-[14px] text-[#026AA2] font-[500] border-[1px] border-[#B9E6FE] bg-[#F0F9FF] rounded-[1000px]">กำลังจัดเตรียม</Badge>}
                    else if(props.status == "done preparing"){return <Badge className="w-auto h-[28px] pl-[12px] pr-[12px] text-[14px] text-[#5925DC] font-[500] border-[1px] border-[#D9D6FE] bg-[#F4F3FF] rounded-[1000px]">จัดเตรียมสำเร็จ</Badge>}
                    else if(props.status == "finished"){return <Badge className="w-auto h-[28px] pl-[12px] pr-[12px] text-[14px] text-[#067647] font-[500] border-[1px] border-[#ABEFC6] bg-[#ECFDF3] rounded-[1000px]">สำเร็จแล้ว</Badge>}
                    else if(props.status == "cancel"){return <Badge className="w-auto h-[28px] pl-[12px] pr-[12px] text-[14px] text-[#B42318] font-[500] border-[1px] border-[#FECDCA] bg-[#FEF3F2] rounded-[1000px]">ยกเลิก</Badge>}
                })()}
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#EFEFEF]"></div>

            {/* Content Downside */}
            <div className="flex w-full h-[165px]">
                {/* Content */}
                <div className="flex flex-col w-[668px] h-[104px] gap-[12px] pt-[14px] mb-[16px] pl-[32px] pr-[205px]">
                    <p className="text-[16px] font-[700]">{props.food}</p>
                    <div className="grid gap-[16px] w-full text-[16px] text-[#475467] ">
                        <div className="grid">
                            <p className="font-[400]">{props.dtname}</p>
                            <p className="font-[400]">{props.description}</p>
                        </div>

                        <div className="grid">
                            <p className="font-[700] pb-[8px]">ค่าบริการ</p>
                            <p>ยอดสุทธิ {props.price} บาท</p>
                            <p className="font-[500] text-[#FF8A00]">ชำระมัดจำ {props.price/2} บาท</p>
                        </div>

                        <div className="grid">
                            <p className="font-[400] pb-[4px]">วันที่ {FormatDate(props.date)} เวลา {props.start.slice(0,5)} PM - {props.end.slice(0,5)} PM</p>
                            <p className="font-[400] pb-[16px]">{props.address}</p>
                            <p className="font-[400]">{props.message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {(() => {
            if(props.isHistory){
                return <div></div>
            }
            else{
                if(props.status == "pending"){
                    return <div className="relative w-[253px] flex top-[317px] left-[824px] gap-[11px]">
                        <Button id={"cancelbtn" + props.key} onClick={() => props.cancelClick(props.orderid)} className="w-[80px] h-[44px] text-[14px] shadow-none text-[#344054] bg-transparent rounded-[8px] hover:bg-transparent cursor-pointer">ปฎิเสธ</Button>
                        <Button id={"acceptbtn" + props.key} onClick={() => props.acceptClick(props.orderid,props.status)} className="w-[120px] h-[44px] text-[14px] bg-linear-to-r from-[#FF8A00] to-[#E9580A] rounded-[8px] hover:bg-transparent cursor-pointer">ตอบรับคำสั่งซื้อ</Button>
                    </div>
                }
                else if(props.status == "preparing"){
                    return <div className="relative w-[126px] flex top-[317px] left-[890px] gap-[11px]">
                        <Button id={"finishbtn" + props.key} className="w-[150px] h-[44px] text-[14px] text-[#FF8A00] bg-transparent border-[1px] border-[#FF8A00] rounded-[8px] hover:bg-transparent cursor-pointer" onClick={() => props.doneClick(props.orderid,props.status)}>จัดเตรียมสำเร็จแล้ว</Button>
                    </div>
                }
                else if(props.status == "done preparing"){
                    return <div className="relative w-[126px] flex top-[317px] left-[915px] gap-[11px]">
                        <Button id={"cancelbtn" + props.key} className="w-[117px] h-[44px] text-[14px] bg-linear-to-r from-[#FF8A00] to-[#E9580A] border-[1px] border-[#FF8A00] rounded-[8px] hover:cursor-pointer" onClick={() => props.finishClick(props.orderid,props.status)}>บริการเสร็จสิ้น</Button>
                    </div>
                }
            }
        })()}
    </div>
  );
}

OrderCard.propTypes = {
    key:PropTypes.number.isRequired,
    name:PropTypes.string.isRequired,
    food:PropTypes.string.isRequired,
    dtname:PropTypes.string.isRequired,
    description:PropTypes.string,
    message:PropTypes.string,
    price:PropTypes.number.isRequired,
    deposit:PropTypes.number.isRequired,
    date:PropTypes.string.isRequired,
    start:PropTypes.string.isRequired,
    end:PropTypes.string.isRequired,
    address:PropTypes.string.isRequired,
    status:PropTypes.string.isRequired,
    cancelClick:PropTypes.func,
    acceptClick:PropTypes.func,
    doneClick:PropTypes.func,
    finishClick:PropTypes.func,
    isHistory:PropTypes.bool.isRequired
}

export default OrderCard;
