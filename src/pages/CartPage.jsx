import { useState, useEffect, useCallback } from "react";
import NavbarCustom from "../components/ui/Navbar-custom";
import Cartbar from "../components/ui/Cartbar";
import CartCard from "../components/ui/CartCard";
import MiniFooter from "../components/ui/miniFooter";
import axios from "axios";
import { toast } from "sonner";

function CartPage() {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  // State management
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [error, setError] = useState(null);

  // Status mapping for API to Thai display
  const statusMapping = {
    pending: "รอร้านตอบรับ",
    "waiting for payment": "ที่ต้องชำระ",
    "done preparing": "จัดเตรียมสำเร็จ",
    preparing: "กำลังจัดเตรียม",
    "in preparation": "กำลังจัดเตรียม", // Alternative status name
    finished: "สำเร็จแล้ว",
    completed: "สำเร็จแล้ว", // Alternative status name
    cancel: "ยกเลิก",
    cancelled: "ยกเลิก", // Alternative status name
  };

  // Helper function to check authentication
  const isUserAuthenticated = () => {
    // Check for authentication token in cookies
    if (document.cookie) {
      const parts = document.cookie.split(";").map((part) => part.trim());
      const tokenPart = parts.find((p) => p.startsWith("accessToken="));
      if (tokenPart) {
        return true;
      }
    }

    // Fallback to localStorage
    const token = localStorage.getItem("accessToken");
    return !!token;
  };

  // Helper function to get authentication token
  const getAuthToken = () => {
    // Try to get token from cookies first
    if (document.cookie) {
      const parts = document.cookie.split(";").map((part) => part.trim());
      const tokenPart = parts.find((p) => p.startsWith("accessToken="));
      if (tokenPart) {
        return tokenPart.slice("accessToken=".length);
      }
    }

    // Fallback to localStorage
    return localStorage.getItem("accessToken") || null;
  };

  // Fetch orders from API
  const fetchOrders = useCallback(
    async (status = "all") => {
      if (!isUserAuthenticated()) {
        setError("กรุณาเข้าสู่ระบบเพื่อดูคำสั่งซื้อ");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const token = getAuthToken();
        const response = await axios.get(`${baseUrl}/api/orders/me`, {
          params: { status },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setOrders(response.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (error.response?.status === 401) {
          setError("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
          toast.error("กรุณาเข้าสู่ระบบใหม่อีกครั้ง");
        } else {
          setError("เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ");
          toast.error("เกิดข้อผิดพลาดในการโหลดคำสั่งซื้อ");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [baseUrl]
  );

  // Handle status filter change
  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    fetchOrders(status);
  };

  // Load orders when component mounts
  useEffect(() => {
    fetchOrders(selectedStatus);
  }, [fetchOrders, selectedStatus]);

  // Refresh orders when page gains focus or becomes visible (e.g., returning from payment)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchOrders(selectedStatus);
      }
    };

    const handleFocus = () => {
      fetchOrders(selectedStatus);
    };

    // Listen for both visibility change and window focus
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchOrders, selectedStatus]);

  // Format time for display (convert Z suffix time to readable format)
  const formatTime = (timeString) => {
    if (!timeString) return "";
    // Remove Z and convert to readable format
    const time = timeString.replace("Z", "");
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col items-center">
        <div className="flex flex-col py-10 items-center max-w-[1184px] w-full">
          <h1>คำสั่งซื้อของฉัน</h1>
          <div className="flex flex-col gap-3 w-full">
            <Cartbar
              selectedStatus={selectedStatus}
              onStatusChange={handleStatusChange}
            />

            {/* Loading State */}
            {isLoading && (
              <div className="flex flex-col gap-3 w-full">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="border border-[#D0D5DD] rounded-lg p-4"
                  >
                    <div className="animate-pulse">
                      <div className="flex gap-3 pb-4 border-b border-[#D0D5DD]">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        <div className="h-6 bg-gray-200 rounded w-24"></div>
                      </div>
                      <div className="flex gap-6 pt-4">
                        <div className="flex-1">
                          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                        <div className="flex gap-8">
                          <div className="h-4 bg-gray-200 rounded w-8"></div>
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-8 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !isLoading && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-red-500 text-lg font-medium mb-2">
                  {error}
                </div>
                <button
                  onClick={() => fetchOrders(selectedStatus)}
                  className="bg-gradient px-4 py-2 rounded-md text-white font-medium hover:opacity-90"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            )}

            {/* Orders List */}
            {!isLoading &&
              !error &&
              orders.length > 0 &&
              orders.map((order) => (
                <CartCard
                  key={order.id}
                  orderData={order}
                  status={statusMapping[order.status] || order.status}
                  formatTime={formatTime}
                  formatDate={formatDate}
                  onOrderUpdate={() => fetchOrders(selectedStatus)}
                />
              ))}

            {/* Empty State */}
            {!isLoading && !error && orders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-gray-500 text-lg mb-2">
                  {selectedStatus === "all"
                    ? "ยังไม่มีคำสั่งซื้อ"
                    : `ไม่พบคำสั่งซื้อสถานะ "${
                        statusMapping[selectedStatus] || selectedStatus
                      }"`}
                </div>
                <p className="text-gray-400 text-sm">
                  คำสั่งซื้อของคุณจะแสดงที่นี่เมื่อทำการจองสำเร็จ
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default CartPage;
