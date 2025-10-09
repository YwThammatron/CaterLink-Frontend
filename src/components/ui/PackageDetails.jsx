import { Star, BadgeCheck, HandPlatter, Heart } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";

function PackageDetails({
  onClose,
  onShowReservation,
  category,
  categoryData,
}) {
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [guestCount, setGuestCount] = useState("");

  // Get package details from the categoryData
  const packageDetails =
    categoryData?.packages?.length > 0
      ? categoryData.packages.flatMap((pkg) =>
          pkg.package_details.map((detail) => ({
            ...detail,
            packageInfo: {
              id: pkg.id,
              name: pkg.name,
              description: pkg.description,
              discount: pkg.discount,
              package_images: pkg.package_images,
            },
          }))
        )
      : [];

  const handleSelectPackage = () => {
    const selected = packageDetails[selectedPackage];
    // Always include the guest count input for all categories
    selected.customGuestCount = guestCount;
    onShowReservation(selected);
  };

  // Handle guest count input with validation
  const handleGuestCountChange = (e) => {
    const value = e.target.value;
    // Allow empty string for user to clear input
    if (value === "") {
      setGuestCount("");
      return;
    }

    // Convert to number and check if it's valid
    const numValue = parseInt(value, 10);

    // Only allow positive numbers (greater than 0)
    if (!isNaN(numValue) && numValue >= 0) {
      setGuestCount(numValue.toString());
    }
    // If negative or invalid, don't update the state (ignore the input)
  };

  // Prevent typing invalid characters (minus, plus, e, etc.)
  const handleKeyDown = (e) => {
    // Prevent typing: minus (-), plus (+), e, E, period (.)
    if (["-", "+", "e", "E", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Get header title based on category
  const getHeaderTitle = () => {
    // Use the actual category name if available, otherwise fallback to predefined titles
    if (categoryData?.name) {
      return categoryData.name;
    }

    switch (category) {
      case "Buffet":
        return "บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Standard";
      case "ซุ้มอาหาร":
        return "ซุ้มอาหาร / Food Booth";
      case "อาหารเซต":
        return "อาหารเซต / Food Set";
      case "Snack Box":
        return "ซุ้ม ทานเล่น - ของว่าง / APPETIZER (อย่างน้อย 100 ที่)";
      default:
        return "บุฟฟเฟต์ไทยสแตนดาร์ต / Buffet Thai Standard";
    }
  };

  const PackageOption = ({ option, index, isSelected, onSelect }) => {
    // Check if this is API data (has packageInfo) or fallback data
    const isApiData = option.packageInfo !== undefined;

    return (
      <div
        className={`flex gap-3 border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 ${
          isSelected
            ? "border-[#FF8A00] bg-[#FF8A00]/5 shadow-lg shadow-[#FF8A00]/20"
            : "border-gray-200 bg-white hover:border-[#FF8A00]/50 hover:bg-[#FF8A00]/5"
        }`}
        onClick={() => onSelect(index)}
      >
        <div className="flex items-start pt-1">
          <input
            type="radio"
            checked={isSelected}
            onChange={() => onSelect(index)}
            className="w-5 h-5 text-[#FF8A00] border-gray-300 focus:ring-[#FF8A00] focus:ring-2"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium text-[#344054]">
              {isApiData ? option.name : `จำนวนแขก ${option.guests} ท่าน`}
            </p>
            <div className="flex flex-col items-end">
              {isApiData && option.has_discount && option.old_price ? (
                <>
                  <p className="font-bold text-gradient text-lg">
                    {option.price} บาท
                  </p>
                  <p className="text-sm text-gray-500 line-through">
                    {option.old_price} บาท
                  </p>
                </>
              ) : (
                <p className="font-bold text-gradient text-lg">
                  {isApiData
                    ? `${option.price} บาท`
                    : `${option.price} บาท/ท่าน`}
                </p>
              )}
            </div>
          </div>
          <p className="text-[#475467] text-sm leading-relaxed">
            {option.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full max-w-[700px] mx-auto bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-[#101828] leading-tight">
          {getHeaderTitle()}
        </h2>
      </div>

      {/* Package Options */}
      <div className="flex flex-col gap-4 p-6">
        {packageDetails.map((option, index) => (
          <PackageOption
            key={index}
            option={option}
            index={index}
            isSelected={selectedPackage === index}
            onSelect={setSelectedPackage}
          />
        ))}
      </div>

      {/* Action Buttons with Guest Count Input */}
      <div className="flex gap-3 p-6 border-t border-gray-100 bg-gray-50/50 items-end justify-between">
        <div className="flex flex-col gap-[6px]">
          <p>จำนวนท่าน/ที่ *</p>
          <Input
            type="number"
            value={guestCount}
            onChange={handleGuestCountChange}
            onKeyDown={handleKeyDown}
            placeholder="ระบุจำนวน"
            min="0"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            ยกเลิก
          </Button>
          <Button
            className="flex-1 py-3 bg-gradient-to-r from-[#FF8A00] to-[#FF6B00] hover:from-[#FF7A00] hover:to-[#FF5B00] text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            onClick={handleSelectPackage}
          >
            เลือกแพคเกจ
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PackageDetails;
