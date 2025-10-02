import { useEffect, useState } from "react";
import http from "../../api/http";
import UserForm from "./UserForm";

export default function UsersTable() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    const loadUsers = async () => {
        setLoading(true);
        setErr("");
        try {
            const res = await http.get("/api/users");
            setRows(res.data || []);
        } catch (e) {
            setErr(e?.response?.data?.error || e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const startEdit = (u) => {
        setEditingId(u.id);
        setEditForm({ ...u, password: "" }); // blank password by default
    };

    const saveEdit = async (id) => {
        try {
            await http.put(`/api/users/${id}`, editForm);
            setEditingId(null);
            await loadUsers();
        } catch (e) {
            alert("Update failed: " + (e?.response?.data?.error || e.message));
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;
        try {
            await http.delete(`/api/users/${id}`);
            await loadUsers();
        } catch (e) {
            alert("Delete failed: " + (e?.response?.data?.error || e.message));
        }
    };

    const setEdit = (name) => (e) => setEditForm((f) => ({ ...f, [name]: e.target.value }));

    return (
        <div style={{ padding: 16 }}>
            <h2 style={{ marginBottom: 12 }}>User Management</h2>

            <UserForm onCreated={loadUsers} />

            {loading && <div style={{ padding: 12 }}>Loading users…</div>}
            {err && <div style={{ color: "crimson", padding: 12 }}>Error: {err}</div>}
            {!loading && !err && rows.length === 0 && <div style={{ padding: 12 }}>No users found.</div>}

            {!loading && !err && rows.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                    <tr>
                        <th style={th}>ID</th>
                        <th style={th}>Email</th>
                        <th style={th}>Full name</th>
                        <th style={th}>Phone</th>
                        <th style={th}>Address</th>
                        <th style={th}>Enabled</th>
                        <th style={th}>Roles</th>
                        <th style={th}>Password</th>
                        <th style={th}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((u) => (
                        <tr key={u.id}>
                            {editingId === u.id ? (
                                <>
                                    <td style={td}>{u.id}</td>
                                    <td style={td}>{u.email}</td>
                                    <td style={td}>
                                        <input value={editForm.fullName || ""} onChange={setEdit("fullName")} />
                                    </td>
                                    <td style={td}>
                                        <input value={editForm.phone || ""} onChange={setEdit("phone")} />
                                    </td>
                                    <td style={td}>
                                        <input value={editForm.address || ""} onChange={setEdit("address")} />
                                    </td>
                                    <td style={td}>
                                        <select value={editForm.enabled} onChange={setEdit("enabled")}>
                                            <option value="true">Yes</option>
                                            <option value="false">No</option>
                                        </select>
                                    </td>
                                    <td style={td}>
                                        <select
                                            value={editForm.roles?.[0] || "CUSTOMER"}
                                            onChange={(e) => setEditForm((f) => ({ ...f, roles: [e.target.value] }))}
                                        >
                                            <option value="CUSTOMER">CUSTOMER</option>
                                            <option value="IT_EXEC">IT_EXEC</option>
                                            <option value="FRONT_DESK">FRONT_DESK</option>
                                            <option value="TECHNICIAN">TECHNICIAN</option>
                                            <option value="OPS_MANAGER">OPS_MANAGER</option>
                                            <option value="FINANCE">FINANCE</option>
                                        </select>
                                    </td>
                                    <td style={td}>
                                        <input
                                            type="password"
                                            value={editForm.password || ""}
                                            placeholder="(leave blank to keep)"
                                            onChange={setEdit("password")}
                                        />
                                    </td>
                                    <td style={td}>
                                        <button onClick={() => saveEdit(u.id)}>Save</button>
                                        <button onClick={() => setEditingId(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td style={td}>{u.id}</td>
                                    <td style={td}>{u.email}</td>
                                    <td style={td}>{u.fullName}</td>
                                    <td style={td}>{u.phone || "-"}</td>
                                    <td style={td}>{u.address || "-"}</td>
                                    <td style={td}>{u.enabled ? "Yes" : "No"}</td>
                                    <td style={td}>{Array.isArray(u.roles) ? u.roles.join(", ") : ""}</td>
                                    <td style={td}>••••••</td>
                                    <td style={td}>
                                        <button onClick={() => startEdit(u)}>Edit</button>
                                        <button onClick={() => deleteUser(u.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const th = { textAlign: "left", padding: "8px 10px", borderBottom: "1px solid #ddd" };
const td = { padding: "8px 10px", borderBottom: "1px solid #eee" };
