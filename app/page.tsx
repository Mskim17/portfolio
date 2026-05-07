"use client";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const skills = [
  { icon: "🖥️", name: "Operating System", tags: ["Windows Server", "Linux Debian", "Ubuntu", "Windows 11"] },
  { icon: "🗄️", name: "Database", tags: ["MS-SQL", "Oracle", "PostgreSQL", "MariaDB", "MySQL", "SQLite"] },
  { icon: "💻", name: "Language", tags: ["Node.js", "Next.js", "JavaScript", "C# / WPF", "React", "Vue", "Java", "Rust"] },
  { icon: "⚙️", name: "Specialty", tags: ["IoT Middleware", "Edge Computing", "Azure", "Vultr", "Vercel", "Socket 통신", "REST API", "SCADA"] },
];

const projects = [
  { num: "01", period: "2011.07 — 2014.12", name: "4대강 SCADA System 구축", desc: "강정고령보 등 16개보 중 4개보 담당. iFix 기반 대규모 산업용 제어시스템 개발. 수자원공사 의뢰.", company: "㈜사이버네이션\n수자원공사", tags: ["VBScript", "Oracle", "Windows Server 2008", "iFix", "HP Server"] },
  { num: "02", period: "2012.01 — 2013.12", name: "한국내화㈜ 공장자동화", desc: "ERP·MES 연동 및 Excel Report 구축. Autobase 기반 SCADA System으로 생산라인 자동화 실현.", company: "㈜사이버네이션\n한국내화㈜", tags: ["VBScript", "C#", "VB Basic", "MS-SQL", "Autobase"] },
  { num: "03", period: "2015.01 — 2016.10", name: "IoT 미들웨어 개발", desc: "비글본 블랙 기반 Sensorcape 교육용 보드 개발. Azure, Thingplus 클라우드 연동 실시간 모니터링.", company: "㈜뉴로메카", tags: ["Node.js", "JavaScript", "PostgreSQL", "SQLite", "Azure", "Linux"] },
  { num: "04", period: "2017.03 — 2019.05", name: "아파트 원패스 시스템 (IOP)", desc: "스마트폰 기반 공동현관 출입·비상벨·주차위치 확인. 엘리베이터·홈넷·스마트폰 연동 서버 개발.", company: "㈜투윈스컴", tags: ["WPF", "Node.js", "PostgreSQL", "Windows 10"] },
  { num: "05", period: "2019.08 — 2020.03", name: "WMS 유지보수 및 연동 개발", desc: "창고관리시스템(WMS) 유지보수 및 외부 시스템 연동 개발.", company: "㈜로지스밸리SLK", tags: ["C#", "MS-SQL", "Windows 10"] },
  { num: "06", period: "2020.04 — 2020.10", name: "양액기·관비기 스마트팜 개발", desc: "농기기 연동 모니터링 및 제어 시스템 개발. 스마트폰 기반 실시간 원격 제어 웹서버 구축.", company: "㈜그린랩스", tags: ["Node.js", "React", "MariaDB", "Windows 10"] },
  { num: "07", period: "2021.01 — 2021.10", name: "방송 코더 개발 (SPOTV)", desc: "토네이도 자막기 Socket 연동. 트랙맨 실시간 데이터 자동 송출 시스템 구축.", company: "SPOTV", tags: ["C#", "MS-SQL", "Socket", "REST API"] },
  { num: "08", period: "2022.04 — 2023.02", name: "장치기기 모니터링 시스템", desc: "Strapi CMS 적용 및 MySQL Stored Procedure 작성. Vue 프론트엔드로 현장 장치 상태 실시간 모니터링.", company: "참슬테크", tags: ["Node.js", "React", "Vue", "MySQL", "Strapi", "Ubuntu"] },
  { num: "09", period: "2023.04 — 2024.01", name: "맨홀 모니터링 시스템", desc: "맨홀악취저감장치 풀스택 개발.", company: "CRT", tags: ["Node.js", "Vue", "MySQL", "Strapi", "Ubuntu"] },
  { num: "10", period: "2024.01 — 2024.12", name: "스마트주차 모니터링 시스템", desc: "아산 삼성주차타워 백엔드 개발.", company: "CRT", tags: ["Node.js", "MySQL", "Strapi", "Ubuntu", "Windows"] },
];

