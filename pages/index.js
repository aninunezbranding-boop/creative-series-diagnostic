import { useState } from "react";

const C = {
  plumDeep:  "#2D0A1F",
  plumMid:   "#4A1535",
  plumLight: "#7B2D52",
  plumSoft:  "#F2EAF0",
  plumCream: "#EDE5E9",
  lilac:     "#C9A0BC",
  stone:     "#F7F4F1",
  ink:       "#1C1018",
  muted:     "#8C8589",
  line:      "#D4C4CE",
  cardBg:    "#FFFFFF",
};

const QUESTIONS = [
  { id:"q1", block:"01 · Identidad y expertise", label:"¿A qué te dedicas y a quién ayudas exactamente?", hint:'No el título genérico. ¿Qué problema real resuelves? Ej: "Ayudo a madres emprendedoras a lanzar su tienda online sin morir en el intento"', placeholder:"Soy... ayudo a... el resultado que logro es...", rows:3 },
  { id:"q2", block:null, label:"¿Cuántos años llevas en esto y cuál es tu formación o recorrido?", hint:"Incluye experiencias no convencionales. A veces la ruta no lineal es lo más poderoso.", placeholder:"Llevo X años, estudié / trabajé en... antes de esto hice...", rows:3 },
  { id:"q3", block:null, label:"¿Cuál es esa cosa que sabes que muy pocos en tu industria dicen en voz alta?", hint:"La verdad incómoda, la opinión polémica, el secreto de la industria.", placeholder:"La verdad que nadie dice es que...", rows:3 },
  { id:"q4", block:"02 · Tu audiencia", label:"Describe a tu cliente o seguidor ideal en 3 detalles muy específicos", hint:'No "mujeres de 25-40". Algo como: "Diseñadora freelance que se ahoga en carpetas de Canva sin estrategia"', placeholder:"Mi persona ideal es alguien que... tiene el problema de... y sueña con...", rows:3 },
  { id:"q5", block:null, label:"¿Qué pregunta te hace tu audiencia que ya te cansa de responder?", hint:"Esas preguntas repetidas son oro puro para series de contenido.", placeholder:"Siempre me preguntan sobre... o me dicen que no entienden...", rows:2 },
  { id:"q6", block:"03 · Personalidad y tono", label:"¿Cómo describes tu tono? Elige 3 palabras y explica una.", hint:'Ej: "Directo, cálido, con humor seco. Lo directo viene de que odio el contenido que rodea la respuesta en 20 minutos"', placeholder:"Mi tono es... y especialmente [elige una] porque...", rows:3 },
  { id:"q7", block:null, label:"¿Qué jamás harías en tu contenido aunque esté de moda?", hint:"Tus límites definen tu marca tanto como lo que sí haces.", placeholder:"Nunca haría... aunque sé que funciona para otros...", rows:2 },
  { id:"q8", block:"04 · Tu conocimiento único", label:"Lista 5 temas donde eres realmente buena/o — incluyendo los no obvios", hint:"Los intersticios entre disciplinas son donde nacen los ángulos más originales.", placeholder:"1. ... 2. ... 3. ... 4. ... 5. ...", rows:4 },
  { id:"q9", block:null, label:"¿Hay algo en tu historia personal que alimenta tu visión profesional?", hint:"No necesitas compartirlo todo, pero la IA lo usa para detectar narrativas auténticas.", placeholder:"Algo que pocos saben de mí y que influye en mi trabajo es...", rows:3 },
  { id:"q10", block:"05 · Objetivos de contenido", label:"¿Qué quieres que pase cuando alguien ve tu contenido?", hint:"¿Que te contraten? ¿Que te sigan? ¿Que cambien una creencia? ¿Que compren un curso?", placeholder:"Quiero que quien me vea... y que eventualmente...", rows:2 },
  { id:"q11", block:null, label:"¿En qué plataformas publicas o quieres publicar?", hint:"Instagram Reels, TikTok, YouTube Shorts, LinkedIn... cada una tiene su lógica.", placeholder:"Instagram, TikTok, YouTube Shorts...", rows:1 },
  { id:"q12", block:null, label:"¿Tienes algún referente de serie creativa que admires?", hint:"No para copiarlo, sino para entender qué te atrae del formato.", placeholder:"Me gusta cómo X hace... porque...", rows:2 },
];

