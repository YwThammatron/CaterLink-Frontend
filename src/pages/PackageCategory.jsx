import axios from "axios";
import { useState } from "react";

import SidebarCustom from "../components/ui/Sidebar-custom";

import CreatePackage from "../subpages/PackageCategory/CreatePackage"
import ViewCategory from "../subpages/PackageCategory/ViewCategory"
import CreateCategory from "../subpages/PackageCategory/CreateCategory";


function PackageCategory() {
    const [Tabindex,setTabindex] = useState(0)
    const [Iscreatectg,setIscreatectg] = useState(false)

    const subpages = [
        {label: 'หมวดหมู่แพคเกจ',content: <ViewCategory sendClick={() => {setIscreatectg(true)}}/>},
        {label: 'สร้างแพคเกจ',content: <CreatePackage/>}
    ]

return (
    <>
      {/*หน้าดู Package + สร้าง Package*/}
      <div className="flex flex-row">
          <SidebarCustom />
          {/* Container */}
          <div className="w-[1200px] h-auto bg-[#F9FAFB]">
            {/* Header Navigation */}
            <div className="flex flex-col w-auto h-[63px] pl-[calc(50%-552px)] justify-center border-b-[1px] border-[#EDEEF0] mb-[32px]">
                <p className="text-[24px] font-[600]">จัดการแพคเกจ</p>
            </div>

            {Iscreatectg ? 
                <CreateCategory cancelClick={() => setIscreatectg(false)} /> :
                <div>
                    {/* Tab */}
                    <div className="flex gap-[10px] ml-[calc(50%-520px)] mr-[calc(50%-520px)] mb-[24px] border-b">
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

                    {subpages[Tabindex].content} 
                </div>
            }
            
          </div>
      </div>
    </>
  );
}

export default PackageCategory;
