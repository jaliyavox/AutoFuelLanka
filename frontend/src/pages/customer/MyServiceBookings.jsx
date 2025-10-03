
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getJSON, postJSON, putJSON, del } from "../../api/client.js";
import StatusChip from "../../components/StatusChip.jsx";

export default function MyServiceBookings() {
    const { user } = useAuth();
    const [serviceTypes, setServiceTypes] = useState([]);
    const [rows, setRows] = useState([]);
    const [err, setErr] = useState("");
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        startTime: "",
        endTime: "",
        locationId: 1,
        vehicleId: "",
        serviceTypeId: "",
    });
    const [editingId, setEditingId] = useState(null);

    async function loadAll() {
        try {
            setErr("");
            const [types, bookings] = await Promise.all([
                getJSON("/api/service-types"),
                getJSON(`/api/customers/${user.id}/bookings`)
            ]);
            setServiceTypes(types || []);
            setRows(bookings || []);
        } catch (e) {
            setErr(String(e.message || e));
        }
    }

    useEffect(() => { if (user?.id) loadAll(); }, [user?.id]);

    const canEdit = (r) => r.status === "PENDING";

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                type: "SERVICE",
                startTime: form.startTime || null,
                endTime: form.endTime || null,
                locationId: Number(form.locationId),
                vehicleId: form.vehicleId ? Number(form.vehicleId) : null,
                serviceTypeId: Number(form.serviceTypeId),
            };
            if (!editingId) {
                await postJSON(`/api/customers/${user.id}/bookings`, payload);
            } else {
                await putJSON(`/api/customers/${user.id}/bookings/${editingId}`, payload);
                setEditingId(null);
            }
            setForm({ startTime: "", endTime: "", locationId: 1, vehicleId: "", serviceTypeId: "" });
            await loadAll();
        } catch (e) {
            setErr(String(e.message || e));
        } finally {
            setSaving(false);
        }
    }

    function startEdit(r) {
        setEditingId(r.id);
        setForm({
            startTime: r.startTime || "",
            endTime: r.endTime || "",
            locationId: r.locationId || 1,
            vehicleId: r.vehicleId || "",
            serviceTypeId: r.serviceTypeId || "",
        });
    }

    async function handleDelete(id) {
        if (!confirm("Delete this booking?")) return;
        try {
            await del(`/api/customers/${user.id}/bookings/${id}`);
            await loadAll();
        } catch (e) {
            alert(e.message || e);
        }
    }

    return (
        <div style={{ maxWidth: 860, margin: "24px auto", padding: 16 }}>
            <h2>My Service Bookings</h2>
            {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}

            {/* Create / Edit Form */}
            <form onSubmit={handleSubmit}
                  style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr 1fr", marginBottom: 16 }}>
                <label>Start Time
                    <input type="datetime-local" value={form.startTime}
                           onChange={e=>setForm(f=>({...f, startTime: e.target.value}))}/>
                </label>
                <label>End Time
                    <input type="datetime-local" value={form.endTime}
                           onChange={e=>setForm(f=>({...f, endTime: e.target.value}))}/>
                </label>
                <label>Location ID
                    <input type="number" value={form.locationId}
                           onChange={e=>setForm(f=>({...f, locationId: e.target.value}))}/>
                </label>
                <label>Vehicle ID
                    <input type="number" value={form.vehicleId}
                           onChange={e=>setForm(f=>({...f, vehicleId: e.target.value}))}/>
                </label>
                <label>Service Type
                    <select value={form.serviceTypeId}
                            onChange={e=>setForm(f=>({...f, serviceTypeId: e.target.value}))}>
                        <option value="">-- select --</option>
                        {serviceTypes.map(t => (
                            <option key={t.id} value={t.id}>{t.label} ({t.code})</option>
                        ))}
                    </select>
                </label>

                <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
                    <button disabled={saving || !form.serviceTypeId}>
                        {editingId ? "Update Booking" : "Create Booking"}
                    </button>
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setForm({ startTime: "", endTime: "", locationId: 1, vehicleId: "", serviceTypeId: "" }); }}>
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Table */}
            <table width="100%" cellPadding="8" style={{ borderCollapse: "collapse" }}>
                <thead>
                <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                    <th>ID</th><th>Time</th><th>ServiceType</th><th>Status</th><th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(r => (
                    <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                        <td>{r.id}</td>
                        <td>{r.startTime} – {r.endTime || "-"}</td>
                        <td>{r.serviceTypeId || "-"}</td>
                        <td><StatusChip status={r.status} /></td>
                        <td style={{ display: "flex", gap: 8 }}>
                            <button disabled={!canEdit(r)} title={canEdit(r) ? "" : "Locked after approval"} onClick={() => startEdit(r)}>Edit</button>
                            <button disabled={!canEdit(r)} title={canEdit(r) ? "" : "Locked after approval"} onClick={() => handleDelete(r.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                {!rows.length && (
                    <tr><td colSpan="5" style={{ color: "#888", padding: 16 }}>No bookings yet.</td></tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