const personalProjects = [
  { icon: "💊", name: "약봉투 글씨 읽어드려요 (EasyYak)", desc: "어르신들이 약봉지 사진을 찍으면 어려운 의학 용어를 쉬운 말로 변환해주는 웹 서비스. Google Vision API 기반 OCR + 맞춤 사전 치환 엔진. 라즈베리파이 홈서버 배포 운영 중.", tags: ["Node.js", "Google Vision API", "Raspberry Pi", "PWA"], link: "http://mskhouse.iptime.org:9918", linkText: "서비스 바로가기 →", accent: "#6c63ff" },
  { icon: "🌡️", name: "홈 IoT 대시보드", desc: "라즈베리파이 기반 온습도 센서 + 외부 날씨 API 연동 대시보드. 주식 크롤링 데이터까지 통합한 개인 홈 모니터링 시스템. 엣지컴퓨팅 기반 무비용 운영.", tags: ["Node.js", "IoT", "Raspberry Pi", "크롤링"], link: "http://mskhouse.iptime.org:3324", linkText: "대시보드 바로가기 →", accent: "#00d4aa" },
  { icon: "🔔", name: "복약 모니터링 시스템 (개발 중)", desc: "EasyYak 확장 기능. 독거노인 복약 완료 시 보호자에게 실시간 알림 전송. Firebase FCM 기반 앱 푸시 알림 개발 중.", tags: ["Firebase FCM", "Node.js", "Web Push", "Flutter"], link: null, linkText: null, accent: "#ff6b6b" },
];

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <main style={{ background: "var(--bg)", color: "var(--text)", fontFamily: "'Pretendard', -apple-system, sans-serif", fontWeight: 300, lineHeight: 1.7, overflowX: "hidden", transition: "background 0.3s, color 0.3s" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--nav-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "serif", fontSize: 20, letterSpacing: "0.05em", color: "var(--text)" }}>
          MSKIM
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* 모바일에서 메뉴 숨김 */}
          <div className="hidden md:flex" style={{ display: "none", gap: 24 }} id="nav-links">
            {["Skills", "Projects", "개인작업", "Contact"].map((item) => (
              <a key={item} href={`#${item === "Skills" ? "skills" : item === "Projects" ? "projects" : item === "개인작업" ? "personal" : "contact"}`}
                style={{ fontSize: 13, letterSpacing: "0.08em", color: "var(--muted)", textDecoration: "none", textTransform: "uppercase" }}>
                {item}
              </a>
            ))}
          </div>
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              style={{ position: "relative", width: 48, height: 26, borderRadius: 999, background: theme === "dark" ? "#6c63ff" : "#ccc", border: "none", cursor: "pointer", transition: "background 0.3s", flexShrink: 0 }}
            >
              <div style={{ position: "absolute", top: 3, left: theme === "dark" ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "white", transition: "left 0.3s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" }} />
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(108,99,255,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(0,212,170,0.08) 0%, transparent 50%)" }} />
        <motion.div initial="hidden" animate="visible" variants={stagger}
          style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", width: "100%" }}>
          <motion.p variants={fadeUp} style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent2)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 24 }}>
            IT Engineer · Full Stack Developer
          </motion.p>
          <motion.h1 variants={fadeUp} style={{ fontFamily: "serif", fontSize: "clamp(56px, 9vw, 110px)", lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: 8, color: "var(--text)" }}>
            김민수
          </motion.h1>
          <motion.p variants={fadeUp} style={{ fontSize: "clamp(18px, 2.5vw, 28px)", color: "var(--muted)", fontWeight: 300, marginBottom: 32 }}>
            IoT · Web Backend · Edge Computing
          </motion.p>
          <motion.p variants={fadeUp} style={{ maxWidth: 520, fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 48 }}>
            산업용 제어시스템부터 IoT 미들웨어, 웹 백엔드까지 —
            현장과 코드 사이에서 10년 이상 쌓아온 실전 경험을 바탕으로
            사회적 가치를 만드는 개발자입니다.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 48, marginBottom: 48, flexWrap: "wrap" }}>
            {[["10+", "Years Experience"], ["10+", "Major Projects"], ["10+", "Tech Stacks"]].map(([num, label]) => (
              <div key={label} style={{ borderLeft: "2px solid var(--accent)", paddingLeft: 16 }}>
                <div style={{ fontFamily: "serif", fontSize: 36, color: "var(--text)", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.05em", marginTop: 4 }}>{label}</div>
              </div>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#projects" style={{ padding: "14px 32px", background: "var(--accent)", color: "white", textDecoration: "none", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace" }}>
              프로젝트 보기
            </a>
            <a href="#contact" style={{ padding: "14px 32px", background: "transparent", color: "var(--text)", textDecoration: "none", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "monospace", border: "1px solid var(--border)" }}>
              연락하기
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "var(--bg2)", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>// 01. Skills</p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(32px,5vw,52px)", marginBottom: 60, color: "var(--text)" }}>기술 <em style={{ fontStyle: "italic", color: "var(--accent2)" }}>스택</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 2 }}>
            {skills.map((g) => (
              <motion.div key={g.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{ background: "var(--card)", padding: 32 }}>
                <div style={{ fontSize: 28, marginBottom: 16 }}>{g.icon}</div>
                <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>{g.name}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {g.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "monospace", fontSize: 12, padding: "4px 10px", background: "var(--tag-bg)", border: "1px solid var(--tag-border)", color: "var(--accent)" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 40px", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>// 02. Experience</p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(32px,5vw,52px)", marginBottom: 60, color: "var(--text)" }}>주요 <em style={{ fontStyle: "italic", color: "var(--accent2)" }}>프로젝트</em></h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {projects.map((p) => (
              <motion.div key={p.num}
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  background: "var(--card)",
                  padding: "24px 20px",
                  display: "grid",
                  gridTemplateColumns: "40px 1fr",  // 모바일 기준 2컬럼
                  gap: 16,
                  alignItems: "start"
                }}
              >
                <div style={{ fontFamily: "serif", fontSize: 28, color: "var(--border)", lineHeight: 1 }}>{p.num}</div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--accent2)", letterSpacing: "0.1em", marginBottom: 6 }}>{p.period}</p>
                  <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)", marginBottom: 8 }}>{p.company.replace("\n", " · ")}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, color: "var(--text)" }}>{p.name}</h3>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8, marginBottom: 14 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {p.tags.map((t) => (
                      <span key={t} style={{ fontFamily: "monospace", fontSize: 11, padding: "3px 8px", background: "var(--project-tag-bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PERSONAL */}
      <section id="personal" style={{ background: "var(--bg2)", padding: "100px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>// 03. Personal Work</p>
          <h2 style={{ fontFamily: "serif", fontSize: "clamp(32px,5vw,52px)", marginBottom: 60, color: "var(--text)" }}>개인 <em style={{ fontStyle: "italic", color: "var(--accent2)" }}>프로젝트</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 2 }}>
            {personalProjects.map((p) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                style={{ background: "var(--card)", padding: 40, position: "relative", borderTop: `2px solid ${p.accent}` }}>
                <div style={{ fontSize: 32, marginBottom: 20 }}>{p.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12, color: "var(--text)" }}>{p.name}</h3>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.8, marginBottom: 20 }}>{p.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontFamily: "monospace", fontSize: 11, padding: "3px 8px", background: "var(--project-tag-bg)", border: "1px solid var(--border)", color: "var(--muted)" }}>{t}</span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer"
                    style={{ fontFamily: "monospace", fontSize: 12, color: "var(--accent)", textDecoration: "none" }}>
                    🔗 {p.linkText}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 40px", background: "var(--bg)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>// 04. Contact</p>
          <div style={{ fontFamily: "serif", fontSize: "clamp(40px,6vw,72px)", lineHeight: 1.05, marginBottom: 16, color: "var(--text)" }}>
            함께<br /><em style={{ fontStyle: "italic", color: "var(--accent)" }}>만들어요</em>
          </div>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, marginBottom: 48 }}>
            산업 현장부터 사회적 가치까지 —<br />
            기술로 세상을 조금 더 나은 곳으로<br />
            만들고 싶은 분과 함께하고 싶습니다.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 60, alignItems: "start" }}>

            {/* 링크 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { icon: "💊", label: "EasyYak 서비스", sub: "mskhouse.iptime.org:9918", href: "http://mskhouse.iptime.org:9918" },
                { icon: "🌡️", label: "홈 IoT 대시보드", sub: "mskhouse.iptime.org:3324", href: "http://mskhouse.iptime.org:3324" },
                { icon: "🐙", label: "GitHub", sub: "github.com/Mskim17", href: "https://github.com/Mskim17" },
              ].map((c) => (
                <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 20px", background: "var(--card)", border: "1px solid var(--border)", textDecoration: "none", transition: "border-color 0.2s" }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontSize: 14, color: "var(--text)" }}>{c.label}</div>
                    <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--muted)" }}>{c.sub}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* 문의 폼 */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "32px 40px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "monospace", fontSize: 11, color: "var(--muted)" }}>
        <span>© 2026 김민수 · IT Engineer</span>
      </footer>

    </main>
  );

  function ContactForm() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async () => {
      if (!form.name || !form.email || !form.message) {
        setStatus("error");
        return;
      }
      setStatus("loading");
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setStatus("success");
          setForm({ name: "", email: "", message: "" });
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    const inputStyle = {
      width: "100%",
      padding: "12px 16px",
      background: "var(--card)",
      border: "1px solid var(--border)",
      color: "var(--text)",
      fontSize: 14,
      fontFamily: "'Pretendard', sans-serif",
      outline: "none",
      marginBottom: 12,
    };

    return (
      <div>
        <input
          placeholder="이름"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={inputStyle}
        />
        <input
          placeholder="이메일"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={inputStyle}
        />
        <textarea
          placeholder="문의 내용을 입력해주세요."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={5}
          style={{ ...inputStyle, resize: "vertical", marginBottom: 16 }}
        />
        <button
          onClick={handleSubmit}
          disabled={status === "loading"}
          style={{
            width: "100%",
            padding: "14px",
            background: status === "loading" ? "var(--muted)" : "var(--accent)",
            color: "white",
            border: "none",
            fontSize: 13,
            fontFamily: "monospace",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {status === "loading" ? "전송 중..." : "문의 보내기"}
        </button>

        {status === "success" && (
          <p style={{ marginTop: 12, fontSize: 14, color: "var(--accent2)" }}>
            ✅ 문의가 전송됐어요. 빠르게 답변 드릴게요!
          </p>
        )}
        {status === "error" && (
          <p style={{ marginTop: 12, fontSize: 14, color: "#ff6b6b" }}>
            ❌ 모든 항목을 입력해주세요.
          </p>
        )}
      </div>
    );
  }
}