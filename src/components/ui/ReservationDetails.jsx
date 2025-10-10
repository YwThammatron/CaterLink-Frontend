import { Calendar, CheckCircle, X } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { useState, useEffect, useRef, useCallback } from "react";
import { Calendar as CalendarComponent } from "./calendar";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function ReservationDetails({ onClose, onBack, selectedPackage }) {
  const { id: restaurantId } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

  const [date, setDate] = useState();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [messageToRestaurant, setMessageToRestaurant] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasLoadedSavedData, setHasLoadedSavedData] = useState(false);
  const calendarRef = useRef(null);

  // Helper functions for reservation state persistence
  const saveReservationState = useCallback(() => {
    const reservationState = {
      date: date ? date.toISOString() : null,
      startTime,
      endTime,
      meetingLocation,
      messageToRestaurant,
      selectedPackage,
      restaurantId,
      timestamp: Date.now()
    };
    
    localStorage.setItem('pendingReservation', JSON.stringify(reservationState));
  }, [date, startTime, endTime, meetingLocation, messageToRestaurant, selectedPackage, restaurantId]);

  const loadReservationState = useCallback(() => {
    try {
      const savedState = localStorage.getItem('pendingReservation');
      
      if (savedState) {
        const state = JSON.parse(savedState);
        
        // Check if the saved state is not too old (24 hours)
        const isStateValid = state.timestamp && (Date.now() - state.timestamp) < 24 * 60 * 60 * 1000;
        
        if (isStateValid && String(state.restaurantId) === String(restaurantId)) {
          // Check if we actually have data to restore
          const hasDataToRestore = state.date || state.startTime || state.endTime || 
                                   state.meetingLocation || state.messageToRestaurant;
          
          if (hasDataToRestore && !hasLoadedSavedData) {
            setDate(state.date ? new Date(state.date) : null);
            setStartTime(state.startTime || "");
            setEndTime(state.endTime || "");
            setMeetingLocation(state.meetingLocation || "");
            setMessageToRestaurant(state.messageToRestaurant || "");
            
            // Mark that we've loaded the data
            setHasLoadedSavedData(true);
            
            // Clear the saved state after successfully loading form data
            localStorage.removeItem('pendingReservation');
            
            // Show success message to user
            toast.success("ข้อมูลการจองของคุณได้รับการกู้คืนแล้ว", {
              duration: 3000,
            });
          }
        } else {
          localStorage.removeItem('pendingReservation');
        }
      }
    } catch (error) {
      console.error('Error loading reservation state:', error);
      localStorage.removeItem('pendingReservation');
    }
  }, [restaurantId, hasLoadedSavedData]);

  const clearReservationState = useCallback(() => {
    localStorage.removeItem('pendingReservation');
  }, []);

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

  // Calculate total price and deposit
  const calculateTotalPrice = () => {
    if (!selectedPackage?.price || !selectedPackage?.customGuestCount) {
      return 0;
    }
    // Ensure price is treated as a number and result is rounded to integer
    const price = Number(selectedPackage.price);
    const guests = parseInt(selectedPackage.customGuestCount, 10);
    const total = price * guests;
    return Math.round(total); // Round to nearest integer to avoid decimals
  };

  const calculateDeposit = () => {
    const totalPrice = calculateTotalPrice();
    return Math.round(totalPrice / 2); // Round to avoid decimal issues
  };

  const formatPrice = (price) => {
    // Ensure price is a number and round it to avoid decimal display issues
    const numPrice = Number(price);
    return Math.round(numPrice).toLocaleString("th-TH");
  };

  // Generate time options in 12-hour format
  const timeOptions = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
    "09:00 PM",
    "10:00 PM",
  ];

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Helper function to convert 12-hour format to 24-hour format with Z suffix
  const convertTo24HourFormat = (time12h) => {
    if (!time12h) return "";

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}:00Z`;
  };

  // Helper function to format date for API (YYYY-MM-DD)
  const formatDateForAPI = (date) => {
    if (!date) return "";

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsCalendarOpen(false);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load saved reservation state on component mount
  useEffect(() => {
    // Add a small delay to ensure the component is fully mounted
    const timeoutId = setTimeout(() => {
      loadReservationState();
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, [loadReservationState]);

  // Additional attempt to load data when selectedPackage is set (when modal opens)
  useEffect(() => {
    if (selectedPackage && !hasLoadedSavedData) {
      const timeoutId = setTimeout(() => {
        loadReservationState();
      }, 150);
      
      return () => clearTimeout(timeoutId);
    }
  }, [selectedPackage, loadReservationState, hasLoadedSavedData]);

  // Force reload attempt if we still have pending data but haven't loaded it
  useEffect(() => {
    const checkAndReload = () => {
      const savedState = localStorage.getItem('pendingReservation');
      if (savedState && !hasLoadedSavedData) {
        loadReservationState();
      }
    };

    // Check periodically for the first 3 seconds after component mount
    const intervalId = setInterval(checkAndReload, 500);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, 3000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [loadReservationState, hasLoadedSavedData]);

  // Clear saved state when component unmounts (if user closes modal without completing)
  useEffect(() => {
    return () => {
      // Only clear if we're not navigating to login and we've already loaded the data
      const isNavigatingToLogin = localStorage.getItem('navigatingToLogin');
      if (!isNavigatingToLogin && hasLoadedSavedData) {
        clearReservationState();
      }
    };
  }, [clearReservationState, hasLoadedSavedData]);

  // Handle reservation success
  const handleReservationSuccess = async () => {
    // Check authentication first
    if (!isUserAuthenticated()) {
      // Save current reservation state before redirecting to login
      saveReservationState();
      
      // Set flag to indicate we're navigating to login
      localStorage.setItem('navigatingToLogin', 'true');
      
      // Set return URL to come back to this reservation with package info
      const packageParam = selectedPackage?.id ? `?packageId=${selectedPackage.id}` : '';
      const returnUrl = `/customerreservation/${restaurantId}${packageParam}`;
      localStorage.setItem('loginReturnUrl', returnUrl);
      
      toast.error("กรุณาเข้าสู่ระบบก่อนทำการจอง");
      // Redirect to login page
      navigate("/custlogin");
      return;
    }

    // Clear the navigation flag if user is authenticated
    localStorage.removeItem('navigatingToLogin');
    localStorage.removeItem('loginReturnUrl');

    // Validation
    if (!date) {
      toast.error("กรุณาเลือกวันที่");
      return;
    }

    if (!startTime || !endTime) {
      toast.error("กรุณาเลือกเวลาเริ่มและเวลาจบ");
      return;
    }

    if (!meetingLocation.trim()) {
      toast.error("กรุณาระบุสถานที่นัดกับร้าน");
      return;
    }

    if (!selectedPackage?.customGuestCount) {
      toast.error("กรุณาระบุจำนวนผู้เข้าร่วม");
      return;
    }

    // Validate participants is a valid integer
    const participantsCount = parseInt(selectedPackage.customGuestCount, 10);
    if (
      isNaN(participantsCount) ||
      participantsCount <= 0 ||
      !Number.isInteger(participantsCount)
    ) {
      toast.error("จำนวนผู้เข้าร่วมไม่ถูกต้อง");
      return;
    }

    // Extra validation: ensure all IDs are valid UUIDs (basic check)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (
      !selectedPackage?.packageInfo?.id ||
      !uuidRegex.test(selectedPackage.packageInfo.id)
    ) {
      toast.error("Package ID ไม่ถูกต้อง");
      return;
    }
    if (!selectedPackage?.id || !uuidRegex.test(selectedPackage.id)) {
      toast.error("Package Detail ID ไม่ถูกต้อง");
      return;
    }
    if (!restaurantId || !uuidRegex.test(restaurantId)) {
      toast.error("Restaurant ID ไม่ถูกต้อง");
      return;
    }

    // Prepare reservation data for API
    const reservationData = {
      location: meetingLocation.trim(),
      package_id: selectedPackage?.packageInfo?.id, // PACKAGE ID
      restaurant_id: restaurantId,
      start_time: convertTo24HourFormat(startTime),
      end_time: convertTo24HourFormat(endTime),
      event_date: formatDateForAPI(date),
      message: messageToRestaurant.trim() || "",
      package_detail_id: selectedPackage?.id, // PACKAGE DETAIL ID
      participants: parseInt(participantsCount), // Ensure it's definitely an integer
    };

    try {
      setIsSubmitting(true);

      // Get authentication token from cookies or localStorage
      const token = getAuthToken();

      const response = await axios.post(
        `${baseUrl}/api/orders`,
        reservationData,
        {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      console.log("Reservation successful:", response.data); // Debug log

      // Show success toast with custom JSX content
      const toastId = toast(
        <div className="relative max-w-[480px]">
          {/* Close button in top right */}
          <button
            onClick={() => toast.dismiss(toastId)}
            className="absolute -top-2 -right-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-[#667085] hover:text-[#344054]" />
          </button>

          {/* Main content */}
          <div className="flex items-start gap-3 pr-6">
            {/* Green checkmark icon */}
            <div className="flex-shrink-0 mt-0.5">
              <CheckCircle className="h-5 w-5 text-[#10B981]" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-3 flex-1 w-full">
              <div className="text-[#101828] font-medium text-sm">
                ส่งการจองให้ร้านค้าแล้ว
              </div>
              <div className="text-[#667085] text-sm">
                โปรดรอร้านค้าตอบกลับภายในระยะเวลา 1-2 วัน
              </div>
              <button
                className="text-[#FF8A00] text-sm font-semibold text-left hover:text-[#E6720A] transition-colors"
                onClick={() => {
                  console.log("View booking status clicked");
                  // Add navigation logic here if needed
                }}
              >
                ดูสถานะการจอง
              </button>
            </div>
          </div>
        </div>,
        {
          duration: 6000,
          style: {
            background: "white",
            border: "1px solid #E4E7EC",
            boxShadow:
              "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
            borderRadius: "12px",
            padding: "16px",
            minWidth: "400px",
          },
          unstyled: true, // Completely remove all default Sonner styling
        }
      );

      // Close the modal
      onClose();
    } catch (error) {
      console.error("Reservation failed:", error);

      // Show error toast
      let errorMessage = "เกิดข้อผิดพลาดในการจอง";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.message) {
        errorMessage = `เกิดข้อผิดพลาด: ${error.message}`;
      }
      toast.error(errorMessage, {
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[688px] rounded-xl bg-white flex flex-col">
      {/* header */}
      <div className="p-6">
        <h3>เพิ่มรายละเอียดการจอง</h3>
      </div>

      <div className="flex flex-col gap-5 p-6">
        <p className="font-bold text-[#344054]">สรุปคำสั่งซื้อ</p>

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">
              แพคเก็จที่เลือก
            </p>
            <div className="p-4 border border-[#D0D5DD] rounded-xl bg-[#F9FAFB] w-[464px] min-h-[116px]">
              {selectedPackage ? (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-[#344054]">
                      {selectedPackage.packageInfo
                        ? selectedPackage.name
                        : `จำนวนแขก ${selectedPackage.guests} ท่าน`}
                    </p>
                    <div className="flex flex-col items-end">
                      {selectedPackage.has_discount &&
                      selectedPackage.old_price ? (
                        <>
                          <p className="font-bold text-gradient text-lg">
                            {selectedPackage.price} บาท
                          </p>
                          <p className="text-sm text-gray-500 line-through">
                            {selectedPackage.old_price} บาท
                          </p>
                        </>
                      ) : (
                        <p className="font-bold text-gradient text-lg">
                          {selectedPackage.packageInfo
                            ? `${selectedPackage.price} บาท`
                            : `${selectedPackage.price} บาท/ท่าน`}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-[#475467] text-sm leading-relaxed">
                    {selectedPackage.description}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-[#98A2B3] text-sm">
                  ยังไม่ได้เลือกแพคเก็จ
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">จำนวนท่าน/ที่</p>
            <div className="p-4 border border-[#D0D5DD] rounded-xl bg-[#F9FAFB] w-[464px] flex items-center">
              <span className="text-[#344054]">
                {selectedPackage?.customGuestCount
                  ? `${selectedPackage.customGuestCount} ท่าน`
                  : "ไม่ได้ระบุจำนวน"}
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">ยอดชำระมัดจำ</p>
            <div className="p-4 border border-[#D0D5DD] rounded-xl bg-[#F9FAFB] w-[464px] flex items-center">
              <span className="text-[#344054]">
                {selectedPackage?.price && selectedPackage?.customGuestCount
                  ? `${formatPrice(calculateDeposit())} บาท`
                  : "ยังคำนวณไม่ได้"}
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">ยอดชำระทั้งหมด</p>
            <div className="p-4 border border-[#D0D5DD] rounded-xl bg-[#F9FAFB] w-[464px] flex items-center">
              <span className="font-semibold text-[#FF8A00]">
                {selectedPackage?.price && selectedPackage?.customGuestCount
                  ? `${formatPrice(calculateTotalPrice())} บาท`
                  : "ยังคำนวณไม่ได้"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 p-6">
        <p className="font-bold text-[#344054]">วันที่ต้องการนัด</p>

        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">
              วันที่ต้องการนัด
            </p>
            <div className="relative w-[464px]" ref={calendarRef}>
              {/* Date Input */}
              <button
                type="button"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                className="w-full p-3 border border-[#D0D5DD] rounded-lg bg-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none text-left flex items-center justify-between hover:border-[#FF8A00]/50 transition-colors"
              >
                <span className={date ? "text-[#344054]" : "text-[#98A2B3]"}>
                  {date ? formatDate(date) : "เลือกวันที่"}
                </span>
                <Calendar
                  size={16}
                  className={`text-[#667085] transition-transform ${
                    isCalendarOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Calendar Dropdown */}
              {isCalendarOpen && (
                <div className="absolute top-full left-0 mt-1 z-50 bg-white border border-[#D0D5DD] rounded-lg shadow-lg overflow-hidden">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    className="rounded-lg border-0"
                    disabled={(date) => date < new Date()}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">ระยะเวลานัด*</p>
            <div className="flex flex-col gap-3 w-[464px]">
              <div className="flex gap-3">
                {/* Start Time */}
                <div className="flex-1">
                  <label className="block text-xs text-[#667085] mb-1">
                    เวลาเริ่ม
                  </label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full p-3 border border-[#D0D5DD] rounded-lg bg-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none"
                  >
                    <option value="">เลือกเวลาเริ่ม</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* End Time */}
                <div className="flex-1">
                  <label className="block text-xs text-[#667085] mb-1">
                    เวลาจบ
                  </label>
                  <select
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full p-3 border border-[#D0D5DD] rounded-lg bg-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none"
                  >
                    <option value="">เลือกเวลาจบ</option>
                    {timeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time validation message */}
              {startTime && endTime && (
                <p className="text-xs text-[#667085]">
                  ระยะเวลา: {startTime} - {endTime}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">
              สถานที่นัดกับร้าน
            </p>
            <Input
              value={meetingLocation}
              onChange={(e) => setMeetingLocation(e.target.value)}
              placeholder="ระบุสถานที่ที่ต้องการนัดกับร้าน"
              className="w-[464px] p-3 border border-[#D0D5DD] rounded-lg bg-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none"
            />
          </div>

          <div className="flex items-start justify-between">
            <p className="text-sm font-medium text-[#344054]">ข้อความถึงร้าน</p>
            <textarea
              value={messageToRestaurant}
              onChange={(e) => setMessageToRestaurant(e.target.value)}
              placeholder="ข้อความหรือข้อกำหนดเพิ่มเติมถึงร้าน"
              rows={3}
              className="w-[464px] p-3 border border-[#D0D5DD] rounded-lg bg-white text-sm focus:border-[#FF8A00] focus:ring-1 focus:ring-[#FF8A00] outline-none resize-none"
            />
          </div>

          <div className="flex items-start pt-2">
            <p className="text-sm text-[#667085]">
              หมายเหตุ : หากจองสำเร็จจะไม่สามารถเปลี่ยนแปลงข้อมูลได้
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50/50">
        <Button
          variant="outline"
          className="flex-1 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          onClick={onBack}
        >
          ยกเลิก
        </Button>
        <Button
          className="flex-1 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] hover:from-[#FF7A00] hover:to-[#FF5B00] text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleReservationSuccess}
          disabled={isSubmitting}
        >
          {isSubmitting ? "กำลังส่งการจอง..." : "จองเลย"}
        </Button>
      </div>
    </div>
  );
}

export default ReservationDetails;
