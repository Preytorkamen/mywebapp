import { useEffect, useRef, useState } from "react";
import "./App.css";

/**
 * Meditation App (one-page)
 * - Presets: 1, 5, 10 minutes
 * - Start / Pause / Reset
 * - Breathing cue (4s inhale / 4s exhale)
 */
export default function App() {
  // Time Presets
  const PRESETS = [5, 10, 15];

  // States
  const [isRunning, setIsRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5 * 60);
  const [phase, setPhase] = useState("Inhale"); 

  // Refs
  const breathTimerRef = useRef(null);  // Interval for switching breathing phases
  const tickRef = useRef(null); // Interval for ticking down seconds


  // countdown tick
  useEffect(() => {
    if (!isRunning) {
      clearInterval(tickRef.current);
      return;
    }

    tickRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(tickRef.current);
          clearInterval(breathTimerRef.current);
          setIsRunning(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(tickRef.current);
  }, [isRunning]);
 
  // breathing cue (swap text every 4s while running)
  useEffect(() => {
    if (!isRunning) {
      clearInterval(breathTimerRef.current);
      return;
    }

    breathTimerRef.current = setInterval(() => {
      setPhase((p) => (p === "Inhale" ? "Exhale" : "Inhale"));
    }, 4000);
    return () => clearInterval(breathTimerRef.current);
  }, [isRunning]);

  // Helper
  const setMinutes = (m) => {
    setIsRunning(false);
    setSecondsLeft(m * 60);
    setPhase("Inhale");
  };

  const toggleRun = () => setIsRunning((r) => !r);

  const reset = () => {
    setIsRunning(false);
    setSecondsLeft(5 * 60);
    setPhase("Inhale");
  };

  // Formatter
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");
 
  return (
    <main className="wrap">
      <section className="card" role="region" aria-label="Meditation timer">
        <header className="header">
          <h1 aria-label="App name">Stillness</h1>
          <button
            className="ghost"
            onClick={() => document.body.classList.toggle("dark")}
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            🌙
          </button>
        </header>
        <div
          className={`breath ${isRunning ? "anim" : "paused"}`}
          aria-hidden="true"
        
        >
          <div className="orb" />
        </div>
        <p className="phase" aria-live="polite">
          {phase}
        </p>

        <div className="clock" role="timer" aria-live="polite" aria-atomic="true">
          {mm}:{ss}
        </div>

        <div className="controls">
          <button className="primary" onClick={toggleRun}>
            {isRunning ? "Pause" : "Start"}
          </button>
          <button className="outline" onClick={reset}>Reset</button>
        </div>

        <div className="presets" aria-label="Session length presets">
          {PRESETS.map((m) => (
            <button
              key={m}
              className={`chip ${secondsLeft === m * 60 ? "active" : ""}`}
              onClick={() => setMinutes(m)}
              aria-pressed={secondsLeft === m * 60}
              title={`${m} minute${m > 1 ? "s" : ""}`}
            >
              {m}m
            </button>
          ))}
        </div>

        <footer className="tip">
          Tip: Breathe in for 4s, out for 4. The orb guides the pace.
        </footer>
      </section>
    </main>
  );
}