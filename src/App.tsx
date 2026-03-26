import LiveMetrics from './components/LiveMetrics';
import CacheInspector from './components/CacheInspector';
import RequestLog from './components/RequestLog';
import SessionToken from './components/SessionToken';

export default function App() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-6 grid gap-6 grid-cols-2">
      <div className="col-span-2 max-h-[300px]">
        <SessionToken />
      </div>
      <div className="col-span-2 md:col-span-1 max-h-[300px]">
        <LiveMetrics />
      </div>
      <div className="col-span-2 md:col-span-1 max-h-[300px]">
        <CacheInspector />
      </div>
      <div className="col-span-2">
        <RequestLog />
      </div>
    </div>
  );
}
