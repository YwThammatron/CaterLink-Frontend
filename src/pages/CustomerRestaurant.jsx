import NavbarCustom from "../components/ui/Navbar-custom";
import FilterCustom from "../components/ui/Filter-custom";
import RestaurantCard from "../components/ui/RestaurantCard";
import MiniFooter from "../components/ui/miniFooter";
import { Button } from "../components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function CustomerRestaurant() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [isCompareMode, setIsCompareMode] = useState(false);

  // Check if we came from the compare page
  useEffect(() => {
    if (location.state?.fromCompare) {
      setIsCompareMode(true);
      // Initialize with existing selected restaurants
      if (location.state?.existingSelected) {
        setSelectedRestaurants(location.state.existingSelected);
      }
    }
  }, [location.state]);

  const goToReservation = () => {
    navigate("/customerreservation");
  };

  const handleRestaurantSelect = (restaurantData) => {
    if (isCompareMode) {
      // Toggle selection for compare mode
      const isSelected = selectedRestaurants.some(
        (r) => r.id === restaurantData.id
      );
      if (isSelected) {
        setSelectedRestaurants(
          selectedRestaurants.filter((r) => r.id !== restaurantData.id)
        );
      } else {
        setSelectedRestaurants([...selectedRestaurants, restaurantData]);
      }
    } else {
      // Normal mode - go to reservation
      goToReservation();
    }
  };

  const handleCompareSelected = () => {
    navigate("/compare", {
      state: { selectedRestaurants },
    });
  };

  return (
    <>
      <NavbarCustom />
      <FilterCustom />

      {/* Compare Mode Header */}
      {isCompareMode && (
        <div className="bg-orange-50 border-b border-orange-200 p-4">
          <div className="flex justify-center items-center gap-4">
            <p className="text-orange-800">
              โหมดเปรียบเทียบ: เลือกร้านที่ต้องการเปรียบเทียบ (
              {selectedRestaurants.length} ร้านที่เลือก)
            </p>
            {selectedRestaurants.length > 0 && (
              <Button
                className="bg-gradient text-white font-semibold"
                onClick={handleCompareSelected}
              >
                เปรียบเทียบร้านที่เลือก
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Reccommand Restaurant */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 py-10">
          <h3>ร้านแนะนำจาก CaterLink</h3>
          <div className="flex gap-4">
            <RestaurantCard
              onSelect={isCompareMode ? handleRestaurantSelect : null}
              onClick={!isCompareMode ? goToReservation : null}
              isSelected={selectedRestaurants.some((r) => r.id === 1)}
              restaurantData={{
                id: 1,
                name: "ร้านแนะนำ 1",
                rating: 4.5,
                reviewCount: 25,
                pricePerPerson: 350,
                image: "https://picsum.photos/224/220?random=1",
              }}
            />
            <RestaurantCard
              onSelect={isCompareMode ? handleRestaurantSelect : null}
              onClick={!isCompareMode ? goToReservation : null}
              isSelected={selectedRestaurants.some((r) => r.id === 2)}
              restaurantData={{
                id: 2,
                name: "ร้านแนะนำ 2",
                rating: 4.3,
                reviewCount: 18,
                pricePerPerson: 290,
                image: "https://picsum.photos/224/220?random=2",
              }}
            />
            <RestaurantCard
              onSelect={isCompareMode ? handleRestaurantSelect : null}
              onClick={!isCompareMode ? goToReservation : null}
              isSelected={selectedRestaurants.some((r) => r.id === 3)}
              restaurantData={{
                id: 3,
                name: "ร้านแนะนำ 3",
                rating: 4.1,
                reviewCount: 22,
                pricePerPerson: 250,
                image: "https://picsum.photos/224/220?random=3",
              }}
            />
            <RestaurantCard
              onSelect={isCompareMode ? handleRestaurantSelect : null}
              onClick={!isCompareMode ? goToReservation : null}
              isSelected={selectedRestaurants.some((r) => r.id === 4)}
              restaurantData={{
                id: 4,
                name: "ร้านแนะนำ 4",
                rating: 4.4,
                reviewCount: 30,
                pricePerPerson: 320,
                image: "https://picsum.photos/224/220?random=4",
              }}
            />
            <RestaurantCard
              onSelect={isCompareMode ? handleRestaurantSelect : null}
              onClick={!isCompareMode ? goToReservation : null}
              isSelected={selectedRestaurants.some((r) => r.id === 5)}
              restaurantData={{
                id: 5,
                name: "ร้านแนะนำ 5",
                rating: 4.0,
                reviewCount: 15,
                pricePerPerson: 280,
                image: "https://picsum.photos/224/220?random=5",
              }}
            />
          </div>
        </div>
      </div>

      {/* Top 5 Restaurants */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 px-32 py-10">
          <h3>Top 5 ร้านขายดี</h3>
          <div className="flex gap-4">
            {[6, 7, 8, 9, 10].map((id) => (
              <RestaurantCard
                key={id}
                onSelect={isCompareMode ? handleRestaurantSelect : null}
                onClick={!isCompareMode ? goToReservation : null}
                isSelected={selectedRestaurants.some((r) => r.id === id)}
                restaurantData={{
                  id,
                  name: `Top ร้าน ${id - 5}`,
                  rating: 4.2,
                  reviewCount: 20,
                  pricePerPerson: 300,
                  image: `https://picsum.photos/224/220?random=${id}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ร้านจัดเลี้ยง */}
      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 py-10 max-w-[1184px]">
          <h3>ร้านจัดเลี้ยง</h3>
          <div className="flex flex-wrap gap-y-8 gap-x-4">
            {[11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].map((id) => (
              <RestaurantCard
                key={id}
                onSelect={isCompareMode ? handleRestaurantSelect : null}
                onClick={!isCompareMode ? goToReservation : null}
                isSelected={selectedRestaurants.some((r) => r.id === id)}
                restaurantData={{
                  id,
                  name: `ร้านจัดเลี้ยง ${id - 10}`,
                  rating: 4.0,
                  reviewCount: 15,
                  pricePerPerson: 250,
                  image: `https://picsum.photos/224/220?random=${id}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <MiniFooter />
    </>
  );
}

export default CustomerRestaurant;
