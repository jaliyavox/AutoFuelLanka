import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { API } from "../../api/client.js";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCustomerBooking() {
    const { user } = useAuth();
    const nav = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({});
    const [err, setErr] = useState("");

    useEffect(() => {
        fetch(`${API}/api/customers/${user.id}/bookings`)
            .then(r => r.json())
            .then(data => {
                const b = data.find(x => x.id === Number(id));
                if (b) setForm(b);
            });
    }, [id, user.id]);

    const change = (k,v)=> setForm(prev=>({...prev,[k]:v}));

    const submit = async (e)=>{
        e.preventDefault();
        try {
            const res = await fetch(`${API}/api/customers/${user.id}/bookings/${id}`, {
                method:"PUT",
                headers:{ "Content-Type":"application/json" },
                body: JSON.stringify(form)
            });
            if(!res.ok) throw new Error(await res.text());
            nav("/customer");
        } catch(e2) { setErr(e2.message); }
    };

    return (
        <form onSubmit={submit} style={{ maxWidth:480, margin:"24px auto" }}>
            <h2>Edit Booking #{id}</h2>
            {err && <p style={{color:"red"}}>{err}</p>}
            <label>Start Time</label>
            <input type="datetime-local" value={form.startTime||""} onChange={e=>change("startTime",e.target.value)} />

            <label>End Time</label>
            <input type="datetime-local" value={form.endTime||""} onChange={e=>change("endTime",e.target.value)} />

            <label>Type</label>
            <input value={form.type||""} onChange={e=>change("type",e.target.value)} />

            <label>Fuel Type</label>
            <input value={form.fuelType||""} onChange={e=>change("fuelType",e.target.value)} />

            <label>Liters</label>
            <input type="number" value={form.litersRequested||""} onChange={e=>change("litersRequested",e.target.value)} />

            <label>Location ID</label>
            <input value={form.locationId||""} onChange={e=>change("locationId",e.target.value)} />

            <button type="submit">Save</button>
        </form>
    );
}
