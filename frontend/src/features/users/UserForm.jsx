import { useState } from "react";
import http from "../../api/http";

export default function UserForm({ onCreated }) {
    const [form, setForm] = useState({
        email: "",
        fullName: "",
        password: "",
        phone: "",
        address: "",
        enabled: true,
        roles: ["CUSTOMER"],
    });
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);

    const set = (name) => (e) => setForm((f) => ({ ...f, [name]: e.target.value }));
    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        setBusy(true);
        try {
            await http.post("/api/users", form);
            // reset
            setForm({ email: "", fullName: "", password: "", phone: "", address: "", enabled: true, roles: ["CUSTOMER"] });
            onCreated?.();
        } catch (e) {
            setErr(e?.response?.data?.error || e.message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <form onSubmit={submit} style={{ margin: "12px 0", padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
            <h3 style={{ marginTop: 0 }}>Create User</h3>
            {err && <div style={{ color: "crimson", marginBottom: 8 }}>{err}</div>}
            <div style={row}>
                <input style={inp} placeholder="Email *" value={form.email} onChange={set("email")} required />
                <input style={inp} placeholder="Full name *" value={form.fullName} onChange={set("fullName")} required />
            </div>
            <div style={row}>
                <input type="password" style={inp} placeholder="Password *" value={form.password} onChange={set("password")} required />
                <input style={inp} placeholder="Phone" value={form.phone} onChange={set("phone")} />
            </div>
            <div style={row}>
                <input style={inp} placeholder="Address" value={form.address} onChange={set("address")} />
                <select
                    style={inp}
                    value={form.roles[0] || "CUSTOMER"}
                    onChange={(e) => setForm((f) => ({ ...f, roles: [e.target.value] }))}
                >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="IT_EXEC">IT_EXEC</option>
                    <option value="FRONT_DESK">FRONT_DESK</option>
                    <option value="TECHNICIAN">TECHNICIAN</option>
                    <option value="OPS_MANAGER">OPS_MANAGER</option>
                    <option value="FINANCE">FINANCE</option>
                </select>
            </div>
            <button type="submit" disabled={busy} style={{ padding: "8px 12px" }}>
                {busy ? "Creating..." : "Add User"}
            </button>
        </form>
    );
}

const row = { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" };
const inp = { flex: 1, minWidth: 220, padding: "8px 10px", border: "1px solid #ddd", borderRadius: 6 };
