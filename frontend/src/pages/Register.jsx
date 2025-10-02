import { useState } from "react";

export default function Register() {
    const [form, setForm] = useState({ email:"", password:"", fullName:"", phone:"", address:"" });
    const [err, setErr] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        const res = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        if (!res.ok) {
            const msg = await res.text();
            setErr(msg || "Register failed");
            return;
        }
        // auto-login UX (optional)
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/login";
    };

    return (
        <form onSubmit={submit} style={{ maxWidth: 420, margin: "40px auto" }}>
            <h2>Create account</h2>
            {err && <p style={{ color: "red" }}>{err}</p>}
            <input placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})}/>
            <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
            <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
            <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})}/>
            <input placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})}/>
            <button type="submit">Register</button>
        </form>
    );
}
