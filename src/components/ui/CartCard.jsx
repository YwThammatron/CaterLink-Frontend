import { useState, useEffect, useCallback } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

function CartCard({
  status = "รอร้านตอบรับ",
  orderData = null,
  formatTime,
  formatDate,
  onOrderUpdate = () => {}, // Callback to refresh orders after status change
}) {
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  // State for additional order details
  const [restaurantName, setRestaurantName] = useState("กำลังโหลด...");
  const [packageName, setPackageName] = useState("กำลังโหลด...");
  const [packageDescription, setPackageDescription] = useState("");
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  // Authentication helpers
  const getAuthToken = () => {
    // First try to get from cookies
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("accessToken="));
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      if (token && token !== "undefined" && token !== "null") {
        return token;
      }
    }

    // Fallback to localStorage
    const localToken = localStorage.getItem("accessToken");
    if (localToken && localToken !== "undefined" && localToken !== "null") {
      return localToken;
    }

    return null;
  };

  const isUserAuthenticated = () => {
    const token = getAuthToken();
    return !!token;
  };

  const goToPayment = () => {
    navigate("/payment");
  };

  const goToComment = () => {
    // Pass order data to comment page via state
    navigate("/comment", {
      state: {
        orderData,
        restaurantName,
        packageName,
        packageDescription,
      },
    });
  };

  // Cancel order function
  const cancelOrder = async () => {
    if (!orderData?.id) {
      toast.error("ไม่พบข้อมูลคำสั่งซื้อ");
      return;
    }

    if (!isUserAuthenticated()) {
      toast.error("กรุณาเข้าสู่ระบบเพื่อดำเนินการ");
      return;
    }

    // Confirm cancellation
    if (!window.confirm("คุณต้องการยกเลิกคำขอนี้หรือไม่?")) {
      return;
    }

    setIsUpdatingStatus(true);

    try {
      const token = getAuthToken();
      await axios.put(
        `${baseUrl}/api/orders/${orderData.id}/status`,
        { status: "cancel" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("ยกเลิกคำขอเรียบร้อยแล้ว");

      // Call the callback to refresh the orders list
      onOrderUpdate();
    } catch (error) {
      console.error("Error cancelling order:", error);
      if (error.response?.status === 401) {
        toast.error("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
      } else if (error.response?.status === 403) {
        toast.error("ไม่สามารถยกเลิกคำขอนี้ได้");
      } else {
        toast.error("เกิดข้อผิดพลาดในการยกเลิกคำขอ");
      }
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Fetch restaurant details
  const fetchRestaurantDetails = useCallback(
    async (restaurantId) => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/restaurants/${restaurantId}`
        );
        setRestaurantName(response.data.name || "ไม่ทราบชื่อร้าน");
      } catch (error) {
        console.error("Error fetching restaurant:", error);
        setRestaurantName("ไม่ทราบชื่อร้าน");
      }
    },
    [baseUrl]
  );

  // Fetch package details
  const fetchPackageDetails = useCallback(
    async (packageId) => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/packages/${packageId}`
        );

        // Set package name from the main package
        setPackageName(response.data.name || "ไม่ทราบชื่อแพคเกจ");

        // Find the specific package detail that was selected
        const packageDetails = response.data.package_details || [];

        // If orderData has package_detail_id, find the matching detail
        if (orderData?.package_detail_id) {
          const selectedDetail = packageDetails.find(
            (detail) => detail.id === orderData.package_detail_id
          );

          if (selectedDetail) {
            setPackageDescription(selectedDetail.description || "");
            // Optionally update package name to the specific detail name
            setPackageName(
              selectedDetail.name || response.data.name || "ไม่ทราบชื่อแพคเกจ"
            );
          } else {
            setPackageDescription("ไม่พบรายละเอียดแพคเกจ");
          }
        } else {
          // Fallback: use the first package detail description if no specific detail ID
          const firstDetail = packageDetails[0];
          setPackageDescription(firstDetail?.description || "ไม่มีรายละเอียด");
        }
      } catch (error) {
        console.error("Error fetching package:", error);
        setPackageName("ไม่ทราบชื่อแพคเกจ");
        setPackageDescription("");
      }
    },
    [baseUrl, orderData?.package_detail_id]
  );

  // Load data when orderData changes
  useEffect(() => {
    if (orderData) {
      if (orderData.restaurant_id) {
        fetchRestaurantDetails(orderData.restaurant_id);
      }
      if (orderData.package_id) {
        fetchPackageDetails(orderData.package_id);
      }
    }
  }, [orderData, fetchRestaurantDetails, fetchPackageDetails]);

  // If no order data provided, use default display
  if (!orderData) {
    return (
      <div className="flex flex-col gap-3 max-w-[1184px] w-full">
        <div className="flex flex-col border border-[#D0D5DD] rounded-lg gap-4 py-4">
          <div className="flex gap-3 pb-4 px-4 items-center border-b border-[#D0D5DD]">
            <p className="text-sm font-medium">โหระพา เคทเทอริ่ง</p>
            <Badge className="rounded-full border border-[#D5D9EB] bg-[#F8F9FC] py-1 px-3 text-[#363F72] text-sm font-medium">
              {status}
            </Badge>
          </div>
          <div className="flex gap-6">
            <div className="flex flex-col gap-4 max-w-[516px] w-full pl-4">
              <div className="flex flex-col gap-1">
                <p className="font-bold text-[#101828]">แพคเกจตัวอย่าง</p>
                <p className="text-[#475467]">จำนวนแขก - ท่าน</p>
                <p className="text-[#475467]">รายละเอียดแพคเกจ</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[#475467]">วันที่และเวลา</p>
                <p className="text-[#475467]">สถานที่</p>
              </div>
            </div>
            <div className="flex justify-evenly max-w-[636px] w-full items-center">
              <p>-</p>
              <p>-</p>
              <p className="text-gradient">-</p>
              <Button className="text-[#475467] bg-white border-none">-</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Define badge
  const badgeConfig = {
    ที่ต้องชำระ: {
      badge: {
        className:
          "rounded-full border border-[#FEDF89] bg-[#FFFAEB] py-1 px-3 text-[#B54708] text-sm font-medium",
        text: "ที่ต้องชำระ",
      },
      button: {
        className:
          "bg-gradient py-2 px-3 rounded-md text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200",
        onClick: goToPayment,
        text: "ชำระมัดจำ",
      },
    },
    จัดเตรียมสำเร็จ: {
      badge: {
        className:
          "rounded-full border border-[#D9D6FE] bg-[#F4F3FF] py-1 px-3 text-[#5925DC] text-sm font-medium",
        text: "จัดเตรียมสำเร็จ",
      },
      button: {
        className:
          "py-2 px-3 rounded-md text-transparent cursor-default select-none bg-white hover:bg-white transition-colors duration-200",
        onClick: null,
        text: "เสร็จสิ้น",
      },
    },
    รอร้านตอบรับ: {
      badge: {
        className:
          "rounded-full border border-[#D5D9EB] bg-[#F8F9FC] py-1 px-3 text-[#363F72] text-sm font-medium",
        text: "รอร้านตอบรับ",
      },
      button: {
        className:
          "text-[#475467] bg-white border-none hover:text-gray-200 transition-colors duration-200",
        onClick: cancelOrder,
        text: isUpdatingStatus ? "กำลังยกเลิก..." : "ยกเลิกคำขอ",
      },
    },
    กำลังจัดเตรียม: {
      badge: {
        className:
          "rounded-full border border-[#B9E6FE] bg-[#F0F9FF] py-1 px-3 text-[#026AA2] text-sm font-medium",
        text: "กำลังจัดเตรียม",
      },
      button: {
        className:
          "py-2 px-3 rounded-md text-transparent cursor-default select-none bg-white hover:bg-white transition-colors duration-200",
        onClick: null,
        text: "กำลังดำเนินการ",
      },
    },
    สำเร็จแล้ว: {
      badge: {
        className:
          "rounded-full border border-[#ABEFC6] bg-[#ECFDF3] py-1 px-3 text-[#067647] text-sm font-medium",
        text: "สำเร็จแล้ว",
      },
      button: {
        className:
          "bg-white py-2 px-3 rounded-md text-gradient border border-[#FF8A00] font-semibold cursor-pointer hover:bg-orange-50 transition-colors duration-200",
        onClick: goToComment,
        text: "ให้คะแนน",
      },
    },
    ยกเลิก: {
      badge: {
        className:
          "rounded-full border border-[#FECDCA] bg-[#FEF3F2] py-1 px-3 text-[#B42318] text-sm font-medium",
        text: "ยกเลิก",
      },
      button: {
        className:
          "py-2 px-3 rounded-md text-transparent cursor-default select-none bg-white hover:bg-white transition-colors duration-200",
        onClick: null,
        text: "คำสั่งปิด",
      },
    },
  };

  const currentConfig = badgeConfig[status] || badgeConfig["รอร้านตอบรับ"];

  return (
    <div className="flex flex-col gap-3 max-w-[1184px] w-full">
      <div className="flex flex-col border border-[#D0D5DD] rounded-lg gap-4 py-4">
        <div className="flex gap-3 pb-4 px-4 items-center border-b border-[#D0D5DD]">
          <p className="text-sm font-medium">{restaurantName}</p>
          <Badge className={currentConfig.badge.className}>
            {currentConfig.badge.text}
          </Badge>
        </div>

        <div className="flex gap-6">
          <div className="flex flex-col gap-4 max-w-[516px] w-full pl-4">
            <div className="flex flex-col gap-1">
              <p className="font-bold text-[#101828]">{packageName}</p>
              <p className="text-[#475467]">
                จำนวนแขก {orderData?.participants || 0} ท่าน
              </p>
              <p className="text-[#475467]">
                {packageDescription || "รายละเอียดแพคเกจ"}
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[#475467]">
                วันที่{" "}
                {formatDate
                  ? formatDate(orderData?.event_date)
                  : orderData?.event_date}
                {orderData?.start_time && orderData?.end_time && (
                  <span>
                    {" "}
                    เวลา{" "}
                    {formatTime
                      ? formatTime(orderData.start_time)
                      : orderData.start_time}{" "}
                    -{" "}
                    {formatTime
                      ? formatTime(orderData.end_time)
                      : orderData.end_time}
                  </span>
                )}
              </p>
              <p className="text-[#475467]">
                {orderData?.location || "ไม่ระบุสถานที่"}
              </p>
            </div>
          </div>

          <div className="flex justify-evenly max-w-[636px] w-full items-center">
            <p>{orderData?.participants || 0}</p>
            <p>{orderData?.total_price?.toLocaleString() || 0}</p>
            <p className="text-gradient">
              {Math.round((orderData?.total_price || 0) / 2).toLocaleString()}
            </p>
            <Button
              className={currentConfig.button.className}
              onClick={currentConfig.button.onClick}
            >
              {currentConfig.button.text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
