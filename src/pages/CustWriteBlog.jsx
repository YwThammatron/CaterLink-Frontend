import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown, CloudUpload, Image } from "lucide-react";

import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";

function CustWriteBlog() {
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
    role: "customer",
    bio: "",
  });

  const [Blogimg, setBlogimg] = useState(null);
  const [Blogid, setBlogid] = useState("");
  const fileUploadref = useRef();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    title: "",
    detail: "",
    mainCategory: "",
    eventCategory: "",
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
    // Client-side validation
    const newErrors = {
      title: "",
      detail: "",
      mainCategory: "",
      eventCategory: "",
    };
    if (!Payload.title || Payload.title.trim() === "")
      newErrors.title = "กรุณากรอกหัวข้อบทความ";
    if (!Payload.detail || Payload.detail.trim() === "")
      newErrors.detail = "กรุณากรอกเนื้อหาบทความ";
    if (!Payload.restaurant_main_category)
      newErrors.mainCategory = "กรุณาเลือกหมวดหมู่การจัดเลี้ยง";
    if (!Payload.restaurant_event_categories)
      newErrors.eventCategory = "กรุณาเลือกประเภทงานอีเวนต์";

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((v) => v !== "");
    if (hasError) {
      // Focus first invalid field (optional)
      const firstErrorKey = Object.keys(newErrors).find((k) => newErrors[k]);
      if (firstErrorKey === "title") document.getElementById("title")?.focus();
      if (firstErrorKey === "detail")
        document.getElementById("detail")?.focus();
      return;
    }

    const isconfirm = window.confirm(
      "System : Are you sure to Post your Blog?"
    );
    if (!isconfirm) return;

    try {
      const response = await axios.post(baseUrl + "/api/blogs", Payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // API may return created blog id in different shapes; attempt to extract
      const createdId = Array.isArray(response.data)
        ? response.data[0]?.id
        : response.data?.id || response.data?.data?.id;
      if (createdId) {
        // If user didn't upload an image, finish the flow and navigate to all blogs
        if (!Blogimg) {
          window.alert("System : Blog posted successfully.");
          navigate("/allblog");
        } else {
          // If an image exists, set Blogid to trigger image upload in effect
          setBlogid(createdId);
        }
      }
    } catch (error) {
      if (error.response) {
        window.alert(
          `Code ${error.response.status} : ${error.response.data.error}`
        );
      } else {
        console.error(error);
      }
    }
  };

  const handlePostImg = async () => {
    if (!Blogimg || !Blogid) return;
    const formdata = new FormData();
    formdata.append("blog_id", Blogid);
    formdata.append("file", Blogimg);

    try {
      await axios.post(baseUrl + "/api/blog_images", formdata, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      window.alert("System : Blog posted successfully.");
      // Navigate using react-router
      navigate("/allblog");
    } catch (error) {
      if (error.response) {
        window.alert(
          `Code ${error.response.status} : ${error.response.data.error}`
        );
      } else {
        console.error(error);
      }
    }
  };

  const checkCookie = () => {
    try {
      if (document.cookie) {
        const parts = document.cookie.split(";").map((part) => part.trim());
        const userPart = parts.find((p) => p.startsWith("userData="));
        const tokenPart = parts.find((p) => p.startsWith("accessToken="));
        if (userPart) {
          const tempdata = JSON.parse(
            decodeURIComponent(userPart.slice("userData=".length))
          );
          setUserData(tempdata);
        }
        if (tokenPart) {
          const temptoken = tokenPart.slice("accessToken=".length);
          setAccessToken(temptoken);
        }
      }
      // Fallback to localStorage
      const tokenLS = localStorage.getItem("accessToken");
      const userLS = localStorage.getItem("userData");
      if (!accessToken && tokenLS) setAccessToken(tokenLS);
      if (userLS && !userData?.id) {
        try {
          setUserData(JSON.parse(userLS));
        } catch {
          // ignore parse errors
        }
      }
    } catch (e) {
      console.error("Error parsing auth data:", e);
    }
  };

  const loadCategories = async () => {
    try {
      const mainRes = await axios.get(baseUrl + "/api/main-categories");
      setMainlist(mainRes.data || []);
    } catch (err) {
      console.error(err);
      setMainlist([]);
    }

    try {
      const eventRes = await axios.get(baseUrl + "/api/event-categories");
      setEventlist(eventRes.data || []);
    } catch (err) {
      console.error(err);
      setEventlist([]);
    }
  };

  useEffect(() => {
    checkCookie();
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Blogid) {
      handlePostImg();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Blogid]);

  return (
    <>
      <NavbarCustom />

      {/* Main content - similar layout to WriteBlog but without restaurant sidebar */}
      <div className="flex flex-col items-center bg-[#F9FAFB] py-8">
        <div className="w-[1104px]">
          {/* Header */}
          <div className="flex flex-col justify-center border-b border-[#EDEEF0] mb-8 h-[63px]">
            <p className="text-[24px] font-[600]">สร้างบทความทั่วไป</p>
          </div>

          {/* Form Card */}
          <div className="border rounded-[24px] bg-white p-6">
            {/* Top - Info and Upload */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-[14px] font-[600]">ข้อมูลบทความ</p>
              </div>
              <form className="grid gap-4">
                <div>
                  <label className="flex items-center gap-1">
                    <span className="text-[14px] font-[500] text-[#6D6E71]">
                      หัวข้อบทความ
                    </span>
                    <span className="text-[#D50A0A]">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={Payload.title}
                    onChange={handleChange}
                    placeholder="กรุณาระบุหัวข้อ"
                    className="w-full h-[48px] pl-3 pr-3 border border-[#D0D5DD] rounded-md"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-600 mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1">
                    <span className="text-[14px] font-[500] text-[#6D6E71]">
                      รูปปกบทความ
                    </span>
                    <span className="text-[#D50A0A]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      id="img"
                      ref={fileUploadref}
                      onChange={handleUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="img"
                      className="flex items-center gap-4 w-full h-[104px] p-4 border border-[#D0D5DD] rounded-md cursor-pointer"
                    >
                      <div className="w-10 h-10 flex items-center justify-center border rounded-md">
                        {Blogimg != null ? (
                          <Image className="w-5 h-5" />
                        ) : (
                          <CloudUpload className="w-5 h-5" />
                        )}
                      </div>
                      {Blogimg != null ? (
                        <div className="flex gap-4">
                          <p className="text-[#F78E1E] font-[600]">
                            {Blogimg.name}
                          </p>
                          <p
                            onClick={handlenoUpload}
                            className="text-sm text-[#F78E1E] cursor-pointer"
                          >
                            ยกเลิก
                          </p>
                        </div>
                      ) : (
                        <div className=" text-gradient">คลิกเพื่ออัพโหลด</div>
                      )}
                    </label>
                  </div>
                </div>
              </form>
            </div>

            <div className="h-px bg-[#EAECF0] mb-6" />

            {/* Category selectors */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-[14px] font-[600]">หมวดหมู่</p>
              </div>
              <form className="grid gap-4">
                <div>
                  <label className="flex items-center gap-1">
                    <span className="text-[14px] font-[500] text-[#6D6E71]">
                      ประเภทการจัดเลี้ยง
                    </span>
                    <span className="text-[#D50A0A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="restaurant_main_category"
                      value={Payload.restaurant_main_category}
                      onChange={handleChange}
                      className="appearance-none w-full h-[48px] pl-3 pr-10 border border-[#D0D5DD] rounded-md"
                    >
                      <option value="" hidden>
                        เลือกข้อมูล
                      </option>
                      {Mainlist.map((content) => (
                        <option key={content.id} value={content.id}>
                          {content.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-[#86878A]" />
                    </div>
                  </div>
                  {errors.mainCategory && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.mainCategory}
                    </p>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-1">
                    <span className="text-[14px] font-[500] text-[#6D6E71]">
                      ประเภทงานอีเวนต์
                    </span>
                    <span className="text-[#D50A0A]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="restaurant_event_categories"
                      value={Payload.restaurant_event_categories}
                      onChange={handleChange}
                      className="appearance-none w-full h-[48px] pl-3 pr-10 border border-[#D0D5DD] rounded-md"
                    >
                      <option value="" hidden>
                        เลือกข้อมูล
                      </option>
                      {Eventlist.map((content) => (
                        <option key={content.id} value={content.id}>
                          {content.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <ChevronDown className="w-5 h-5 text-[#86878A]" />
                    </div>
                  </div>
                  {errors.eventCategory && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.eventCategory}
                    </p>
                  )}
                </div>
              </form>
            </div>

            <div className="h-px bg-[#EAECF0] mb-6" />

            {/* Content (Blog Detail) */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-[14px] font-[600]">เนื้อหาบทความ</p>
              </div>
              <form>
                <label className="flex items-center gap-1">
                  <span className="text-[14px] font-[500] text-[#6D6E71]">
                    เนื้อหา
                  </span>
                  <span className="text-[#D50A0A]">*</span>
                </label>
                <textarea
                  id="detail"
                  value={Payload.detail}
                  onChange={handleChange}
                  placeholder="กรุณากรอกข้อมูล"
                  className="w-full h-[200px] p-3 border border-[#D0D5DD] rounded-md resize-none"
                />
                {errors.detail && (
                  <p className="text-sm text-red-600 mt-1">{errors.detail}</p>
                )}
              </form>
            </div>

            <div className="h-px bg-[#EAECF0] mb-6" />

            {/* Actions */}
            <div className="flex justify-between items-center">
              <div>
                {/* <Button
                  className="w-[100px] h-[44px] rounded-[8px] text-[#F78E1E] bg-transparent border border-[#F78E1E] hover:bg-transparent"
                  onClick={() => (window.location.href = "./allblog")}
                >
                  ดูบทความ
                </Button> */}
              </div>
              <div className="flex gap-4">
                <Button
                  className="w-[80px] h-[44px] rounded-[8px] bg-white border border-[#D0D5DD] text-black hover:border-[#FF8A00] hover:bg-[#FF8A00]/10 hover:text-[#FF8A00] transition-colors duration-200"
                  onClick={() => (window.location.href = "./allblog")}
                >
                  ยกเลิก
                </Button>
                <Button
                  className="w-[127px] h-[44px] bg-gradient-to-r from-[#F78E1E] to-[#E9580A] text-white"
                  onClick={handlePost}
                >
                  โพสต์บทความ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MiniFooter />
    </>
  );
}

export default CustWriteBlog;
