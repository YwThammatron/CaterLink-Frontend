import CartCard from "../components/ui/CartCard";

function CartCardDemo() {
  const statusExamples = [
    {
      status: "รอร้านตอบรับ",
      description: "เมื่อลูกค้าส่งคำขอ รอร้านค้ายืนยัน",
      button: "ยกเลิกคำขอ",
      buttonAction: "ลูกค้าสามารถยกเลิกคำขอได้",
    },
    {
      status: "ที่ต้องชำระ",
      description: "ร้านค้ายืนยันแล้ว รอชำระเงินมัดจำ",
      button: "ชำระมัดจำ",
      buttonAction: "ไปหน้าชำระเงิน",
    },
    {
      status: "จัดเตรียมสำเร็จ",
      description: "ชำระเงินมัดจำแล้ว รอชำระส่วนที่เหลือ",
      button: "ชำระมัดจำ",
      buttonAction: "ชำระเงินส่วนที่เหลือ",
    },
    {
      status: "กำลังจัดเตรียม",
      description: "ร้านค้ากำลังเตรียมอาหาร",
      button: "ไม่มีปุ่ม",
      buttonAction: "รอร้านจัดเตรียมอาหาร",
    },
    {
      status: "สำเร็จแล้ว",
      description: "งานเสร็จสิ้นแล้ว",
      button: "ให้คะแนน",
      buttonAction: "ไปหน้าให้คะแนนและรีวิว",
    },
    {
      status: "ยกเลิก",
      description: "คำสั่งซื้อถูกยกเลิก",
      button: "ไม่มีปุ่ม",
      buttonAction: "คำสั่งซื้อสิ้นสุดแล้ว",
    },
  ];

  return (
    <div className="flex flex-col gap-8 p-8 max-w-6xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#101828] mb-4">
          CartCard Status Demo
        </h1>
        <p className="text-[#475467] text-lg">
          แสดงตัวอย่าง Badge และ Button ทั้งหมดของ CartCard Component
        </p>
      </div>

      {statusExamples.map((example, index) => (
        <div key={index} className="flex flex-col gap-4">
          {/* Status Info */}
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400">
            <div className="flex flex-wrap gap-4 items-center mb-2">
              <h3 className="text-lg font-semibold text-[#101828]">
                สถานะ: {example.status}
              </h3>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full">
                {example.button}
              </span>
            </div>
            <p className="text-[#475467] mb-1">{example.description}</p>
            <p className="text-sm text-[#667085]">
              การทำงาน: {example.buttonAction}
            </p>
          </div>

          {/* CartCard Example */}
          <div className="flex justify-center">
            <CartCard status={example.status} />
          </div>

          {/* Divider */}
          {index < statusExamples.length - 1 && (
            <div className="border-t border-gray-200 my-4"></div>
          )}
        </div>
      ))}

      {/* Summary Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-8">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#101828]">
            สรุป Status และ Button
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">
                  Badge Color
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">
                  Button
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-[#374151]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm text-[#101828]">
                  รอร้านตอบรับ
                </td>
                <td className="px-6 py-4 text-sm text-[#363F72]">Gray</td>
                <td className="px-6 py-4 text-sm text-[#101828]">ยกเลิกคำขอ</td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  Cancel request
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-[#101828]">
                  ที่ต้องชำระ
                </td>
                <td className="px-6 py-4 text-sm text-[#B54708]">Orange</td>
                <td className="px-6 py-4 text-sm text-[#101828]">ชำระมัดจำ</td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  Go to payment
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-[#101828]">
                  จัดเตรียมสำเร็จ
                </td>
                <td className="px-6 py-4 text-sm text-[#5925DC]">Purple</td>
                <td className="px-6 py-4 text-sm text-[#101828]">ชำระมัดจำ</td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  Go to payment
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-[#101828]">
                  กำลังจัดเตรียม
                </td>
                <td className="px-6 py-4 text-sm text-[#026AA2]">Blue</td>
                <td className="px-6 py-4 text-sm text-[#475467]">No button</td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  Wait for preparation
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-[#101828]">สำเร็จแล้ว</td>
                <td className="px-6 py-4 text-sm text-[#067647]">Green</td>
                <td className="px-6 py-4 text-sm text-[#101828]">ให้คะแนน</td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  Go to review
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-[#101828]">ยกเลิก</td>
                <td className="px-6 py-4 text-sm text-[#B42318]">Red</td>
                <td className="px-6 py-4 text-sm text-[#475467]">No button</td>
                <td className="px-6 py-4 text-sm text-[#475467]">
                  Order cancelled
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CartCardDemo;
