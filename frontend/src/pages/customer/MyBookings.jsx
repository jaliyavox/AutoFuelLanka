import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getJSON } from "../../api/client.js";
import SectionCard from "../../components/SectionCard.jsx";
import { Link } from "react-router-dom";

export default function MyBookings() {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        let ignore = false;
        async function load() {
            setErr("");
            try {
                // Adjust if your path differs; this matches your earlier controllers
                const data = await getJSON(`/api/customers/${user.id}/bookings`);
                if (!ignore) setRows(Array.isArray(data) ? data : []);
            } catch (e) {
                setErr(String(e.message || e));
                setRows([]);
            }
        }
        if (user?.id) load();
        return () => { ignore = true; };
    }, [user?.id]);

    return (
        <SectionCard
            title="My Bookings"
            right={<Link to="/customer/bookings/new">+ New Booking</Link>}
        >
            {err && <p style={{color:"tomato"}}>Couldn’t load: {err}</p>}
            {rows.length === 0 ? (
                <p style={{opacity:0.7}}>No bookings yet.</p>
            ) : (
                <table style={{width:"100%", borderCollapse:"collapse"}}>
                    <thead>
                    <tr>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>ID</th>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>Start</th>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>End</th>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>Type</th>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map(b => (
                        <tr key={b.id}>
                            <td style={{padding:"8px 4px"}}>{b.id}</td>
                            <td style={{padding:"8px 4px"}}>{b.startTime || "-"}</td>
                            <td style={{padding:"8px 4px"}}>{b.endTime || "-"}</td>
                            <td style={{padding:"8px 4px"}}>{b.type || b.serviceName || "-"}</td>
                            <td style={{padding:"8px 4px"}}>{b.status || "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </SectionCard>
    );
}
