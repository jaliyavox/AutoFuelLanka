
import { useEffect, useState } from "react";
import { getJSON, patchJSON } from "../../api/client.js";
import StatusChip from "../../components/StatusChip.jsx";

const NEXT_ACTIONS = {
    PENDING: ["APPROVED", "REJECTED"],
    APPROVED: ["IN_PROGRESS"],
    IN_PROGRESS: ["COMPLETED"],
    REJECTED: [],
    COMPLETED: [],
};

export default function ServiceBookings() {
    const [rows, setRows] = useState([]);
    const [statusFilter, setStatusFilter] = useState("");
    const [err, setErr] = useState("");

    async function load() {
        try {
            setErr("");
            const qs = new URLSearchParams();
            qs.set("type", "SERVICE");
            if (statusFilter) qs.set("status", statusFilter);
            const data = await getJSON(`/api/staff/bookings?${qs.toString()}`);
            setRows(data || []);
        } catch (e) {
            setErr(String(e.message || e));
        }
    }

    useEffect(() => { load(); }, [statusFilter]);

    async function updateStatus(row, toStatus, actorRole = "OPS_MANAGER") {
        try {
            const updated = await patchJSON(
                `/api/staff/bookings/${row.id}/status?actorRole=${actorRole}`,
                { status: toStatus }
            );
            setRows(prev => prev.map(r => (r.id === row.id ? updated : r)));
        } catch (e) {
            alert(e.message || e);
        }
    }

    return (
        <div style={{ maxWidth: 1000, margin: "24px auto", padding: 16 }}>
            <h2>Service Bookings (Staff)</h2>
            {err && <div style={{ color: "crimson" }}>{err}</div>}

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <label>Status Filter
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                        <option value="">All</option>
                        <option>PENDING</option>
                        <option>APPROVED</option>
                        <option>REJECTED</option>
                        <option>IN_PROGRESS</option>
                        <option>COMPLETED</option>
                    </select>
                </label>
                <button onClick={load}>Refresh</button>
            </div>

            <table width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                    <th>ID</th><th>Customer</th><th>Time</th><th>ServiceType</th><th>Status</th><th>Action</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(r => {
                    const options = NEXT_ACTIONS[r.status] || [];
                    return (
                        <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                            <td>{r.id}</td>
                            <td>{r.customerId}</td>
                            <td>{r.startTime} – {r.endTime || "-"}</td>
                            <td>{r.serviceTypeId || "-"}</td>
                            <td><StatusChip status={r.status} /></td>
                            <td>
                                {options.length ? (
                                    <select
                                        defaultValue=""
                                        onChange={e => {
                                            const to = e.target.value;
                                            if (to) updateStatus(r, to, to === "APPROVED" || to === "REJECTED" ? "FRONT_DESK" : "TECHNICIAN");
                                            e.target.value = "";
                                        }}
                                    >
                                        <option value="" disabled>Choose...</option>
                                        {options.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                ) : <span style={{ color: "#888" }}>—</span>}
                            </td>
                        </tr>
                    );
                })}
                {!rows.length && (
                    <tr><td colSpan="6" style={{ color: "#888", padding: 16 }}>No bookings found.</td></tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
