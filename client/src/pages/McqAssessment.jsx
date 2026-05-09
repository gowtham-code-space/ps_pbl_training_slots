    // MCQAssessment.jsx
    // Extracted from Points & Training Script (index_working.html)
    // Course: CyberSecurity — Level 1 (PS Course ID: 19)
    // Questions taken directly from ASSESSMENT_QUESTIONS['ps_19']

    import { useState, useEffect, useRef, useCallback } from "react";

    // ── Questions extracted directly from index_working.html ps_19 ──
    const QUESTIONS_RAW = [
    {q:'What does Nmap do?',o:['Edit network packets','Scan networks for open ports and services','Block malicious traffic','Encrypt communications'],a:1},
    {q:'What is a port scan?',o:['Physical inspection of server','Checking which network ports are open on a target','Scanning USB devices','Testing internet speed'],a:1},
    {q:'What does Wireshark do?',o:['Hack networks','Capture and analyse network packets','Scan for vulnerabilities','Create firewalls'],a:1},
    {q:'What is network enumeration?',o:['Counting network devices','Gathering detailed information about network resources and topology','Setting up network','Deleting network logs'],a:1},
    {q:'What is a vulnerability in cybersecurity?',o:['A strong security feature','A weakness that can be exploited by attackers','A type of firewall','An encryption method'],a:1},
    {q:'What is a DoS attack?',o:['Stealing user data','Overwhelming target with traffic to make service unavailable','Phishing attack','Password attack'],a:1},
    {q:'What is phishing?',o:['Fishing technique','Social engineering attack via fake emails to steal credentials','Network scanning','SQL injection'],a:1},
    {q:'What does HTTPS ensure?',o:['Faster website loading','Encrypted and secure communication between browser and server','Higher bandwidth','Free hosting'],a:1},
    {q:'What is a brute force attack?',o:['Physical damage to hardware','Trying all possible passwords until correct one is found','SQL injection attack','Phishing email'],a:1},
    {q:'What does CIA triad stand for?',o:['Central Intelligence Agency','Confidentiality Integrity Availability','Computer Infrastructure Analysis','Code Injection Assessment'],a:1},
    {q:'What is social engineering?',o:['Engineering social media apps','Manipulating people to reveal confidential information','Software design methodology','Network engineering'],a:1},
    {q:'Default Nmap scan type?',o:['UDP scan','SYN scan half-open','Full TCP scan','ICMP scan'],a:1},
    {q:'What is an open port?',o:['Unlocked physical door','Port accepting connections on a network service','Firewall exception only','Hardware port'],a:1},
    {q:'What is encryption?',o:['Deleting files securely','Converting data into unreadable format using algorithm/key','Backing up data','Compressing files'],a:1},
    {q:'What is a zero-day vulnerability?',o:['Old known vulnerability','Unknown vulnerability with no patch available yet','Vulnerability found 0 days ago','Test vulnerability'],a:1},
    {q:'What does a firewall do?',o:['Increase speed','Monitor and control incoming/outgoing network traffic based on rules','Store passwords','Create backups'],a:1},
    {q:'What is a MAC address?',o:['Apple computer address','Unique hardware identifier for network interface card','Memory access code','Main application controller'],a:1},
    {q:'Purpose of a VPN?',o:['Increase internet speed','Create encrypted tunnel for secure communication over public network','Block all websites','Replace firewall'],a:1},
    {q:'What is network traffic analysis?',o:['Internet speed test','Examining network packets to detect anomalies or attacks','Counting network devices','Setting bandwidth limits'],a:1},
    {q:'What is ethical hacking?',o:['Illegal hacking','Authorised testing of systems to find security vulnerabilities','Hacking for money','Social media hacking'],a:1},
    ];

    const COURSE_NAME = "CyberSecurity — Level 1";
    const PASS_MARK   = 14; // 70% of 20
    const TIMER_SEC   = 45;

    // ── shuffle (same logic as index_working.html shuffleArr) ──────
    function shuffleArr(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
    }

    function prepareQuestions() {
    return shuffleArr(QUESTIONS_RAW).slice(0, 20).map(q => {
    const idx = shuffleArr([0, 1, 2, 3]);
    return { q: q.q, options: idx.map(i => q.o[i]), answer: idx.indexOf(q.a) };
    });
    }

    // ── Icons ─────────────────────────────────────────────────────
    const IcoMCQ  = () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/></svg>;
    const IcoGuide= () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
    const IcoScore= () => <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;

    // ── Sidebar ───────────────────────────────────────────────────
    const P = "#6c47ff";
    function Sidebar({ active, setActive }) {
    const items = [
    { id: "test",  icon: <IcoMCQ />,   label: "MCQ Test" },
    { id: "guide", icon: <IcoGuide />, label: "Guide"    },
    { id: "score", icon: <IcoScore />, label: "Score"    },
    ];
    return (
    <div style={{ width: 52, background: "#1a1040", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, gap: 4, flexShrink: 0 }}>
        <div style={{ width: 30, height: 30, borderRadius: 8, background: P, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, fontWeight: 900, color: "#fff", fontSize: 15 }}>B</div>
        {items.map(it => (
        <button key={it.id} title={it.label} onClick={() => setActive(it.id)}
            style={{ width: 40, height: 40, borderRadius: 8, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: active === it.id ? "rgba(108,71,255,0.25)" : "transparent", color: active === it.id ? "#c4b5fd" : "#6b7280", transition: "all .18s" }}>
            {it.icon}
        </button>
        ))}
    </div>
    );
    }

    // ── Timer ring (extracted from assess-timer logic) ────────────
    function TimerRing({ val }) {
    const r = 18, c = 2 * Math.PI * r;
    const color = val <= 10 ? "#ef4444" : val <= 20 ? "#f59e0b" : P;
    return (
    <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
        <svg width="52" height="52" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="26" cy="26" r={r} fill="none" stroke="rgba(108,71,255,.15)" strokeWidth="3"/>
        <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="3"
            strokeDasharray={c} strokeDashoffset={c * (1 - val / TIMER_SEC)} strokeLinecap="round"
            style={{ transition: "stroke-dashoffset .9s linear, stroke .5s" }}/>
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, color, fontFamily: "monospace" }}>{val}</div>
    </div>
    );
    }

    // ── Warning popup (extracted from assess-warning-popup logic) ──
    function WarningPopup({ count, onDismiss }) {
    return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
        <div style={{ background: "#fff", border: "2px solid #ef4444", borderRadius: 18, padding: "32px 28px", maxWidth: 380, width: "100%", textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#ef4444", marginBottom: 10 }}>
            Warning {count} of 2{count === 2 ? " — Final Warning" : ""}
        </div>
        <div style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6, marginBottom: 22 }}>
            {count === 1
            ? "You left the assessment window! This is your first warning. One more violation will auto-submit your test immediately."
            : "This is your FINAL warning! If you leave the assessment again your test will be submitted automatically with current answers."}
        </div>
        <button onClick={onDismiss}
            style={{ padding: "12px 28px", background: P, border: "none", borderRadius: 10, color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>
            I Understand — Continue
        </button>
        </div>
    </div>
    );
    }

    // ── Main Component ─────────────────────────────────────────────
    export default function MCQAssessment() {
    const [sideActive, setSideActive] = useState("test");
    const [phase,      setPhase]      = useState("intro");  // intro | running | done
    const [questions,  setQuestions]  = useState([]);
    const [current,    setCurrent]    = useState(0);
    const [selected,   setSelected]   = useState(null);
    const [score,      setScore]      = useState(0);
    const [timer,      setTimer]      = useState(TIMER_SEC);
    const [warnings,   setWarnings]   = useState(0);
    const [showWarn,   setShowWarn]   = useState(false);
    const [autoSubmit, setAutoSubmit] = useState(false);
    const timerRef = useRef(null);

    // ── Timer per question (same logic as startQTimer in script) ──
    useEffect(() => {
    if (phase !== "running") return;
    clearInterval(timerRef.current);
    setTimer(TIMER_SEC);
    timerRef.current = setInterval(() => {
        setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); goNext(true); return 0; }
        return t - 1;
        });
    }, 1000);
    return () => clearInterval(timerRef.current);
    }, [current, phase]);

    // ── Anti-cheat (same logic as handleVis in script) ────────────
    useEffect(() => {
    if (phase !== "running") return;
    const onVis = () => {
        if (document.hidden) {
        clearInterval(timerRef.current);
        setWarnings(w => {
            const nw = w + 1;
            if (nw >= 3) { doAutoSubmit(); return nw; }
            setShowWarn(true);
            return nw;
        });
        }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
    }, [phase]);

    const startTest = () => {
    setQuestions(prepareQuestions());
    setCurrent(0); setSelected(null); setScore(0);
    setWarnings(0); setAutoSubmit(false);
    setPhase("running");
    document.documentElement.requestFullscreen?.().catch(() => {});
    };

    const goNext = useCallback((skip = false) => {
    clearInterval(timerRef.current);
    const correct = !skip && selected === questions[current]?.answer;
    const newScore = score + (correct ? 1 : 0);
    if (current + 1 >= questions.length) {
        setScore(newScore);
        setPhase("done");
        document.exitFullscreen?.().catch(() => {});
    } else {
        setScore(newScore);
        setCurrent(c => c + 1);
        setSelected(null);
    }
    }, [current, selected, questions, score]);

    const doAutoSubmit = () => {
    clearInterval(timerRef.current);
    setAutoSubmit(true);
    setPhase("done");
    document.exitFullscreen?.().catch(() => {});
    };

    const dismissWarn = () => {
    setShowWarn(false);
    document.documentElement.requestFullscreen?.().catch(() => {});
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
        setTimer(t => {
        if (t <= 1) { clearInterval(timerRef.current); goNext(true); return 0; }
        return t - 1;
        });
    }, 1000);
    };

    const q = questions[current];
    const prog = questions.length ? (current / questions.length) * 100 : 0;

    return (
    <div style={{ display: "flex", height: "100vh", background: "#f4f3ff", fontFamily: "'Segoe UI',system-ui,sans-serif", overflow: "hidden" }}>
        <Sidebar active={sideActive} setActive={setSideActive} />
        {showWarn && <WarningPopup count={warnings} onDismiss={dismissWarn} />}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* ── INTRO ── */}
        {phase === "intro" && (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "48px 52px", maxWidth: 480, width: "100%", boxShadow: "0 8px 40px rgba(108,71,255,.12)", textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: "rgba(108,71,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 28 }}>🔐</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", marginBottom: 8 }}>{COURSE_NAME}</div>
                <div style={{ fontSize: 13, color: "#6b7280", marginBottom: 28, lineHeight: 1.6 }}>
                20 questions • {TIMER_SEC} seconds per question • Fullscreen locked • Pass: {PASS_MARK}/20
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                {[["20","Questions"],["45s","Per Question"],["14/20","Pass Mark"],["2","Max Warnings"]].map(([v,l]) => (
                    <div key={l} style={{ background: "#f4f3ff", borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: P }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{l}</div>
                    </div>
                ))}
                </div>
                <div style={{ background: "rgba(239,68,68,.06)", border: "1px solid rgba(239,68,68,.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 28, fontSize: 12, color: "#dc2626", lineHeight: 1.6, textAlign: "left" }}>
                <strong>Anti-cheat active:</strong> Switching tabs counts as a violation. 2 violations = auto-submit.
                </div>
                <button onClick={startTest}
                style={{ width: "100%", padding: 15, background: P, border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 20px rgba(108,71,255,.35)", fontFamily: "inherit" }}>
                Start Assessment
                </button>
            </div>
            </div>
        )}

        {/* ── RUNNING ── */}
        {phase === "running" && q && (
            <>
            {/* Header */}
            <div style={{ padding: "16px 28px", background: "#fff", borderBottom: "1px solid #e5e4eb", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
                <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1a2e" }}>{COURSE_NAME}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>Question {current + 1} of {questions.length}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {warnings > 0 && (
                    <div style={{ background: "rgba(239,68,68,.1)", border: "1px solid rgba(239,68,68,.3)", borderRadius: 8, padding: "4px 12px", fontSize: 11, fontWeight: 700, color: "#dc2626" }}>
                    Warning {warnings}/2
                    </div>
                )}
                <TimerRing val={timer} />
                </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 4, background: "#e5e4eb", flexShrink: 0 }}>
                <div style={{ height: "100%", width: prog + "%", background: P, transition: "width .4s" }} />
            </div>

            {/* Question */}
            <div style={{ flex: 1, padding: "28px 5vw", display: "flex", flexDirection: "column", overflow: "auto" }}>
                <div style={{ background: "#fff", border: "1.5px solid rgba(108,71,255,.2)", borderRadius: 18, padding: "28px 32px", marginBottom: 16, boxShadow: "0 2px 12px rgba(108,71,255,.07)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1a2e", lineHeight: 1.6, marginBottom: 24 }}>{q.q}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {q.options.map((opt, i) => {
                    const sel = selected === i;
                    return (
                        <div key={i} onClick={() => setSelected(i)}
                        style={{ display: "flex", alignItems: "center", gap: 14, padding: "15px 20px", borderRadius: 12, border: `1.5px solid ${sel ? P : "#e5e4eb"}`, background: sel ? "rgba(108,71,255,.06)" : "#fafafa", cursor: "pointer", transition: "all .18s", userSelect: "none" }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${sel ? P : "#d1d5db"}`, background: sel ? P : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .18s" }}>
                            {sel && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />}
                        </div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: sel ? "#1a1a2e" : "#374151" }}>{opt}</div>
                        </div>
                    );
                    })}
                </div>
                </div>
                <button onClick={() => goNext(false)} disabled={selected === null}
                style={{ width: "100%", padding: 18, background: selected === null ? "rgba(108,71,255,.3)" : P, border: "none", borderRadius: 14, color: "#fff", fontSize: 16, fontWeight: 800, cursor: selected === null ? "not-allowed" : "pointer", boxShadow: selected === null ? "none" : "0 4px 20px rgba(108,71,255,.35)", transition: "all .2s", fontFamily: "inherit" }}>
                {current === questions.length - 1 ? "Submit Assessment" : "Next Question →"}
                </button>
            </div>
            </>
        )}

        {/* ── DONE ── */}
        {phase === "done" && (
            <>
            <div style={{ padding: "16px 28px", background: "#fff", borderBottom: "1px solid #e5e4eb", flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 1, textTransform: "uppercase" }}>Assessment Complete</div>
                <div style={{ height: 4, background: P, borderRadius: 10, marginTop: 8 }} />
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, gap: 20 }}>
                <div style={{ width: 130, height: 130, borderRadius: "50%", border: `4px solid ${P}`, background: "rgba(108,71,255,.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: P }}>{score}</div>
                <div style={{ fontSize: 13, color: "#6b7280", fontWeight: 600 }}>/ 20</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#6b7280" }}>
                Score: {Math.round((score / 20) * 100)}% &nbsp;|&nbsp; Pass mark: 70%
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e" }}>
                Assessment {autoSubmit ? "Submitted" : "Complete"}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", maxWidth: 340, textAlign: "center", lineHeight: 1.6 }}>
                {autoSubmit
                    ? `Your test was submitted. You answered ${score} out of 20 questions correctly.`
                    : `You answered ${score} out of 20 questions correctly. Pass mark is ${PASS_MARK}/20.`}
                </div>
                <button onClick={() => { setPhase("intro"); setSideActive("test"); }}
                style={{ padding: "14px 48px", background: P, border: "none", borderRadius: 12, color: "#fff", fontSize: 15, fontWeight: 800, cursor: "pointer", marginTop: 8, boxShadow: "0 4px 20px rgba(108,71,255,.35)", fontFamily: "inherit" }}>
                Done
                </button>
            </div>
            </>
        )}
        </div>
    </div>
    );
    }