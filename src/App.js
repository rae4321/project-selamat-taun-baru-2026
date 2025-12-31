import { useState, useCallback } from "react";
import Particles from "react-particles";
import { loadFireworksPreset } from "tsparticles-preset-fireworks";
import { Typewriter } from "react-simple-typewriter";
import Countdown from "react-countdown";

function App() {
  const [newYearMessage, setNewYearMessage] = useState(["Bye 2025👋"]);
  const [isFinished, setIsFinished] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadFireworksPreset(engine);
  }, []);

  const handleComplete = () => {
    setNewYearMessage([
      "Waktunya Tiba!",
      "✨ SELAMAT TAHUN BARU 2026 ✨",
    ]);
    setIsFinished(true);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", backgroundColor: "black" }}>
      {/* 1. Partikel sebagai Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "fireworks",
          fullScreen: {
            enable: true,
            zIndex: 0, // Berada di dasar
          },
        }}
      />

      {/* 2. Konten Teks di Atas (Z-Index Tinggi) */}
      <div style={{
        position: "relative",
        zIndex: 100, // Memastikan teks di atas partikel
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        color: "white",
        textAlign: "center",
        pointerEvents: "none" // Agar klik mouse tembus ke partikel jika perlu
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}>
          <Typewriter
            key={isFinished ? "done" : "waiting"}
            words={newYearMessage}
            loop={isFinished ? 1 : 0}
            cursor
            typeSpeed={70}
            deleteSpeed={50}
          />
        </h1>

        {!isFinished && (
          <div style={{ fontSize: "2.5rem", fontFamily: "monospace", border: "2px solid white", padding: "10px 20px" }}>
            <Countdown
              date={new Date("January 1, 2026 00:00:00")}
              onComplete={handleComplete}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;