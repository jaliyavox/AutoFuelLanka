import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getJSON, API } from "../../api/client.js";
import SectionCard from "../../components/SectionCard.jsx";
import { Link } from "react-router-dom";

export default function MyBookings() {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    const [err, setErr] = useState("");
    const [busyId, setBusyId] = useState(null);

    async function load() {
        setErr("");
        try {
            const data = await getJSON(`/api/customers/${user.id}/bookings`);
            setRows(Array.isArray(data) ? data : []);
        } catch (e) {
            setErr(String(e.message || e));
            setRows([]);
        }
    }

    useEffect(() => {
        if (user?.id) load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.id]);

    const canEdit = (b) => String(b.status).toUpperCase() === "PENDING";

    const deleteBooking = async (b) => {
        if (!canEdit(b)) return;
        if (!window.confirm(`Delete booking #${b.id}?`)) return;
        try {
            setBusyId(b.id);
            const res = await fetch(`${API}/api/customers/${user.id}/bookings/${b.id}`, {
                method: "DELETE",
            });
            if (!res.ok && res.status !== 204) {
                throw new Error(await res.text());
            }
            setRows((prev) => prev.filter((r) => r.id !== b.id));
        } catch (e) {
            alert(e.message || "Failed to delete booking");
        } finally {
            setBusyId(null);
        }
    };

    return (
        <SectionCard
            title="My Bookings"
            right={<Link to="/customer/bookings/new">+ New Booking</Link>}
        >
            {err && <p style={{ color: "tomato" }}>Couldn’t load: {err}</p>}
            {rows.length === 0 ? (
                <p style={{ opacity: 0.7 }}>No bookings yet.</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 4px" }}>ID</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 4px" }}>Start</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 4px" }}>End</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 4px" }}>Type</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 4px" }}>Status</th>
                        <th style={{ textAlign: "left", borderBottom: "1px solid #eee", padding: "8px 4px" }}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((b) => (
                        <tr key={b.id}>
                            <td style={{ padding: "8px 4px" }}>{b.id}</td>
                            <td style={{ padding: "8px 4px" }}>{b.startTime || "-"}</td>
                            <td style={{ padding: "8px 4px" }}>{b.endTime || "-"}</td>
                            <td style={{ padding: "8px 4px" }}>{b.type || b.serviceName || "-"}</td>
                            <td style={{ padding: "8px 4px" }}>{b.status || "-"}</td>
                            <td style={{ padding: "8px 4px" }}>
                                {canEdit(b) ? (
                                    <>
                                        <Link to={`/customer/bookings/${b.id}/edit`} style={{ marginRight: 8 }}>
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => deleteBooking(b)}
                                            disabled={busyId === b.id}
                                        >
                                            {busyId === b.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </>
                                ) : (
                                    <span style={{ opacity: 0.6 }}>—</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </SectionCard>
    );
}
