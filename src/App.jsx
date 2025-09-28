import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import ScrollToTop from "./components/ui/scrolltotop";
import CustomerHomepage from "./pages/CustomerHomepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CustomerRestaurant from "./pages/CustomerRestaurant";
import Cartpage from "./pages/CartPage";
import CustomerReservation from "./pages/CustomerReservation";
import ComparePage from "./pages/ComparePage";
import PackageCategory from "./pages/PackageCategory";
import Payment from "./pages/Payment";
import ViewAllBlog from "./pages/ViewAllBlog";
import PlanningPage from "./pages/PlanningPage";
import BlogDetail from "./pages/BlogDetail";
import ReviewPage from "./pages/ReviewPage";
import CommentPage from "./pages/CommentPage";

import Order from "./pages/Order";
import CreateAccount from "./pages/CreateAccount";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<CustomerHomepage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/customerrestaurant" element={<CustomerRestaurant />} />
        <Route path="/cart" element={<Cartpage />} />
        <Route path="/customerreservation" element={<CustomerReservation />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/packagectg" element={<PackageCategory/>}/>
        <Route path="/payment" element={<Payment />} />
        <Route path="/allblog" element={<ViewAllBlog />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/planning" element={<PlanningPage />} />
        <Route path="/order" element={<Order />} />
        <Route path="/blog" element={<BlogDetail />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/comment" element={<CommentPage />} />
        <Route
          path="/welcome"
          element={
            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4">Welcome to CaterLink</h1>
              <h2 className="text-2xl mb-4">
                ยินดีต้อนรับสู่แอปพลิเคชันของเรา
              </h2>
              <div className="bg-gradient w-16 h-16 rounded"></div>
            </div>
          }
        />
      </Routes>

      {/* Global Toaster for notifications */}
      <Toaster
        position="top-right"
        duration={4000}
        theme="light"
        className="custom-toast"
        toastOptions={{
          style: {
            maxWidth: "400px",
            background: "white",
            border: "1px solid #D0D5DD",
            boxshadow: "0px 4px 6px -2px #10182808",
            boxShadow: "0px 12px 16px -4px #10182814",
          },
          className: "my-toast",
          descriptionClassName: "my-toast-description",
        }}
      />
    </Router>
  );
}

export default App;
