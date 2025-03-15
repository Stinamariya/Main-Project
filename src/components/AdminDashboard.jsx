import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalOrders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:3031/api/admin/dashboard-stats");
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ backgroundColor: "#343a40", color: "white", padding: "20px", textAlign: "center" }}>Admin Dashboard</h1>

      {/* Dashboard Overview */}
      <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
        <div style={{ width: "200px", padding: "20px", backgroundColor: "#f8f9fa", textAlign: "center", borderRadius: "10px" }}>
          <h3>Users</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div style={{ width: "200px", padding: "20px", backgroundColor: "#f8f9fa", textAlign: "center", borderRadius: "10px" }}>
          <h3>Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div style={{ width: "200px", padding: "20px", backgroundColor: "#f8f9fa", textAlign: "center", borderRadius: "10px" }}>
          <h3>Orders</h3>
          <p>{stats.totalOrders}</p>
        </div>
      </div>

      {/* Management Links */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", textAlign: "center", marginTop: "30px" }}>
        <Link to="/admin/products" style={{ textDecoration: "none" }}>
          <div style={{ padding: "20px", backgroundColor: "#007BFF", color: "white", borderRadius: "10px", cursor: "pointer" }}>
            Manage Products
          </div>
        </Link>
        <Link to="/admin/orders" style={{ textDecoration: "none" }}>
          <div style={{ padding: "20px", backgroundColor: "#28A745", color: "white", borderRadius: "10px", cursor: "pointer" }}>
            Manage Orders
          </div>
        </Link>
        <Link to="/admin/users" style={{ textDecoration: "none" }}>
          <div style={{ padding: "20px", backgroundColor: "#DC3545", color: "white", borderRadius: "10px", cursor: "pointer" }}>
            Manage Users
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
