import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Image, CloudUpload, Package } from "lucide-react";

function DeletePackage() {
  const [accessToken, setAccessToken] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    profile_picture: "",
    role: "restaurant",
    bio: "",
  });

  const [PackageCtgs, setPackageCtgs] = useState([]);
  const [Packages, setPackages] = useState([]);

  const [Restid, setRestid] = useState("");
  const [Packagectgid, setPackagectgid] = useState("");
  const [Packageid, setPackageid] = useState("");

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChangeDelete = async () => {
    //when click delete
    let isconfirm = window.confirm(
      "System : Are you sure to delete this package? this process can not be reversed."
    );

    if (Packageid != "" && isconfirm) {
      try {
        var imgid;
        let response = await axios.get(baseUrl + "/api/package-images");
        for (let img of response.data) {
          if (img.package_id == Packageid) {
            imgid = img.id;
          }
        }

        if (imgid) {
          response = await axios.delete(
            baseUrl + "/api/package-images/" + imgid
          );
          console.log(response.data);
        }

        response = await axios.delete(baseUrl + "/api/packages/" + Packageid);
        console.log(response.data);
        window.alert(`System : Package deleted successfully.`);
        window.location.reload();
      } catch (error) {
        if (error.response) {
          window.alert(
            `Code ${error.response.status} : ${error.response.data.error}`
          );
        }
      }
    }
  };

  const getPackageCtgs = async () => {
    const response = await axios.get(
      baseUrl + "/api/package-categories/restaurant/" + Restid
    );
    setPackageCtgs(response.data);
  };

  const getPackages = async () => {
    const response = await axios.get(
      baseUrl + "/api/packages/category/" + Packagectgid + "/" + Restid
    );
    setPackages(response.data);
    console.log(response.data);
  };

  const getRest = async () => {
    const response = await axios.get(baseUrl + "/api/restaurants");
    for (let restaurant of response.data) {
      if (userData.id == restaurant.user_id) {
        setRestid(restaurant.id);
        break;
      }
    }
  };

  const checkCookie = () => {
    if (document.cookie) {
      const parts = document.cookie.split(";").map((part) => part.trim());
      // Extract values
      const tempdata = JSON.parse(
        parts.find((p) => p.startsWith("userData=")).slice("userData=".length)
      );
      const temptoken = parts
        .find((p) => p.startsWith("accessToken="))
        .slice("accessToken=".length);
      setAccessToken(temptoken);
      setUserData(tempdata);
    }
  };

  useEffect(() => {
    checkCookie();
  }, []);

  useEffect(() => {
    if (userData) {
      getRest();
    }
  }, [userData]);

  useEffect(() => {
    getPackageCtgs();
  }, [Restid]);

  useEffect(() => {
    getPackages();
  }, [Packagectgid]);

  return (
    <>
      {/* Content */}
      <div className="flex flex-col gap-[24px] w-auto h-auto items-center mb-[32px]">
        {/* Table */}
        <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] h-[204px] bg-white">
          {/* Content (Package Infomation) */}
          <div className="flex w-[1056px] h-[148px]">
            <p className="text-[14px] font-[600] w-[312px]">เลือกแพคเกจ</p>
            {/* Input Field */}
            <form className="grid w-[512px]">
              <label>
                <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                  หมวดหมู่แพคเกจ<p className="text-[#D50A0A] pl-[4px]">*</p>
                </p>
              </label>
              <div className="relative">
                <select
                  id="packagectgid"
                  value={Packagectgid}
                  onChange={(event) => setPackagectgid(event.target.value)}
                  className="appearance-none w-[512px] h-[40px] text-[14px] pl-[12px] pr-[44px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                >
                  <option value="default" selected hidden>
                    เลือกหมวดหมู่แพคเกจ
                  </option>
                  {PackageCtgs.map((content, index) => (
                    <option key={"ctg" + index} value={content.id}>
                      {content.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                </div>
              </div>

              <label>
                <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                  แพคเกจ<p className="text-[#D50A0A] pl-[4px]">*</p>
                </p>
              </label>
              <div className="relative">
                <select
                  id="packageid"
                  value={Packageid}
                  onChange={(event) => setPackageid(event.target.value)}
                  className="appearance-none w-[512px] h-[40px] text-[14px] pl-[12px] pr-[44px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                >
                  <option id="packagedefault" value="default" selected hidden>
                    เลือกแพคเกจ
                  </option>
                  {Packages.map((content, index) => (
                    <option key={"package" + index} value={content.id}>
                      {content.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Action */}
        <div className="flex items-center gap-[642px] mb-[147px] w-[1104px] h-[48px]">
          {/* Right */}
          <div className="flex gap-[12px] ml-[885px]">
            <Button
              className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
              onClick={() => window.location.reload()}
            >
              ยกเลิก
            </Button>

            <Button
              className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"
              onClick={handleChangeDelete}
            >
              ลบแพคเกจ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeletePackage;
