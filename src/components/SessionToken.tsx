import * as services from '../store/useSessionToken';
import { TOKEN_TTL_MS } from '../utils/constants';
import { useEffect, useState } from 'react';

export default function SessionToken() {
  const [ageSeconds, setAgeSeconds] = useState(0);
  const token = services.useToken();
  const createdAt = services.useCreatedAt();

  useEffect(() => {
    if (!token) {
      services.generateToken();
    }
  }, [token]);

  useEffect(() => {
    if (!createdAt) return;

    const interval = setInterval(() => {
      const ageMs = Date.now() - createdAt;
      setAgeSeconds(Math.floor(ageMs / 1000));

      if (ageMs >= TOKEN_TTL_MS) {
        services.generateToken();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [createdAt]);

  return (
    <div
      className="flex
        flex-col
        bg-gray-800
        rounded-lg
        shadow-md
        p-4
        gap-y-2
      "
    >
      <h2 className="text-lg font-bold mb-2">Session Token</h2>
      <p
        className=" truncate"
        title={token ? token : ''}
      >
        <strong>Token: </strong>
        {token}
      </p>
      <p>
        <strong>Created At: </strong>
        {createdAt ? new Date(createdAt).toLocaleString() : '—'}
      </p>
      <p>
        <strong>Age: </strong>
        {ageSeconds} seconds
      </p>
      <button
        onClick={services.clearToken}
        className="
          max-w-full
          md:w-[150px]
          bg-red-800/70
          px-4
          py-1
          rounded
          cursor-pointer
          hover:bg-red-800/100
          transition-colors
          duration-200
        "
      >
        Clear Cache
      </button>
    </div>
  );
}
