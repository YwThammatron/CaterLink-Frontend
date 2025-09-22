import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import { Button } from "../components/ui/button";

function Payment() {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center items-center py-15">
          <h1>ชำระเงินมัดจำ</h1>
          <p className="text-[#667085]">
            โปรดชำระภายในวันที่ 3/09/2025 เวลา 21:02 น.
          </p>
        </div>

        <img
          src="https://github.com/shadcn.png"
          alt=""
          className="max-w-[379px] max-h-[369px] rounded-lg"
        />

        <Button className="w-[200px] bg-gradient text-white mt-15 py-[10px] px-4 font-semibold">
          เสร็จแล้ว
        </Button>
      </div>
      <MiniFooter />
    </>
  );
}

export default Payment;
