import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function BlogDetail() {
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center">
        <div className="flex flex-col max-w-[1440px]">
          <div className="flex flex-col gap-16 pb-16 items-center">
            <div className="max-w-[1280px] flex flex-col items-center px-8 gap-8 ">
              <div className="flex flex-col gap-3 items-center pt-10">
                <p className="font-semibold text-[#D87500]">บทความโดยร้านค้า</p>
                <p className="text-5xl font-semibold text-[#101828]">
                  UX review presentations
                </p>
              </div>

              <div className="flex gap-4 max-w-[209px]">
                <Avatar className="w-[56px] h-[56px]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col max-w-[137px]">
                  <p className="text-lg font-semibold text-[#101828]">
                    โหระพา เคทเทอริ่ง
                  </p>
                  <p className="text-[#475467]">ม.ค. 6, 2024 </p>
                </div>
              </div>
            </div>

            <img
              src="https://github.com/shadcn.png"
              alt="blogDetail"
              className="w-[1440px] max-h-[560px]"
            />
          </div>

          <div className="flex flex-col gap-12 items-center">
            <div className="max-w-[720px] flex flex-col gap-6">
              <p className="text-lg text-[#475467]">
                Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam
                suspendisse morbi eleifend faucibus eget vestibulum felis.
                Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam.
              </p>

              <p className="text-lg text-[#475467]">
                Mauris posuere vulputate arcu amet, vitae nisi, tellus
                tincidunt. At feugiat sapien varius id.
              </p>

              <p className="text-lg text-[#475467]">
                Eget quis mi enim, leo lacinia pharetra, semper. Eget in
                volutpat mollis at volutpat lectus velit, sed auctor. Porttitor
                fames arcu quis fusce augue enim. Quis at habitant diam at.
                Suscipit tristique risus, at donec. In turpis vel et quam
                imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.
              </p>
            </div>

            <div className="max-w-[720px] flex flex-col gap-6">
              <p className="text-lg text-[#475467]">
                Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum,
                nulla odio nisl vitae. In aliquet pellentesque aenean hac
                vestibulum turpis mi bibendum diam.
              </p>

              <p className="text-lg text-[#475467]">
                Tempor integer aliquam in vitae malesuada fringilla. Elit nisi
                in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo
                consectetur convallis risus. Sed condimentum enim dignissim
                adipiscing faucibus consequat, urna.
              </p>

              <p className="text-lg text-[#475467]">
                Viverra purus et erat auctor aliquam. Risus, volutpat vulputate
                posuere purus sit congue convallis aliquet. Arcu id augue ut
                feugiat donec porttitor neque. Mauris, neque ultricies eu
                vestibulum, bibendum quam lorem id.
              </p>

              <p className="text-lg text-[#475467]">
                Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.
                Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim
                mauris id. Non pellentesque congue eget consectetur turpis.
                Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt
                aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue
                felis elit erat nam nibh orci.
              </p>
            </div>
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default BlogDetail;
