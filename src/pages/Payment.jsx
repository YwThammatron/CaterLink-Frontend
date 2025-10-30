import NavbarCustom from "../components/ui/Navbar-custom";
import MiniFooter from "../components/ui/miniFooter";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import qrmock from "../assets/qrmock.png";

function Payment() {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
  const location = useLocation();
  const navigate = useNavigate();

  // Get order data from navigation state
  const { orderData } = location.state || {};

  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect back if no order data
  useEffect(() => {
    if (!orderData) {
      toast.error("ไม่พบข้อมูลคำสั่งซื้อ");
      navigate("/cart");
    }
  }, [orderData, navigate]);

  // Authentication helpers
  const getAuthToken = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("accessToken="));
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      if (token && token !== "undefined" && token !== "null") {
        return token;
      }
    }
    const localToken = localStorage.getItem("accessToken");
    if (localToken && localToken !== "undefined" && localToken !== "null") {
      return localToken;
    }
    return null;
  };

  const isUserAuthenticated = () => {
    return !!getAuthToken();
  };

  // Calculate payment deadline (example: 7 days from now)
  const getPaymentDeadline = () => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    return (
      deadline.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) +
      " เวลา " +
      deadline.toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }) +
      " น."
    );
  };

  // Process payment function
  const processPayment = async () => {
    if (!isUserAuthenticated()) {
      toast.error("กรุณาเข้าสู่ระบบเพื่อดำเนินการ");
      return;
    }

    if (!orderData?.id) {
      toast.error("ไม่พบข้อมูลคำสั่งซื้อ");
      return;
    }

    setIsProcessing(true);

    try {
      const token = getAuthToken();
      const currentTimestamp = new Date().toISOString();

      // Step 1: Process payment
      await axios.post(
        `${baseUrl}/api/payments`,
        {
          timestamp: currentTimestamp,
          order_id: orderData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Step 2: Update order status to preparing
      await axios.put(
        `${baseUrl}/api/orders/${orderData.id}/status`,
        { status: "preparing" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("ชำระเงินเรียบร้อยแล้ว ร้านค้าจะดำเนินการจัดเตรียมอาหาร");

      // Navigate back to cart page to see updated status
      navigate("/cart");
    } catch (error) {
      console.error("Error processing payment:", error);
      if (error.response?.status === 401) {
        toast.error("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
      } else if (error.response?.status === 400) {
        toast.error("ข้อมูลการชำระเงินไม่ถูกต้อง");
      } else if (error.response?.status === 404) {
        toast.error("ไม่พบคำสั่งซื้อนี้");
      } else {
        toast.error("เกิดข้อผิดพลาดในการชำระเงิน");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  // Show loading if no order data yet
  if (!orderData) {
    return (
      <>
        <NavbarCustom />
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-gray-500">กำลังโหลด...</div>
        </div>
        <MiniFooter />
      </>
    );
  }
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 justify-center items-center py-15">
          <h1>ชำระเงินมัดจำ</h1>
          <p className="text-[#667085]">
            โปรดชำระภายในวันที่ {getPaymentDeadline()}
          </p>
        </div>

        <img
          src={qrmock}
          alt=""
          className="max-w-[379px] max-h-[369px] rounded-lg"
        />

        <Button
          className="w-[200px] bg-gradient text-white mt-15 py-[10px] px-4 font-semibold"
          onClick={processPayment}
          disabled={isProcessing}
        >
          {isProcessing ? "กำลังดำเนินการ..." : "เสร็จแล้ว"}
        </Button>
      </div>
      <MiniFooter />
    </>
  );
}

export default Payment;
