import NavbarCustom from "../components/ui/Navbar-custom";
import CompareCard from "../components/ui/CompareCard";
import MiniFooter from "../components/ui/miniFooter";
import AddCompareCard from "../components/ui/AddCompareCard";

function ComparePage() {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-3 pt-10 pb-5">
          <h1 className="text-[#101828]">เปรียบเทียบร้านอาหาร</h1>
          <p className="text-[#344054]">
            เปรียบเทียบข้อมูลแพ็กเกจจากหลายร้านในหน้าจอเดียว ตัดสินใจง่ายขึ้น
          </p>
        </div>

        <div className="flex justify-center gap-4 flex-wrap py-4">
          <CompareCard />
          <CompareCard />
          <CompareCard />
          <AddCompareCard />
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default ComparePage;
