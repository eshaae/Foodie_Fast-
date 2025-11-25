import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "../styles/admin.css";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {
    //calling api
    //fetch () returns response as object
    fetch("http://127.0.0.1:8000/api/dashboard_metrics/")
      .then((res) => res.json()) //changing into json
      .then((data) => {
        setNewOrders(data.new_orders);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false); //for mobile view
      } else {
        setSidebarOpen(true); //for desktop view
      }
    };

    handleResize(); //initial check

    window.addEventListener("resize", handleResize);
    //to prevent memory leak and not check inn other pages that not include sdebar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="d-flex">
      {sidebarOpen && <AdminSidebar />}

      <div
        id="page-content-wrapper"
        className={`w-100 ${sidebarOpen ? "with-sidebar" : "full-width"}`}
      >
        <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} newOrders={newOrders} />
        <div className="container-fluid mt-4">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
