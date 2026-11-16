import type { Dictionary } from "@/content/dictionaries";

type Mock = Dictionary["mock"];

function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div className="phone__status" aria-hidden="true" style={dark ? { color: "rgba(255,255,255,.72)" } : undefined}>
      <span>9:41</span>
      <span className="phone__status-dots">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

export function PhoneExam({ mock }: { mock: Mock }) {
  const m = mock.exam;
  return (
    <div className="phone" role="img" aria-label={m.app}>
      <div className="phone__screen">
        <StatusBar />
        <div className="pm-row">
          <span className="pm-label">{m.app}</span>
          <span className="pm-timer">{m.timer}</span>
        </div>
        <div className="pm-track">
          <i style={{ width: "40%" }} />
        </div>
        <div className="pm-card">
          <div className="pm-counter">
            {m.counter}
            <span> {m.total}</span>
          </div>
          <p className="pm-question">{m.question}</p>
          <div className="pm-options">
            {m.options.map((option, index) => (
              <div
                key={option}
                className={`pm-option ${index === m.selected ? "is-selected" : ""}`}
              >
                <span className="pm-option__letter">{"ABCD"[index]}</span>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="pm-dock">
          <span>{m.prev}</span>
          <span className="is-primary">{m.next}</span>
        </div>
      </div>
    </div>
  );
}

export function PhoneResult({ mock }: { mock: Mock }) {
  const m = mock.result;
  return (
    <div className="phone" role="img" aria-label={m.app}>
      <div className="phone__screen">
        <StatusBar />
        <div className="pm-row">
          <span className="pm-label">{m.app}</span>
        </div>
        <div className="pm-card">
          <div className="pm-score">
            <b>{m.value}</b> <small>{m.max}</small>
            <p>{m.caption}</p>
          </div>
        </div>
        <div className="pm-card">
          <div className="pm-bars">
            {m.subjects.map((subject) => (
              <div key={subject.name}>
                <div className="pm-bar__top">
                  <span>{subject.name}</span>
                  <b>{subject.value}%</b>
                </div>
                <div className="pm-track">
                  <i style={{ width: `${subject.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pm-dock">
          <span className="is-primary">{m.cta}</span>
        </div>
      </div>
    </div>
  );
}

export function PhoneSmart({ mock }: { mock: Mock }) {
  const m = mock.smart;
  return (
    <div className="phone" role="img" aria-label={m.app}>
      <div className="phone__screen">
        <StatusBar />
        <div className="pm-row">
          <span className="pm-label">{m.app}</span>
        </div>
        <div className="pm-stats">
          <div className="pm-stat">
            <span>{m.xpLabel}</span>
            <b>{m.xp}</b>
          </div>
          <div className="pm-stat">
            <span>{m.streakLabel}</span>
            <b>{m.streak} 🔥</b>
          </div>
        </div>
        <div className="pm-card">
          <div className="pm-row">
            <span className="pm-label">{m.planTitle}</span>
          </div>
          <p className="pm-question" style={{ marginTop: 4 }}>
            <b>{m.planValue}</b>
          </p>
          <div className="pm-track" style={{ marginTop: 6 }}>
            <i style={{ width: `${m.planPct}%` }} />
          </div>
        </div>
        <div className="pm-card">
          <div className="pm-row">
            <span className="pm-label">{m.weakTitle}</span>
          </div>
          <div className="pm-bars" style={{ marginTop: 8 }}>
            {m.weak.map((topic) => (
              <div key={topic.name}>
                <div className="pm-bar__top">
                  <span>{topic.name}</span>
                  <b>{topic.pct}%</b>
                </div>
                <div className="pm-track">
                  <i style={{ width: `${topic.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
