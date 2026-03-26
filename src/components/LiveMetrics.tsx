import { useEffect } from 'react';
import * as services from '../store/useLiveMetrics';

export default function LiveMetrics() {
  const cpu = services.useCpu();
  const memory = services.useMemory();
  const activeSession = services.useActiveSessions();
  const live = services.useLive();

  useEffect(() => {
    if (live) {
      const interval = setInterval(services.updateMetrics, 5000);
      return () => clearInterval(interval);
    }
  }, [live]);

  function setProgressClass(value: number) {
    const success = 'bg-green-500';
    const warning = 'bg-yellow-500';
    const danger = 'bg-red-500';

    if (value < 60) {
      return `h-4 rounded transition-all duration-500 ${success}`;
    }
    if (value < 80) {
      return `h-4 rounded transition-all duration-500 ${warning}`;
    }

    return `h-4 rounded transition-all duration-500 ${danger}`;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 h-full">
      <h2 className="text-lg font-bold mb-2">Live Metrics</h2>

      <div className="mb-2">
        <p>CPU: {cpu}%</p>
        <div className="w-full h-4 bg-gray-700 rounded">
          <div
            className={setProgressClass(cpu)}
            style={{ width: `${cpu}%` }}
          />
        </div>
      </div>

      <div className="mb-2">
        <p>Memory: {memory}%</p>
        <div className="w-full h-4 bg-gray-700 rounded">
          <div
            className={setProgressClass(memory)}
            style={{ width: `${memory}%` }}
          />
        </div>
      </div>

      <div className="mb-2">
        <p>Active Sessions: {activeSession}</p>
        <div className="w-full h-4 bg-gray-700 rounded">
          <div
            className={setProgressClass(activeSession)}
            style={{ width: `${activeSession}%` }}
          />
        </div>
      </div>

      <button
        onClick={services.toggleLive}
        className={`px-3 py-1 rounded mt-2 cursor-pointer ${live ? 'bg-blue-800/70 hover:bg-blue-800/100' : 'bg-gray-600/70 hover:bg-gray-600/100'}`}
      >
        {live ? 'Pause' : 'Live'}
      </button>
    </div>
  );
}
