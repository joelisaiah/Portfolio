import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Education from './pages/Education';
import Interests from './pages/Interests';
import { incrementVisitor } from './api';
import './App.css';

export default function App() {
  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);

  // Increment visitor count once on first load
  useEffect(() => {
    incrementVisitor();
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioEnabled) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioEnabled(!audioEnabled);
    }
  };

  return (
    <BrowserRouter>
      {/* Background video */}
      <video
        autoPlay muted loop playsInline
        className="bg-video"
        src="/bg-video.mp4"   // place your video in public/
      />
      <div className="overlay" />

      {/* Background ambient music */}
      <audio ref={audioRef} loop src="/ambient.mp3" />  {/* place in public/ */}

      <Navbar audioEnabled={audioEnabled} toggleAudio={toggleAudio} />

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/education" element={<Education />} />
          <Route path="/interests" element={<Interests />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}