import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Image, CloudUpload } from "lucide-react";

function CreatePackage() {
  const [accessToken, setAccessToken] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    profile_picture: "",
    role: "restaurant",
    bio: "",
  });

  const [Payload, setPayload] = useState({
    name: "",
    category_id: "",
    discount: 0,
    start_discount_date: "",
    end_discount_date: "",
  });

  const [Payloaddt, setPayloaddt] = useState({
    sets: [
      {
        set_id: 1,
        payload: {
          package_id: "",
          name: "",
          price: "",
          description: "",
        },
      },
    ],
  });

  const [PackageCtgs, setPackageCtgs] = useState([]);
  const [Packageimg, setPackageimg] = useState(null);
  const fileUploadref = useRef();
  const isFirstRender = useRef(0);

  const [Dtset, setDtset] = useState("");

  const [Restid, setRestid] = useState("");
  const [Packageid, setPackageid] = useState("");

  const [Index, setIndex] = useState(2);
  const [Tableheight, setTableheight] = useState(644);
  const [Contentheight, setContentheight] = useState(207);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPayload((data) => ({
      ...data,
      [id]: value,
    }));
  };

  const handleChangeSet = (e, index) => {
    const { name, value } = e.target;
    setPayloaddt((data) => ({
      ...data,
      sets: data.sets.map((set) =>
        set.set_id == index
          ? { ...set, payload: { ...set.payload, [name]: value } }
          : set
      ),
    }));
  };

  const handleUpload = (e) => {
    const currentfile = e.target.files[0];
    if (currentfile) {
      setPackageimg(currentfile);
    }
  };

  const handlenoUpload = () => {
    setPackageimg(null);
    if (fileUploadref.current) {
      fileUploadref.current.value = "";
    }
  };

  const handleClickAdd = () => {
    Payloaddt.sets.push({
      set_id: Index,
      payload: {
        package_id: "",
        name: "",
        price: "",
        description: "",
      },
    });

    setIndex(Index + 1);
    setTableheight(644 + 250 * (Index - 1));
    setContentheight(207 + 250 * (Index - 1));
  };

  const handleClickDelete = () => {
    setIndex(2);
    Payloaddt.sets.length = 0;
    Payloaddt.sets.push({
      set_id: 1,
      payload: {
        package_id: "",
        name: "",
        price: "",
        description: "",
      },
    });

    setTableheight(644);
    setContentheight(207);
  };

  const handleChangeSave = async () => {
    //when click save
    window.alert(
      "System : You can add promotion to the package in promotion page."
    );
    let isconfirm = window.confirm(
      "System : Are you sure to create this package?"
    );
    if (Payload.name != "" || (Payload.category_id != "" && isconfirm)) {
      try {
        const response = await axios.post(baseUrl + "/api/packages", Payload);
        console.log(response.data);
        setPackageid(response.data.id);
      } catch (error) {
        if (error.response) {
          window.alert(
            `Code ${error.response.status} : ${error.response.data.error}`
          );
        }
      }
    }
  };

  const setPackageDetail = () => {
    console.log(Dtset);
    setPayloaddt((data) => ({
      ...data,
      sets: data.sets.map((set) => ({
        ...set,
        payload: { ...set.payload, package_id: Packageid },
      })),
    }));
    setDtset("set");
  };

  const handlePostDetail = async () => {
    var response;
    console.log(Packageid);
    for (let object of Payloaddt.sets) {
      try {
        response = await axios.post(
          baseUrl + "/api/package-details",
          object.payload
        );
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          window.alert(
            `Code ${error.response.status} : ${error.response.data.error}`
          );
        }
      }
    }

    handlePostImg();
  };

  const handlePostImg = async () => {
    const formdata = new FormData();
    console.log(Packageid);
    formdata.append("package_id", Packageid);
    formdata.append("file", Packageimg);

    if (Packageimg != null) {
      try {
        const response = await axios.post(
          baseUrl + "/api/package-images",
          formdata,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setDtset("");

        window.alert("System : Package created successfully.");
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
    //to prevent default run at first double render of useEffect
    if (isFirstRender.current == 0) {
      isFirstRender.current += 1;
      return;
    } else if (isFirstRender.current == 1) {
      isFirstRender.current = 2;
      return;
    }

    setPackageDetail();
  }, [Packageid]);

  useEffect(() => {
    if (Dtset) {
      handlePostDetail();
    }
  }, [Dtset]);

  return (
    <>
      {/* Content */}
      <div className="flex flex-col gap-[24px] w-auto h-auto items-center mb-[32px]">
        {/* Table */}
        <div
          style={{ height: Tableheight }}
          className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] bg-white"
        >
          {/* Content (Package Infomation) */}
          <div className="flex w-[1056px] h-[291px]">
            <p className="text-[14px] font-[600] w-[312px]">ข้อมูลแพคเกจ</p>
            {/* Input Field */}
            <form className="grid w-[512px] gap-[16px]">
              <div className="grid h-fit gap-[6px]">
                <label className="flex h-[20px]">
                  <p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                    ชื่อแพคเกจ
                  </p>
                  <p className="text-[#D50A0A] pl-[3px]">*</p>
                </label>
                <input
                  type="text"
                  id="name"
                  value={Payload.name}
                  onChange={handleChange}
                  placeholder="เพิ่มชื่อแพคเกจ"
                  className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                />
              </div>

              <div className="grid h-fit gap-[6px]">
                <label className="flex h-[20px]">
                  <p className="h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                    หมวดหมู่แพคเกจ
                  </p>
                  <p className="text-[#D50A0A] pl-[3px]">*</p>
                </label>
                <div className="relative">
                  <select
                    id="category_id"
                    className="appearance-none w-[512px] h-[40px] pl-[14px] pr-[42px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                    value={Payload.category_id}
                    onChange={handleChange}
                  >
                    <option value="default" selected hidden>
                      เลือกหมวดหมู่แพคเกจ
                    </option>
                    {PackageCtgs.map((content, index) => {
                      return (
                        <option key={index} value={content.id}>
                          {content.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                  </div>
                </div>
              </div>

              <div className="grid h-fit gap-[6px]">
                <label className="flex">
                  <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                    รูปปกแพคเกจ
                  </p>{" "}
                  <p className="text-[#D50A0A] pl-[3px]">*</p>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="img"
                    ref={fileUploadref}
                    onChange={handleUpload}
                    className="hidden w-[512px] h-[104px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                  />
                  <label
                    htmlFor="img"
                    class="flex flex-col items-center gap-[12px] w-[512px] h-[104px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md hover:cursor-pointer"
                  >
                    <div className="flex w-[40px] h-[40px] justify-center items-center shadow-sm border-[1px] border-[#EAECF0] rounded-[8px]">
                      {Packageimg != null ? (
                        <Image className="h-fit w-[20px] h-[20px]" />
                      ) : (
                        <CloudUpload className="h-fit w-[20px] h-[20px]" />
                      )}
                    </div>

                    {Packageimg != null ? (
                      <div className="flex gap-[10px] text-[14px]">
                        <p className="cursor-pointer text-[#F78E1E] font-[600]">
                          {Packageimg.name}
                        </p>
                        <p
                          onClick={handlenoUpload}
                          className="hover:text-[#F78E1E] cursor-pointer "
                        >
                          ยกเลิก
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-[4px] text-[14px]">
                        <p className="cursor-pointer text-[#F78E1E] font-[600]">
                          คลิกเพื่ออัพโหลด
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </form>
          </div>

          {/* Divider */}
          <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>

          {/* Content (Package Set Infomation) */}
          <div style={{ height: Contentheight }} className="flex">
            <div className="grid w-[312px] h-[40px]">
              <p className="text-[14px] font-[600]">ชุดอาหาร</p>
              <p className="text-[14px]">ต้องมีอย่างน้อย 1 ชุดอาหาร</p>
            </div>
            {/* Input Field */}
            <form className="grid gap-[32px] w-[512px]">
              {Payloaddt.sets.map((content, index) => (
                <div key={index} className="grid h-[215px] gap-[16px]">
                  <p className="text-[14px] font-[500] text-black">
                    ชุดอาหารที่ {content.set_id}
                  </p>

                  <div className="flex gap-[16px]">
                    <div className="grid w-[248px] h-fit gap-[6px]">
                      <label className="flex">
                        <p className="h-[20px] text-[14px] font-[500] text-[#6D6E71]">
                          ชื่อชุดอาหาร
                        </p>
                        <p className="text-[#D50A0A] pl-[3px]">*</p>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id={"name" + content.set_id}
                        value={Payloaddt.sets[index].payload.name}
                        onChange={(event) =>
                          handleChangeSet(event, content.set_id)
                        }
                        placeholder="เพิ่มชุดข้อมูลอาหาร"
                        className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                      />
                    </div>

                    <div className="grid w-[248px] h-fit gap-[6px]">
                      <label className="flex">
                        <p className="h-[20px] text-[14px] font-[500] text-[#6D6E71]">
                          ราคาต่อหน่วย
                        </p>
                        <p className="text-[#D50A0A] pl-[3px]">*</p>
                      </label>
                      <input
                        type="number"
                        name="price"
                        id={"price" + content.set_id}
                        value={Payloaddt.sets[index].payload.price}
                        onChange={(event) =>
                          handleChangeSet(event, content.set_id)
                        }
                        placeholder="เพิ่มตัวเลข"
                        className="h-[36px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid h-fit gap-[6px]">
                    <label>
                      <p className="h-[20px] text-[14px] font-[500] text-[#6D6E71]">
                        คำอธิบาย
                      </p>
                    </label>
                    <textarea
                      name="description"
                      id={"description" + content.set_id}
                      value={Payloaddt.sets[index].payload.description}
                      onChange={(event) =>
                        handleChangeSet(event, content.set_id)
                      }
                      placeholder="เพิ่มคำอธิบาย"
                      className="resize-none w-[512px] h-[67px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] text-[14px] border-[1px] border-[#D0D5DD] rounded-md"
                    />
                  </div>
                </div>
              ))}
            </form>

            {/* Package Set Add Button */}
            <div className="flex pl-[39px] gap-[8px] w-[193px] h-[44px]">
              <Button
                className="w-[68px] h-[44px] rounded-[8px] text-[#475467] text-[16px] bg-transparent hover:bg-transparent cursor-pointer transition"
                onClick={handleClickDelete}
              >
                ลบทั้งหมด
              </Button>
              <Button
                className="w-[117px] h-[44px] rounded-[8px] text-[#F78E1E] text-[16px] bg-transparent border-[1px] border-[#F78E1E] hover:bg-transparent cursor-pointer transition"
                onClick={handleClickAdd}
              >
                เพิ่มชุดอาหาร
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>
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
              onClick={handleChangeSave}
            >
              สร้างแพคเกจ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreatePackage;
