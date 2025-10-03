
export default function StatusChip({ status }) {
    const map = {
        PENDING: { bg: "#fff7e6", fg: "#ad6800" },
        APPROVED: { bg: "#f6ffed", fg: "#237804" },
        REJECTED: { bg: "#fff1f0", fg: "#a8071a" },
        IN_PROGRESS: { bg: "#e6f4ff", fg: "#0958d9" },
        COMPLETED: { bg: "#f9f0ff", fg: "#531dab" },
    };
    const s = map[status] || { bg: "#f0f0f0", fg: "#555" };
    return (
        <span style={{
            background: s.bg, color: s.fg, padding: "2px 8px",
            borderRadius: 999, fontSize: 12, fontWeight: 600
        }}>
      {status}
    </span>
    );
}
