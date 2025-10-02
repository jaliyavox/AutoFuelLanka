import { useState } from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setErr("");
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
            const msg = await res.text();
            setErr(msg || "Login failed");
            return;
        }

        const user = await res.json();
        login(user); // 👈 use context
        window.location.href = "/"; // redirect after login
    };

    return (
        <form onSubmit={submit} style={{ maxWidth: 380, margin: "40px auto" }}>
            <h2>Login</h2>
            {err && <p style={{ color: "red" }}>{err}</p>}
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
}
