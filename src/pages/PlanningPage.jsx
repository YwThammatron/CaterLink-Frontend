import NavbarCustom from "../components/ui/Navbar-custom";

function PlanningPage() {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-[#101828]">วางแผนงานจัดเลี้ยง</h1>
        <p className="text-[#475467]">
          วางแผนงานเลี้ยงหลายช่วงเวลา รวมแพ็กเกจจากหลายร้านในแผนเดียว
        </p>
      </div>
    </>
  );
}

export default PlanningPage;