const LABELS = {
  q1:"A qué se dedica y a quién ayuda", q2:"Años de experiencia y recorrido",
  q3:"Verdad incómoda de su industria", q4:"Descripción de su audiencia ideal",
  q5:"Preguntas repetidas que le cansan", q6:"Tono y personalidad",
  q7:"Lo que jamás haría en contenido", q8:"Temas de expertise",
  q9:"Elemento personal que alimenta su visión", q10:"Qué quiere lograr con su contenido",
  q11:"Plataformas objetivo", q12:"Referentes de series creativas",
};

const STEPS = ["Decodificando identidad y expertise","Mapeando tono y personalidad","Identificando ángulos únicos","Construyendo perfil de marca","Generando nombres de series"];

function AccessGate({ onAccess }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!code.trim()) { setError("Ingresa tu código de acceso."); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/validate-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json();
      if (data.valid) { onAccess(); }
      else { setError(data.reason || "Código inválido. Verifica tu correo de compra."); }
    } catch { setError("Error de conexión. Intenta nuevamente."); }
    setLoading(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:"#2D0A1F", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px", fontFamily:"system-ui, sans-serif" }}>
      <div style={{ background:"#FFFFFF", borderRadius:20, padding:"48px 40px", maxWidth:480, width:"100%", textAlign:"center" }}>
        <div style={{ width:56, height:56, background:"#F2EAF0", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 24px", fontSize:24 }}>🔑</div>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#8C8589", marginBottom:8 }}>Ani Núñez · Personalidad Rentable</div>
        <h1 style={{ fontFamily:"Georgia, serif", fontSize:"1.8rem", color:"#1C1018", marginBottom:12, lineHeight:1.2 }}>Creative Series<br/>Blueprint</h1>
        <p style={{ color:"#8C8589", fontSize:14, marginBottom:32, lineHeight:1.6 }}>Ingresa el código que recibiste al comprar para acceder a tu diagnóstico personalizado.</p>
        <input type="text" placeholder="Tu código de acceso" value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSubmit()}
          style={{ width:"100%", padding:"14px 16px", border:`2px solid ${error ? "#e53e3e" : "#D4C4CE"}`, borderRadius:10, fontSize:16, outline:"none", marginBottom:12, boxSizing:"border-box", textAlign:"center", letterSpacing:".1em", fontFamily:"monospace", color:"#1C1018" }} />
        {error && <div style={{ color:"#e53e3e", fontSize:13, marginBottom:12 }}>{error}</div>}
        <button onClick={handleSubmit} disabled={loading}
          style={{ width:"100%", padding:"14px", background: loading ? "#8C8589" : "#2D0A1F", color:"white", border:"none", borderRadius:10, fontSize:15, fontWeight:700, cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Verificando..." : "Acceder al diagnóstico →"}
        </button>
        <p style={{ marginTop:24, fontSize:12, color:"#8C8589" }}>¿No tienes un código?{" "}<a href="https://instagram.com/aninunez.branding" style={{ color:"#7B2D52", fontWeight:600 }}>Obtén acceso aquí</a></p>
      </div>
    </div>
  );
}

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [screen, setScreen] = useState("intro");
  const [answers, setAnswers] = useState({});
  const [loadStep, setLoadStep] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  if (!hasAccess) return <AccessGate onAccess={() => setHasAccess(true)} />;

  const filled = Object.values(answers).filter(v => v.trim()).length;
  const set = (id, val) => setAnswers(p => ({ ...p, [id]: val }));

  const buildPrompt = () => {
    const lines = Object.entries(answers).filter(([,v])=>v.trim()).map(([k,v])=>`${LABELS[k]}: ${v.trim()}`);
    return `Eres estratega de marcas personales. Analiza este diagnóstico y responde ÚNICAMENTE con JSON válido, sin texto antes ni después, sin markdown, sin backticks.\n\nDIAGNÓSTICO:\n${lines.join("\n")}\n\nJSON requerido (máximo 2 oraciones por campo de texto):\n{"perfil_marca":{"esencia":"frase 10-15 palabras","posicionamiento":"1-2 oraciones","tono_dominante":["p1","p2","p3"],"tono_secundario":["p4","p5"],"advertencia":"riesgo en 1 oración"},"angulos":[{"nombre":"ángulo 1","descripcion":"1-2 oraciones","tension":"paradoja en 1 oración"},{"nombre":"ángulo 2","descripcion":"...","tension":"..."},{"nombre":"ángulo 3","descripcion":"...","tension":"..."}],"series":[{"nombre":"nombre con la VOZ de esta persona","subtitulo":"frase corta","concepto":"1-2 oraciones","por_que":"1 oración","ejemplo":"episodio concreto","formato":"Reels/TikTok/Shorts","frecuencia":"X por semana","gancho":"tipo de gancho"},{"nombre":"","subtitulo":"","concepto":"","por_que":"","ejemplo":"","formato":"","frecuencia":"","gancho":""},{"nombre":"","subtitulo":"","concepto":"","por_que":"","ejemplo":"","formato":"","frecuencia":"","gancho":""},{"nombre":"","subtitulo":"","concepto":"","por_que":"","ejemplo":"","formato":"","frecuencia":"","gancho":""},{"nombre":"","subtitulo":"","concepto":"","por_que":"","ejemplo":"","formato":"","frecuencia":"","gancho":""}],"estrella":"nombre + por qué en 1 oración","pasos":["paso 1","paso 2","paso 3","paso 4"]}\n\nLos nombres de las series deben sonar auténticos a esta persona específica, no genéricos.`;
  };

  const generate = async () => {
    if (filled < 4) { setError("Responde al menos 4 preguntas para obtener un análisis útil."); return; }
    setError(""); setScreen("loading"); setLoadStep(0);
    const timer = setInterval(() => setLoadStep(p => Math.min(p+1, STEPS.length-1)), 1200);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:4000, messages:[{role:"user",content:buildPrompt()}] })
      });
      clearInterval(timer);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "API error");
      let raw = data.content.map(b=>b.text||"").join("").trim();
      raw = raw.replace(/^```json\s*/,"").replace(/^```\s*/,"").replace(/\s*```$/,"").trim();
      const match = raw.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("La IA no devolvió JSON válido. Intenta de nuevo.");
      setResult(JSON.parse(match[0]));
      setScreen("results");
    } catch(e) {
      clearInterval(timer);
      setError("Error al generar: " + e.message);
      setScreen("questions");
    }
  };

  const s = {
    wrap: { minHeight:"100vh", background:"#F7F4F1", fontFamily:"system-ui, sans-serif", color:"#1C1018" },
    inner: { maxWidth:680, margin:"0 auto", padding:"0 20px 60px" },
    hero: { background:"#2D0A1F", color:"#F7F4F1", padding:"48px 32px 40px", textAlign:"center" },
    heroEye: { fontSize:11, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#C9A0BC", marginBottom:12 },
    heroTitle: { fontFamily:"Georgia, serif", fontSize:"clamp(1.8rem,5vw,2.6rem)", lineHeight:1.15, marginBottom:12 },
    heroSub: { color:"rgba(247,244,241,.7)", fontSize:15, maxWidth:480, margin:"0 auto" },
    startBtn: { marginTop:28, display:"inline-block", background:"#C9A0BC", color:"#2D0A1F", padding:"14px 32px", borderRadius:40, fontWeight:700, fontSize:15, border:"none", cursor:"pointer" },
    divider: { display:"flex", alignItems:"center", gap:12, margin:"28px 0 16px", fontSize:11, fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color:"#8C8589" },
    divLine: { flex:1, height:1, background:"#D4C4CE" },
    qCard: { background:"#FFFFFF", borderRadius:12, padding:"20px", marginBottom:12, border:"1px solid #D4C4CE" },
    qLabel: { fontWeight:700, fontSize:15, marginBottom:6, display:"flex", gap:10, alignItems:"flex-start" },
    qNum: { background:"#2D0A1F", color:"#F7F4F1", borderRadius:"50%", width:22, height:22, display:"inline-flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, flexShrink:0, marginTop:1 },
    qHint: { fontSize:12, color:"#8C8589", marginBottom:10, lineHeight:1.5 },
    ta: { width:"100%", border:"1.5px solid #D4C4CE", borderRadius:8, padding:"10px 12px", fontSize:14, fontFamily:"inherit", resize:"vertical", outline:"none", color:"#1C1018", background:"#F7F4F1", boxSizing:"border-box" },
    qFooter: { display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:24, flexWrap:"wrap", gap:12 },
    btnP: { background:"#2D0A1F", color:"#F7F4F1", border:"none", borderRadius:40, padding:"13px 28px", fontWeight:700, fontSize:15, cursor:"pointer" },
    errBox: { background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:8, padding:"12px 16px", color:"#DC2626", fontSize:13, marginTop:12 },
    loadSpinner: { width:48, height:48, border:"3px solid #D4C4CE", borderTop:"3px solid #2D0A1F", borderRadius:"50%", animation:"spin 1s linear infinite" },
    card: { background:"#FFFFFF", border:"1px solid #D4C4CE", borderRadius:12, padding:"20px", marginBottom:12 },
    cardStar: { background:"#FFFFFF", border:"2px solid #4A1535", borderRadius:12, padding:"20px", marginBottom:12 },
    eyebrow: { fontSize:10, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#7B2D52", marginBottom:8 },
    tag: { background:"#2D0A1F", color:"#F7F4F1", padding:"3px 12px", borderRadius:40, fontSize:11, fontWeight:600, display:"inline-block", margin:"3px 3px 3px 0" },
    tagS: { border:"1.5px solid #4A1535", color:"#4A1535", padding:"3px 12px", borderRadius:40, fontSize:11, fontWeight:600, display:"inline-block", margin:"3px 3px 3px 0" },
    alert: { background:"#F2EAF0", borderLeft:"3px solid #4A1535", padding:"10px 14px", borderRadius:6, marginTop:10, fontSize:13 },
    metaChip: { flex:"1 1 80px", background:"#F2EAF0", borderRadius:8, padding:"8px 10px", textAlign:"center", fontSize:12, fontWeight:600, minWidth:80 },
    metaLabel: { fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#8C8589", display:"block", marginBottom:3 },
    epBox: { background:"#EDE5E9", borderRadius:8, padding:"10px 12px", marginBottom:10, fontSize:13, color:"#2D0A1F" },
    whyBox: { fontSize:12, color:"#6B5A63", borderTop:"1px solid #D4C4CE", paddingTop:8 },
    angBox: { background:"#F2EAF0", borderLeft:"3px solid #4A1535", borderRadius:8, padding:"12px 14px", marginBottom:8 },
    darkCard: { background:"#2D0A1F", color:"#F7F4F1", borderRadius:12, padding:"24px", marginTop:8 },
    paso: { display:"flex", gap:10, alignItems:"flex-start", marginBottom:10, fontSize:13, color:"rgba(247,244,241,.85)" },
    pasoNum: { width:22, height:22, borderRadius:"50%", background:"#C9A0BC", color:"#2D0A1F", fontSize:11, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
    btnSecondary: { flex:1, padding:"12px 20px", border:"2px solid #2D0A1F", background:"transparent", color:"#2D0A1F", borderRadius:40, fontWeight:700, fontSize:14, cursor:"pointer", minWidth:140 },
  };

  if (screen === "intro") return (
    <div style={s.wrap}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={s.hero}>
        <div style={s.heroEye}>Ani Núñez · Personalidad Rentable</div>
        <h1 style={s.heroTitle}>Tu Creative Series<br/>Blueprint</h1>
        <p style={s.heroSub}>12 preguntas. IA estratégica. Sales con 5 series de contenido diseñadas exactamente para quien eres.</p>
        <button style={s.startBtn} onClick={() => setScreen("questions")}>Comenzar diagnóstico →</button>
      </div>
      <div style={{ ...s.inner, paddingTop:40 }}>
        {[["⏱ 15–20 minutos","Tómate tu tiempo, las respuestas más honestas dan los mejores resultados."],["🤖 IA personalizada","No es un template. El resultado se construye desde lo que tú escribes."],["📄 Blueprint descargable","Al terminar puedes guardar e imprimir tu Creative Series completa."]].map(([t,d]) => (
          <div key={t} style={{ ...s.card, display:"flex", gap:16, alignItems:"flex-start", marginBottom:10 }}>
            <div style={{ fontSize:24 }}>{t.split(" ")[0]}</div>
            <div><div style={{ fontWeight:700, marginBottom:4 }}>{t.slice(3)}</div><div style={{ fontSize:13, color:"#8C8589" }}>{d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );

  if (screen === "loading") return (
    <div style={{ ...s.wrap, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ textAlign:"center" }}>
        <div style={s.loadSpinner}/>
        <div style={{ marginTop:20, fontWeight:700 }}>{STEPS[loadStep]}</div>
        <div style={{ fontSize:13, color:"#8C8589", marginTop:6 }}>Paso {loadStep + 1} de {STEPS.length}</div>
      </div>
    </div>
  );

  if (screen === "results" && result) {
    const p = result.perfil_marca || {};
    const series = result.series || [];
    const angulos = result.angulos || [];
    const pasos = result.pasos || [];
    return (
      <div style={s.wrap}>
        <div style={s.inner}>
          <div style={{ paddingTop:32 }}>
            <div style={{ background:"#2D0A1F", color:"#F7F4F1", padding:"32px", borderRadius:16, marginBottom:20 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#C9A0BC", marginBottom:8 }}>✓ Tu Creative Series Blueprint</div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:"1.5rem", marginBottom:6 }}>{p.esencia}</div>
              <div style={{ fontSize:13, color:"rgba(247,244,241,.7)" }}>Generado el {new Date().toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"})}</div>
            </div>
            <div style={s.card}>
              <div style={s.eyebrow}>Perfil de marca personal</div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:"1.2rem", marginBottom:8 }}>{p.esencia}</div>
              <p style={{ fontSize:14, color:"#8C8589", marginBottom:12 }}>{p.posicionamiento}</p>
              <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#8C8589", marginBottom:6 }}>Tu tono</div>
              <div>{(p.tono_dominante||[]).map(t=><span key={t} style={s.tag}>{t}</span>)}{(p.tono_secundario||[]).map(t=><span key={t} style={s.tagS}>{t}</span>)}</div>
              {p.advertencia && <div style={s.alert}><div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".1em", color:"#4A1535", marginBottom:4 }}>Ojo con esto →</div>{p.advertencia}</div>}
            </div>
            <div style={s.card}>
              <div style={s.eyebrow}>Ángulos únicos</div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:"1.1rem", marginBottom:12 }}>Desde dónde hablas que nadie más puede</div>
              {angulos.map((a,i) => (
                <div key={i} style={s.angBox}>
                  <div style={{ fontWeight:700, marginBottom:3 }}>{a.nombre}</div>
                  <div style={{ fontSize:12, color:"#8C8589", fontStyle:"italic", marginBottom:5 }}>{a.tension}</div>
                  <div style={{ fontSize:12, color:"#6B5A63", borderTop:"1px solid #D4C4CE", paddingTop:5 }}>{a.descripcion}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"#8C8589", margin:"24px 0 10px" }}>Tus series</div>
            <div style={{ fontFamily:"Georgia, serif", fontSize:"1.3rem", marginBottom:16 }}>5 Creative Series para lanzar</div>
            {series.map((serie, i) => {
              const isStar = result.estrella && result.estrella.includes(serie.nombre);
              return (
                <div key={i} style={isStar ? s.cardStar : s.card}>
                  <div style={s.eyebrow}>{isStar ? "⭐ Lanzar primero" : `Serie ${i+1}`}</div>
                  <div style={{ fontFamily:"Georgia, serif", fontSize:"1.1rem", marginBottom:4 }}>{serie.nombre}</div>
                  {serie.subtitulo && <div style={{ fontSize:13, color:"#8C8589", fontStyle:"italic", marginBottom:8 }}>{serie.subtitulo}</div>}
                  <p style={{ fontSize:14, marginBottom:10 }}>{serie.concepto}</p>
                  <div style={{ display:"flex", gap:8, margin:"12px 0", flexWrap:"wrap" }}>
                    {[["Formato",serie.formato],["Frecuencia",serie.frecuencia],["Gancho",serie.gancho]].map(([l,v])=>(
                      <div key={l} style={s.metaChip}><span style={s.metaLabel}>{l}</span>{v}</div>
                    ))}
                  </div>
                  <div style={s.epBox}><span style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:".08em", color:"#4A1535", display:"block", marginBottom:3 }}>Episodio de ejemplo</span>{serie.ejemplo}</div>
                  <div style={s.whyBox}><b>Por qué funciona: </b>{serie.por_que}</div>
                </div>
              );
            })}
            <div style={s.darkCard}>
              <div style={{ fontSize:9, fontWeight:700, letterSpacing:".12em", textTransform:"uppercase", color:"rgba(247,244,241,.45)", marginBottom:10 }}>Próximos pasos</div>
              <div style={{ fontFamily:"Georgia, serif", fontSize:"1.1rem", marginBottom:14 }}>¿Por dónde empezar?</div>
              {pasos.map((paso,i) => (
                <div key={i} style={s.paso}>
                  <div style={s.pasoNum}>{i+1}</div>
                  <div>{paso}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:20, flexWrap:"wrap" }}>
              <button style={s.btnSecondary} onClick={() => downloadPDF(result)}>⬇ Descargar Blueprint</button>
              <button style={{ ...s.btnSecondary, background:"#2D0A1F", color:"#F7F4F1", border:"none" }} onClick={() => sendEmail(result)}>✉ Enviarme por correo</button>
            </div>
            <div style={{ marginTop:32, padding:"20px", background:"#F2EAF0", borderRadius:12, textAlign:"center" }}>
              <div style={{ fontWeight:700, marginBottom:6 }}>¿Quieres ir más profundo?</div>
              <div style={{ fontSize:13, color:"#8C8589", marginBottom:12 }}>Este blueprint es el primer paso. El diagnóstico completo de marca te da la estrategia de posicionamiento completa.</div>
              <a href="https://instagram.com/aninunez.branding" style={{ display:"inline-block", background:"#2D0A1F", color:"#F7F4F1", padding:"11px 24px", borderRadius:40, fontWeight:700, fontSize:13, textDecoration:"none" }}>Conocer el diagnóstico completo →</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let lastBlock = null;
  return (
    <div style={s.wrap}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={s.hero}>
        <div style={s.heroEye}>Creative Series Blueprint</div>
        <h1 style={{ ...s.heroTitle, fontSize:"1.6rem" }}>Cuéntame quién eres</h1>
        <p style={{ ...s.heroSub, fontSize:13 }}>Responde con honestidad. Cuanto más específica seas, más poderoso será tu resultado.</p>
      </div>
      <div style={s.inner}>
        <div style={{ padding:"32px 0" }}>
          {QUESTIONS.map((q,i) => {
            const showDiv = q.block && q.block !== lastBlock;
            if(q.block) lastBlock = q.block;
            return (
              <div key={q.id}>
                {showDiv && <div style={s.divider}><div style={s.divLine}/>{q.block}<div style={s.divLine}/></div>}
                <div style={s.qCard}>
                  <div style={s.qLabel}><span style={s.qNum}>{i+1}</span>{q.label}</div>
                  <div style={s.qHint}>{q.hint}</div>
                  <textarea rows={q.rows} style={s.ta} placeholder={q.placeholder} value={answers[q.id]||""} onChange={e=>set(q.id,e.target.value)}/>
                </div>
              </div>
            );
          })}
          <div style={s.qFooter}>
            <span style={{ fontSize:13, color:"#8C8589" }}>
              <strong style={{ color:"#1C1018" }}>{filled}/12</strong>{" "}
              {filled>=7 ? "preguntas completadas — listo ✓" : "— responde al menos 7 para mejores resultados"}
            </span>
            <button style={s.btnP} onClick={generate}>Generar mi Creative Series →</button>
          </div>
          {error && <div style={s.errBox}>{error}</div>}
        </div>
      </div>
    </div>
  );
}

function downloadPDF(result) {
  const p = result.perfil_marca||{};
  const series = result.series||[];
  const angulos = result.angulos||[];
  const pasos = result.pasos||[];
  const seriesHTML = series.map((s,i)=>{
    const isStar = result.estrella&&result.estrella.includes(s.nombre);
    return `<div class="card${isStar?' star':''}"><div class="ey">${isStar?'⭐ Lanzar primero':'Serie '+(i+1)}</div><h3>${s.nombre}</h3>${s.subtitulo?`<p class="sub">${s.subtitulo}</p>`:''}<p>${s.concepto}</p><div class="meta"><div class="mc"><div class="ml">Formato</div>${s.formato}</div><div class="mc"><div class="ml">Frecuencia</div>${s.frecuencia}</div><div class="mc"><div class="ml">Gancho</div>${s.gancho}</div></div><div class="ep"><div class="ml2">Episodio de ejemplo</div>${s.ejemplo}</div><div class="why"><b>Por qué funciona:</b> ${s.por_que}</div></div>`;}).join('');
  const html=`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:Georgia,serif;color:#1C1018;background:white;padding:36px;font-size:13px;line-height:1.6}h1,h2,h3{margin-bottom:8px}h1{font-size:2rem}h2{font-size:1.35rem}h3{font-size:1.1rem}.hdr{background:#2D0A1F;color:#F7F4F1;padding:28px 32px;border-radius:16px;margin-bottom:24px}.gbadge{background:rgba(255,255,255,.15);color:#EDE5E9;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:4px 12px;border-radius:40px;display:inline-block;margin-bottom:10px}.date{color:rgba(247,244,241,.6);font-size:12px;margin-top:4px}.card{border:1px solid #D4C4CE;border-radius:12px;padding:18px;margin-bottom:12px}.card.star{border:2px solid #4A1535}.ey{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#7B2D52;margin-bottom:8px}.sub{color:#8C8589;font-style:italic;margin-bottom:8px}.tags{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.tag{background:#2D0A1F;color:#F7F4F1;padding:3px 11px;border-radius:40px;font-size:11px;font-weight:600}.tag-s{border:1.5px solid #4A1535;color:#4A1535;padding:3px 11px;border-radius:40px;font-size:11px}.meta{display:flex;gap:8px;margin:10px 0}.mc{flex:1;background:#F2EAF0;border-radius:8px;padding:9px;text-align:center;font-size:12px;font-weight:600}.ml{font-size:9px;font-weight:700;text-transform:uppercase;color:#8C8589;margin-bottom:3px}.ml2{font-size:9px;font-weight:700;text-transform:uppercase;color:#4A1535;margin-bottom:3px}.ep{background:#EDE5E9;border-radius:8px;padding:9px 11px;margin-bottom:10px;font-size:12px}.why{font-size:12px;color:#6B5A63;border-top:1px solid #D4C4CE;padding-top:8px}.dark{background:#2D0A1F;color:#F7F4F1;border-radius:12px;padding:20px;margin-top:8px}.paso{display:flex;gap:10px;align-items:flex-start;margin-bottom:9px;font-size:12px}.pn{width:20px;height:20px;border-radius:50%;background:#C9A0BC;color:#2D0A1F;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0}.ft{margin-top:28px;padding-top:14px;border-top:1px solid #D4C4CE;font-size:11px;color:#8C8589;text-align:center}@media print{body{padding:18px}}</style></head><body><div class="hdr"><div class="gbadge">✓ Creative Series Blueprint</div><h1>${p.esencia||''}</h1><div class="date">Generado el ${new Date().toLocaleDateString('es-ES',{day:'numeric',month:'long',year:'numeric'})}</div></div><div class="card"><div class="ey">Perfil de marca personal</div><h2>${p.esencia||''}</h2><p style="margin-bottom:10px">${p.posicionamiento||''}</p><div class="tags">${(p.tono_dominante||[]).map(t=>`<span class="tag">${t}</span>`).join('')}${(p.tono_secundario||[]).map(t=>`<span class="tag-s">${t}</span>`).join('')}</div>${p.advertencia?`<div style="background:#F2EAF0;border-left:3px solid #4A1535;padding:9px 12px;border-radius:6px;margin-top:10px;font-size:12px">${p.advertencia}</div>`:''}</div><div class="card"><div class="ey">Ángulos únicos</div><h2>Desde dónde hablas que nadie más puede</h2>${angulos.map(a=>`<div style="background:#F2EAF0;border-left:3px solid #4A1535;border-radius:8px;padding:11px 13px;margin-bottom:8px"><b>${a.nombre}</b><div style="font-size:11px;color:#8C8589;font-style:italic;margin:3px 0">${a.tension}</div><div style="font-size:11px;color:#6B5A63">${a.descripcion}</div></div>`).join('')}</div>${seriesHTML}<div class="dark"><div style="font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(247,244,241,.45);margin-bottom:10px">Próximos pasos</div><h3 style="color:#F7F4F1;margin-bottom:12px">¿Por dónde empezar?</h3>${pasos.map((p2,i)=>`<div class="paso"><div class="pn">${i+1}</div><div>${p2}</div></div>`).join('')}</div><div class="ft">Ani Núñez · Personalidad Rentable</div></body></html>`;
  const win=window.open('','_blank');
  win.document.write(html);
  win.document.close();
  win.onload=()=>{win.focus();win.print();};
}

function sendEmail(result) {
  const p=result.perfil_marca||{};
  const series=result.series||[];
  const pasos=result.pasos||[];
  const subject=encodeURIComponent('Tu Creative Series Blueprint — Ani Núñez · Personalidad Rentable');
  const body=encodeURIComponent(`TU CREATIVE SERIES BLUEPRINT\n=============================\n\nESENCIA DE MARCA\n${p.esencia||''}\n\nPOSICIONAMIENTO\n${p.posicionamiento||''}\n\nTONO: ${[...(p.tono_dominante||[]),...(p.tono_secundario||[])].join(', ')}\n\nTUS 5 CREATIVE SERIES\n\n${series.map((s,i)=>`SERIE ${i+1}: ${s.nombre}\n${s.concepto}\nFormato: ${s.formato} | Frecuencia: ${s.frecuencia}\nEpisodio: ${s.ejemplo}\n`).join('\n')}\nPRÓXIMOS PASOS\n${pasos.map((p2,i)=>`${i+1}. ${p2}`).join('\n')}\n\nAni Núñez · Personalidad Rentable`);
  window.location.href=`mailto:?subject=${subject}&body=${body}`;
}
