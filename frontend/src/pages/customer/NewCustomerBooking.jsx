import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { API } from "../../api/client.js";
import { useNavigate } from "react-router-dom";

export default function NewCustomerBooking() {
    const { user } = useAuth();
    const nav = useNavigate();

    const [form, setForm] = useState({
        startTime: "",
        endTime: "",
        type: "FUEL",
        fuelType: "PETROL",
        litersRequested: 10,
        locationId: "",
        vehicleId: "",
        serviceTypeId: ""
    });

    const [err, setErr] = useState("");

    const change = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

    const submit = async (e) => {
        e.preventDefault();
        setErr("");

        try {
            const res = await fetch(`${API}/api/customers/${user.id}/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error(await res.text());

            await res.json();
            nav("/customer"); // redirect back to dashboard
        } catch (e2) {
            setErr(e2.message || "Failed to create booking");
        }
    };

    return (
        <form onSubmit={submit} style={{ maxWidth: 480, margin: "24px auto", padding: 16, border: "1px solid #ddd", borderRadius: 8 }}>
            <h2>New Booking</h2>
            {err && <p style={{ color: "red" }}>{err}</p>}

            <label>Type</label>
            <select value={form.type} onChange={e=>change("type", e.target.value)}>
                <option value="FUEL">Fuel</option>
                <option value="SERVICE">Service</option>
            </select>

            {form.type === "FUEL" && (
                <>
                    <label>Fuel Type</label>
                    <select value={form.fuelType} onChange={e=>change("fuelType", e.target.value)}>
                        <option value="PETROL">Petrol</option>
                        <option value="DIESEL">Diesel</option>
                    </select>

                    <label>Liters</label>
                    <input type="number" min="1" value={form.litersRequested} onChange={e=>change("litersRequested", e.target.value)} />
                </>
            )}

            {form.type === "SERVICE" && (
                <>
                    <label>Service Type ID</label>
                    <input value={form.serviceTypeId} onChange={e=>change("serviceTypeId", e.target.value)} placeholder="e.g. 2" />
                </>
            )}

            <label>Location ID</label>
            <input value={form.locationId} onChange={e=>change("locationId", e.target.value)} placeholder="e.g. 1" />

            <label>Vehicle ID</label>
            <input value={form.vehicleId} onChange={e=>change("vehicleId", e.target.value)} placeholder="optional" />

            <label>Start Time</label>
            <input type="datetime-local" value={form.startTime} onChange={e=>change("startTime", e.target.value)} />

            <label>End Time</label>
            <input type="datetime-local" value={form.endTime} onChange={e=>change("endTime", e.target.value)} />

            <button type="submit" style={{ marginTop: 16 }}>Create Booking</button>
        </form>
    );
}
