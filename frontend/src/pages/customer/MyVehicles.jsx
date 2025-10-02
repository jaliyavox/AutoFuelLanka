import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getJSON } from "../../api/client.js";
import SectionCard from "../../components/SectionCard.jsx";
import { Link } from "react-router-dom";

export default function MyVehicles() {
    const { user } = useAuth();
    const [rows, setRows] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        let ignore = false;
        async function load() {
            setErr("");
            try {
                // TODO: change path if your API differs
                const data = await getJSON(`/api/customers/${user.id}/vehicles`);
                if (!ignore) setRows(Array.isArray(data) ? data : []);
            } catch (e) {
                // Graceful empty state if endpoint not built yet
                setErr(String(e.message || e));
                setRows([]);
            }
        }
        if (user?.id) load();
        return () => { ignore = true; };
    }, [user?.id]);

    return (
        <SectionCard
            title="My Vehicles"
            right={<Link to="/customer/vehicles/new">+ Add Vehicle</Link>}
        >
            {err && <p style={{color:"tomato"}}>Couldn’t load: {err}</p>}
            {rows.length === 0 ? (
                <p style={{opacity:0.7}}>No vehicles yet.</p>
            ) : (
                <table style={{width:"100%", borderCollapse:"collapse"}}>
                    <thead>
                    <tr>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>ID</th>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>Plate</th>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>Model</th>
                        <th style={{textAlign:"left", borderBottom:"1px solid #eee", padding:"8px 4px"}}>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map(v => (
                        <tr key={v.id}>
                            <td style={{padding:"8px 4px"}}>{v.id}</td>
                            <td style={{padding:"8px 4px"}}>{v.plate || "-"}</td>
                            <td style={{padding:"8px 4px"}}>{v.model || "-"}</td>
                            <td style={{padding:"8px 4px"}}>{v.type || "-"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </SectionCard>
    );
}
