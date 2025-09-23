import NavbarCustom from "../components/ui/Navbar-custom";
import PlanningCard from "../components/ui/PlanningCard";
import { Button } from "../components/ui/button";
import MiniFooter from "../components/ui/miniFooter";

function PlanningPage() {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-[1184px]">
          <div className="flex flex-col items-center gap-4 py-10">
            <h1 className="text-[#101828]">วางแผนงานจัดเลี้ยง</h1>
            <p className="text-[#475467]">
              วางแผนงานเลี้ยงหลายช่วงเวลา รวมแพ็กเกจจากหลายร้านในแผนเดียว
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3">
            <div className="flex justify-end">
              <Button
                variant="outline"
                className="text-gradient border border-[#FF8A00] rounded-md font-semibold"
              >
                เพิ่มรายการจัดเลี้ยง
              </Button>
            </div>

            <div className="flex gap-4 flex-wrap">
              <PlanningCard />
              <PlanningCard />
              <PlanningCard />
            </div>

            <div className="flex gap-4 justify-end pt-6">
              <Button variant="outline">เคลียร์ทั้งหมด</Button>
              <Button className="bg-gradient text-white font-semibold">
                ค้นหาร้านค้าตามแผน
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default PlanningPage;
