import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersTable from "./features/users/UsersTable.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

function App() {
    return (
        <Router>
            <div>
                <h1 style={{ padding: 16, margin: 0 }}>AutoFuel Lanka</h1>
                <nav style={{ padding: "8px 16px" }}>
                    <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
                    <Link to="/register" style={{ marginRight: 12 }}>Register</Link>
                    <Link to="/staff">Staff</Link>
                </nav>
            </div>

            <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Staff section (your existing page) */}
                <Route path="/staff" element={<UsersTable />} />

                {/* Default fallback */}
                <Route path="/" element={<h2>Welcome to AutoFuel Lanka</h2>} />
            </Routes>
        </Router>
    );
}

export default App;
