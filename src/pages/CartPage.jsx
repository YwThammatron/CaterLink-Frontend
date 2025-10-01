import NavbarCustom from "../components/ui/Navbar-custom";
import Cartbar from "../components/ui/Cartbar";
import CartCard from "../components/ui/CartCard";
import MiniFooter from "../components/ui/miniFooter";

function CartPage() {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center">
        <div className="flex flex-col py-10 items-center max-w-[1184px] w-full">
          <h1>คำสั่งซื้อของฉัน</h1>
          <div className="flex flex-col gap-3 w-full">
            <Cartbar />

            {/* Show all different status badges */}
            <CartCard status="รอร้านตอบรับ" />
            <CartCard status="ที่ต้องชำระ" />
            <CartCard status="จัดเตรียมสำเร็จ" />
            <CartCard status="กำลังจัดเตรียม" />
            <CartCard status="สำเร็จแล้ว" />
            <CartCard status="ยกเลิก" />
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default CartPage;
