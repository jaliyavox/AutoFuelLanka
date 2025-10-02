import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function ProtectedRoute({ children, roles }) {
    const { user, hasRole } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (roles && !roles.some(r => hasRole(r))) {
        return <h2 style={{ color: "red" }}>Access Denied</h2>;
    }

    return children;
}
