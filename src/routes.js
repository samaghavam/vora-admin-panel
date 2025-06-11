import VectorMap from "views/maps/VectorMap.js";
import GoogleMaps from "views/maps/GoogleMaps.js";
import FullScreenMap from "views/maps/FullScreenMap.js";
import ReactTables from "views/tables/ReactTables.js";
import RegularTables from "views/tables/RegularTables.js";
import ExtendedTables from "views/tables/ExtendedTables.js";
import Wizard from "views/forms/Wizard.js";
import ValidationForms from "views/forms/ValidationForms.js";
import ExtendedForms from "views/forms/ExtendedForms.js";
import RegularForms from "views/forms/RegularForms.js";
import Calendar from "views/Calendar.js";
import Widgets from "views/Widgets.js";
import Charts from "views/Charts.js";
import Dashboard from "views/pages/dashboard/Dashboard";
import Buttons from "views/components/Buttons.js";
import SweetAlert from "views/components/SweetAlert.js";
import Notifications from "views/components/Notifications.js";
import Grid from "views/components/Grid.js";
import Typography from "views/components/Typography.js";
import Panels from "views/components/Panels.js";
import Icons from "views/components/Icons.js";
import Pricing from "views/pages/Pricing.js";
import Register from "views/pages/Register.js";
import Timeline from "views/pages/Timeline.js";
import User from "views/pages/User.js";
import Login from "views/pages/Login.js";
import Rtl from "views/pages/Rtl.js";
import Lock from "views/pages/Lock.js";
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
  // Flight Info - Direct link in sidebar
  {
    path: "/flight",
    name: "Flight",
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
    name: "Request List", // Name is still useful for breadcrumbs or page titles
    component: <VisaRequestList />,
    layout: "/admin",
    hideInSidebar: true, // Custom flag to hide this from sidebar
  },
  {
    path: "/visa/analytics",
    name: "Visa Analytics", // Name is still useful for breadcrumbs or page titles
    component: <VisaAnalytics />,
    layout: "/admin",
    hideInSidebar: true, // Custom flag to hide this from sidebar
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
    name: "Home", // Name is still useful for breadcrumbs or page titles
    component: <Home />,
    layout: "/admin",
    hideInSidebar: true, // Custom flag to hide this from sidebar
  },
  {
    path: "/contents/about",
    name: "Home", // Name is still useful for breadcrumbs or page titles
    component: <About />,
    layout: "/admin",
    hideInSidebar: true, // Custom flag to hide this from sidebar
  },
  {
    path: "/contents/contact-us",
    name: "Home", // Name is still useful for breadcrumbs or page titles
    component: <Contact />,
    layout: "/admin",
    hideInSidebar: true, // Custom flag to hide this from sidebar
  },
  {
    path: "/contents/ai-description",
    name: "Home", // Name is still useful for breadcrumbs or page titles
    component: <CardContent />,
    layout: "/admin",
    hideInSidebar: true, // Custom flag to hide this from sidebar
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
    name: "Admin Managementt", // Name is still useful for breadcrumbs or page titles
    component: <AdminManagement />,
    layout: "/admin",
    hideInSidebar: true, // Custom flag to hide this from sidebar
  },

  // ALL OTHER ROUTES FOLLOW
  {
    collapse: true,
    name: "Pages",
    rtlName: "صفحات",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        rtlName: "عالتسعير",
        mini: "P",
        rtlMini: "ع",
        component: <Pricing />,
        layout: "/auth",
      },
      {
        path: "/rtl-support",
        name: "RTL Support",
        rtlName: "صودعم رتل",
        mini: "RS",
        rtlMini: "صو",
        component: <Rtl />,
        layout: "/rtl",
      },
      {
        path: "/timeline",
        name: "Timeline",
        rtlName: "تيالجدول الزمني",
        mini: "T",
        rtlMini: "تي",
        component: <Timeline />,
        layout: "/admin",
      },
      {
        path: "/login",
        name: "Login",
        rtlName: "هعذاتسجيل الدخول",
        mini: "L",
        rtlMini: "هعذا",
        component: <Login />,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        rtlName: "تسجيل",
        mini: "R",
        rtlMini: "صع",
        component: <Register />,
        layout: "/auth",
      },
      {
        path: "/lock-screen",
        name: "Lock Screen",
        rtlName: "اقفل الشاشة",
        mini: "LS",
        rtlMini: "هذاع",
        component: <Lock />,
        layout: "/auth",
      },
      {
        path: "/user-profile",
        name: "User Profile",
        rtlName: "ملف تعريفي للمستخدم",
        mini: "UP",
        rtlMini: "شع",
        component: <User />,
        layout: "/admin",
      },
    ],
  },
  // ... (rest of your components, forms, tables, maps, etc. routes)
  {
    collapse: true,
    name: "Components",
    rtlName: "المكونات",
    icon: "tim-icons icon-molecule-40",
    state: "componentsCollapse",
    views: [
      {
        collapse: true,
        name: "Multi Level Collapse",
        rtlName: "انهيار متعدد المستويات",
        mini: "MLT",
        rtlMini: "ر",
        state: "multiCollapse",
        views: [
          {
            path: "/buttons",
            name: "Buttons",
            rtlName: "وصفت",
            mini: "B",
            rtlMini: "ب",
            component: <Buttons />,
            layout: "/admin",
          },
        ],
      },
      {
        path: "/buttons",
        name: "Buttons",
        rtlName: "وصفت",
        mini: "B",
        rtlMini: "ب",
        component: <Buttons />,
        layout: "/admin",
      },
      {
        path: "/grid-system",
        name: "Grid System",
        rtlName: "نظام الشبكة",
        mini: "GS",
        rtlMini: "زو",
        component: <Grid />,
        layout: "/admin",
      },
      {
        path: "/panels",
        name: "Panels",
        rtlName: "لوحات",
        mini: "P",
        rtlMini: "ع",
        component: <Panels />,
        layout: "/admin",
      },
      {
        path: "/sweet-alert",
        name: "Sweet Alert",
        rtlName: "الحلو تنبيه",
        mini: "SA",
        rtlMini: "ومن",
        component: <SweetAlert />,
        layout: "/admin",
      },
      {
        path: "/notifications",
        name: "Notifications",
        rtlName: "إخطارات",
        mini: "N",
        rtlMini: "ن",
        component: <Notifications />,
        layout: "/admin",
      },
      {
        path: "/icons",
        name: "Icons",
        rtlName: "الرموز",
        mini: "I",
        rtlMini: "و",
        component: <Icons />,
        layout: "/admin",
      },
      {
        path: "/typography",
        name: "Typography",
        rtlName: "طباعة",
        mini: "T",
        rtlMini: "ر",
        component: <Typography />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Forms",
    rtlName: "إستمارات",
    icon: "tim-icons icon-notes",
    state: "formsCollapse",
    views: [
      {
        path: "/regular-forms",
        name: "Regular Forms",
        rtlName: "أشكال عادية",
        mini: "RF",
        rtlMini: "صو",
        component: <RegularForms />,
        layout: "/admin",
      },
      {
        path: "/extended-forms",
        name: "Extended Forms",
        rtlName: "نماذج موسعة",
        mini: "EF",
        rtlMini: "هوو",
        component: <ExtendedForms />,
        layout: "/admin",
      },
      {
        path: "/validation-forms",
        name: "Validation Forms",
        rtlName: "نماذج التحقق من الصحة",
        mini: "VF",
        rtlMini: "تو",
        component: <ValidationForms />,
        layout: "/admin",
      },
      {
        path: "/wizard",
        name: "Wizard",
        rtlName: "ساحر",
        mini: "W",
        rtlMini: "ث",
        component: <Wizard />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Tables",
    rtlName: "الجداول",
    icon: "tim-icons icon-puzzle-10",
    state: "tablesCollapse",
    views: [
      {
        path: "/regular-tables",
        name: "Regular Tables",
        rtlName: "طاولات عادية",
        mini: "RT",
        rtlMini: "صر",
        component: <RegularTables />,
        layout: "/admin",
      },
      {
        path: "/extended-tables",
        name: "Extended Tables",
        rtlName: "جداول ممتدة",
        mini: "ET",
        rtlMini: "هور",
        component: <ExtendedTables />,
        layout: "/admin",
      },
      {
        path: "/react-tables",
        name: "React Tables",
        rtlName: "رد فعل الطاولة",
        mini: "RT",
        rtlMini: "در",
        component: <ReactTables />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Maps",
    rtlName: "خرائط",
    icon: "tim-icons icon-pin",
    state: "mapsCollapse",
    views: [
      {
        path: "/google-maps",
        name: "Google Maps",
        rtlName: "خرائط جوجل",
        mini: "GM",
        rtlMini: "زم",
        component: <GoogleMaps />,
        layout: "/admin",
      },
      {
        path: "/full-screen-map",
        name: "Full Screen Map",
        rtlName: "خريطة كاملة الشاشة",
        mini: "FSM",
        rtlMini: "ووم",
        component: <FullScreenMap />,
        layout: "/admin",
      },
      {
        path: "/vector-map",
        name: "Vector Map",
        rtlName: "خريطة المتجه",
        mini: "VM",
        rtlMini: "تم",
        component: <VectorMap />,
        layout: "/admin",
      },
    ],
  },
  {
    path: "/widgets",
    name: "Widgets",
    rtlName: "الحاجيات",
    icon: "tim-icons icon-settings",
    component: <Widgets />,
    layout: "/admin",
  },
  {
    path: "/charts",
    name: "Charts",
    rtlName: "الرسوم البيانية",
    icon: "tim-icons icon-chart-bar-32",
    component: <Charts />,
    layout: "/admin",
  },
  {
    path: "/calendar",
    name: "Calendar",
    rtlName: "التقويم",
    icon: "tim-icons icon-time-alarm",
    component: <Calendar />,
    layout: "/admin",
  },
];

export default routes;
