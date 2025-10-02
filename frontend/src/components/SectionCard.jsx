export default function SectionCard({ title, right, children }) {
    return (
        <div style={{border:"1px solid #e5e7eb", borderRadius:12, padding:16, marginBottom:16}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12}}>
                <h3 style={{margin:0}}>{title}</h3>
                <div>{right}</div>
            </div>
            {children}
        </div>
    );
}
