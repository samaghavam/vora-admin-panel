import SimpleBreadcrumb from "views/components/BreadCrumbs";
import AccommodationTable from "./AccomodationTable";
import { Button } from "reactstrap";
const StaysAccommodations = () => {
  const breadcrumbItems = [
    { label: "Home", to: "/admin/dashboard" },
    { label: "Stays management", to: "/admin/stays" },
    { label: "Stays Info graphics" },
  ];
  return (
    <div className="content">
      <div className="d-flex justify-content-between align-items-center">
        <SimpleBreadcrumb
          items={breadcrumbItems}
          olClassName="screenshot-style-breadcrumb"
        />
        <Button color="info">Add new accommodation</Button>
      </div>
      <AccommodationTable />
    </div>
  );
};
export default StaysAccommodations;
