import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersTable from "./features/users/UsersTable.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import NewCustomerBooking from "./pages/customer/NewCustomerBooking.jsx";

function Navbar() {
    const { user, logout } = useAuth();
    const isCustomer = user?.roles?.includes("CUSTOMER");
    const isStaff = user?.roles?.some(r =>
        ["IT_EXEC","FRONT_DESK","TECHNICIAN","OPS_MANAGER","FINANCE"].includes(r)
    );

    return (
        <nav style={{ padding: "8px 16px", display:"flex", gap:12, alignItems:"center" }}>
            <Link to="/">Home</Link>
            {isCustomer && <Link to="/customer">My Dashboard</Link>}
            {isStaff && <Link to="/staff">Staff</Link>}
            <span style={{flex:1}}/>
            {!user ? (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <span>Hi, {user.fullName}</span>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    );
}

export default function App() {
    return (
        <Router>
            <div>
                <h1 style={{ padding: 16, margin: 0 }}>AutoFuel Lanka</h1>
                <Navbar />
            </div>

            <Routes>
                {/* Public */}
                <Route path="/" element={<h2 style={{padding:16}}>Welcome to AutoFuel Lanka</h2>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Customer area */}
                <Route
                    path="/customer"
                    element={
                        <ProtectedRoute roles={["CUSTOMER"]}>
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/customer/bookings/new"
                    element={
                        <ProtectedRoute roles={["CUSTOMER"]}>
                            <NewCustomerBooking />
                        </ProtectedRoute>
                    }
                />
                {/* stub routes for future forms */}
                <Route path="/customer/bookings/new" element={<ProtectedRoute roles={["CUSTOMER"]}><div style={{padding:16}}>Booking form (TBD)</div></ProtectedRoute>} />
                <Route path="/customer/vehicles/new" element={<ProtectedRoute roles={["CUSTOMER"]}><div style={{padding:16}}>Vehicle form (TBD)</div></ProtectedRoute>} />

                {/* Staff area */}
                <Route
                    path="/staff"
                    element={
                        <ProtectedRoute roles={["IT_EXEC","FRONT_DESK","TECHNICIAN","OPS_MANAGER","FINANCE"]}>
                            <UsersTable />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
