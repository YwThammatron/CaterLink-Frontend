import { Button } from "./button";

import PropTypes from "prop-types";

function OrderCard(props) {
  return (
    <div className="relative w-[912px] h-[214px]">
        <div className="absolute flex flex-col w-[912px] h-[214px] bg-white rounded-[8px]">
            {/* Content Upside */}
            <div className="flex h-[49px] items-center">
                <p className="pl-[21px] pr-[20px] text-[14px] font-[700]">{props.name}</p>
                <p className="text-[14px] font-[400]">{props.orderid}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-[#EFEFEF]"></div>

            {/* Content Downside */}
            <div className="flex w-full h-[165px]">
                {/* Content */}
                <div className="flex flex-col w-[668px] h-[112px] gap-[12px] pt-[14px] pb-[39px] pl-[46px] pr-[205px]">
                    <p className="text-[16px] font-[700]">{props.food}</p>
                    <div className="grid w-full">
                        <div className="flex">
                            <p className="text-[16px] font-[500] pr-[6px]">จำนวนแขก</p>
                            <p className="text-[16px] font-[400] pr-[16px]">{props.number} ท่าน</p>
                            <p className="text-[16px] font-[400]">{props.detail}</p>
                        </div>
                        <p className="text-[16px] font-[400]">วันที่ {props.date} เวลา {props.start} - {props.end} น.</p>
                        <p className="text-[16px] font-[400]">{props.address}</p>
                    </div>
                </div>
            </div>
        </div>

        {props.isHistory ? 
        <div className="relative flex top-[149px] left-[714px]">
            <Button id={"cancelbtn" + props.key} disabled className="w-[172px] h-[48px] text-[16px] text-black border-[1px] bg-transparent rounded-[1000px]">ยกเลิกแล้ว</Button>
        </div> :
        <div className="relative flex top-[149px] left-[531px] gap-[11px]">
            <Button id={"cancelbtn" + props.key} onClick={() => props.cancelClick(props.orderid)} className="w-[172px] h-[48px] text-[16px] text-black border-[1px] bg-transparent rounded-[1000px] hover:bg-transparent cursor-pointer">ยกเลิกคำสั่งซื้อ</Button>
            <Button id={"acceptbtn" + props.key} onClick={() => props.acceptClick(props.orderid)} className="w-[172px] h-[48px] text-[16px] rounded-[1000px] hover:cursor-pointer">ตอบรับคำสั่งซื้อ</Button>
        </div>
        }

        <p className="relative top-[45px] left-[790px] text-[16px] font-[700]">{props.price} บาท/ท่าน</p>
    </div>
  );
}

OrderCard.propTypes = {
    key:PropTypes.number.isRequired,
    name:PropTypes.string.isRequired,
    orderid:PropTypes.string.isRequired,
    food:PropTypes.string.isRequired,
    number:PropTypes.number.isRequired,
    detail:PropTypes.string,
    date:PropTypes.string.isRequired,
    start:PropTypes.string.isRequired,
    end:PropTypes.string.isRequired,
    address:PropTypes.string.isRequired,
    price:PropTypes.number.isRequired,
    cancelClick:PropTypes.func.isRequired,
    acceptClick:PropTypes.func.isRequired,
    isHistory:PropTypes.bool.isRequired
}

export default OrderCard;
