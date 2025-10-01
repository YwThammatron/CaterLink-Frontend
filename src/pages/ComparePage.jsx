import NavbarCustom from "../components/ui/Navbar-custom";
import CompareCard from "../components/ui/CompareCard";
import MiniFooter from "../components/ui/miniFooter";
import AddCompareCard from "../components/ui/AddCompareCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function ComparePage() {
  const [selectedRestaurants, setSelectedRestaurants] = useState([]); // Store selected restaurant data
  const location = useLocation();

  // Handle selected restaurants from navigation state
  useEffect(() => {
    if (location.state?.selectedRestaurants) {
      setSelectedRestaurants(location.state.selectedRestaurants);
    }
  }, [location.state]);

  const handleRemoveCard = (restaurantId) => {
    setSelectedRestaurants(
      selectedRestaurants.filter((restaurant) => restaurant.id !== restaurantId)
    );
  };
  return (
    <>
      <NavbarCustom />
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-3 pt-10 pb-5">
          <h1 className="text-[#101828]">เปรียบเทียบร้านอาหาร</h1>
          <p className="text-[#344054]">
            เปรียบเทียบข้อมูลแพ็กเกจจากหลายร้านในหน้าจอเดียว ตัดสินใจง่ายขึ้น
          </p>
        </div>

        <div className="flex justify-center gap-4 flex-wrap py-4">
          {selectedRestaurants.map((restaurant) => (
            <CompareCard
              key={restaurant.id}
              restaurantData={restaurant}
              onRemove={() => handleRemoveCard(restaurant.id)}
            />
          ))}
          <AddCompareCard currentSelectedRestaurants={selectedRestaurants} />
        </div>
      </div>
      <MiniFooter />
    </>
  );
}

export default ComparePage;
