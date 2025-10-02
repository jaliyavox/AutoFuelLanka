import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import MyBookings from "./customer/MyBookings.jsx";
import MyVehicles from "./customer/MyVehicles.jsx";

export default function CustomerDashboard() {
    const { user } = useAuth();

    return (
        <div style={{maxWidth:960, margin:"24px auto", padding:"0 16px"}}>
            <h2 style={{marginTop:0}}>Welcome, {user?.fullName || "Customer"}</h2>

            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16}}>
                <div style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
                    <h3 style={{marginTop:0}}>Quick Actions</h3>
                    <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
                        <Link to="/customer/bookings/new">Create Booking</Link>
                        <Link to="/customer/vehicles/new">Add Vehicle</Link>
                    </div>
                </div>
                <div style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16}}>
                    <h3 style={{marginTop:0}}>Profile</h3>
                    <p style={{margin:"4px 0"}}><b>Email:</b> {user?.email}</p>
                    <p style={{margin:"4px 0"}}><b>Phone:</b> {user?.phone || "-"}</p>
                    <p style={{margin:"4px 0"}}><b>Address:</b> {user?.address || "-"}</p>
                </div>
            </div>

            <MyBookings />
            <MyVehicles />
        </div>
    );
}
