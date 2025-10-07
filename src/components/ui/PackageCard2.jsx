function PackageCard2({ packageData, onClick }) {
  const data = packageData;
  const displayName = data?.name || "ไม่มีชื่อแพคเกจ";

  // Get package image or use placeholder
  const getPackageImage = () => {
    if (data?.package_images && data.package_images.length > 0) {
      return data.package_images[0].url;
    }
    return "https://github.com/shadcn.png"; // Fallback placeholder
  };

  // Calculate price from package_details or show no details message
  let displayPrice = null;
  let hasPackageDetails = false;

  if (data?.package_details?.length > 0) {
    const prices = data.package_details.map((detail) => detail.price);
    displayPrice = Math.min(...prices);
    hasPackageDetails = true;
  }

  return (
    <div
      className="flex flex-col gap-2 max-w-[284px] relative cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={onClick}
    >
      <div className="flex gap-2 max-w-[284px]">
        <img
          src={getPackageImage()}
          alt={displayName}
          className="w-[88px] h-[88px] rounded-md object-cover"
        />
        <div className="flex flex-col gap-1 max-w-[188px] relative">
          <p
            className="text-[#101828] truncate overflow-hidden whitespace-nowrap"
            title={displayName}
          >
            {displayName}
          </p>
          <div className="flex-1"></div>
          {hasPackageDetails ? (
            <p className="font-bold text-gradient pr-10">
              เริ่ม {displayPrice} บาท
            </p>
          ) : (
            <p className="text-[#667085] text-sm pr-10">
              ยังไม่มีรายละเอียดแพคเกจ
            </p>
          )}
          <div className="w-fit h-fit p-2 bg-gradient rounded-[100px] shadow-xs text-white absolute bottom-0 right-0">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageCard2;
