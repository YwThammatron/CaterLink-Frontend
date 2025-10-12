import { useNavigate } from "react-router-dom";

function PackageCard({
  packageData = {
    id: "default",
    name: "บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Stand",
    description: "Default package description",
    restaurantName: "ซอสามสาย",
    price: 295,
    discount: null,
    packageDetails: [],
    categoryName: "Default Category",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=88&h=88&fit=crop",
  },
}) {
  const navigate = useNavigate();

  // Calculate the display price (lowest price from package details or fallback)
  const getDisplayPrice = () => {
    if (packageData.packageDetails && packageData.packageDetails.length > 0) {
      const prices = packageData.packageDetails.map((detail) => detail.price);
      return Math.min(...prices);
    }
    return packageData.price || 295;
  };

  // Handle card click to navigate to restaurant reservation page
  const handleCardClick = () => {
    if (packageData.restaurant_id) {
      navigate(`/customerreservation/${packageData.restaurant_id}`);
    }
  };

  return (
    <div
      className="flex flex-col gap-2 w-[284px] relative cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleCardClick}
    >
      <div className="flex gap-[6px] justify-start items-center">
        <svg
          width="12px"
          height="12px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 21V15.6C15 15.0399 15 14.7599 14.891 14.546C14.7951 14.3578 14.6422 14.2049 14.454 14.109C14.2401 14 13.9601 14 13.4 14H10.6C10.0399 14 9.75992 14 9.54601 14.109C9.35785 14.2049 9.20487 14.3578 9.10899 14.546C9 14.7599 9 15.0399 9 15.6V21M3 7C3 8.65685 4.34315 10 6 10C7.65685 10 9 8.65685 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 8.65685 16.3431 10 18 10C19.6569 10 21 8.65685 21 7M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V6.2C21 5.0799 21 4.51984 20.782 4.09202C20.5903 3.71569 20.2843 3.40973 19.908 3.21799C19.4802 3 18.9201 3 17.8 3H6.2C5.0799 3 4.51984 3 4.09202 3.21799C3.71569 3.40973 3.40973 3.71569 3.21799 4.09202C3 4.51984 3 5.07989 3 6.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-sm text-[#667085]">{packageData.restaurantName}</p>
      </div>

      <div className="flex gap-2 w-[284px]">
        <img
          src={
            packageData.image ||
            "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=88&h=88&fit=crop"
          }
          alt={packageData.name}
          className="w-[88px] h-[88px] rounded-md object-cover flex-shrink-0"
        />
        <div className="flex flex-col gap-1 w-[188px] relative min-w-0">
          <p className="text-[#101828] truncate overflow-hidden whitespace-nowrap">
            {packageData.name}
          </p>
          <p className="font-bold text-gradient">
            เริ่ม {getDisplayPrice()} บาท/ท่าน
          </p>
          <button className="w-fit h-fit p-2 bg-gradient rounded-[100px] shadow-xs text-white self-end absolute bottom-0 right-0">
            <svg
              width="16px"
              height="16px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M5 12H19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
