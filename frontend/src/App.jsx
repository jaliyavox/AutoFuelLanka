import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersTable from "./features/users/UsersTable.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav style={{ padding: "8px 16px" }}>
            {!user ? (
                <>
                    <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
                    <Link to="/register">Register</Link>
                </>
            ) : (
                <>
                    <span style={{ marginRight: 12 }}>Hello, {user.fullName}</span>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </nav>
    );
}

function App() {
    return (
        <Router>
            <div>
                <h1 style={{ padding: 16, margin: 0 }}>AutoFuel Lanka</h1>
                <Navbar />
            </div>

            <Routes>
                {/* Public */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Staff area */}
                <Route
                    path="/staff"
                    element={
                        <ProtectedRoute roles={["IT_EXEC", "FRONT_DESK", "TECHNICIAN", "OPS_MANAGER", "FINANCE"]}>
                            <UsersTable />
                        </ProtectedRoute>
                    }
                />

                {/* Customer dashboard (example) */}
                <Route
                    path="/customer"
                    element={
                        <ProtectedRoute roles={["CUSTOMER"]}>
                            <h2>Customer Dashboard</h2>
                        </ProtectedRoute>
                    }
                />

                {/* Default */}
                <Route path="/" element={<h2>Welcome to AutoFuel Lanka</h2>} />
            </Routes>
        </Router>
    );
}

export default App;
