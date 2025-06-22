
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 inline-block shadow-lg">
      <div className="flex items-center justify-center gap-3 text-white">
        <Clock className="w-6 h-6 text-blue-300" />
        <div className="text-center">
          <div className="text-2xl font-bold font-mono">
            {formatTime(currentTime)}
          </div>
          <div className="text-sm text-white/80">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveClock;
