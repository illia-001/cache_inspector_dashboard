import { useEffect } from 'react';
import * as services from '../store/useRequestLog';
import type { Filters } from '../types/Filters';

export default function RequestLog() {
  const log = services.useLog();
  const filter = services.useFilter();

  useEffect(() => {
    const interval = setInterval(async () => {
      const start = Date.now();
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users',
        );

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const delay = Date.now() - start;
        services.addRequest('success', delay);
      } catch {
        const delay = Date.now() - start;
        services.addRequest('error', delay);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSetFilter = (filter: Filters) => {
    services.setFilter(filter);
  };

  const filteredLog =
    filter === 'all' ? log : log.filter((entry) => entry.status === filter);

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 min-h-[350px]">
      <h2 className="text-lg font-bold mb-2">Request Log</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleSetFilter('all')}
          className={`
            px-3
            py-1
            rounded
            cursor-pointer
            transition-colors
            duration-200
            ${
              filter === 'all' ?
                'bg-blue-800/60 hover:bg-blue-800/100'
              : 'bg-gray-700/60 hover:bg-gray-700/100'
            }
          `}
        >
          All
        </button>
        <button
          onClick={() => handleSetFilter('success')}
          className={`
            px-3
            py-1
            rounded
            cursor-pointer
            transition-colors
            duration-200
            ${
              filter === 'success' ?
                'bg-green-800/60 hover:bg-green-800/100'
              : 'bg-gray-700/60 hover:bg-gray-700/100'
            }
          `}
        >
          Success
        </button>
        <button
          onClick={() => handleSetFilter('error')}
          className={`
            px-3
            py-1
            rounded
            cursor-pointer
            transition-colors
            duration-200
            ${
              filter === 'error' ?
                'bg-red-800/60 hover:bg-red-800/100'
              : 'bg-gray-700/60 hover:bg-gray-700/100'
            }
          `}
        >
          Error
        </button>
      </div>

      <table className="w-full text-sm table-fixed">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left">Time</th>
            <th className="text-left">Status</th>
            <th className="text-left">Delay (ms)</th>
          </tr>
        </thead>
        <tbody>
          {filteredLog.map((entry, idx) => (
            <tr
              key={idx}
              className="border-b border-gray-700"
            >
              <td>{new Date(entry.time).toLocaleTimeString()}</td>
              <td
                className={
                  entry.status === 'success' ? 'text-green-400' : 'text-red-400'
                }
              >
                {entry.status}
              </td>
              <td>{entry.delay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
