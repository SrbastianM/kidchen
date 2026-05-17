import './App.css';
import EyesCanvas from './components/EyesCanvas';
import Countdown from './components/Countdown';

export default function App() {
  return (
    <div className="app">
      {/* Animated gradient background */}
      <div className="bg-gradient" />

      {/* Psychedelic eyes */}
      <EyesCanvas />

      {/* Glow ring behind countdown */}
      <div className="glow-ring" />

      {/* Countdown */}
      <Countdown />

      {/* Noise texture overlay */}
      <div className="noise" />
    </div>
  );
}
