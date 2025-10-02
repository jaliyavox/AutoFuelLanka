import { useEffect, useState } from "react";
import http from "../../api/http";

export default function UsersTable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const res = await http.get("/api/users");
                setRows(res.data || []);
            } catch (e) {
                setErr(e?.response?.data?.error || e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <div style={{padding:12}}>Loading users…</div>;
    if (err) return <div style={{color:"crimson", padding:12}}>Error: {err}</div>;
    if (!rows.length) return <div style={{padding:12}}>No users found.</div>;

    return (
        <div style={{padding:16}}>
            <h2 style={{marginBottom:12}}>User Management (read-only)</h2>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
                <thead>
                <tr>
                    <th style={th}>ID</th>
                    <th style={th}>Email</th>
                    <th style={th}>Full name</th>
                    <th style={th}>Enabled</th>
                    <th style={th}>Roles</th>
                </tr>
                </thead>
                <tbody>
                {rows.map(u => (
                    <tr key={u.id}>
                        <td style={td}>{u.id}</td>
                        <td style={td}>{u.email}</td>
                        <td style={td}>{u.fullName}</td>
                        <td style={td}>{u.enabled ? "Yes" : "No"}</td>
                        <td style={td}>{Array.isArray(u.roles) ? u.roles.join(", ") : ""}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

const th = { textAlign:"left", padding:"8px 10px", borderBottom:"1px solid #ddd" };
const td = { padding:"8px 10px", borderBottom:"1px solid #eee" };
