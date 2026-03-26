import { clearCache, refreshCache, useItems } from '../store/useCacheInspector';
import { clearToken } from '../store/useSessionToken';
import { LocalStorageKeys } from '../types/LocalStorageKeys';

export default function CacheInspector() {
  const items = useItems();

  function handleClearCache() {
    clearCache();
    clearToken();
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 h-full overflow-auto">
      <h2 className="text-lg font-bold mb-2">Cache Inspector</h2>

      <div className="flex gap-2 mb-4">
        <button
          onClick={refreshCache}
          className="
            bg-blue-800/70
            px-3
            py-1
            rounded
            cursor-pointer
            hover:bg-blue-800/100
            transition-colors
            duration-200
          "
        >
          Refresh
        </button>
        <button
          onClick={handleClearCache}
          className="
            bg-red-800/70
            px-3
            py-1
            box-border
            rounded
            cursor-pointer
            hover:bg-red-800/100
            disabled:bg-gray-600
            disabled:cursor-default 
            transition-colors 
            duration-200 
          "
          disabled={items.length === 0}
        >
          Clear Cache
        </button>
      </div>

      <div className="max-h-[150px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-800 ">
            <tr className="border-b border-gray-700">
              <th className="text-left py-1">Key</th>
              <th className="text-left py-1">Value</th>
              <th className="text-left py-1">Created At</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.key}
                className={
                  item.key === LocalStorageKeys.Token ?
                    'bg-green-700'
                  : 'border-b border-gray-700'
                }
              >
                <td className="px-2">{item.key}</td>
                <td
                  className="truncate max-w-[200px] px-2"
                  title={item.value ? item.value : ''}
                >
                  {item.value}
                </td>
                <td>
                  {item.createdAt ?
                    new Date(item.createdAt).toLocaleString()
                  : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
