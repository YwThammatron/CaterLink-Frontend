import axios from "axios";
import { useState } from "react";

import SidebarCustom from "../components/ui/Sidebar-custom";
import Purchase from "../subpages/Order/Purchase";
import History from "../subpages/Order/History";

const subpages = [
    {label: 'รายการสั่งซื้อ',Content: <Purchase />},
    {label: 'ประวัติ',Content: <History /> }
]

function Order() {

    const [Tabindex,setTabindex] = useState(0)

  return (
    <>
      {/*หน้าคำสั่งซื้อ*/}
      <div className="flex flex-row w-[100%]">
          <SidebarCustom />
          {/* Container */}
          <div className="w-[84%] bg-[#F9FAFB]">
            {/* Header Navigation */}
            <div className="flex flex-col w-auto h-[63px] pl-[calc(50%-536px-32px)] border-b-[1px] border-[#EDEEF0] justify-center mb-[32px]">
                <p className="text-[24px] font-[600]">คำสั่งซื้อ</p>
            </div>

            {/* Tab */}
            <div className="flex justify-self-center w-[1072px] gap-[16px] mb-[39px] border-b">
                    {subpages.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setTabindex(index)}
                        className={`pt-[8.5px] pb-[8.5px] ${
                        Tabindex === index
                            ? 'border-b-[2px] border-black font-semibold'
                            : 'text-black'
                        } hover:cursor-pointer `}
                    >
                        {tab.label}
                    </button>
                    ))}
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-[24px] w-auto h-[1195px] mb-[64px]">
                {subpages[Tabindex].Content}
            </div>
          </div>
      </div>
    </>
  );
}

export default Order;
