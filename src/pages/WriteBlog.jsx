import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, CloudUpload, Image } from "lucide-react";

import SidebarCustom from "../components/ui/Sidebar-custom";

function WriteBlog() {
  const [Payload, setPayload] = useState({
    title: "",
    detail: "",
    restaurant_event_categories: "",
    restaurant_main_category: "",
  });

  const [accessToken, setAccessToken] = useState("");
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    profile_picture: "",
    role: "restaurant",
    bio: "",
  });

  const [Blogimg, setBlogimg] = useState(null);
  const [Blogid, setBlogid] = useState("");
  const fileUploadref = useRef();

  const [Restctgs, setRestctgs] = useState({
    mainCategories: [],
    foodCategories: [],
    eventCategories: [],
  });

  const [Mainlist, setMainlist] = useState([]);
  const [Eventlist, setEventlist] = useState([]);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPayload((data) => ({
      ...data,
      [id]: value,
    }));
  };

  const handleUpload = (e) => {
    const currentfile = e.target.files[0];
    if (currentfile) {
      setBlogimg(currentfile);
    }
  };

  const handlenoUpload = () => {
    setBlogimg(null);
    if (fileUploadref.current) {
      fileUploadref.current.value = "";
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    let isconfirm = window.confirm("System : Are you sure to Post your Blog?");

    if (isconfirm) {
      //post blog to get blogid
      var response;
      response = await axios.post(baseUrl + "/api/blogs", Payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setBlogid(response.data[0].id);
    }
  };

  const handlePostImg = async () => {
    const formdata = new FormData();
    formdata.append("blog_id", Blogid);
    formdata.append("file", Blogimg);

    if (Blogimg != null) {
      try {
        const response = await axios.post(
          baseUrl + "/api/blog_images",
          formdata,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        window.alert("System : Blog posted successfully.");
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

  const getBlog = async () => {
    try {
      const response = await axios.get(baseUrl + "/api/blog_images");
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        window.alert(
          `Code ${error.response.status} : ${error.response.data.error}`
        );
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

  const getRest = async () => {
    const response = await axios.get(baseUrl + "/api/restaurants");
    for (let restaurant of response.data) {
      if (userData.id == restaurant.user_id) {
        setRestctgs(restaurant);
        break;
      }
    }
  };

  const setList = () => {
    setMainlist(Restctgs.mainCategories);
    setEventlist(Restctgs.eventCategories);
  };

  useEffect(() => {
    getBlog();
    checkCookie();
  }, []);

  useEffect(() => {
    getRest();
  }, [userData]);

  useEffect(() => {
    setList();
  }, [Restctgs]);

  useEffect(() => {
    handlePostImg();
  }, [Blogid]);

  //   useEffect(() => {
  //     console.log(Payload)
  //   },[Payload])

  return (
    <>
      {/*หน้าเขียน Blog*/}
      <div className="flex flex-row">
        <SidebarCustom />
        {/* Container */}
        <div className="w-[84%] h-auto bg-[#F9FAFB]">
          {/* Header Navigation */}
          <div className="flex flex-col w-auto h-[63px] pl-[calc(50%-552px)] justify-center border-b-[1px] border-[#EDEEF0] mb-[32px]">
            <p className="text-[24px] font-[600]">สร้างบทความทั่วไป</p>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[24px] w-auto h-[897px] items-center mb-[32px]">
            {/* Table */}
            <div className="grid justify-center items-center border-[1px] border-[#F2F4F7] rounded-[24px] w-[1104px] h-[752px] bg-white">
              {/* Content (Blog Infomation) */}
              <div className="flex w-[1056px] h-[222px]">
                <p className="text-[14px] font-[600] w-[312px]">ข้อมูลบทความ</p>
                {/* Input Field */}
                <form className="grid w-[512px] gap-[16px]">
                  <div className="grid h-fit gap-[6px]">
                    <label className="flex">
                      <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                        หัวข้อบทความ
                      </p>
                      <p className="text-[#D50A0A] pl-[3px]">*</p>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={Payload.title}
                      onChange={handleChange}
                      placeholder="กรุณาระบุหัวข้อ"
                      className="h-[48px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                    />
                  </div>

                  <div className="grid h-fit gap-[6px]">
                    <label className="flex">
                      <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                        รูปปกบทความ
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
                          {Blogimg != null ? (
                            <Image className="h-fit w-[20px] h-[20px]" />
                          ) : (
                            <CloudUpload className="h-fit w-[20px] h-[20px]" />
                          )}
                        </div>

                        {Blogimg != null ? (
                          <div className="flex gap-[10px] text-[14px]">
                            <p className="cursor-pointer text-[#F78E1E] font-[600]">
                              {Blogimg.name}
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
                            {/* <p>หรือลากและวางไฟล์</p> */}
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              {/* Divider */}
              <div className="w-[1056px] h-[0.5px] bg-[#EAECF0]"></div>

              {/* Content (Blog Category) */}
              <div className="flex w-[1056px] h-[166px]">
                <p className="text-[14px] w-[312px] font-[600]">หมวดหมู่</p>
                {/* Input Field */}
                <form className="grid w-[512px] gap-[6px]">
                  <label className="flex">
                    <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                      ประเภทการจัดเลี้ยง
                    </p>
                    <p className="text-[#D50A0A] pl-[4px]">*</p>
                  </label>
                  <div className="relative">
                    <select
                      id="restaurant_main_category"
                      value={Payload.restaurant_main_category}
                      onChange={handleChange}
                      className="appearance-none w-[512px] h-[48px] pl-[14px] pr-[42px] pt-[12px] pb-[12px] border-[1px] border-[#D0D5DD] rounded-md"
                    >
                      <option value="default" selected hidden>
                        เลือกข้อมูล
                      </option>
                      {Mainlist.map((content, index) => {
                        return (
                          <option key={content.id} value={content.id}>
                            {content.name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                    </div>
                  </div>

                  <label className="flex">
                    <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                      ประเภทงานอีเวนต์
                    </p>
                    <p className="text-[#D50A0A] pl-[4px]">*</p>
                  </label>
                  <div className="relative">
                    <select
                      id="restaurant_event_categories"
                      value={Payload.restaurant_event_categories}
                      onChange={handleChange}
                      className="appearance-none w-[512px] h-[48px] pl-[14px] pr-[42px] pt-[12px] pb-[12px] border-[1px] border-[#D0D5DD] rounded-md"
                    >
                      <option value="default" selected hidden>
                        เลือกข้อมูล
                      </option>
                      {Eventlist.map((content, index) => {
                        return (
                          <option key={content.id} value={content.id}>
                            {content.name}
                          </option>
                        );
                      })}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <ChevronDown className="w-[20px] h-[20px] text-[#86878A]" />
                    </div>
                  </div>
                </form>
              </div>

              {/* Divider */}
              <div className="w-[1056px] h-[1px] bg-[#EAECF0]"></div>

              {/* Content (Blog Detail) */}
              <div className="flex w-[1056px] h-[153px]">
                <p className="text-[14px] w-[312px] font-[600]">
                  เนื้อหาบทความ
                </p>
                {/* Input Field */}
                <form className="grid w-[512px]">
                  <div className="grid h-fit gap-[6px]">
                    <label className="flex">
                      <p className="flex h-[21px] font-[500] text-[#6D6E71] text-[14px]">
                        เนื้อหา
                      </p>{" "}
                      <p className="text-[#D50A0A] pl-[4px]">*</p>
                    </label>
                    <textarea
                      id="detail"
                      value={Payload.detail}
                      onChange={handleChange}
                      placeholder="กรุณากรอกข้อมูล"
                      className="resize-none h-[126px] pl-[14px] pr-[14px] pt-[10px] pb-[10px] border-[1px] border-[#D0D5DD] rounded-md"
                    />
                  </div>
                </form>
              </div>

              {/* Divider */}
              <div className="w-[1056px] h-[1px] bg-[#EAECF0]"></div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-[100px] w-[1104px] h-[48px]">
              {/* Left */}
              <div className="flex gap-[12px]">
                <Button
                  className="w-[100px] h-[44px] rounded-[8px] text-[#F78E1E] text-[16px] bg-transparent border-[1px] border-[#F78E1E] hover:bg-transparent cursor-pointer transition"
                  onClick={() => (window.location.href = "./allblog")}
                >
                  ดูบทความ
                </Button>
              </div>

              {/* Right */}
              <div className="flex gap-[12px] ml-[685px]">
                <Button
                  className="w-[80px] h-[44px] rounded-[8px] text-[#344054] text-[16px] bg-white border-[1px] border-[#D0D5DD] hover:bg-transparent cursor-pointer transition"
                  onClick={() => window.location.reload()}
                >
                  ยกเลิก
                </Button>

                <Button
                  className="w-[127px] h-[44px] rounded-[8px] text-[16px] bg-linear-to-r from-[#F78E1E] to-[#E9580A] hover:cursor-pointer transition"
                  onClick={handlePost}
                >
                  โพสต์บทความ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteBlog;
