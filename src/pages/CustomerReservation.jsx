import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";

// UI Components
import NavbarCustom from "../components/ui/Navbar-custom";
import PackageCard2 from "../components/ui/PackageCard2";
import MiniFooter from "../components/ui/miniFooter";
import PackageCardPromotion from "../components/ui/PackageCardPromotion";
import Modal from "../components/ui/Modal";
import PackageDetails from "../components/ui/PackageDetails";
import ReservationDetails from "../components/ui/ReservationDetails";
import FoodTag from "../components/ui/FoodTag";
import { Button } from "../components/ui/button";
import { Star } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function CustomerReservation() {
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8000";
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState("package");
  const [selectedPackageData, setSelectedPackageData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);

  // Data states
  const [restaurantData, setRestaurantData] = useState(null);
  const [packageCategories, setPackageCategories] = useState([]);

  // Loading and error states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [error, setError] = useState(null);
  const [hasCheckedSavedState, setHasCheckedSavedState] = useState(false);

  // Filter state
  const [selectedFilterCategory, setSelectedFilterCategory] =
    useState("ทั้งหมด");

  // Fetch restaurant data
  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (!id) {
        setError("Restaurant ID not provided");
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await axios.get(`${baseUrl}/api/restaurants/${id}`);

        if (!response.data || typeof response.data !== "object") {
          throw new Error("Invalid response data format");
        }

        setRestaurantData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError(
          err.response?.data?.message ||
            `Failed to load restaurant data: ${
              err.response?.status || err.message
            }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurantData();
  }, [id, baseUrl]);

  // Fetch package categories
  useEffect(() => {
    const fetchPackageCategories = async () => {
      if (!id) return;

      try {
        setIsLoadingPackages(true);
        const response = await axios.get(
          `${baseUrl}/api/package-categories/restaurant/${id}`
        );
        setPackageCategories(response.data || []);
      } catch (err) {
        console.error("Error fetching package categories:", err);
      } finally {
        setIsLoadingPackages(false);
      }
    };

    fetchPackageCategories();
  }, [id, baseUrl]);

  // Check for saved reservation state after successful login
  useEffect(() => {
    const checkForSavedReservation = () => {
      try {
        // First, check for URL parameter (backup method)
        const packageIdFromUrl = searchParams.get("packageId");

        // Then check localStorage
        const savedState = localStorage.getItem("pendingReservation");

        if ((savedState || packageIdFromUrl) && packageCategories.length > 0) {
          let actualPackageData = null;
          let categoryData = null;

          // If we have localStorage data, prioritize it
          if (savedState) {
            const state = JSON.parse(savedState);

            // Check if the saved state is for this restaurant and not too old (24 hours)
            const isStateValid =
              state.timestamp &&
              Date.now() - state.timestamp < 24 * 60 * 60 * 1000;

            if (
              isStateValid &&
              state.restaurantId === id &&
              state.selectedPackage
            ) {
              const savedPackage = state.selectedPackage;

              // Try to find the actual package data from current packageCategories
              for (const category of packageCategories) {
                const foundPackage = category.packages.find(
                  (pkg) =>
                    pkg.id === savedPackage.id ||
                    (savedPackage.packageInfo &&
                      pkg.id === savedPackage.packageInfo.id)
                );

                if (foundPackage) {
                  // Reconstruct the package data with current structure
                  actualPackageData = {
                    ...savedPackage,
                    packageInfo: foundPackage,
                    // Preserve any custom data like guest count
                    customGuestCount:
                      savedPackage.customGuestCount || savedPackage.guests,
                  };
                  categoryData = category;
                  break;
                }
              }
            }
          }

          // If localStorage didn't work, try URL parameter
          if (!actualPackageData && packageIdFromUrl) {
            for (const category of packageCategories) {
              const foundPackage = category.packages.find(
                (pkg) => pkg.id === packageIdFromUrl
              );

              if (foundPackage) {
                // Create basic package data structure
                actualPackageData = {
                  id: foundPackage.id,
                  packageInfo: foundPackage,
                  name: foundPackage.name,
                  price: foundPackage.price,
                  description: foundPackage.description,
                  // Default guest count
                  customGuestCount: foundPackage.min_guests || 1,
                };
                categoryData = category;
                break;
              }
            }

            // Clear the URL parameter
            if (actualPackageData) {
              window.history.replaceState({}, "", `/customerreservation/${id}`);
            }
          }

          // If we found the package, open the reservation modal directly
          if (actualPackageData && actualPackageData.id) {
            // Use setTimeout to ensure the modal opens after component is fully rendered
            setTimeout(() => {
              setSelectedPackageData(actualPackageData);
              setSelectedCategory(categoryData?.name);
              setSelectedCategoryData(categoryData);
              setModalStep("reservation");
              setIsModalOpen(true);
            }, 300);
          } else {
            console.warn(
              "Could not find matching package for saved reservation state"
            );
            localStorage.removeItem("pendingReservation");
          }
        } else {
          // No saved state to restore
          localStorage.removeItem("pendingReservation");
        }
      } catch (error) {
        console.error("Error checking for saved reservation:", error);
        localStorage.removeItem("pendingReservation");
      }
    };

    // Only check after packages are loaded and if modal is not already open
    if (packageCategories.length > 0 && !isModalOpen && !hasCheckedSavedState) {
      setHasCheckedSavedState(true);
      checkForSavedReservation();
    }
  }, [packageCategories, id, isModalOpen, hasCheckedSavedState, searchParams]);

  const openModal = (categoryName = "Buffet") => {
    // Find the category data from packageCategories
    const categoryData = packageCategories.find(
      (cat) => cat.name === categoryName
    );
    setSelectedCategory(categoryName);
    setSelectedCategoryData(categoryData);
    setModalStep("package");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalStep("package");
    setSelectedPackageData(null);
    setSelectedCategory(null);
    setSelectedCategoryData(null);
  };

  const showReservationDetails = (packageData) => {
    setSelectedPackageData(packageData);
    setModalStep("reservation");
  };

  const backToPackageSelection = () => {
    setModalStep("package");
  };

  const goToReviewPage = () => {
    navigate("/review", {
      state: { restaurantId: id, restaurantName: restaurantData?.name },
    });
  };

  // Helper function to get display images
  const getDisplayImages = () => {
    const images = restaurantData?.images || [];
    const mockImage = "https://github.com/shadcn.png";

    return {
      main: images[0]?.url || mockImage,
      secondary1: images[1]?.url || mockImage,
      secondary2: images[2]?.url || mockImage,
    };
  };

  // Helper function to get packages with discounts
  const getPackagesWithDiscounts = () => {
    const packagesWithDiscounts = [];
    packageCategories.forEach((category) => {
      category.packages.forEach((pkg) => {
        if (pkg.discount !== null && pkg.discount > 0) {
          packagesWithDiscounts.push({
            ...pkg,
            categoryName: category.name,
            categoryId: category.id,
            package_images: pkg.package_images || [], // Include package images if available
          });
        }
      });
    });
    return packagesWithDiscounts;
  };

  // Helper function to get filtered package categories
  const getFilteredPackageCategories = () => {
    if (selectedFilterCategory === "ทั้งหมด") {
      return packageCategories;
    }
    return packageCategories.filter(
      (category) => category.name === selectedFilterCategory
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <>
        <NavbarCustom />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูลร้านค้า...</p>
        </div>
      </>
    );
  }

  // Error state
  if (error || !restaurantData) {
    return (
      <>
        <NavbarCustom />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <p className="text-red-600 text-lg">
            เกิดข้อผิดพลาด: {error || "ไม่พบข้อมูลร้านค้า"}
          </p>
          <button
            onClick={() => navigate("/customerrestaurant")}
            className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            กลับไปหน้าร้านค้า
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <NavbarCustom />

      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 max-w-[1184px] py-10">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/customerrestaurant"
                  className="text-sm font-semibold"
                >
                  ร้านค้า
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href=""
                  className="text-sm font-semibold text-[#D87500]"
                >
                  {restaurantData?.name || "ร้านค้า"}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex gap-4">
            <div className="max-w-[364px] max-h-[226px] flex gap-2">
              <div className="max-w-[224px] h-full">
                <img
                  src={getDisplayImages().main}
                  alt={restaurantData?.name || "Restaurant"}
                  className="w-full h-full rounded-lg object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 h-full">
                <img
                  src={getDisplayImages().secondary1}
                  alt={restaurantData?.name || "Restaurant"}
                  className="w-[132px] h-[109px] rounded-lg object-cover"
                />
                <img
                  src={getDisplayImages().secondary2}
                  alt={restaurantData?.name || "Restaurant"}
                  className="w-[132px] h-[109px] rounded-lg object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 max-w-[804px]">
              <div className="flex flex-col gap-2">
                <p className="text-cl font-bold text-[#101828]">
                  {restaurantData?.name || "ร้านค้า"}
                </p>
                <p className="line-clamp-2 text-[#667085] leading-relaxed">
                  {restaurantData?.description || "ไม่มีรายละเอียด"}
                </p>
                <div className="flex gap-2">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#FF8A00]"
                  >
                    <path
                      d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 22C16 18 20 14.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 14.4183 8 18 12 22Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[#344054]">
                    {restaurantData?.location || restaurantData?.sub_location
                      ? `${restaurantData?.location || ""} ${
                          restaurantData?.sub_location || ""
                        }`.trim()
                      : "ไม่ระบุ"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#FF8A00]"
                  >
                    <path
                      d="M8.38028 8.85335C9.07627 10.303 10.0251 11.6616 11.2266 12.8632C12.4282 14.0648 13.7869 15.0136 15.2365 15.7096C15.3612 15.7694 15.4235 15.7994 15.5024 15.8224C15.7828 15.9041 16.127 15.8454 16.3644 15.6754C16.4313 15.6275 16.4884 15.5704 16.6027 15.4561C16.9523 15.1064 17.1271 14.9316 17.3029 14.8174C17.9658 14.3864 18.8204 14.3864 19.4833 14.8174C19.6591 14.9316 19.8339 15.1064 20.1835 15.4561L20.3783 15.6509C20.9098 16.1824 21.1755 16.4481 21.3198 16.7335C21.6069 17.301 21.6069 17.9713 21.3198 18.5389C21.1755 18.8242 20.9098 19.09 20.3783 19.6214L20.2207 19.779C19.6911 20.3087 19.4263 20.5735 19.0662 20.7757C18.6667 21.0001 18.0462 21.1615 17.588 21.1601C17.1751 21.1589 16.8928 21.0788 16.3284 20.9186C13.295 20.0576 10.4326 18.4332 8.04466 16.0452C5.65668 13.6572 4.03221 10.7948 3.17124 7.76144C3.01103 7.19699 2.93092 6.91477 2.9297 6.50182C2.92833 6.0436 3.08969 5.42311 3.31411 5.0236C3.51636 4.66357 3.78117 4.39876 4.3108 3.86913L4.46843 3.7115C4.99987 3.18006 5.2656 2.91433 5.55098 2.76999C6.11854 2.48292 6.7888 2.48292 7.35636 2.76999C7.64174 2.91433 7.90747 3.18006 8.43891 3.7115L8.63378 3.90637C8.98338 4.25597 9.15819 4.43078 9.27247 4.60655C9.70347 5.26945 9.70347 6.12403 9.27247 6.78692C9.15819 6.96269 8.98338 7.1375 8.63378 7.4871C8.51947 7.60142 8.46231 7.65857 8.41447 7.72538C8.24446 7.96281 8.18576 8.30707 8.26748 8.58743C8.29048 8.66632 8.32041 8.72866 8.38028 8.85335Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="text-[#344054]">
                    {restaurantData?.phone || "ไม่ระบุ"}
                  </p>
                </div>

                <div
                  className="flex gap-5 cursor-pointer"
                  onClick={goToReviewPage}
                >
                  <div className="flex gap-1 justify-center items-center">
                    <Star size={20} className="text-yellow-400 fill-current" />
                    <p className="text-[#667085]">
                      {restaurantData?.avgRating
                        ? Number(restaurantData.avgRating.toFixed(2))
                        : 0}
                    </p>
                  </div>
                  <p className="text-[#98A2B3]">
                    ({Math.floor(restaurantData?.totalReview || 0)})
                  </p>
                </div>

                <div className="flex gap-[6px]">
                  <FoodTag
                    categories={(restaurantData?.main_categories || []).filter(
                      (category, index, array) =>
                        array.findIndex((c) => c.id === category.id) === index
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex flex-col gap-4 px-32 py-10">
          <div className="flex justify-between items-center">
            <h3>จัดโปรโมชั่นขณะนี้</h3>
          </div>

          <div className="flex gap-4">
            {isLoadingPackages
              ? // Loading state
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="w-[276px] h-[200px] bg-gray-200 rounded-lg animate-pulse"
                  ></div>
                ))
              : getPackagesWithDiscounts()
                  .slice(0, 4)
                  .map((pkg) => (
                    <PackageCardPromotion
                      key={pkg.id}
                      packageData={{
                        id: pkg.id,
                        name: pkg.name,
                        discount: pkg.discount,
                        package_details: pkg.package_details,
                        package_images: pkg.package_images || [], // Include package images
                      }}
                      onClick={() => openModal(pkg.categoryName)}
                    />
                  ))}
            {!isLoadingPackages && getPackagesWithDiscounts().length === 0 && (
              <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                <p>ไม่มีแพคเกจโปรโมชั่นในขณะนี้</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center py-10">
        <div className="flex gap-3 max-w-[1184px] w-full">
          <Button
            className={`py-1 px-4 rounded-sm ${
              selectedFilterCategory === "ทั้งหมด"
                ? "bg-gradient text-white"
                : "bg-white border-[#EAECF0] text-[#344054]"
            }`}
            variant={
              selectedFilterCategory === "ทั้งหมด" ? "default" : "outline"
            }
            onClick={() => setSelectedFilterCategory("ทั้งหมด")}
          >
            ทั้งหมด
          </Button>
          {packageCategories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedFilterCategory === category.name ? "default" : "outline"
              }
              className={`py-1 px-4 rounded-sm ${
                selectedFilterCategory === category.name
                  ? "bg-gradient text-white"
                  : "border-[#EAECF0] text-[#344054]"
              }`}
              onClick={() => setSelectedFilterCategory(category.name)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {isLoadingPackages ? (
          // Loading state
          <div className="flex flex-col gap-4 py-10 max-w-[1184px]">
            <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[276px] h-[320px] bg-gray-200 rounded-lg animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        ) : (
          getFilteredPackageCategories().map((category) => (
            <div
              key={category.id}
              className="flex flex-col gap-4 py-10 max-w-[1184px]"
            >
              <div className="flex justify-between items-center">
                <h3>{category.name}</h3>
              </div>

              <div className="flex flex-wrap gap-4">
                {category.packages.map((pkg) => (
                  <PackageCard2
                    key={pkg.id}
                    packageData={{
                      id: pkg.id,
                      name: pkg.name,
                      package_details: pkg.package_details,
                      package_images: pkg.package_images || [], // Include package images
                    }}
                    onClick={() => openModal(category.name)}
                  />
                ))}
                {category.packages.length === 0 && (
                  <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
                    <p>ไม่มีแพคเกจในหมวดหมู่นี้</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        {!isLoadingPackages && packageCategories.length === 0 && (
          <div className="flex flex-col gap-4 py-10 max-w-[1184px]">
            <div className="flex items-center justify-center w-full h-[200px] text-gray-500">
              <p>ไม่มีแพคเกจในร้านนี้</p>
            </div>
          </div>
        )}
      </div>

      <MiniFooter />

      {/* Package Details Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalStep === "package" ? (
          <PackageDetails
            onClose={closeModal}
            onShowReservation={showReservationDetails}
            category={selectedCategory}
            categoryData={selectedCategoryData}
          />
        ) : (
          <ReservationDetails
            onClose={closeModal}
            onBack={backToPackageSelection}
            selectedPackage={selectedPackageData}
          />
        )}
      </Modal>
    </>
  );
}

export default CustomerReservation;
