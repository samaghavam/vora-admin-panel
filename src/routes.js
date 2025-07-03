import Dashboard from "views/pages/dashboard/Dashboard";
import Flight from "views/pages/flight/Flight";
import ReservationList from "views/pages/flight/ReservationList.js";
import FlightAnalytics from "views/pages/flight/FlightAnalytics.js";
import Visa from "views/pages/visa/Visa";
import VisaRequestList from "views/pages/visa/VisaRequestList";
import VisaAnalytics from "views/pages/visa/VisaAnalytics";
import Stays from "views/pages/stays/Stays";
import StaysReservationList from "views/pages/stays/StaysReservationList";
import StaysAnalytics from "views/pages/stays/StaysAnalytics";
import StaysAccommodations from "views/pages/stays/StaysAccommodations";
import AddNewAccommodations from "views/pages/stays/new-accommodation/AddNewAccommodation";
import Claims from "views/pages/claims/Claims";
import AdminManagement from "views/pages/claims/AdminManagement";
import AiManagement from "views/pages/ai-management/AiManagement";
import OveralPerformance from "views/pages/ai-management/overalperformance/OveralPerformance";
import TravelAsist from "views/pages/ai-management/travelAssist/TravelAsist";
import TravelBudget from "views/pages/ai-management/travelBudget/TravelBudget";
import CostCalculator from "views/pages/ai-management/costCalculator/CostCalculator";
import Contents from "views/pages/contents/Contents";
import Home from "views/pages/contents/home/Home";
import About from "views/pages/contents/about/About";
import Contact from "views/pages/contents/contact/Contact";
import CardContent from "views/pages/contents/card/Card";
import HeaderContent from "views/pages/contents/header/Header";
import Footer from "views/pages/contents/footer/Footer";
import AiDescription from "views/pages/contents/AI-description/AiDescription";
import Users from "views/pages/users/Users";
import Analytics from "views/pages/analytics/Analytics";
import AiPurchese from "views/pages/ai-management/aiPurcheses/AiPurchese";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/ai-management",
    name: "AI Management",
    rtlName: "مدیریت با هوش مصنوعی",
    icon: "tim-icons icon-bulb-63",
    component: <AiManagement />,
    layout: "/admin",
  },
  {
    path: "/ai-management/performance",
    name: "Overal Performance",
    component: <OveralPerformance />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/ai-management/assists",
    name: "Travel Asist",
    component: <TravelAsist />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/ai-management/travel-on-budget",
    name: "Travel Asist",
    component: <TravelBudget />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/ai-management/cost-calculator",
    name: "Cost Calculator",
    component: <CostCalculator />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/ai-management/purchases",
    name: "Cost Calculator",
    component: <AiPurchese />,
    layout: "/admin",
    hideInSidebar: true,
  },
  // Flight Info - Direct link in sidebar
  {
    path: "/flight",
    name: "Flights",
    rtlName: "معلومات الرحلة",
    icon: "tim-icons icon-send",
    component: <Flight />,
    layout: "/admin",
  },
  // Sub-routes for Flight section - hidden from sidebar
  {
    path: "/flight/reservation-list",
    name: "Reservation List",
    component: <ReservationList />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/flight/analytics",
    name: "Flight Analytics",
    component: <FlightAnalytics />,
    layout: "/admin",
    hideInSidebar: true,
  },

  // Stays - Direct link in sidebar
  {
    path: "/stays",
    name: "Stays",
    rtlName: "معلومات الرحلة",
    icon: "tim-icons icon-pin",
    component: <Stays />,
    layout: "/admin",
  },
  // Sub-routes for Flight section - hidden from sidebar
  {
    path: "/Stays/reservation-list",
    name: "Reservation List",
    component: <StaysReservationList />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/stays/analytics",
    name: "Analytics",
    component: <StaysAnalytics />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/stays/accomodations",
    name: "Accommodations",
    component: <StaysAccommodations />,
    layout: "/admin",
    hideInSidebar: true,
  },
  {
    path: "/stays/accomodations/add-new-accommodation",
    name: "Accommodations",
    component: <AddNewAccommodations />,
    layout: "/admin",
    hideInSidebar: true,
  },
  // Users - Direct link in sidebar
  {
    path: "/Users",
    name: "Users",
    icon: "tim-icons icon-single-02",
    component: <Users />,
    layout: "/admin",
  },
  {
    path: "/visa",
    name: "UAE Visa",
    rtlName: "معلومات الرحلة",
    icon: "tim-icons icon-credit-card",
    component: <Visa />,
    layout: "/admin",
  },
  // Sub-routes for Visa section - hidden from sidebar
  {
    path: "/visa/request-list",
    name: "Request List", 
    component: <VisaRequestList />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/visa/analytics",
    name: "Visa Analytics", 
    component: <VisaAnalytics />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/contents",
    name: "contents",
    rtlName: "معلومات الرحلة",
    icon: "tim-icons icon-single-copy-04",
    component: <Contents />,
    layout: "/admin",
  },
  {
    path: "/contents/home",
    name: "Home", 
    component: <Home />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/contents/about",
    name: "Home", 
    component: <About />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/contents/contact-us",
    name: "Home", 
    component: <Contact />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/contents/card",
    name: "Home", 
    component: <CardContent />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/contents/ai-description",
    name: "Home", 
    component: <AiDescription />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/contents/footer",
    name: "Footer", 
    component: <Footer />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/contents/header",
    name: "Home", 
    component: <HeaderContent />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  {
    path: "/claims",
    name: "Claims",
    rtlName: "درخواست‌ها",
    icon: "tim-icons icon-bag-16",
    component: <Claims />,
    layout: "/admin",
  },
  {
    path: "/claims/admin-management",
    name: "Admin Managementt", 
    component: <AdminManagement />,
    layout: "/admin",
    hideInSidebar: true, 
  },
  // Analytics - Direct link in sidebar
  {
    path: "/analytics",
    name: "Analytics",
    icon: "tim-icons icon-molecule-40",
    component: <Analytics />,
    layout: "/admin",
  },
];

export default routes;
