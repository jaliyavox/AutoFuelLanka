export const API = "http://localhost:8080";

export async function getJSON(path) {
    const res = await fetch(`${API}${path}`);
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
